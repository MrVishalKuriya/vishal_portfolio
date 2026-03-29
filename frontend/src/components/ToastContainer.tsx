"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { removeToast } from '../store/slices/toastSlice';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { useEffect } from 'react';

const icons = {
  success: <CheckCircle className="text-gdsc-green" size={20} />,
  error: <XCircle className="text-gdsc-red" size={20} />,
  info: <Info className="text-gdsc-blue" size={20} />,
  warning: <AlertCircle className="text-gdsc-yellow" size={20} />,
};

const toastColors = {
  success: 'border-gdsc-green bg-black/80 shadow-gdsc-green/20',
  error: 'border-gdsc-red bg-black/80 shadow-gdsc-red/20',
  info: 'border-gdsc-blue bg-black/80 shadow-gdsc-blue/20',
  warning: 'border-gdsc-yellow bg-black/80 shadow-gdsc-yellow/20',
};

export default function ToastContainer() {
  const toasts = useSelector((state: RootState) => state.toast.toasts);
  const dispatch = useDispatch();

  return (
    <div className="fixed bottom-10 right-10 z-[100] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={(id) => dispatch(removeToast(id))} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: any; onClose: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(toast.id), 5000);
    return () => clearTimeout(timer);
  }, [onClose, toast.id]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.8 }}
      className={`pointer-events-auto flex items-center gap-4 px-8 py-5 rounded-[2rem] border-2 ${toastColors[toast.type as keyof typeof toastColors]} backdrop-blur-2xl shadow-3xl min-w-[320px] max-w-md`}
    >
      <div className="flex-shrink-0 p-3 bg-white/5 rounded-2xl">{icons[toast.type as keyof typeof icons]}</div>
      <div className="flex-1 space-y-1">
         <p className="text-white text-[10px] font-black uppercase tracking-[0.2em] leading-none">
           {toast.type === 'success' ? 'SYSTEM CONFIRMED' : toast.type === 'error' ? 'HANDSHAKE FAILURE' : 'HUB NOTIFICATION'}
         </p>
         <p className="text-white/40 text-[9px] font-black uppercase tracking-widest leading-normal">
           {toast.message}
         </p>
      </div>
      <button 
        onClick={() => onClose(toast.id)}
        aria-label="Dismiss Manifest"
        title="Dismiss Notification"
        className="text-white/20 hover:text-white transition-colors p-2 bg-white/5 rounded-full"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}
