import requests
import unittest
import sys
import os
from datetime import datetime

class TimeTrackerAPITester:
    def __init__(self, base_url=None):
        if base_url is None:
            base_url = os.environ.get('REACT_APP_BACKEND_URL', 'https://747ee636-a80b-43fa-bc2f-68baacfa57b0.preview.emergentagent.com')
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                print(f"Response: {response.json()}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text}")

            return success, response.json() if success and response.content else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test the health check endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "health",
            200
        )

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200
        )

    def test_submit_contact_form(self, name, email, company, phone, message):
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
            }
        )

    def test_get_contact_messages(self):
        """Test retrieving contact messages"""
        return self.run_test(
            "Get Contact Messages",
            "GET",
            "contact",
            200
        )

    def test_create_status_check(self, client_name):
        """Test creating a status check"""
        return self.run_test(
            "Create Status Check",
            "POST",
            "status",
            200,
            data={"client_name": client_name}
        )

    def test_get_status_checks(self):
        """Test getting all status checks"""
        return self.run_test(
            "Get Status Checks",
            "GET",
            "status",
            200
        )

def main():
    # Setup
    backend_url = os.environ.get('REACT_APP_BACKEND_URL', 'https://747ee636-a80b-43fa-bc2f-68baacfa57b0.preview.emergentagent.com')
    tester = TimeTrackerAPITester(backend_url)
    test_client = f"test_client_{datetime.now().strftime('%Y%m%d%H%M%S')}"
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Run tests
    print("\n🔄 Starting API Tests for TimeTracker Pro")
    print(f"🌐 Testing against API URL: {tester.api_url}")
    print(f"🕒 Test started at: {timestamp}")
    print("=" * 80)
    
    # Test health check
    health_success, _ = tester.test_health_check()
    if not health_success:
        print("❌ Health check failed, API may not be available")
        print("Continuing with other tests anyway...")
    
    # Test root endpoint
    tester.test_root_endpoint()
    
    # Test contact form submission
    contact_success, contact_response = tester.test_submit_contact_form(
        "Jan Testowy",
        "jan@test.pl",
        "Firma Testowa",
        "+48 123 456 789",
        "To jest wiadomość testowa z systemu automatycznego testowania"
    )
    
    # Test retrieving contact messages
    if contact_success:
        tester.test_get_contact_messages()
    
    # Test status check endpoints
    success, response = tester.test_create_status_check(test_client)
    if success:
        print(f"✅ Successfully created status check with ID: {response.get('id')}")
    
    tester.test_get_status_checks()

    # Print results
    print("\n" + "=" * 80)
    print(f"📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"📈 Success rate: {success_rate:.2f}%")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())