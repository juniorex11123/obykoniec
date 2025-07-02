import requests
import unittest
import sys
import os
import json
from datetime import datetime

class TimeTrackerAPITester:
    def __init__(self, base_url=None):
        if base_url is None:
            base_url = os.environ.get('REACT_APP_BACKEND_URL', 'https://61a7374c-2ebb-41ed-a935-3bd065540abb.preview.emergentagent.com')
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.cors_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, check_cors=True, origin="http://example.com"):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        # Add origin header for CORS testing
        if check_cors:
            headers['Origin'] = origin
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'OPTIONS':
                # For OPTIONS requests, we need to add the headers that would be in a preflight request
                headers['Access-Control-Request-Method'] = 'POST'
                headers['Access-Control-Request-Headers'] = 'content-type'
                response = requests.options(url, headers=headers)
            elif method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)

            # Check status code
            status_success = response.status_code == expected_status
            
            # Check CORS headers if required
            cors_success = True
            cors_headers = {}
            
            if check_cors:
                # Check for CORS headers
                cors_headers = {
                    'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                    'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
                    'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers'),
                    'Access-Control-Allow-Credentials': response.headers.get('Access-Control-Allow-Credentials')
                }
                
                # For OPTIONS preflight requests, we expect all headers
                if method == 'OPTIONS':
                    cors_success = (
                        cors_headers['Access-Control-Allow-Origin'] == '*' and
                        cors_headers['Access-Control-Allow-Methods'] is not None and
                        cors_headers['Access-Control-Allow-Headers'] is not None and
                        # With allow_origins=["*"], allow_credentials must be False
                        cors_headers['Access-Control-Allow-Credentials'] is None
                    )
                # For regular requests, we at least expect Allow-Origin
                else:
                    cors_success = cors_headers['Access-Control-Allow-Origin'] == '*'
                
                # Store CORS test results
                self.cors_results.append({
                    'endpoint': endpoint,
                    'method': method,
                    'cors_success': cors_success,
                    'cors_headers': cors_headers
                })
            
            success = status_success and (not check_cors or cors_success)
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if response.headers.get('content-type') == 'application/json' and response.content:
                    print(f"Response: {response.json()}")
                if check_cors:
                    print(f"✅ CORS Headers: {json.dumps(cors_headers, indent=2)}")
            else:
                if not status_success:
                    print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                    print(f"Response: {response.text}")
                if check_cors and not cors_success:
                    print(f"❌ Failed - CORS headers not properly configured")
                    print(f"❌ CORS Headers: {json.dumps(cors_headers, indent=2)}")

            return success, response.json() if status_success and response.headers.get('content-type') == 'application/json' and response.content else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_check(self, check_cors=True):
        """Test the health check endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "health",
            200,
            check_cors=check_cors
        )

    def test_root_endpoint(self, check_cors=True):
        """Test the root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200,
            check_cors=check_cors
        )

    def test_submit_contact_form(self, name, email, company, phone, message, check_cors=True):
        """Test submitting a contact form"""
        return self.run_test(
            "Contact Form Submission",
            "POST",
            "contact",
            200,
            data={
                "user_name": name,
                "user_email": email,
                "user_company": company,
                "user_phone": phone,
                "message": message
            },
            check_cors=check_cors
        )

    def test_get_contact_messages(self, check_cors=True):
        """Test retrieving contact messages"""
        return self.run_test(
            "Get Contact Messages",
            "GET",
            "contact",
            200,
            check_cors=check_cors
        )

    def test_create_status_check(self, client_name, check_cors=True):
        """Test creating a status check"""
        return self.run_test(
            "Create Status Check",
            "POST",
            "status",
            200,
            data={"client_name": client_name},
            check_cors=check_cors
        )

    def test_get_status_checks(self, check_cors=True):
        """Test getting all status checks"""
        return self.run_test(
            "Get Status Checks",
            "GET",
            "status",
            200,
            check_cors=check_cors
        )
        
    def test_options_preflight(self, endpoint):
        """Test OPTIONS preflight request to an endpoint"""
        return self.run_test(
            f"OPTIONS preflight to /{endpoint}",
            "OPTIONS",
            endpoint,
            200,
            check_cors=True
        )

def main():
    # Setup
    backend_url = os.environ.get('REACT_APP_BACKEND_URL', 'https://61a7374c-2ebb-41ed-a935-3bd065540abb.preview.emergentagent.com')
    tester = TimeTrackerAPITester(backend_url)
    test_client = f"test_client_{datetime.now().strftime('%Y%m%d%H%M%S')}"
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Run tests
    print("\n🔄 Starting API Tests for TimeTracker Pro")
    print(f"🌐 Testing against API URL: {tester.api_url}")
    print(f"🕒 Test started at: {timestamp}")
    print("=" * 80)
    
    # CORS-specific tests
    print("\n🔍 TESTING CORS CONFIGURATION")
    print("=" * 80)
    
    # Test OPTIONS preflight requests
    print("\n🔍 Testing OPTIONS preflight requests...")
    tester.test_options_preflight("contact")
    tester.test_options_preflight("health")
    tester.test_options_preflight("")
    
    # Test health check with CORS
    health_success, _ = tester.test_health_check()
    if not health_success:
        print("❌ Health check failed, API may not be available")
        print("Continuing with other tests anyway...")
    
    # Test root endpoint with CORS
    tester.test_root_endpoint()
    
    # Test contact form submission with CORS
    contact_success, contact_response = tester.test_submit_contact_form(
        "Jan Testowy",
        "jan@test.pl",
        "Firma Testowa",
        "+48 123 456 789",
        "To jest wiadomość testowa z systemu automatycznego testowania"
    )
    
    # Test retrieving contact messages with CORS
    if contact_success:
        tester.test_get_contact_messages()
    
    # Test status check endpoints with CORS
    success, response = tester.test_create_status_check(test_client)
    if success:
        print(f"✅ Successfully created status check with ID: {response.get('id')}")
    
    tester.test_get_status_checks()

    # Print results
    print("\n" + "=" * 80)
    print(f"📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"📈 Success rate: {success_rate:.2f}%")
    
    # Print CORS-specific results
    print("\n🔍 CORS CONFIGURATION SUMMARY")
    print("=" * 80)
    
    cors_success = all(result['cors_success'] for result in tester.cors_results)
    if cors_success:
        print("✅ CORS is properly configured for all tested endpoints")
    else:
        print("❌ CORS configuration issues detected:")
        for result in tester.cors_results:
            if not result['cors_success']:
                print(f"  - Endpoint: /{result['endpoint']} (Method: {result['method']})")
                print(f"    Headers: {json.dumps(result['cors_headers'], indent=2)}")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())