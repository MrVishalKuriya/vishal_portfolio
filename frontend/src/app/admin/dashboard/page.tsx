"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToast } from "@/store/slices/toastSlice";
import { 
  Plus, Trash2, LogOut, LayoutGrid, FilePlus, RefreshCcw, ChevronRight, 
  Activity, ShieldCheck, Database, Layers, MessageSquare, Sparkles, 
  MonitorUp, Menu, X, Search, Filter, BarChart3, Clock, Bell, User, 
  CheckCircle2, AlertCircle, Terminal, Globe, Cpu, ArrowUpRight, Home,
  Loader2
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import api from "@/services/api";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'architectures' | 'inquiries' | 'history'>('overview');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: "",
    tags: "",
    githubUrl: "",
    demoUrl: ""
  });

  const [formErrors, setFormErrors] = useState<any>({});

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin");
    } else {
      fetchData();
    }
  }, [isAuthenticated, router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projRes, inqRes] = await Promise.all([
        api.get('/projects'),
        api.get('/contact')
      ]);
      setProjects(projRes.data.data);
      setInquiries(inqRes.data.data);
    } catch (err) {
      dispatch(addToast({ type: 'error', message: 'Data Hub Sync Collision detected' }));
    } finally {
      setLoading(false);
    }
  };

  const handleResolveInquiry = async (id: string) => {
    try {
      await api.patch(`/contact/${id}`, { status: 'read' });
      dispatch(addToast({ type: 'success', message: 'Inquiry Packet Audited' }));
      fetchData();
    } catch (err) {
      dispatch(addToast({ type: 'error', message: 'Inquiry Resolve Failure' }));
    }
  };

  const validateForm = () => {
    const errors: any = {};
    if (!newProject.title) errors.title = "Title Manifest required";
    if (!newProject.description) errors.description = "Process logic required";
    if (!newProject.image) errors.image = "Visual URI manifest required";
    if (!newProject.tags) errors.tags = "System tags required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const projectData = {
        ...newProject,
        tags: newProject.tags.split(",").map(t => t.trim())
      };
      await api.post('/projects', projectData);
      
      dispatch(addToast({ type: 'success', message: 'Architecture Artifact Committed' }));
      setNewProject({ title: "", description: "", image: "", tags: "", githubUrl: "", demoUrl: "" });
      setShowAddForm(false);
      setShowConfetti(true);
      fetchData();
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Handshake Failure: Check Network Manifest';
      dispatch(addToast({ type: 'error', message: errorMsg }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Confirm deletion of this high-fidelity asset?")) {
      try {
        await api.delete(`/projects/${id}`);
        dispatch(addToast({ type: 'success', message: 'Artifact Decommissioned' }));
        fetchData();
      } catch (err) {
        dispatch(addToast({ type: 'error', message: 'Decommission Failure' }));
      }
    }
  };

  const filteredProjects = projects.filter((p:any) => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.tags.some((t:string) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const stats = [
    { label: "Architectures", value: projects.length, icon: <Layers size={18} />, color: "text-gdsc-blue", bg: "bg-gdsc-blue/10" },
    { label: "New Packets", value: inquiries.filter((i:any) => i.status === 'new').length, icon: <MessageSquare size={18} />, color: "text-gdsc-red", bg: "bg-gdsc-red/10" },
    { label: "API Health", value: "99.9%", icon: <Activity size={18} />, color: "text-gdsc-green", bg: "bg-gdsc-green/10" },
    { label: "Uptime", value: "Operational", icon: <Cpu size={18} />, color: "text-gdsc-yellow", bg: "bg-gdsc-yellow/10" }
  ];

  if (loading && projects.length === 0) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white relative">
       <div className="absolute inset-0 bg-gdsc-blue/5 blur-[200px]" />
       <RefreshCcw className="animate-spin text-gdsc-blue mb-8" size={64} />
       <span className="font-display font-black tracking-[1em] uppercase text-xs animate-pulse">Syncing Enterprise Hub...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden selection:bg-gdsc-blue selection:text-white font-sans">
      
      {/* 🎉 SUCCESS CELEBRATION MANIFEST */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] pointer-events-none">
             {[...Array(50)].map((_, i) => (
               <motion.div
                 key={i}
                 initial={{ y: -100, x: Math.random() * 2000, opacity: 1 }}
                 animate={{ y: 2000, rotate: 360 }}
                 transition={{ duration: Math.random() * 3 + 2, ease: "linear" }}
                 className={`absolute w-3 h-3 rounded-full ${['bg-gdsc-blue', 'bg-gdsc-red', 'bg-gdsc-yellow'][i % 3]}`}
               />
             ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🛡️ ELITE OBSIDIAN SIDEBAR */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 88 }}
        className="h-screen bg-black/60 backdrop-blur-[40px] border-r border-white/5 flex flex-col relative z-50 transition-all duration-500 ease-in-out"
      >
        <div className="p-8 flex items-center justify-between">
           <AnimatePresence mode="wait">
             {isSidebarOpen ? (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-[1rem] bg-gradient-to-br from-gdsc-blue to-gdsc-red flex items-center justify-center font-black shadow-lg shadow-gdsc-blue/20">V</div>
                   <div className="flex flex-col">
                      <span className="text-xs font-display font-black tracking-tight uppercase leading-none">SENTINEL</span>
                      <span className="text-[7px] font-black text-white/30 tracking-[0.4em] uppercase mt-1">Industrial ERP</span>
                   </div>
                </motion.div>
             ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-10 h-10 rounded-[1rem] bg-gradient-to-br from-gdsc-blue to-gdsc-red mx-auto flex items-center justify-center font-black shadow-lg">V</motion.div>
             )}
           </AnimatePresence>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-8">
           {[
             { id: 'overview', name: 'Overview', icon: <LayoutGrid size={20} /> },
             { id: 'architectures', name: 'Architectures', icon: <Layers size={20} /> },
             { id: 'inquiries', name: 'Inquiry Terminal', icon: <MessageSquare size={20} />, badge: inquiries.filter((i:any) => i.status === 'new').length },
             { id: 'history', name: 'Identity History', icon: <Clock size={20} /> }
           ].map((item) => (
             <button
               key={item.id}
               onClick={() => setActiveTab(item.id as any)}
               aria-label={`Navigate to ${item.name}`}
               className={`w-full flex items-center gap-5 p-5 rounded-[1.2rem] transition-all relative group ${activeTab === item.id ? 'bg-white/5 text-white shadow-xl' : 'text-white/30 hover:text-white hover:bg-white/[0.03]'}`}
             >
               <div className={`${activeTab === item.id ? 'text-gdsc-blue' : 'text-inherit'} transition-colors`}>
                  {item.icon}
               </div>
               {isSidebarOpen && <span className="text-[9px] font-black uppercase tracking-widest">{item.name}</span>}
               {item.badge && item.badge > 0 && isSidebarOpen && (
                 <span className="ml-auto bg-gdsc-red text-white text-[7px] px-2 py-0.5 rounded-full font-black animate-pulse shadow-lg shadow-gdsc-red/30 border border-white/10">{item.badge}</span>
               )}
               {activeTab === item.id && <motion.div layoutId="nav-glow" className="absolute left-0 w-1 h-6 bg-gdsc-blue rounded-r-full" />}
             </button>
           ))}
        </nav>

        <div className="p-4 space-y-2 mb-8 border-t border-white/5 pt-8">
           <button 
             onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
             title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
             aria-label={isSidebarOpen ? "Collapse Layout" : "Expand Layout"}
             className="w-full flex items-center justify-center p-4 text-white/20 hover:text-white transition-colors bg-white/[0.02] rounded-2xl hover:bg-white/[0.05]"
           >
              {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
           </button>
           <button onClick={() => window.open('/', '_blank')} className="w-full flex items-center gap-5 p-5 rounded-[1.2rem] text-white/20 hover:text-white transition-colors">
              <LogOut className="rotate-180" size={20} />
              {isSidebarOpen && <span className="text-[9px] font-black uppercase tracking-widest">Public Hub</span>}
           </button>
           <button onClick={logout} className="w-full flex items-center gap-5 p-5 rounded-[1.2rem] text-gdsc-red/40 hover:text-gdsc-red hover:bg-gdsc-red/10 transition-all">
              <LogOut size={20} />
              {isSidebarOpen && <span className="text-[9px] font-black uppercase tracking-widest">Terminate Sync</span>}
           </button>
        </div>
      </motion.aside>

      {/* 🚀 INDUSTRIAL COMMAND Hub */}
      <main className="flex-1 h-screen overflow-y-auto relative no-scrollbar bg-[#050505] flex flex-col font-sans">
        
        {/* 🎩 STICKY TOP-BAR SENTINEL */}
        <header className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 p-6 lg:px-12 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">
                 <Home size={10} /> / <span className="text-white">Admin</span> / <span className="text-gdsc-blue">{activeTab}</span>
              </div>
           </div>
           
           <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6">
                 <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-gdsc-green animate-pulse" />
                    <span className="text-[8px] font-black text-white/40 uppercase tracking-widest underline decoration-gdsc-green/30">System Operational</span>
                 </div>
                 <div className="w-px h-6 bg-white/10" />
                 <div className="flex items-center gap-3">
                    <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">STABLE SYNC</span>
                    <BarChart3 className="text-gdsc-blue" size={14} />
                 </div>
              </div>
              
              <div className="flex items-center gap-4 pl-6 border-l border-white/10">
                 <div className="relative group cursor-pointer" onClick={() => setActiveTab('inquiries')}>
                    <Bell className="text-white/20 group-hover:text-white transition-colors" size={18} />
                    {inquiries.filter((i:any) => i.status === 'new').length > 0 && (
                       <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gdsc-red rounded-full border-2 border-black animate-pulse" />
                    )}
                 </div>
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gdsc-blue to-gdsc-red p-[1.5px]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                       <User size={18} className="text-gdsc-blue" />
                    </div>
                 </div>
              </div>
           </div>
        </header>

        {/* Dynamic Atmospheric Blobs */}
        <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-gdsc-blue/[0.03] blur-[200px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gdsc-red/[0.03] blur-[150px] pointer-events-none" />

        <div className="p-10 lg:p-20 relative z-10 space-y-20">
          
          {/* Header Manifest */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
             <div className="space-y-6">
                <div className="flex items-center gap-3 bg-white/[0.03] w-fit px-5 py-2 rounded-full border border-white/10 uppercase tracking-[0.4em] text-[8px] font-black text-gdsc-blue">
                   <ShieldCheck size={12} /> Verified Identity Manifest
                </div>
                <h1 className="text-6xl md:text-8xl font-display font-black tracking-[-0.04em] leading-[0.85]">
                   Industrial <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gdsc-blue via-gdsc-red to-gdsc-yellow drop-shadow-2xl">Command.</span>
                </h1>
                <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">Operational Phase 13: Functional Mastery</p>
             </div>

             <div className="flex items-center gap-4">
                <div className="relative group">
                   <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gdsc-blue transition-colors" size={14} />
                   <input 
                     type="text" 
                     placeholder="QUERY HUB..." 
                     className="bg-white/[0.02] border border-white/5 rounded-[1.5rem] py-5 pl-14 pr-8 text-[9px] font-black uppercase tracking-[0.2em] outline-none focus:border-gdsc-blue/40 w-64 lg:w-96 transition-all shadow-inner"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                   />
                </div>
                <button 
                  onClick={() => setShowAddForm(true)} 
                  title="Add Architecture"
                  className="p-5 bg-white text-black rounded-[1.5rem] hover:bg-gdsc-blue hover:text-white hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10 group"
                >
                   <Plus size={24} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>
             </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }} className="space-y-20">
                 {/* Sentinel Stat Hub */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {stats.map((stat, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/[0.01] border border-white/5 p-12 rounded-[4rem] hover:bg-white/[0.04] transition-all relative group overflow-hidden shadow-2xl border-b-4"
                        style={{ borderBottomColor: `var(--gdsc-${stat.label === 'New Packets' ? 'red' : stat.label === 'API Health' ? 'green' : stat.label === 'Uptime' ? 'yellow' : 'blue'})` }}
                      >
                         <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} w-fit mb-8`}>{stat.icon}</div>
                         <h3 className="text-5xl font-display font-black leading-none mb-3 tracking-tighter">{stat.value}</h3>
                         <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">{stat.label}</p>
                         <div className="absolute -top-4 -right-4 text-white/[0.02] font-black text-7xl select-none">0{i+1}</div>
                      </motion.div>
                    ))}
                 </div>

                 {/* Identity Hub */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="md:col-span-2 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 p-16 rounded-[5rem] relative overflow-hidden group">
                       <div className="absolute bottom-[-10%] right-[-5%] p-10 rotate-[-15deg] opacity-5">
                          <BarChart3 size={300} />
                       </div>
                       <div className="space-y-12 relative z-10">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-gdsc-blue">Operator Synchronization Log</h4>
                          <div className="flex items-center gap-12">
                             <div className="w-28 h-28 rounded-[3rem] bg-gradient-to-br from-gdsc-blue/20 to-gdsc-red/20 relative group overflow-hidden border-2 border-white/10 shadow-3xl">
                                <User className="absolute inset-0 m-auto text-gdsc-blue" size={48} />
                                <div className="absolute inset-0 bg-gdsc-blue/10 animate-pulse" />
                             </div>
                             <div className="space-y-3">
                                <h3 className="text-5xl font-display font-black tracking-[-0.03em]">{user?.name || "Vishal Pravinbhai"}</h3>
                                <div className="flex items-center gap-4">
                                   <div className="px-4 py-1.5 bg-gdsc-green/10 text-gdsc-green rounded-full text-[9px] font-black uppercase tracking-widest border border-gdsc-green/20">Verified Architect Hub</div>
                                   <div className="w-1.5 h-1.5 rounded-full bg-gdsc-green animate-pulse" />
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                    <div className="bg-white/[0.015] border border-white/5 p-16 rounded-[4.5rem] flex flex-col justify-between group hover:border-gdsc-blue/20 transition-all shadow-2xl">
                       <div className="space-y-6">
                          <div className="w-16 h-16 bg-gdsc-yellow/10 rounded-3xl flex items-center justify-center text-gdsc-yellow mb-8"><Terminal size={32} /></div>
                          <h4 className="text-2xl font-display font-black tracking-tight">Rapid Commit.</h4>
                          <p className="text-white/30 text-[11px] font-body font-light leading-relaxed pr-6">Instantly register high-fidelity architectural assets to the public manifest hub.</p>
                       </div>
                       <button onClick={() => setShowAddForm(true)} className="w-full py-7 bg-white text-black font-black rounded-[2.5rem] text-[10px] uppercase tracking-[0.2em] transform hover:scale-[1.03] active:scale-95 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.05)]">Register Asset</button>
                    </div>
                 </div>
              </motion.div>
            )}

            {activeTab === 'architectures' && (
              <motion.div key="architectures" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-12">
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredProjects.map((project: any) => (
                      <motion.div layout key={project._id} className="bg-white/[0.01] border border-white/5 rounded-[4.5rem] p-16 group hover:scale-[1.02] transition-all relative flex flex-col shadow-2xl">
                         <div className="flex justify-between items-start mb-12">
                            <div className="w-20 h-20 bg-gdsc-blue/10 text-gdsc-blue rounded-[2.5rem] flex items-center justify-center shadow-inner group-hover:rotate-12 transition-all duration-700"><Database size={32} /></div>
                            <button 
                              onClick={() => handleDelete(project._id)} 
                              title="Decommission Asset"
                              className="p-5 bg-gdsc-red/10 text-gdsc-red rounded-[2rem] hover:bg-gdsc-red hover:text-white transition-all shadow-xl shadow-gdsc-red/20"
                            >
                               <Trash2 size={20} />
                            </button>
                         </div>
                         <h4 className="text-4xl font-display font-black tracking-tight mb-6">{project.title}</h4>
                         <p className="text-white/30 text-xs font-body font-light line-clamp-4 mb-10 leading-relaxed italic pr-4">"{project.description}"</p>
                         <div className="flex flex-wrap gap-3 mt-auto">
                            {project.tags?.map((tag: string) => (
                              <span key={tag} className="px-4 py-2 bg-white/5 border border-white/5 rounded-full text-[9px] font-black text-white/20 uppercase tracking-widest group-hover:text-white transition-colors">{tag}</span>
                            ))}
                         </div>
                      </motion.div>
                    ))}
                 </div>
              </motion.div>
            )}

            {activeTab === 'inquiries' && (
              <motion.div key="inquiries" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                 {inquiries.map((inquiry: any) => (
                    <div key={inquiry._id} className={`p-16 bg-white/[0.01] border border-white/5 rounded-[5rem] flex flex-col md:flex-row justify-between items-center gap-16 group hover:bg-white/[0.03] transition-all relative overflow-hidden shadow-2xl ${inquiry.status === 'new' ? 'border-l-[10px] border-l-gdsc-blue' : 'opacity-30'}`}>
                       <div className="space-y-6 text-left relative z-10 flex-1">
                          <div className="flex flex-wrap items-center gap-6">
                             <h4 className="text-3xl font-display font-black text-white tracking-tight">{inquiry.name}</h4>
                             <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] bg-white/5 px-5 py-2 rounded-full border border-white/5">{inquiry.email}</span>
                          </div>
                          <p className="text-white/70 text-2xl font-body font-light leading-[1.6] italic pr-24 tracking-tight">"{inquiry.message}"</p>
                          <div className="flex items-center gap-6 text-[10px] font-black text-white/10 uppercase tracking-[0.4em]">
                             <Clock size={14} className="text-gdsc-blue" /> {new Date(inquiry.createdAt).toLocaleString()}
                          </div>
                       </div>
                       <div className="flex items-center gap-10 relative z-10">
                          {inquiry.status === 'new' ? (
                             <button onClick={() => handleResolveInquiry(inquiry._id)} className="px-14 py-6 bg-gdsc-green text-white font-black rounded-[2rem] text-[10px] uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(72,187,120,0.2)] hover:scale-105 active:scale-95 transition-all flex items-center gap-4">
                                <ShieldCheck size={18} /> Resolve Packet
                             </button>
                          ) : (
                             <div className="flex items-center gap-4 text-gdsc-green/40 text-[10px] font-black uppercase tracking-[0.3em] bg-gdsc-green/5 px-8 py-3 rounded-full border border-gdsc-green/10">
                                <CheckCircle2 size={18} /> Manifest Audited
                             </div>
                          )}
                       </div>
                    </div>
                 ))}
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div key="history" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-10">
                 <div className="bg-white/[0.01] border border-white/5 rounded-[6rem] p-20 space-y-20 shadow-2xl relative overflow-hidden">
                    <h3 className="text-5xl font-display font-black uppercase tracking-tight leading-none mb-4">Operational Architecture Log</h3>
                    <div className="space-y-16 pl-4 border-l-2 border-white/5">
                       {[
                         { action: "High-Fidelity Interaction Fix", time: "JUST NOW", status: "gdsc-blue", desc: "Phase 13: Industrial Loader and Feedback Sentinel officially committed." },
                         { action: "Operational Status Commit", time: "1H AGO", status: "gdsc-green", desc: "Verified handshake protocol for architectural artifacts." }
                       ].map((log, i) => (
                         <div key={i} className="flex gap-12 group relative">
                            <div className={`absolute -left-[2.75rem] top-2 w-5 h-5 rounded-full bg-black border-4 border-white/5 shadow-2xl`}>
                               <div className={`w-full h-full rounded-full bg-${log.status} animate-pulse`} />
                            </div>
                            <div className="space-y-4 flex-1">
                               <div className="flex items-center gap-6">
                                  <span className="text-2xl font-display font-black text-white tracking-tight">{log.action}</span>
                                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">{log.time}</span>
                               </div>
                               <p className="text-sm font-body font-light text-white/40 italic leading-relaxed pr-24">" {log.desc} "</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Modal for Add Artifact: Phase 13 Industrial Sync */}
        <AnimatePresence>
          {showAddForm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:p-12 bg-black/90 backdrop-blur-3xl">
              <motion.div 
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.9 }}
                className="bg-[#080808] w-full max-w-6xl rounded-[7rem] border border-white/10 shadow-[0_0_150px_rgba(66,133,244,0.15)] overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-gdsc-blue via-gdsc-red to-gdsc-yellow" />
                <div className="p-16 lg:p-24 space-y-20">
                   <div className="flex justify-between items-start">
                       <div className="flex items-center gap-10">
                          <div className="w-24 h-24 bg-gradient-to-br from-gdsc-blue/20 to-transparent rounded-[3rem] flex items-center justify-center text-gdsc-blue border border-white/10 shadow-3xl"><FilePlus size={40} /></div>
                          <div className="space-y-2">
                             <h2 className="text-6xl font-display font-black tracking-tight leading-none uppercase">Register Artifact.</h2>
                             <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">Phase 13: Industrial Data Handshake</p>
                          </div>
                       </div>
                       <button onClick={() => setShowAddForm(false)} className="group p-6 bg-white/5 rounded-full text-white/20 hover:text-gdsc-red hover:bg-gdsc-red/10 transition-all border border-white/5">
                          <X size={32} className="group-hover:rotate-180 transition-transform duration-700" />
                       </button>
                   </div>

                   <form onSubmit={handleAddProject} className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                      <div className="space-y-12">
                         <div className="space-y-5">
                            <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] px-10">Architecture Designation</label>
                            <div className="relative group">
                               <input 
                                  className={`w-full bg-black/50 border-2 ${formErrors.title ? 'border-gdsc-red/30' : 'border-white/5'} p-10 rounded-[3rem] outline-none focus:border-gdsc-blue focus:shadow-[0_0_20px_rgba(66,133,244,0.15)] transition-all font-display text-2xl tracking-tight shadow-inner`} 
                                  placeholder="e.g. Industrial Search Portal..." 
                                  value={newProject.title} 
                                  onChange={e => {setNewProject({...newProject, title: e.target.value}); setFormErrors({...formErrors, title: null})}} 
                                />
                                <div className="absolute right-8 top-1/2 -translate-y-1/2 text-white/5 group-focus-within:text-gdsc-blue/20 transition-colors"><ShieldCheck size={24} /></div>
                            </div>
                            {formErrors.title && <div className="flex items-center gap-3 px-10 text-[9px] font-black text-gdsc-red uppercase tracking-widest animate-bounce"><AlertCircle size={12} /> {formErrors.title}</div>}
                         </div>
                         <div className="space-y-5">
                            <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] px-10">Process Documentation Hub</label>
                            <textarea 
                               className={`w-full bg-black/50 border-2 ${formErrors.description ? 'border-gdsc-red/30' : 'border-white/5'} p-10 rounded-[3rem] outline-none focus:border-gdsc-blue focus:shadow-[0_0_20px_rgba(66,133,244,0.15)] transition-all font-body font-light text-xl min-h-[220px] leading-relaxed shadow-inner italic`} 
                               placeholder="Architecture logic..." 
                               value={newProject.description} 
                               onChange={e => {setNewProject({...newProject, description: e.target.value}); setFormErrors({...formErrors, description: null})}} 
                            />
                            {formErrors.description && <div className="flex items-center gap-3 px-10 text-[9px] font-black text-gdsc-red uppercase tracking-widest animate-bounce"><AlertCircle size={12} /> {formErrors.description}</div>}
                         </div>
                      </div>
                      <div className="space-y-12 flex flex-col">
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                            <div className="space-y-5">
                               <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] px-8">Visual Artifact URI</label>
                               <input className="w-full bg-black/50 border-2 border-white/5 p-10 rounded-[2.5rem] outline-none focus:border-gdsc-blue transition-all" placeholder="https://..." value={newProject.image} onChange={e => setNewProject({...newProject, image: e.target.value})} />
                            </div>
                            <div className="space-y-5">
                               <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] px-8">System Tags manifest</label>
                               <input className="w-full bg-black/50 border-2 border-white/5 p-10 rounded-[2.5rem] outline-none focus:border-gdsc-blue transition-all" placeholder="MERN, AI..." value={newProject.tags} onChange={e => setNewProject({...newProject, tags: e.target.value})} />
                            </div>
                         </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                            <div className="space-y-5">
                               <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] px-8">Network Repository Hub</label>
                               <input className="w-full bg-black/50 border-2 border-white/5 p-10 rounded-[2.5rem] outline-none focus:border-gdsc-blue transition-all" placeholder="GitHub Repository..." value={newProject.githubUrl} onChange={e => setNewProject({...newProject, githubUrl: e.target.value})} />
                            </div>
                            <div className="space-y-5">
                               <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] px-8">Deployment Terminal Node</label>
                               <input className="w-full bg-black/50 border-2 border-white/5 p-10 rounded-[2.5rem] outline-none focus:border-gdsc-blue transition-all" placeholder="Live Demo URI..." value={newProject.demoUrl} onChange={e => setNewProject({...newProject, demoUrl: e.target.value})} />
                            </div>
                         </div>
                         <button 
                            disabled={isSubmitting}
                            className={`mt-auto py-10 rounded-[4rem] text-[11px] uppercase tracking-[0.4em] shadow-[0_40px_80px_rgba(255,255,255,0.1)] transition-all flex items-center justify-center gap-6 ${isSubmitting ? 'bg-white/20 text-white/40 cursor-not-allowed' : 'bg-white text-black hover:bg-gdsc-blue hover:text-white transform hover:scale-[1.03] active:scale-95'}`}
                         >
                            {isSubmitting ? (
                               <>Syncing Architecture... <Loader2 className="animate-spin" size={24} /></>
                            ) : (
                               <>Commit Architectural Sync <ArrowUpRight size={24} /></>
                            )}
                         </button>
                      </div>
                   </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </main>

    </div>
  );
}
