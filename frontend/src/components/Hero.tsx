"use client";

import { motion } from 'framer-motion';
import { ChevronRight, ExternalLink, Github, Code2, ShieldCheck, Rocket } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="min-h-[105vh] flex items-center justify-center pt-48 pb-32 overflow-hidden relative selection:bg-gdsc-blue selection:text-white">
      {/* 🚀 ELITE ATMOSPHERE HUB: Dynamic Background Hub */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 30, repeat: Infinity }}
          className="absolute top-[-10%] right-[-5%] w-[80%] h-[80%] bg-gdsc-blue/15 blur-[180px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: [45, 0, 45] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-[-10%] left-[-15%] w-[60%] h-[60%] bg-gdsc-red/5 blur-[150px] rounded-full" 
        />
        <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-gdsc-yellow/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="container-wide px-10 sm:px-16 lg:px-32 flex flex-col lg:flex-row items-center justify-between gap-24 relative z-10">
        
        {/* Text Content: focal Hierarchy Manifest */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 space-y-12 text-left"
        >
          <div className="space-y-8">
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-6 py-2.5 bg-white border border-black/[0.03] rounded-full shadow-lg shadow-black/[0.02]"
            >
              <span className="w-2 h-2 rounded-full bg-gdsc-blue animate-pulse"></span>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Industrial Architecture Sync</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants} 
              className="text-7xl sm:text-8xl lg:text-[7.5rem] font-display font-black tracking-tighter text-slate-900 leading-[0.85]"
            >
              Building <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gdsc-blue via-gdsc-red to-gdsc-yellow drop-shadow-sm">Digital Hubs.</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants} 
              className="text-xl sm:text-2xl text-slate-500 font-body font-light max-w-2xl leading-relaxed italic"
            >
              Vishal is a Full-Stack MERN architect specializing in high-fidelity industrial interfaces and enterprise portfolio synchronization.
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-8 pt-4">
            <Link 
              href="#work"
              className="px-12 py-6 bg-slate-900 text-white font-black rounded-2xl hover:bg-gdsc-blue hover:scale-105 active:scale-95 transition-all flex items-center gap-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] group text-sm uppercase tracking-widest"
            >
              Explore Archive
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#contact"
              className="px-10 py-6 bg-white border border-slate-200 text-slate-900 font-black rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-4 text-sm uppercase tracking-widest shadow-xl"
            >
              Hire Architect
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-12 flex items-center gap-16">
             <div className="flex flex-col">
                <span className="text-4xl font-display font-black text-slate-900 leading-none">05+</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3">Live Terminals</span>
             </div>
             <div className="w-px h-14 bg-gradient-to-b from-slate-200 to-transparent"></div>
             <div className="flex flex-col">
                <span className="text-4xl font-display font-black text-slate-900 leading-none">12+</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3">Deployments</span>
             </div>
          </motion.div>
        </motion.div>

        {/* Visual Element: High-Fidelity LIFT Manifest */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          className="flex-1 relative"
        >
          <div className="relative w-full aspect-[4/5] max-w-[550px] mx-auto group">
             {/* Floating Badge: Interaction Focal Point */}
             <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-10 -right-10 z-20 bg-white/80 backdrop-blur-3xl border border-white/40 px-8 py-6 rounded-[2.5rem] shadow-3xl flex items-center gap-6 hidden sm:flex border-b-4 border-b-gdsc-blue"
             >
                <div className="w-14 h-14 bg-gdsc-blue/10 text-gdsc-blue rounded-[1.2rem] flex items-center justify-center shadow-inner">
                   <Rocket size={28} />
                </div>
                <div className="flex flex-col">
                   <span className="text-xs font-display font-black text-slate-900 leading-none uppercase tracking-tighter">Enterprise</span>
                   <span className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-widest">Masterpiece Hub</span>
                </div>
             </motion.div>

             <div className="w-full h-full rounded-[4.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative border-[12px] border-white group-hover:scale-[1.02] transition-transform duration-1000">
                <Image 
                  src="https://images.unsplash.com/photo-1614680376593-902f74cc0d41?q=80&w=1974"
                  alt="Architecture Canvas"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                
                {/* Internal HUD layer */}
                <div className="absolute bottom-10 left-10 text-left">
                   <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                      <Code2 size={14} className="text-white" />
                      <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">Ref: GDSC-ARCH-V2</span>
                   </div>
                </div>
             </div>
             
             {/* Dynamic Glow Manifest */}
             <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-gdsc-blue/20 blur-[100px] rounded-full animate-pulse pointer-events-none"></div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
