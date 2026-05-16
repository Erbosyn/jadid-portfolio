"use client";

import { useI18n } from "@/context/I18nContext";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";

interface Work {
  id: string;
  title: string;
  description: string;
  type: "video" | "image";
  url: string;
  createdAt: number;
}

export default function Portfolio() {
  const { t } = useI18n();
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const q = query(collection(db, "works"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedWorks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Work[];
        setWorks(fetchedWorks);
      } catch (error) {
        console.error("Error fetching works: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  if (!loading && works.length === 0) {
    return null;
  }

  return (
    <section id="portfolio" className="py-24 relative">
      {/* Background Effect */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#00d2ff]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
            {t.portfolio.title}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#00d2ff] to-[#8a2be2] mx-auto rounded-full" />
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-[#00d2ff]/30 border-t-[#00d2ff] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work, idx) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden">
                  {work.type === "video" ? (
                    <video
                      src={work.url}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      muted
                      loop
                      playsInline
                      onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                      onMouseOut={(e) => (e.target as HTMLVideoElement).pause()}
                    />
                  ) : (
                    <img
                      src={work.url}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{work.title}</h3>
                      <p className="text-sm text-gray-300">{work.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
