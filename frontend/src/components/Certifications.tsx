"use client";

import { motion } from 'framer-motion';
import { Award, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';

const certificates = [
  {
    title: "Google Developer Student Clubs",
    issuer: "Google Community",
    date: "2024",
    icon: "https://developers.google.com/static/community/images/gdsc-logo.png",
    color: "border-gdsc-blue"
  },
  {
    title: "MERN Stack Professional",
    issuer: "Industrial Grade Certification",
    date: "2023",
    icon: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070",
    color: "border-gdsc-red"
  },
  {
    title: "AWS Cloud Architecture",
    issuer: "Enterprise Cloud Protocol",
    date: "2023",
    icon: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072",
    color: "border-gdsc-yellow"
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-48 bg-white relative overflow-hidden selection:bg-gdsc-blue selection:text-white">
      <div className="container-wide px-10 sm:px-16 lg:px-32 space-y-24 relative z-10">
        
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-7xl md:text-8xl font-display font-black text-slate-900 tracking-tighter leading-none"
          >
            Trust <span className="text-transparent bg-clip-text bg-gradient-to-r from-gdsc-red via-gdsc-yellow to-slate-900">Manifest.</span>
          </motion.h2>
          <p className="text-slate-500 font-body font-light text-xl max-w-2xl mx-auto leading-relaxed">
            High-fidelity industrial certifications and professional accolades verified via the MERN protocol.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          {certificates.map((cert, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`bg-slate-50 border-t-[12px] ${cert.color} p-12 rounded-[3.5rem] shadow-xl hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-3 transition-all duration-700 flex flex-col items-center text-center space-y-10 group`}
            >
              <div className="relative w-28 h-28 rounded-[2rem] overflow-hidden shadow-2xl group-hover:rotate-12 transition-transform duration-700 border-4 border-white">
                <Image 
                  src={cert.icon}
                  alt={cert.title}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              
              <div className="space-y-6 flex-1">
                 <h3 className="text-2xl font-display font-black text-slate-900 tracking-tight leading-tight px-4">{cert.title}</h3>
                 <div className="flex flex-col items-center gap-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">{cert.issuer}</span>
                    <div className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-100 rounded-full text-[10px] font-black text-gdsc-blue uppercase tracking-widest shadow-inner">
                       <ShieldCheck size={14} className="text-gdsc-green" />
                       Verified {cert.date}
                    </div>
                 </div>
              </div>
              
              <div className="w-12 h-1 bg-gradient-to-r from-slate-200 to-transparent group-hover:w-full transition-all duration-1000" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
