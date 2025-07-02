import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // TUTAJ WSTAW SWÓJ FORMSPREE URL
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwpbwozg";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(FORMSPREE_ENDPOINT, {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        _replyto: formData.email,
        _subject: `Formularz kontaktowy: ${formData.subject}`
      }, {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.status === 200) {
        showNotification('Wiadomość została wysłana pomyślnie!', 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      showNotification('Wystąpił błąd podczas wysyłania wiadomości.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Formularz Kontaktowy</h2>
      
      {notification.show && (
        <div className={`notification ${notification.type === 'success' ? 'success' : 'error'}`}>
          {notification.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
            Imię i nazwisko
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            minLength={2}
            maxLength={100}
            className="form-input"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-200 mb-1">
            Temat
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            minLength={5}
            maxLength={200}
            className="form-input"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1">
            Wiadomość
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            minLength={10}
            maxLength={2000}
            rows={5}
            className="form-input"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-btn"
        >
          {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
        </button>
      </form>
    </div>
  );
};

const Home = () => {
  const helloWorldApi = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log(response.data.message);
    } catch (e) {
      console.error(e, `errored out requesting / api`);
    }
  };

  useEffect(() => {
    helloWorldApi();
  }, []);

  return (
    <div>
      <header className="App-header">
        <a
          className="App-link"
          href="https://emergent.sh"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="https://avatars.githubusercontent.com/in/1201222?s=120&u=2686cf91179bbafbc7a71bfbc43004cf9ae1acea&v=4" alt="Emergent Logo" />
        </a>
        <p className="mt-5 mb-8">Building something incredible ~!</p>
        
        <ContactForm />
      </header>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;