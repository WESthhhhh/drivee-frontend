import { PrimaryInput, TextArea } from '../UI/formInputs'; 
import Button from '../UI/button';
import React, { useState } from 'react';

const Contactform = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',  // Changé de 'email' à 'phone'
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10,15}$/; // Validation basique numéro téléphone

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    
    if (!validate()) return;

    setIsLoading(true);
    
    // Formatage du message pour WhatsApp
    const whatsappMessage = `Nouveau message de contact:%0A%0A*Nom:* ${formData.name}%0A*Téléphone:* ${formData.phone}%0A*Sujet:* ${formData.subject}%0A*Message:* ${formData.message}`;
    
    // Votre numéro WhatsApp (remplacez par votre vrai numéro avec l'indicatif)
    const yourWhatsAppNumber = "+212604070252"; // Exemple pour Maroc
    
    // URL pour envoyer directement le message (sans avoir à cliquer)
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${yourWhatsAppNumber}&text=${whatsappMessage}`;
    
    // Ouvrir dans un nouvel onglet
    window.open(whatsappUrl, '_blank');
    
    // Réinitialiser le formulaire
    setFormData({
      name: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    setSubmitStatus('success');
    setIsLoading(false);
  };

  return (
    <div className="md:w-[45%] p-8 border shadow-primary-4 border-b50 rounded-large-md relative z-10 mt-10 md:mt-0">
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-success/10 text-success rounded-large-sm">
          Message envoyé avec succès sur WhatsApp!
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className='space-y-4'>
        <PrimaryInput 
          label="Nom complet" 
          name="name" 
          placeholder="Votre nom complet"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        
        <PrimaryInput 
          label="Numéro de téléphone" 
          name="phone" 
          placeholder="Votre numéro WhatsApp"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        
        <PrimaryInput 
          label="Sujet" 
          name="subject" 
          placeholder="Objet du message"
          value={formData.subject}
          onChange={handleChange}
          error={errors.subject}
        />
        
        <TextArea 
          label="Message" 
          name="message" 
          placeholder="Votre message..."
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
        />
        
        <Button 
          type="submit" 
          htmlType='submit'
          className="mt-6 p-2.5 text-light bg-primary rounded-small-md hover:bg-primary-dark transition-colors"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Envoi en cours...
            </span>
          ) : (
            'Envoyer via WhatsApp'
          )}
        </Button>
      </form>
    </div>
  );
};

export default Contactform;