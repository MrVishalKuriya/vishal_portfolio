"use client";

import { motion } from 'framer-motion';
import { User, Code2, Globe, Sparkles, Box, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  const skills = [
    { name: "Frontend Architecture", icon: <Globe size={18} />, color: "bg-gdsc-blue" },
    { name: "MERN Logic", icon: <Code2 size={18} />, color: "bg-gdsc-red" },
    { name: "UI Optimization", icon: <Sparkles size={18} />, color: "bg-gdsc-yellow" },
    { name: "Security Protocols", icon: <ShieldCheck size={18} />, color: "bg-gdsc-green" },
  ];

  return (
    <section id="about" className="py-48 relative overflow-hidden bg-white selection:bg-gdsc-blue selection:text-white">
      <div className="container-wide px-10 sm:px-16 lg:px-32 flex flex-col lg:flex-row items-center gap-24 relative z-10">
        
        {/* Profile Visual: High-Fidelity LIFT */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:w-1/2 relative"
        >
          <div className="relative w-full max-w-lg mx-auto aspect-square group">
             <div className="absolute inset-0 bg-gradient-to-br from-gdsc-blue to-gdsc-red rounded-[4.5rem] rotate-12 group-hover:rotate-0 transition-transform duration-1000 opacity-20"></div>
             <div className="relative w-full h-full rounded-[4.5rem] overflow-hidden border-[10px] border-white shadow-3xl translate-y-[-15px] group-hover:translate-y-0 transition-transform duration-1000">
                <Image 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974"
                  alt="Identity"
                  fill
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                />
             </div>
             
             {/* Floating Info: Interaction Focal Point */}
             <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2.5rem] shadow-2xl flex items-center gap-6 border border-slate-50 border-b-4 border-b-gdsc-red"
             >
                <div className="w-16 h-16 bg-slate-900 rounded-[1.2rem] flex items-center justify-center text-white shadow-xl shadow-slate-900/10">
                   <Box size={28} />
                </div>
                <div>
                   <h4 className="text-sm font-display font-black text-slate-900 uppercase tracking-tighter">Architecture</h4>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">Industrial Grade</p>
                </div>
             </motion.div>
          </div>
        </motion.div>

        {/* Story Content: Optimized Hierarchy */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:w-1/2 space-y-16 text-left"
        >
          <div className="space-y-10">
            <h2 className="text-6xl md:text-8xl font-display font-black text-slate-900 tracking-tighter leading-[0.9]">
              Identity <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-gdsc-red via-gdsc-yellow to-white drop-shadow-sm">Manifest.</span>
            </h2>
            <div className="space-y-8 font-body text-slate-500 font-light leading-relaxed max-w-xl">
              <p className="text-xl italic">
                I am a high-performance **Full-Stack Developer** focused on the synthesis of clean architecture and premium user interaction. My work officially bridges the gap between complex backend logic and pixel-perfect industrial design.
              </p>
              <p className="text-lg">
                With deep expertise in the **MERN Protocol**, I specialized in building secure portals, e-commerce hubs, and industrial dashboards that prioritize real-time data integrity and elite auditing.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex items-center gap-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group transition-all shadow-sm hover:shadow-xl"
              >
                <div className={`w-14 h-14 ${skill.color} rounded-[1.2rem] flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-all`}>
                  {skill.icon}
                </div>
                <span className="text-[10px] font-black font-display text-slate-900 uppercase tracking-[0.2em]">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
