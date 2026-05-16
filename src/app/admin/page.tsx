"use client";

import { useI18n } from "@/context/I18nContext";
import { useState, useEffect } from "react";
import { auth, db, storage } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { collection, addDoc, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { Trash2, Upload, LogOut } from "lucide-react";
import Link from "next/link";

const ADMIN_EMAIL = "erbo.myrzaliev@gmail.com";

interface Work {
  id: string;
  title: string;
  description: string;
  type: "video" | "image";
  url: string;
}

export default function AdminPage() {
  const { t } = useI18n();
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  const [works, setWorks] = useState<Work[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
      if (currentUser?.email === ADMIN_EMAIL) {
        fetchWorks();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchWorks = async () => {
    const q = query(collection(db, "works"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    setWorks(snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as Work[]);
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !description) return;

    setUploading(true);
    const isVideo = file.type.startsWith("video/");
    const storageRef = ref(storage, `works/${Date.now()}_${file.name}`);

    try {
      const snapshot = await uploadBytesResumable(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, "works"), {
        title,
        description,
        type: isVideo ? "video" : "image",
        url,
        storagePath: snapshot.ref.fullPath,
        createdAt: Date.now(),
      });

      setTitle("");
      setDescription("");
      setFile(null);
      fetchWorks();
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, storagePath?: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteDoc(doc(db, "works", id));
      if (storagePath) {
        await deleteObject(ref(storage, storagePath));
      }
      fetchWorks();
    } catch (error) {
      console.error(error);
    }
  };

  if (loadingAuth) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl text-white mb-8 font-bold">{t.admin.title}</h1>
        <button
          onClick={handleLogin}
          className="glass px-6 py-3 rounded-xl text-white hover:bg-white/10 transition-colors"
        >
          {t.admin.login}
        </button>
        <Link href="/" className="mt-6 text-gray-500 hover:text-white transition-colors">
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  if (user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl text-red-500 mb-4">{t.admin.unauthorized}</h1>
        <button onClick={handleLogout} className="glass px-4 py-2 rounded-lg text-white">
          {t.admin.logout}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-bold text-white">{t.admin.title}</h1>
          <div className="flex gap-4">
            <Link href="/" className="glass px-4 py-2 rounded-lg text-gray-300 hover:text-white">
              Home
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors">
              <LogOut size={18} /> {t.admin.logout}
            </button>
          </div>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl mb-12 flex flex-col gap-6">
          <h2 className="text-xl text-white font-semibold">{t.admin.add}</h2>
          
          <input
            type="text"
            placeholder={t.admin.titlePlaceholder}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d2ff]"
            required
          />
          
          <textarea
            placeholder={t.admin.descPlaceholder}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00d2ff] min-h-[100px]"
            required
          />

          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#00d2ff]/10 file:text-[#00d2ff] hover:file:bg-[#00d2ff]/20"
            required
          />

          <button
            type="submit"
            disabled={uploading}
            className="bg-[#00d2ff] text-black font-semibold py-3 rounded-xl hover:bg-[#00d2ff]/90 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {uploading ? (
              <span className="animate-pulse">{t.admin.uploading}</span>
            ) : (
              <>
                <Upload size={20} />
                {t.admin.submit}
              </>
            )}
          </button>
        </form>

        {/* Works List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {works.map((work) => (
            <div key={work.id} className="glass border border-white/10 rounded-xl p-4 flex gap-4">
              <div className="w-24 h-24 bg-black rounded-lg overflow-hidden shrink-0">
                {work.type === "video" ? (
                  <video src={work.url} className="w-full h-full object-cover" />
                ) : (
                  <img src={work.url} alt={work.title} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-white font-semibold">{work.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2">{work.description}</p>
                </div>
                <button
                  onClick={() => handleDelete(work.id, (work as any).storagePath)}
                  className="self-end text-red-500 hover:text-red-400 p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
