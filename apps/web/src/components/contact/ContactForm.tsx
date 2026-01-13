import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

interface FormField {
  _type: 'formField';
  name: string;
  label: string;
  placeholder?: string;
  type: 'text' | 'email' | 'textarea' | 'select';
  required?: boolean;
  options?: string[]; // for select
}

interface Props {
  data: {
    title?: string;
    description?: any; // PortableText
    formFields?: FormField[];
    submitButtonText?: string;
    successMessage?: string;
  };
}

export default function ContactForm({ data }: Props) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate submission (replace with real API call later)
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} />
        </div>
        <h3 className="text-2xl font-serif text-primary mb-2">Message Sent!</h3>
        <p className="text-gray-600">{data.successMessage || "Thank you for reaching out. We'll get back to you shortly."}</p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-medium text-primary hover:underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  const fields = data.formFields || [
    { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Juan Cruz' },
    { name: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'juan@example.com' },
    { name: 'subject', label: 'Subject', type: 'select', required: true, options: ['General Inquiry', 'Admissions', 'Registrar', 'Careers'] },
    { name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'How can we help you?' },
  ] as FormField[];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
      <div className="p-8 sm:p-10">
        <h3 className="text-2xl sm:text-3xl font-serif text-primary mb-2">
          {data.title || "Send us a Message"}
        </h3>
        <p className="text-gray-600 mb-8">
            Fill out the form below and our team will get back to you within 24 hours.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
             {/* Render first half of fields if possible, but for simplicity let's just map */}
             {fields.map((field) => (
               <div key={field.name} className={`${field.type === 'textarea' || field.type === 'text' ? 'col-span-full' : ''}`}>
                 <label htmlFor={field.name} className="block text-sm font-bold text-gray-700 mb-2">
                   {field.label} {field.required && <span className="text-red-500">*</span>}
                 </label>
                 
                 {field.type === 'textarea' ? (
                   <textarea
                     id={field.name}
                     name={field.name}
                     required={field.required}
                     placeholder={field.placeholder}
                     rows={4}
                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 transition outline-none resize-none"
                   />
                 ) : field.type === 'select' ? (
                    <div className="relative">
                        <select
                            id={field.name}
                            name={field.name}
                            required={field.required}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 transition outline-none appearance-none bg-white"
                        >
                            <option value="">Select an option</option>
                            {field.options?.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                             <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                    </div>
                 ) : (
                   <input
                     type={field.type}
                     id={field.name}
                     name={field.name}
                     required={field.required}
                     placeholder={field.placeholder}
                     className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 transition outline-none"
                   />
                 )}
               </div>
             ))}
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === 'submitting' ? (
              <>
                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
               <>
                 {data.submitButtonText || "Send Message"} <Send size={18} />
               </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
