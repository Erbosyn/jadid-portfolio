"use client";

import { useI18n } from "@/context/I18nContext";
import { motion } from "framer-motion";
import { Smartphone, Monitor, Video, Music, ExternalLink } from "lucide-react";

export default function Services() {
  const { t } = useI18n();

  const services = [
    {
      id: "mobile",
      icon: <Smartphone className="text-[#00d2ff]" size={32} />,
      title: t.services.mobile.title,
      desc: t.services.mobile.desc,
      href: "https://play.google.com/store/apps/details?id=kz.qoramsap.app",
    },
    {
      id: "web",
      icon: <Monitor className="text-[#8a2be2]" size={32} />,
      title: t.services.web.title,
      desc: t.services.web.desc,
      href: "https://abaaqtilek.netlify.app",
    },
    {
      id: "video",
      icon: <Video className="text-[#00d2ff]" size={32} />,
      title: t.services.video.title,
      desc: t.services.video.desc,
      href: "https://www.tiktok.com/@yerbo1syn?_r=1&_t=ZS-96PrOhjI9My",
    },
    {
      id: "audio",
      icon: <Music className="text-[#8a2be2]" size={32} />,
      title: t.services.audio.title,
      desc: t.services.audio.desc,
      href: "https://youtube.com/@dalaamirshisi?si=Ma2VzzqbL4AB9Z0h",
    },
  ];

  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
            {t.services.title}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#00d2ff] to-[#8a2be2] mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.a
              key={service.id}
              href={service.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card p-8 rounded-2xl flex flex-col items-start gap-4 group cursor-pointer block"
            >
              <div className="w-full flex justify-between items-start">
                <div className="p-4 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                  {service.icon}
                </div>
                <ExternalLink size={20} className="text-gray-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-white">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                {service.desc}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
