"use client";

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ArrowUpCircle } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const BrandingLogo = () => (
    <div className="flex items-center gap-4 group">
      <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-slate-900 group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
        <span className="text-xl font-display font-black leading-none">V</span>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-display font-black tracking-tighter text-slate-900 leading-none">VISHAL</span>
        <span className="text-[10px] font-bold text-accent tracking-[0.3em] uppercase opacity-70">Architecture</span>
      </div>
    </div>
  );

  return (
    <footer className="py-24 px-6 bg-white border-t border-black/[0.03] selection:bg-accent selection:text-white">
      <div className="container-wide px-6 sm:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <BrandingLogo />
            <p className="text-neutral-mid text-lg font-body font-light leading-relaxed max-w-sm text-left">
              Building scalable and high-performance web applications with modern technologies. 
              Focused on delivering clean, efficient, and user-centric solutions.
            </p>
          </div>

          <div className="space-y-8">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block text-left">Navigation</span>
            <ul className="space-y-4 text-left">
              <li><Link href="#about" className="text-neutral-mid hover:text-accent font-body font-light transition-colors">Professional Profile</Link></li>
              <li><Link href="#work" className="text-neutral-mid hover:text-accent font-body font-light transition-colors">Project Hub</Link></li>
              <li><Link href="#certifications" className="text-neutral-mid hover:text-accent font-body font-light transition-colors">Verified Results</Link></li>
              <li><Link href="#contact" className="text-neutral-mid hover:text-accent font-body font-light transition-colors">Start a Conversation</Link></li>
            </ul>
          </div>

          <div className="space-y-8">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block text-left">Digital Presence</span>
            <div className="flex gap-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#fafafa] border border-black/5 flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-sm" aria-label="Github Profile">
                <Github size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#fafafa] border border-black/5 flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-sm" aria-label="LinkedIn Profile">
                <Linkedin size={20} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#fafafa] border border-black/5 flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-sm" aria-label="Twitter Profile">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-black/[0.03] flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-neutral-mid text-[10px] font-bold uppercase tracking-widest">
            © 2024 VISHAL PRAVINBHAI // ELITE PORTFOLIO BRANDING
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-3 text-slate-900 font-bold text-[10px] uppercase tracking-widest hover:text-accent transition-colors"
          >
            Terminal Top
            <ArrowUpCircle size={20} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
