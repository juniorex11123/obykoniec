{/* Rest of sections will be in the next part... */}
      
      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1618544976420-1f213fcf2052"
                  alt="Zespół współpracujący efektywnie"
                  className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
                />
                <div className="absolute -top-8 -right-8 bg-white rounded-2xl p-4 shadow-xl border border-blue-100">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">97%</div>
                    <div className="text-sm text-gray-600">zadowolonych klientów</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Dlaczego małe i średnie firmy wybierają TimeTracker Pro?
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Oszczędność czasu do 40%",
                    description: "Automatyzacja procesów eliminuje manualne wprowadzanie danych i skraca czas administracyjny.",
                    stat: "40%"
                  },
                  {
                    title: "Zwiększ zyski o 25%",
                    description: "Precyzyjne śledzenie czasu zapewnia pełną rozliczalność projektów i eliminuje straty.",
                    stat: "25%"
                  },
                  {
                    title: "Lepsza organizacja zespołu",
                    description: "Przejrzyste zadania, deadliny i komunikacja w jednym miejscu.",
                    stat: "95%"
                  }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm border border-blue-100">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      +{benefit.stat}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Co mówią nasi klienci
            </h2>
            <p className="text-xl text-gray-600">
              Ponad 5000 firm codziennie korzysta z TimeTracker Pro
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Anna Kowalska",
                position: "CEO, TechSolutions",
                image: "https://images.pexels.com/photos/7616608/pexels-photo-7616608.jpeg",
                content: "TimeTracker Pro zrewolucjonizował sposób zarządzania naszym zespołem. Wzrost produktywności o 35% w pierwszym miesiącu!"
              },
              {
                name: "Marek Nowak",
                position: "Dyrektor, Creative Agency",
                image: "https://images.unsplash.com/photo-1610631066894-62452ccb927c",
                content: "Najlepsze narzędzie do śledzenia czasu i rozliczania projektów. Intuicyjne, szybkie i niezawodne."
              },
              {
                name: "Kasia Wiśniewska",
                position: "PM, Development Team",
                image: "https://images.unsplash.com/photo-1573497701175-00c200fd57f0",
                content: "Automatyczna fakturacja oszczędza nam tygodnie pracy. ROI zwrócił się już w drugim miesiącu użytkowania."
              }
            ].map((testimonial, index) => (
              <div key={index} className="animate-on-scroll bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-blue-100">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-blue-600 text-sm">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proste ceny, bez ukrytych kosztów
            </h2>
            <p className="text-xl text-gray-600">
              Wybierz plan dopasowany do potrzeb Twojej firmy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "29",
                period: "miesięcznie",
                description: "Idealny dla małych zespołów",
                features: [
                  "Do 5 użytkowników",
                  "Podstawowe śledzenie czasu",
                  "Proste raporty",
                  "Email support",
                  "Aplikacja mobilna"
                ],
                highlighted: false
              },
              {
                name: "Professional",
                price: "59",
                period: "miesięcznie", 
                description: "Najpopularniejszy wśród firm",
                features: [
                  "Do 25 użytkowników",
                  "Zaawansowane śledzenie",
                  "Automatyczna fakturacja",
                  "Zarządzanie projektami",
                  "Integracje z systemami",
                  "Priorytetowy support"
                ],
                highlighted: true
              },
              {
                name: "Enterprise",
                price: "99",
                period: "miesięcznie",
                description: "Dla większych organizacji",
                features: [
                  "Nieograniczona liczba użytkowników",
                  "Wszystkie funkcje Professional",
                  "Zaawansowane raporty",
                  "API access",
                  "Dedykowany manager",
                  "SLA 99.9%"
                ],
                highlighted: false
              }
            ].map((plan, index) => (
              <div key={index} className={`animate-on-scroll relative p-8 rounded-2xl shadow-lg transition-all hover:scale-105 ${plan.highlighted ? \'bg-gradient-to-br from-blue-600 to-blue-700 text-white transform scale-105\' : \'bg-white border border-blue-100\'}`}>
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Najpopularniejszy
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? \'text-white\' : \'text-gray-900\'}`}>
                    {plan.name}
                  </h3>
                  <p className={`${plan.highlighted ? \'text-blue-100\' : \'text-gray-600\'} mb-4`}>
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className={`text-5xl font-bold ${plan.highlighted ? \'text-white\' : \'text-gray-900\'}`}>
                      {plan.price}
                    </span>
                    <span className={`ml-1 ${plan.highlighted ? \'text-blue-100\' : \'text-gray-600\'}`}>
                      zł/{plan.period}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg className={`w-5 h-5 mr-3 ${plan.highlighted ? \'text-blue-200\' : \'text-green-500\'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className={plan.highlighted ? \'text-blue-100\' : \'text-gray-700\'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => scrollToSection(\'contact\')}
                  className={`w-full py-4 px-6 rounded-full font-semibold transition-all transform hover:scale-105 ${plan.highlighted ? \'bg-white text-blue-600 hover:bg-blue-50\' : \'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800\'}`}
                >
                  Skontaktuj się z nami
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-on-scroll">
            <p className="text-gray-600 mb-4">
              Wszystkie plany zawierają 14-dniowy bezpłatny okres próbny
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Anuluj w każdej chwili
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                Bezpieczne płatności
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                24/7 Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll text-white">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Gotowy na zwiększenie produktywności?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Skontaktuj się z nami już dziś i dowiedz się, jak TimeTracker Pro może zrewolucjonizować zarządzanie czasem w Twojej firmie.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-white mb-2">5000+</div>
                  <div className="text-blue-100 text-sm">Zadowolonych firm</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">35%</div>
                  <div className="text-blue-100 text-sm">Wzrost produktywności</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">97%</div>
                  <div className="text-blue-100 text-sm">Ocena zadowolenia</div>
                </div>
              </div>
            </div>
            
            <div className="animate-on-scroll">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Skontaktuj się z nami
                </h3>
                
                {submitStatus === \'success\' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5 9.293 10.793a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd"/>
                      </svg>
                      <p className="text-green-800 font-medium">
                        Dziękujemy! Wiadomość została wysłana. Skontaktujemy się z Tobą wkrótce.
                      </p>
                    </div>
                  </div>
                )}
                
                {submitStatus === \'error\' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      <p className="text-red-800 font-medium">
                        Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.
                      </p>
                    </div>
                  </div>
                )}
                
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-2">
                      Imię i nazwisko *
                    </label>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${formErrors.user_name ? \'border-red-300\' : \'border-gray-200\'}`}
                      placeholder="Jan Kowalski"
                    />
                    {formErrors.user_name && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.user_name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 mb-2">
                      Adres email *
                    </label>
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      value={formData.user_email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${formErrors.user_email ? \'border-red-300\' : \'border-gray-200\'}`}
                      placeholder="jan.kowalski@firma.pl"
                    />
                    {formErrors.user_email && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.user_email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="user_company" className="block text-sm font-medium text-gray-700 mb-2">
                      Nazwa firmy
                    </label>
                    <input
                      type="text"
                      id="user_company"
                      name="user_company"
                      value={formData.user_company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Twoja Firma Sp. z o.o."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="user_phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Numer telefonu
                    </label>
                    <input
                      type="tel"
                      id="user_phone"
                      name="user_phone"
                      value={formData.user_phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="+48 123 456 789"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Wiadomość *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${formErrors.message ? \'border-red-300\' : \'border-gray-200\'}`}
                      placeholder="Opisz swoje potrzeby związane z zarządzaniem czasem pracy w firmie..."
                    />
                    {formErrors.message && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all transform hover:scale-105 shadow-lg ${isSubmitting ? \'bg-gray-400 cursor-not-allowed\' : \'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800\'}`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Wysyłanie...
                      </div>
                    ) : (
                      \'Wyślij wiadomość\'
                    )}
                  </button>
                </form>
                
                <div className="mt-6 text-center text-sm text-gray-600">
                  <p>Lub skontaktuj się bezpośrednio:</p>
                  <div className="flex justify-center items-center space-x-6 mt-2">
                    <a href="mailto:contact@timetracker.pl" className="text-blue-600 hover:text-blue-700 font-medium">
                      contact@timetracker.pl
                    </a>
                    <span className="text-gray-400">•</span>
                    <a href="tel:+48123456789" className="text-blue-600 hover:text-blue-700 font-medium">
                      +48 123 456 789
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span className="text-xl font-bold">TimeTracker Pro</span>
              </div>
              <p className="text-gray-400 mb-4">
                Nowoczesne rozwiązanie do zarządzania czasem pracy dla małych i średnich firm.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Produkt</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-blue-400 transition-colors">Funkcje</a></li>
                <li><a href="#pricing" className="hover:text-blue-400 transition-colors">Cennik</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Integracje</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Firma</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">O nas</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Kariera</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#contact" className="hover:text-blue-400 transition-colors">Kontakt</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Wsparcie</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Pomoc</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Dokumentacja</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Bezpieczeństwo</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 TimeTracker Pro. Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-blue-400 transition-colors">Polityka prywatności</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Regulamin</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>