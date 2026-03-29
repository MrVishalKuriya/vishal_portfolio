"use client";

import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Code2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    title: "EcoLink Enterprise",
    description: "A high-fidelity environmental management platform built with the MERN stack and real-time data auditing.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
    tags: ["React", "Express", "MongoDB", "Tailwind"],
    github: "#",
    live: "#"
  },
  {
    title: "V-Commerce Hub",
    description: "Premium industrial e-commerce architecture with integrated authentication and secure checkout protocols.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2089",
    tags: ["Next.js", "Redux", "Node.js", "JWT"],
    github: "#",
    live: "#"
  },
  {
    title: "AuditMaster Pro",
    description: "Internal system monitoring dashboard featuring Winston logging and Zod-validated identity manifests.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
    tags: ["TypeScript", "Mongoose", "Winston", "Zod"],
    github: "#",
    live: "#"
  }
];

export default function FeaturedProjects() {
  return (
    <section id="work" className="py-32 bg-[#fafafa] relative overflow-hidden selection:bg-gdsc-blue selection:text-white">
      <div className="container-wide px-6 sm:px-12 lg:px-24 space-y-20 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="space-y-6">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-display font-black text-slate-900 tracking-tighter"
            >
              Featured <span className="text-gdsc-blue">Architectures.</span>
            </motion.h2>
            <p className="text-slate-500 font-body font-light text-lg max-w-xl">
              A curated selection of high-fidelity MERN deployments and industrial system architectures.
            </p>
          </div>
          <Link href="#" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gdsc-blue hover:gap-4 transition-all">
            View All Builds <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card group flex flex-col hover:shadow-2xl hover:shadow-gdsc-blue/5 transition-all"
            >
              <div className="relative h-64 w-full rounded-[1.5rem] overflow-hidden mb-8 border border-white/40">
                <Image 
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all"></div>
              </div>
              
              <div className="space-y-6 flex-1 flex flex-col">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-display font-black text-slate-900 tracking-tight">{project.title}</h3>
                    <ArrowUpRight className="text-slate-300 group-hover:text-gdsc-blue transition-colors" />
                  </div>
                  <p className="text-slate-500 font-body font-light text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white border border-slate-100 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-6 mt-auto">
                  <Link href={project.github} className="p-3 bg-slate-900 text-white rounded-xl hover:scale-110 transition-all">
                    <Github size={18} />
                  </Link>
                  <Link href={project.live} className="p-3 bg-white border border-slate-200 text-slate-900 rounded-xl hover:scale-110 transition-all shadow-sm">
                    <ExternalLink size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
