"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, ChevronRight, Calculator, ShieldCheck, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated, loading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch (err: any) {}
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-950 overflow-hidden relative selection:bg-gdsc-blue selection:text-white">
      
      {/* 🚀 ELITE ATMOSPHERE HUB: Dynamic Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 100, 0], 
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-gdsc-blue/20 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0], 
            y: [0, 120, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-gdsc-red/10 blur-[100px] rounded-full"
        />
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1, 0.8]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] left-[20%] w-[30%] h-[30%] bg-gdsc-yellow/5 blur-[80px] rounded-full"
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative z-10"
      >
        {/* 🛸 HOLOGRAPHIC CARD SYNTHESIS */}
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
          
          {/* Subtle Shine Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

          <div className="space-y-10">
            <motion.div variants={itemVariants} className="text-center space-y-6">
               <div className="relative inline-block group">
                  <div className="absolute -inset-4 bg-gdsc-blue/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-20 h-20 bg-gradient-to-br from-gdsc-blue to-gdsc-blue/80 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-gdsc-blue/30 relative">
                     <Lock className="text-white" size={36} strokeWidth={2.5} />
                  </div>
               </div>
               <div className="space-y-2">
                 <h2 className="text-4xl font-display font-black text-white tracking-tighter leading-none">Console <span className="text-transparent bg-clip-text bg-gradient-to-r from-gdsc-blue to-gdsc-red">Admin.</span></h2>
                 <div className="flex items-center justify-center gap-2">
                    <ShieldCheck size={12} className="text-gdsc-green" />
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">Verified Authorization Gateway</p>
                 </div>
               </div>
            </motion.div>

            <form onSubmit={handleLogin} className="space-y-8">
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] px-3 block text-left">Identity Protocol</label>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gdsc-blue transition-colors" size={20} />
                    <input 
                      type="email"
                      placeholder="vishal@architecture.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950/50 border border-white/10 p-6 pl-16 rounded-[2rem] text-white placeholder-white/10 focus:outline-none focus:ring-4 focus:ring-gdsc-blue/20 focus:border-gdsc-blue/50 transition-all font-body font-light text-left"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] px-3 block text-left">Security Passkey</label>
                  <div className="relative group">
                    <Calculator className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gdsc-blue transition-colors" size={20} />
                    <input 
                      type="password"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-950/50 border border-white/10 p-6 pl-16 rounded-[2rem] text-white placeholder-white/10 focus:outline-none focus:ring-4 focus:ring-gdsc-blue/20 focus:border-gdsc-blue/50 transition-all font-body font-light text-left"
                    />
                  </div>
                </div>
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gdsc-red text-center text-[10px] font-black uppercase tracking-widest bg-gdsc-red/10 py-4 px-6 rounded-2xl border border-gdsc-red/20 shadow-lg italic">
                       Authentication Collision: {error}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={loading}
                className="w-full py-6 bg-white text-slate-900 font-bold rounded-[2rem] hover:shadow-2xl hover:shadow-white/10 transition-all flex items-center justify-center gap-3 shadow-xl group disabled:opacity-50 relative overflow-hidden"
              >
                {/* Shine Animation */}
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-900/10 to-transparent skew-x-12"
                />
                <span className="relative z-10 flex items-center gap-3">
                  {loading ? "Syncing Identity..." : "Verify Authorization"}
                  <Sparkles size={18} className="text-gdsc-blue group-hover:scale-125 transition-transform" />
                </span>
              </motion.button>
            </form>
          </div>
        </div>

        {/* Console Footnote */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-gdsc-green animate-pulse"></span>
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Secure Architecture Uplink Operational</span>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
