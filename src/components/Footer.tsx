"use client";

import { useI18n } from "@/context/I18nContext";
import { MessageCircle, Music, Globe } from "lucide-react";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-white/10 glass mt-auto pt-12 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#00d2ff] to-transparent opacity-50" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tighter mb-2">
              JADID<span className="text-[#00d2ff]">.</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-sm">
              Mobile App Development (iOS/Android), AI Solutions, and Modern Web Sites.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://wa.me/77000957565" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-[#25D366] hover:bg-white/10 transition-colors">
              <MessageCircle size={20} />
            </a>
            <a href="https://www.tiktok.com/@yerbo1syn?_r=1&_t=ZS-96PrOhjI9My" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-[#ff0050] hover:bg-white/10 transition-colors">
              <Music size={20} />
            </a>
            <a href="https://yerbolsyn.vercel.app" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-[#00d2ff] hover:bg-white/10 transition-colors">
              <Globe size={20} />
            </a>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-white/5">
          <p className="text-gray-500 text-sm">
            {t.footer.text}
          </p>
          <a href="tel:+77000957565" className="text-[#00d2ff] hover:underline text-sm mt-2 inline-block">
            +7 (700) 095-75-65
          </a>
        </div>
      </div>
    </footer>
  );
}
