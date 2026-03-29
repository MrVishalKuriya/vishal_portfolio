"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Send, MapPin, Phone, Rocket, Globe, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import api from '@/services/api';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    
    try {
      await api.post('/contact/submit', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.response?.data?.message || 'Transmission Protocol Failure. Check Backend Connection.');
    }
  };

  const contactInfo = [
    { icon: <Mail size={24} />, label: "Email Identity", value: "vishal@architecture.com", color: "text-gdsc-blue" },
    { icon: <Globe size={24} />, label: "Digital Headquarters", value: "Gujarat, India", color: "text-gdsc-red" },
  ];

  return (
    <section id="contact" className="py-32 bg-[#fafafa] relative overflow-hidden selection:bg-gdsc-blue selection:text-white">
      <div className="container-wide px-6 sm:px-12 lg:px-24 flex flex-col lg:flex-row gap-20 relative z-10">
        
        {/* Contact Manifest */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:w-1/2 space-y-12 text-left"
        >
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-display font-black text-slate-900 tracking-tighter">
              Launch <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-gdsc-blue via-gdsc-red to-gdsc-yellow">Interaction.</span>
            </h2>
            <p className="text-slate-500 font-body font-light text-lg max-w-md">
              Officially established a connection with a high-performance MERN architect for your next industrial build.
            </p>
          </div>

          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-center gap-6 group">
                <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center ${info.color} shadow-lg group-hover:scale-110 transition-all border border-slate-50`}>
                  {info.icon}
                </div>
                <div>
                   <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{info.label}</h4>
                   <p className="text-lg font-display font-black text-slate-900 mt-1">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-10 flex items-center gap-6 text-left">
             <a href="#" title="Visit GitHub Repository Hub" className="p-4 bg-slate-900 text-white rounded-2xl hover:scale-110 transition-all shadow-xl">
                <Github size={24} />
             </a>
             <a href="#" title="Visit Professional LinkedIn Architecture" className="p-4 bg-gdsc-blue text-white rounded-2xl hover:scale-110 transition-all shadow-xl">
                <Linkedin size={24} />
             </a>
          </div>
        </motion.div>

        {/* Interaction Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:w-1/2"
        >
          <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-50 space-y-10">
            <div className="flex justify-between items-center">
               <h3 className="text-2xl font-display font-black text-slate-900 flex items-center gap-3 leading-none">
                  <Rocket className="text-gdsc-red" /> Register Inquiry
               </h3>
               <AnimatePresence>
                  {status === 'success' && (
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="px-4 py-2 bg-gdsc-green/10 text-gdsc-green text-[10px] font-bold uppercase rounded-full border border-gdsc-green/20"
                    >
                      Packet Received!
                    </motion.span>
                  )}
               </AnimatePresence>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 block text-left">Identity Name</label>
                     <input 
                       name="name"
                       required
                       value={formData.name}
                       onChange={handleInputChange}
                       type="text" 
                       placeholder="Vishal Kurlya" 
                       className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl text-slate-900 outline-none focus:border-gdsc-blue transition-all" 
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 block text-left">Credential Email</label>
                     <input 
                       name="email"
                       required
                       value={formData.email}
                       onChange={handleInputChange}
                       type="email" 
                       placeholder="vishal@architecture.com" 
                       className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl text-slate-900 outline-none focus:border-gdsc-blue transition-all" 
                     />
                  </div>
               </div>
               <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 block">Architecture Specs</label>
                  <textarea 
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your digital architecture requirements..." 
                    className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl text-slate-900 outline-none focus:border-gdsc-blue transition-all min-h-[150px]"
                  ></textarea>
               </div>
               
               {status === 'error' && (
                 <p className="text-gdsc-red text-[10px] font-bold uppercase text-center bg-gdsc-red/10 py-3 rounded-xl">
                   {errorMessage}
                 </p>
               )}

               <button 
                 type="submit"
                 disabled={status === 'submitting'}
                 className="w-full py-6 bg-gdsc-blue text-white font-bold rounded-2xl shadow-xl shadow-gdsc-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
               >
                 {status === 'submitting' ? "Transmitting..." : "Transmit Packet"}
                 <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </button>
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
