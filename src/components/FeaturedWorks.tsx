"use client";

import { useI18n } from "@/context/I18nContext";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Play, Apple, Smartphone, Globe, Music, ChevronDown, ChevronUp, Tag, Video } from "lucide-react";
import { useState } from "react";

export default function FeaturedWorks() {
  const { t } = useI18n();
  const [showPricing, setShowPricing] = useState(false);
  const [showWebPricing, setShowWebPricing] = useState(false);
  const [showVideoPricing, setShowVideoPricing] = useState(false);
  const [showMusicPricing, setShowMusicPricing] = useState(false);

  return (
    <section className="py-12 relative z-10">
      <div className="container mx-auto px-6">
        
        {/* Mobile Apps Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Smartphone className="text-[#00d2ff]" size={28} />
              <h3 className="text-2xl font-bold text-white">{t.portfolio.featuredApps}</h3>
            </div>
            
            <button
              onClick={() => setShowPricing(!showPricing)}
              className="flex items-center justify-center gap-2 bg-[#00d2ff]/10 text-[#00d2ff] hover:bg-[#00d2ff]/20 px-4 py-2 rounded-xl transition-all font-semibold max-w-fit"
            >
              <Tag size={18} />
              {t.pricing.viewPricing}
              {showPricing ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>

          <AnimatePresence>
            {showPricing && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="glass border border-[#00d2ff]/30 p-6 rounded-2xl relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#00d2ff] rounded-l-2xl" />
                  <h4 className="text-xl font-bold text-white mb-2">{t.pricing.mobileTitle}</h4>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    {t.pricing.mobileDesc}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Arystap */}
            <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Arystap</h4>
                <p className="text-gray-400 text-sm">Cross-platform mobile application.</p>
              </div>
              <div className="flex flex-wrap gap-3 mt-auto">
                <a
                  href="https://apps.apple.com/kz/app/arystap/id6764302073"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg text-white text-sm"
                >
                  <Apple size={16} /> App Store
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=kz.erbom.arystap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#00d2ff]/10 hover:bg-[#00d2ff]/20 text-[#00d2ff] transition-colors px-4 py-2 rounded-lg text-sm"
                >
                  <Play size={16} /> Google Play
                </a>
              </div>
            </div>

            {/* Qoramsap */}
            <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Qoramsap</h4>
                <p className="text-gray-400 text-sm">Android mobile application.</p>
              </div>
              <div className="flex flex-wrap gap-3 mt-auto">
                <a
                  href="https://play.google.com/store/apps/details?id=kz.qoramsap.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#00d2ff]/10 hover:bg-[#00d2ff]/20 text-[#00d2ff] transition-colors px-4 py-2 rounded-lg text-sm"
                >
                  <Play size={16} /> Google Play
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Websites Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Globe className="text-[#8a2be2]" size={28} />
              <h3 className="text-2xl font-bold text-white">{t.portfolio.featuredWeb}</h3>
            </div>
            
            <button
              onClick={() => setShowWebPricing(!showWebPricing)}
              className="flex items-center justify-center gap-2 bg-[#8a2be2]/10 text-[#8a2be2] hover:bg-[#8a2be2]/20 px-4 py-2 rounded-xl transition-all font-semibold max-w-fit"
            >
              <Tag size={18} />
              {t.pricing.viewPricing}
              {showWebPricing ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>

          <AnimatePresence>
            {showWebPricing && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="glass border border-[#8a2be2]/30 p-6 rounded-2xl relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#8a2be2] rounded-l-2xl" />
                  <h4 className="text-xl font-bold text-white mb-2">{t.pricing.webTitle}</h4>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    {t.pricing.webDesc}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Abaaqtilek", url: "https://abaaqtilek.netlify.app" },
              { name: "Yerbolsyn Portfolio", url: "https://yerbolsyn.vercel.app" },
              { name: "Erbo Platform", url: "https://erbo.vercel.app" }
            ].map((site) => (
              <a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-6 rounded-2xl hover:bg-white/10 transition-colors group"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-bold text-white group-hover:text-[#8a2be2] transition-colors">{site.name}</h4>
                  <ExternalLink size={18} className="text-gray-500 group-hover:text-[#8a2be2] transition-colors" />
                </div>
                <p className="text-sm text-gray-400 mt-2">{t.portfolio.visitSite}</p>
              </a>
            ))}
          </div>
        </motion.div>

        {/* AI Video Section (TikTok) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Video className="text-[#ff0050]" size={28} />
              <h3 className="text-2xl font-bold text-white">{t.portfolio.featuredVideo}</h3>
            </div>
            
            <button
              onClick={() => setShowVideoPricing(!showVideoPricing)}
              className="flex items-center justify-center gap-2 bg-[#ff0050]/10 text-[#ff0050] hover:bg-[#ff0050]/20 px-4 py-2 rounded-xl transition-all font-semibold max-w-fit"
            >
              <Tag size={18} />
              {t.pricing.viewPricing}
              {showVideoPricing ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>

          <AnimatePresence>
            {showVideoPricing && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="glass border border-[#ff0050]/30 p-6 rounded-2xl relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#ff0050] rounded-l-2xl" />
                  <h4 className="text-xl font-bold text-white mb-2">{t.pricing.videoTitle}</h4>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    {t.pricing.videoDesc}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href="https://www.tiktok.com/@yerbo1syn?_r=1&_t=ZS-96PrOhjI9My"
            target="_blank"
            rel="noopener noreferrer"
            className="block glass-card p-6 rounded-2xl hover:bg-white/5 transition-colors border border-[#ff0050]/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#ff0050] to-[#00f2fe] flex items-center justify-center text-white font-bold text-xl shrink-0">
                TikTok
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">@yerbo1syn</h4>
                <p className="text-gray-400 text-sm">AI Videos & Promos • Follow on TikTok</p>
              </div>
              <ExternalLink size={20} className="text-gray-500 ml-auto shrink-0" />
            </div>
          </a>
        </motion.div>

        {/* AI Music Section (YouTube) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Music className="text-[#FF0000]" size={28} />
              <h3 className="text-2xl font-bold text-white">{t.portfolio.featuredMusic}</h3>
            </div>
            
            <button
              onClick={() => setShowMusicPricing(!showMusicPricing)}
              className="flex items-center justify-center gap-2 bg-[#FF0000]/10 text-[#FF0000] hover:bg-[#FF0000]/20 px-4 py-2 rounded-xl transition-all font-semibold max-w-fit"
            >
              <Tag size={18} />
              {t.pricing.viewPricing}
              {showMusicPricing ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>

          <AnimatePresence>
            {showMusicPricing && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="glass border border-[#FF0000]/30 p-6 rounded-2xl relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#FF0000] rounded-l-2xl" />
                  <h4 className="text-xl font-bold text-white mb-2">{t.pricing.musicTitle}</h4>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    {t.pricing.musicDesc}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href="https://youtube.com/@dalaamirshisi?si=Ma2VzzqbL4AB9Z0h"
            target="_blank"
            rel="noopener noreferrer"
            className="block glass-card p-6 rounded-2xl hover:bg-white/5 transition-colors border border-[#FF0000]/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF0000] to-[#ff4b2b] flex items-center justify-center text-white font-bold text-xl shrink-0">
                YT
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">@dalaamirshisi</h4>
                <p className="text-gray-400 text-sm">AI Music & Soundtracks • Subscribe on YouTube</p>
              </div>
              <ExternalLink size={20} className="text-gray-500 ml-auto shrink-0" />
            </div>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
