"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [adminData, setAdminData] = useState([]);
  const [user, setUser] = useState(null);

  // Auth & Admin Logic
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchAdmins = async () => {
      const querySnapshot = await getDocs(collection(db, "admin_users"));
      setAdminData(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      );
    };
    fetchAdmins();
  }, []);

  const isAdmin = useMemo(() => {
    if (!user) return false;
    return adminData.some((item) => item.email === user.email);
  }, [adminData, user]);

  const handleLogout = async () => {
    await signOut(auth);
    setOpen(false); // Close menu on logout
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* 1. FIXED MARQUEE SECTION */}
      <style jsx global>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: inline-flex;
          animation: scroll-left 30s linear infinite;
        }
      `}</style>

      <div className="bg-[#581C1E] w-full whitespace-nowrap overflow-hidden flex items-center h-10 border-b border-white/10">
        <div className="animate-marquee">
          {[1, 2].map((i) => (
            <span
              key={i}
              className="px-4 md:px-8 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-white flex items-center"
            >
              Perfect Fit Since 1999 ● India's Premier Ladies Custom Tailor ●
              Quality Stitched Heritage ● Luxury Bespoke ●&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="w-full bg-blue-950 border-b border-stone-100">
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex  justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="font-outfit text-xl md:text-2xl font-black tracking-tighter text-rose-100 uppercase">
                <Link href="/">
                  Yogeshwar<span className="text-red-800">.</span>
                </Link>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8 text-xs font-bold tracking-[0.1em]">
              <Link
                href="/"
                className="text-rose-50 hover:text-red-400 transition-colors uppercase"
              >
                Home
              </Link>
              <Link
                href="/whyus"
                className="text-rose-50 hover:text-red-400 transition-colors uppercase"
              >
                Why Us
              </Link>
              <Link
                href="/outfit"
                className="text-rose-50 hover:text-red-400 transition-colors uppercase"
              >
                Outfits
              </Link>

              {/* COMMENTS DROPDOWN */}
              <div className="relative group cursor-pointer">
                <button className="text-rose-50 flex items-center gap-1 hover:text-red-400 uppercase tracking-widest outline-none">
                  Comments{" "}
                  <span className="material-symbols-outlined text-sm">
                    expand_more
                  </span>
                </button>
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-52 bg-white shadow-xl rounded-2xl p-2 border border-stone-100">
                    <Link
                      href="/comments/HomedisplayComments"
                      className="block px-4 py-2 text-xs hover:text-rose-50 hover:bg-red-800 font-bold text-red-800 tracking-widest rounded-xl transition"
                    >
                      Customer Reviews
                    </Link>
                    <Link
                      href="/comments/add"
                      className="block px-4 py-2 text-xs hover:text-rose-50 hover:bg-red-800 font-bold text-red-800 tracking-widest rounded-xl transition"
                    >
                      Post Comment
                    </Link>

                    <Link
                      href="/comments/UserUploadedComments"
                      className="block px-4 py-2 text-xs hover:text-rose-50 hover:bg-red-800 font-bold text-red-800 tracking-widest rounded-xl transition"
                    >
                      Manage My Comments
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin/Managecomments"
                        className="block px-4 py-2 text-xs hover:bg-black hover:text-white font-bold text-black tracking-widest rounded-xl transition border-t mt-1"
                      >
                        Admin: Review All
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Account Dropdown */}
              <div className="relative group cursor-pointer">
                <button className="text-rose-50 flex items-center gap-1 hover:text-red-400 uppercase tracking-widest outline-none">
                  Account{" "}
                  <span className="material-symbols-outlined text-sm">
                    expand_more
                  </span>
                </button>
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-52 bg-white shadow-xl rounded-2xl p-2 border border-stone-100">
                    {!user ? (
                      <>
                        <Link
                          href="/signup"
                          className="block px-4 py-2 text-xs hover:text-rose-50 hover:bg-red-800 font-bold text-red-800 tracking-widest rounded-xl transition"
                        >
                          Signup
                        </Link>

                        <Link
                          href="/login"
                          className="block px-4 py-2 text-xs hover:text-rose-50 hover:bg-red-800 font-bold text-red-800 tracking-widest rounded-xl transition"
                        >
                          Login
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/edit-profile"
                          className="block px-4 py-2 text-xs hover:text-rose-50 hover:bg-red-800 font-bold text-red-800 tracking-widest rounded-xl transition"
                        >
                          Edit Profile
                        </Link>
                        {isAdmin && (
                          <Link
                            href="/admin/ManageCustomernameUI"
                            className="block px-4 py-2 text-xs hover:text-rose-50 hover:bg-red-800 font-bold text-red-800 tracking-widest rounded-xl transition"
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left block px-4 py-2 text-xs hover:text-rose-50 hover:bg-red-800 font-bold text-red-800 tracking-widest rounded-xl transition"
                        >
                          Logout
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <Link
                href="/contact"
                className="bg-rose-50 text-blue-950 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-800 hover:text-white transition-all shadow-lg active:scale-95"
              >
                Book Visit
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 text-rose-100 focus:outline-none"
            >
              <span className="material-symbols-outlined text-3xl">
                {open ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Content - Scrollable & Compact */}
        {open && (
          <div className="lg:hidden fixed inset-x-0 top-[104px] bottom-0 bg-blue-950 z-50 overflow-y-auto border-t border-white/10 px-6 py-8 space-y-8 animate-in slide-in-from-top duration-300">
            {/* Primary Links */}
            <div className="space-y-4">
              <Link
                onClick={() => setOpen(false)}
                href="/"
                className="block text-sm font-bold uppercase tracking-widest text-rose-100"
              >
                Home
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href="/whyus"
                className="block text-sm font-bold uppercase tracking-widest text-rose-100"
              >
                Why Us
              </Link>
              <Link
                onClick={() => setOpen(false)}
                href="/outfit"
                className="block text-sm font-bold uppercase tracking-widest text-rose-100"
              >
                Outfits
              </Link>{" "}
              <hr className="text-slate-600" />
            </div>
            {/* Comments Section */}
            <div className="space-y-3">
              <p className="text-[15px] font-black text-slate-400 uppercase tracking-[0.1em]">
                Community
              </p>{" "}
              <div className="grid grid-cols-1 gap-3 pl-2">
                <Link
                  onClick={() => setOpen(false)}
                  href="/comments/HomedisplayComments"
                  className="text-rose-200 font-bold text-sm "
                >
                  Customer Reviews
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  href="/comments/add"
                  className=" text-rose-200 font-bold text-sm "
                >
                  Post Comment
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  href="/comments/UserUploadedComments"
                  className="text-rose-200 font-bold text-sm "
                >
                  Manage My Comments
                </Link>

                {isAdmin && (
                  <Link
                    onClick={() => setOpen(false)}
                    href="/admin/Managecomments"
                    className="text-xs text-red-400 font-bold italic"
                  >
                    Admin Review Comments
                  </Link>
                )}
              </div>
            </div>{" "}
            <hr className="text-slate-600" />
            {/* Account Section */}
            <div className="space-y-3">
              <p className="text-[15px] font-black text-slate-400 uppercase tracking-[0.1em]">
                Account Details
              </p>{" "}
              <div className="grid grid-cols-1 gap-4 pl-2">
                {!user ? (
                  <>
                    {" "}
                    <Link
                      onClick={() => setOpen(false)}
                      href="/login"
                      className=" font-bold text-rose-100 tracking-widest border border-rose-100/30 rounded-lg p-1 text-center"
                    >
                      Login
                    </Link>
                    <Link
                      onClick={() => setOpen(false)}
                      href="/signup"
                      className="text-xs font-bold bg-emerald-800 uppercase text-blue-50 tracking-widest rounded-lg p-3 text-center shadow-lg"
                    >
                      Signup
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      onClick={() => setOpen(false)}
                      href="/edit-profile"
                      className="text-rose-200 font-bold text-sm "
                    >
                      Edit Profile
                    </Link>
                    {isAdmin && (
                      <Link
                        onClick={() => setOpen(false)}
                        href="/admin/ManageCustomernameUI"
                        className="text-rose-200 font-bold text-sm "
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="text-left text-sm font-bold text-red-400 tracking-widest mt-1"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
