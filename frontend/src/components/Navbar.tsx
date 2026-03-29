"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Rocket, LogOut, ChevronRight, User } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Work", href: "/#work" },
    { name: "Certifications", href: "/#certifications" },
    { name: "Contact", href: "/#contact" },
  ];

  if (isAuthenticated) {
    navLinks.push({ name: "Dashboard", href: "/admin/dashboard" });
  } else {
    navLinks.push({ name: "Admin", href: "/admin" });
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        isScrolled ? "py-5 bg-white/70 backdrop-blur-3xl border-b border-black/[0.04] shadow-2xl" : "py-10 bg-transparent"
      }`}
    >
      <div className="container-wide px-10 sm:px-16 lg:px-32 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-[1.2rem] bg-slate-900 flex items-center justify-center text-white group-hover:bg-gdsc-blue group-hover:rotate-6 transition-all duration-500 shadow-2xl shadow-slate-900/10">
            <span className="text-xl font-display font-black leading-none text-white">V</span>
          </div>
          <div className="flex flex-col text-left">
            <span className={`text-xl font-display font-black tracking-tighter leading-none transition-colors ${isScrolled ? "text-slate-900" : "text-slate-900"}`}>VISHAL.</span>
            <span className="text-[9px] font-black text-gdsc-blue tracking-[0.4em] uppercase opacity-70">Architecture</span>
          </div>
        </Link>

        {/* Desktop Navigation: Optimized Proximity */}
        <div className="hidden md:flex items-center gap-14">
          <div className="flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="relative text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-[0.3em] transition-all group overflow-hidden"
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gdsc-blue translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            ))}
          </div>
          
          <div className="h-4 w-px bg-slate-200 hidden lg:block" />

          {isAuthenticated ? (
            <div className="flex items-center gap-6">
               <div className="hidden lg:flex flex-col text-right">
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{user?.name?.split(' ')[0] || 'VISHAL'}</span>
                  <span className="text-[8px] font-bold text-gdsc-green uppercase tracking-tighter">Verified</span>
               </div>
               <Link 
                 href="/admin/dashboard"
                 className="w-12 h-12 bg-slate-900 text-white rounded-[1.2rem] flex items-center justify-center shadow-xl hover:bg-gdsc-blue hover:scale-110 transition-all duration-500"
               >
                  <User size={22} />
               </Link>
            </div>
          ) : (
            <Link 
              href="/#contact"
              className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] text-[10px] uppercase tracking-widest group"
            >
              Launch Architecture
              <Rocket size={16} className="group-hover:-translate-y-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Mobile Toggle: Fitts's Law (Easier Hitbox) */}
        <button 
          className="md:hidden w-12 h-12 flex items-center justify-center text-slate-900 bg-white/50 backdrop-blur-lg rounded-xl border border-black/5"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu: High-Fidelity Entrance */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="md:hidden absolute top-[110%] left-1/2 -translate-x-1/2 w-[90%] bg-white/95 backdrop-blur-3xl rounded-[3rem] border border-black/5 shadow-3xl overflow-hidden p-12"
          >
            <div className="space-y-10 flex flex-col items-center text-center">
               {navLinks.map((link) => (
                 <Link 
                   key={link.name} 
                   href={link.href} 
                   className="text-2xl font-display font-black text-slate-900 uppercase tracking-[0.2em] hover:text-gdsc-blue transition-colors"
                   onClick={() => setIsMobileMenuOpen(false)}
                 >
                   {link.name}
                 </Link>
               ))}
               <div className="w-full pt-6 border-t border-black/5">
                 {isAuthenticated ? (
                   <button 
                     onClick={handleLogout}
                     className="w-full py-6 bg-gdsc-red text-white font-black rounded-3xl flex items-center justify-center gap-4 shadow-xl shadow-gdsc-red/20 uppercase tracking-widest text-[10px]"
                   >
                     Terminate Hub Session <LogOut size={20} />
                   </button>
                 ) : (
                   <Link 
                     href="/#contact"
                     onClick={() => setIsMobileMenuOpen(false)}
                     className="w-full py-6 bg-slate-900 text-white font-black rounded-3xl flex items-center justify-center gap-4 shadow-2xl shadow-slate-900/20 uppercase tracking-widest text-[10px]"
                   >
                     Launch Build <Rocket size={20} />
                   </Link>
                 )}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
