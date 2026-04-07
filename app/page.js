"use client"

import { useEffect } from "react";
import { auth } from "./lib/firebase"
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

// export default function Home() {
//   const router = useRouter();
//   const [User, setUser] = useState(null);

//   useEffect(() => {
//     const CheckingUser_login = onAuthStateChanged(auth, (user) => {
//       //if (!user) {
//         // router.push("/login");
//       // }else { 
//       if(user){
//         setUser(user);
//         console.log(user);
//       }
//     });
//     return () => CheckingUser_login(); 
//   }, [router]);
  
  //if(!User) return <>Please Login To Access Page........</>
//   return (
//     <>
//       <div>
      
//         {User && <> <h2>Welcome, {User?.displayName}</h2>
//       <img
//         src={User?.photoURL}
//         alt="Profile"
//         width={100}
//         style={{ borderRadius: "50%" }}
//       />
//       <p>Email: {User?.email}</p></>}
    
//     </div>
//     </>
//   );
// }


export default function page() {
    const router = useRouter();
    const [User, setUser] = useState(null);
    // const [data, setData] = useState([]);
    const [comments,setComments] = useState([]);
        useEffect(() => {
            const CheckingUser_login = onAuthStateChanged(auth, (user) => {
            //if (!user) {
                // router.push("/login");
            // }else { 
            if(user){
                setUser(user);
                //console.log(user);
            }
            });
            return () => CheckingUser_login(); 
        }, [router]);
    
    // useEffect(() => {
    //     const fetchData = async () => {
    //     try {
    //         const querySnapshot = await getDocs(collection(db, "users"));

    //         const users = querySnapshot.docs.map(doc => ({
    //         id: doc.id,
    //         ...doc.data()
    //         }));

    //         setData(users);
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    //     };

    //     fetchData();
    // }, []);

    
   
        
    const SignoutUser = () => {
        auth.signOut();
        router.push("/login");
    }

    return (
      
      <div>
    {User && (
    <div style={{marginBottom:"-17vh"}} className="w-full mt-28  bg-slate-300 border-b border-stone-200 shadow-sm px-6 py-4 font-sans">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      
      {/* Left Side: Welcome Branding */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-rose-100 text-rose-900 font-black px-2 py-0.5 rounded uppercase tracking-tighter">
            Live Session
          </span>
          <h2 className="text-ml font-extrabold text-blue-900 tracking-tight">
            Hello, {User?.displayName || User?.email.split('@')[0]}!
          </h2>
        </div>
        <p className="text-stone-400 text-[11px] font-medium tracking-wide flex items-center gap-1">
          <span className="material-symbols-outlined text-[12px]">verified_user</span>
          Logged in as: {User?.email}
        </p>
      </div>

      {/* Right Side: Profile & Actions */}
      <div className="flex items-center gap-4">
        {/* Quick Stats (Optional but looks professional) */}
        {/* <div className="hidden md:flex flex-col items-end border-r border-stone-200 pr-4"> */}
          {/* <span className="text-[10px] text-stone-400 uppercase font-bold tracking-widest">Tailoring Status</span>
          <span className="text-emerald-700 text-xs font-bold">Ready for Pickup</span> */}
        {/* </div> */}

        {/* The Avatar Frame */}
        <div className="relative group cursor-pointer">
                                <div className="w-12 h-12 rounded-full border-2 border-rose-200 p-0.5 transition-all group-hover:border-blue-900">
                                    
            <img 
              src={User?.photoURL || `https://ui-avatars.com/api/?name=${User?.displayName || User?.email.split('@')[0] }&background=f43f5e&color=fff`} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover shadow-inner"
            />
          </div>
          {/* Online Indicator */}
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
        </div>

        {/* Logout Action */}
        <button 
          onClick={SignoutUser}
          className="p-2 text-stone-400 hover:text-rose-900 transition-colors"
          title="Sign Out"
        >
          <span className="material-symbols-outlined">logout</span>
        </button>
      </div>

    </div>
  </div>
)}         
    <section className="bg-offwhite mt-20 min-h-screen flex items-center pt-28 pb-12 lg:py-20">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* TEXT CONTENT - Order 2 on mobile, 1 on Laptop */}
            <div className="order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-[2px] bg-red-800"></span>
                    <span className="text-red-800 font-black text-[10px] md:text-[11px] uppercase tracking-[0.35em]">
                        Premium Tailoring Since 1999
                    </span>
                    <span className="w-8 h-[2px] bg-red-800 lg:hidden"></span>
                </div>

                <h1 className="font-outfit text-4xl sm:text-5xl xl:text-7xl font-extrabold text-midnight leading-[1.1] mb-6">
                    Outfits Crafted <br className="hidden sm:block" />
                    <span className="text-red-800">For You,</span> <br />
                    Not the Rack.
                </h1>

                <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                    Yogeshwar Tailor has been crafting perfect-fitting ladies garments for over two decades. 
                    From bridal blouses to designer kurtis — every stitch tells your story.
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 w-full sm:w-auto">
                    <a href="#contact"
                        className="bg-blue-950 text-rose-50 px-8 py-4 rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-red-800 transition-all shadow-xl shadow-blue-950/20 active:scale-95 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-base">calendar_month</span>
                        Book Appointment
                    </a>
                    <a href="#why-us"
                        className="bg-white text-slate-800 px-8 py-4 rounded-full font-bold text-[11px] uppercase tracking-widest border border-stone-200 hover:border-red-800 hover:text-red-800 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-base">explore</span>
                        Explore Shop
                    </a>
                </div>

                {/* STATS SECTION */}
                <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 pt-8 border-t border-stone-200 w-full lg:w-max">
                    <div className="text-center lg:text-left">
                        <p className="font-outfit text-xl sm:text-2xl font-black text-midnight">5000<span className="text-red-800">+</span></p>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">Happy Customers</p>
                    </div>
                    <div className="text-center lg:text-left border-x border-stone-200 px-4 sm:px-8">
                        <p className="font-outfit text-xl sm:text-2xl font-black text-midnight">25<span className="text-red-800">+</span></p>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">Years Exp.</p>
                    </div>
                    <div className="text-center lg:text-left">
                        <p className="font-outfit text-xl sm:text-2xl font-black text-midnight">12K<span className="text-red-800">+</span></p>
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">Stitched</p>
                    </div>
                </div>
            </div>

            {/* IMAGE SECTION - Order 1 on mobile, 2 on Laptop */}
            <div className="order-1 lg:order-2 relative px-4 sm:px-0">
                <div className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden border-4 sm:border-8 border-white shadow-2xl bg-stone-100 aspect-square lg:aspect-[4/5]">
                    
                    {/* Background Image */}
                     <img
                        src="/images/photo.jpg" 
                        alt="Yogeshwar Tailor Shop"
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/10 transition-opacity hover:opacity-0 duration-500"></div>

                    {/* Est Since Badge - Bottom Right */}
                    <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/95 backdrop-blur rounded-2xl px-4 py-2 sm:px-6 sm:py-3 shadow-lg border border-stone-100 text-center">
                        <p className="font-outfit font-black text-lg sm:text-2xl text-red-800">1999</p>
                        <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-500">Est. Since</p>
                    </div>

                    {/* Trusted Badge - Top Left */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-blue-950 text-rose-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl flex items-center gap-2 shadow-lg scale-90 sm:scale-100">
                        <span className="material-symbols-outlined text-xs sm:text-sm text-emerald-400">verified</span>
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Trusted Tailor</span>
                    </div>
                </div>

                {/* Decorative Blobs - Hidden on smallest screens to avoid horizontal scroll */}
                <div className="absolute -bottom-8 -left-8 w-32 h-32 sm:w-48 sm:h-48 bg-red-800/10 rounded-full -z-10 blur-xl"></div>
                <div className="absolute -top-8 -right-3 w-24 h-24 sm:w-32 sm:h-32 bg-blue-950/20 rounded-full -z-10 blur-xl"></div>
            </div>
        </div>
    </div>
</section>
       <section id="why-us" className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-14">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <span className="w-8 h-[2px] bg-red-800"></span>
                    <span className="text-red-800 font-black text-[11px] uppercase tracking-[0.35em]">Our Promise</span>
                    <span className="w-8 h-[2px] bg-red-800"></span>
                </div>
                <h2 className="font-outfit text-3xl md:text-5xl font-extrabold text-midnight mb-4">
                    Why Choose Yogeshwar Tailor?
                </h2>
                <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                    For over 25 years, our customers return to us for one simple reason — we never compromise on fit,
                    quality, or trust.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">

                <div
                    className="group bg-gray-300 rounded-2xl p-7 border border-stone-100 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-800/5 transition-all duration-300 cursor-default">
                    <div
                        className="w-14 h-14 rounded-2xl bg-blue-950 flex items-center justify-center mb-5 group-hover:bg-red-800 transition-colors duration-300">
                        <span className="material-symbols-outlined text-rose-100 text-2xl">straighten</span>
                    </div>
                    <h3 className="font-outfit font-extrabold text-lg text-midnight mb-2">Perfect Fitting Guarantee</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                        Every garment is hand-measured and tailored specifically to your body. If the fit isn't perfect,
                        we re-stitch it — free of charge.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-red-800">
                        <span className="material-symbols-outlined text-base">check_circle</span>
                        <span className="text-[11px] font-black uppercase tracking-widest">Satisfaction Assured</span>
                    </div>
                </div>

                <div
                    className="group bg-gray-300 rounded-2xl p-7 border border-stone-100 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-800/5 transition-all duration-300 cursor-default">
                    <div
                        className="w-14 h-14 rounded-2xl bg-blue-950 flex items-center justify-center mb-5 group-hover:bg-red-800 transition-colors duration-300">
                        <span className="material-symbols-outlined text-rose-100 text-2xl">workspace_premium</span>
                    </div>
                    <h3 className="font-outfit font-extrabold text-lg text-midnight mb-2">Experienced Since 1999</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                        Our master tailors bring over 25 years of expertise. We have crafted more than 12,000 garments —
                        each stitch reflects decades of skill.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-red-800">
                        <span className="material-symbols-outlined text-base">check_circle</span>
                        <span className="text-[11px] font-black uppercase tracking-widest">25+ Years Legacy</span>
                    </div>
                </div>

                <div
                    className="group bg-gray-300 rounded-2xl p-7 border border-stone-100 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-800/5 transition-all duration-300 cursor-default">
                    <div
                        className="w-14 h-14 rounded-2xl bg-blue-950 flex items-center justify-center mb-5 group-hover:bg-red-800 transition-colors duration-300">
                        <span className="material-symbols-outlined text-rose-100 text-2xl">person_pin</span>
                    </div>
                    <h3 className="font-outfit font-extrabold text-lg text-midnight mb-2">Custom Measurements Saved</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                        We record and save every customer's precise measurements. Your next order is even faster — no
                        need to visit for re-measurement every time.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-red-800">
                        <span className="material-symbols-outlined text-base">check_circle</span>
                        <span className="text-[11px] font-black uppercase tracking-widest">Personalised Records</span>
                    </div>
                </div>

                <div
                    className="group bg-gray-300 rounded-2xl p-7 border border-stone-100 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-800/5 transition-all duration-300 cursor-default">
                    <div
                        className="w-14 h-14 rounded-2xl bg-blue-950 flex items-center justify-center mb-5 group-hover:bg-red-800 transition-colors duration-300">
                        <span className="material-symbols-outlined text-rose-100 text-2xl">diamond</span>
                    </div>
                    <h3 className="font-outfit font-extrabold text-lg text-midnight mb-2">Premium Quality Stitching</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                        We use only high-quality threads, precise machine stitching, and hand-finishing to ensure your
                        garment looks stunning and lasts for years.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-red-800">
                        <span className="material-symbols-outlined text-base">check_circle</span>
                        <span className="text-[11px] font-black uppercase tracking-widest">Premium Finish</span>
                    </div>
                </div>

                <div
                    className="group bg-gray-300 rounded-2xl p-7 border border-stone-100 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-800/5 transition-all duration-300 cursor-default">
                    <div
                        className="w-14 h-14 rounded-2xl bg-blue-950 flex items-center justify-center mb-5 group-hover:bg-red-800 transition-colors duration-300">
                        <span className="material-symbols-outlined text-rose-100 text-2xl">local_florist</span>
                    </div>
                    <h3 className="font-outfit font-extrabold text-lg text-midnight mb-2">Bridal & Designer Outfits</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                        From intricate bridal blouses to festive Chaniya Cholis, we specialise in occasion wear that
                        makes you look and feel like royalty on your special day.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-red-800">
                        <span className="material-symbols-outlined text-base">check_circle</span>
                        <span className="text-[11px] font-black uppercase tracking-widest">Bridal Specialists</span>
                    </div>
                </div>

                <div
                    className="group bg-gray-300 rounded-2xl p-7 border border-stone-100 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-800/5 transition-all duration-300 cursor-default">
                    <div
                        className="w-14 h-14 rounded-2xl bg-blue-950 flex items-center justify-center mb-5 group-hover:bg-red-800 transition-colors duration-300">
                        <span className="material-symbols-outlined text-rose-100 text-2xl">local_shipping</span>
                    </div>
                    <h3 className="font-outfit font-extrabold text-lg text-midnight mb-2">Fast & On-Time Delivery</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                        We respect your time. Standard orders are delivered within 7–10 days. Urgent stitching available
                        on request — always ready when you need it.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-red-800">
                        <span className="material-symbols-outlined text-base">check_circle</span>
                        <span className="text-[11px] font-black uppercase tracking-widest">On-Time Always</span>
                    </div>
                </div>

            </div>
        </div>
    </section>


    <section className="bg-gray-300 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center  mb-14">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <span className="w-8 h-[2px] bg-red-800"></span>
                    <span className="text-red-800 font-black text-[11px] uppercase tracking-[0.35em]">Simple Steps</span>
                    <span className="w-8 h-[2px] bg-red-800"></span>
                </div>
                <h2 className="font-outfit text-3xl md:text-5xl font-extrabold text-midnight mb-4">
                    How Our Stitching Process Works
                </h2>
                <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                    From your first visit to final delivery — a seamless, enjoyable experience crafted with care.
                </p>
            </div>

            <div  className="ml-20 hidden md:grid md:grid-cols-6 gap-4 mb-10 ">
                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                        <div
                            className="w-16 h-16 rounded-2xl bg-blue-950 flex items-center justify-center shadow-lg shadow-blue-950/20">
                            <span className="material-symbols-outlined text-rose-100 text-2xl">storefront</span>
                        </div>
                        <div
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-800 flex items-center justify-center">
                            <span className="font-outfit font-black text-white text-[10px]">1</span>
                        </div>
                    </div>
                    <h4 className="font-outfit font-extrabold text-midnight text-sm mb-1">Visit Shop</h4>
                    <p className="text-slate-400 text-xs font-medium leading-snug">Walk in or book your appointment with us
                    </p>
                </div>
                <div className="flex items-start pt-8">
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-red-800 to-stone-200 mt-0"></div>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                        <div
                            className="w-16 h-16 rounded-2xl bg-blue-950 flex items-center justify-center shadow-lg shadow-blue-950/20">
                            <span className="material-symbols-outlined text-rose-100 text-2xl">palette</span>
                        </div>
                        <div
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-800 flex items-center justify-center">
                            <span className="font-outfit font-black text-white text-[10px]">2</span>
                        </div>
                    </div>
                    <h4 className="font-outfit font-extrabold text-midnight text-sm mb-1">Choose Design</h4>
                    <p className="text-slate-400 text-xs font-medium leading-snug">Pick your style, fabric & latest design
                    </p>
                </div>
                <div className="flex items-start pt-8">
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-red-800 to-stone-200 mt-0"></div>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                        <div
                            className="w-16 h-16 rounded-2xl bg-blue-950 flex items-center justify-center shadow-lg shadow-blue-950/20">
                            <span className="material-symbols-outlined text-rose-100 text-2xl">straighten</span>
                        </div>
                        <div
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-800 flex items-center justify-center">
                            <span className="font-outfit font-black text-white text-[10px]">3</span>
                        </div>
                    </div>
                    <h4 className="font-outfit font-extrabold text-midnight text-sm mb-1">Measurements</h4>
                    <p className="text-slate-400 text-xs font-medium leading-snug">Precise measurements taken & recorded</p>
                </div>
            </div>

            <div className="ml-20 hidden md:grid md:grid-cols-6 gap-4">
                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                        <div
                            className="w-16 h-16 rounded-2xl bg-red-800 flex items-center justify-center shadow-lg shadow-red-800/20">
                            <span className="material-symbols-outlined text-rose-100 text-2xl">sewing</span>
                        </div>
                        <div
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-950 flex items-center justify-center">
                            <span className="font-outfit font-black text-white text-[10px]">4</span>
                        </div>
                    </div>
                    <h4 className="font-outfit font-extrabold text-midnight text-sm mb-1">Expert Stitching</h4>
                    <p className="text-slate-400 text-xs font-medium leading-snug">Crafted by our skilled master tailors</p>
                </div>
                <div className="flex items-start pt-8">
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-stone-300 to-red-800 mt-0"></div>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                        <div
                            className="w-16 h-16 rounded-2xl bg-red-800 flex items-center justify-center shadow-lg shadow-red-800/20">
                            <span className="material-symbols-outlined text-rose-100 text-2xl">how_to_reg</span>
                        </div>
                        <div
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-950 flex items-center justify-center">
                            <span className="font-outfit font-black text-white text-[10px]">5</span>
                        </div>
                    </div>
                    <h4 className="font-outfit font-extrabold text-midnight text-sm mb-1">Trial Fitting</h4>
                    <p className="text-slate-400 text-xs font-medium leading-snug">Try on the garment for perfect fit check
                    </p>
                </div>
                <div className="flex items-start pt-8">
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-stone-300 to-red-800 mt-0"></div>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                        <div
                            className="w-16 h-16 rounded-2xl bg-red-800 flex items-center justify-center shadow-lg shadow-red-800/20">
                            <span className="material-symbols-outlined text-rose-100 text-2xl">celebration</span>
                        </div>
                        <div
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-950 flex items-center justify-center">
                            <span className="font-outfit font-black text-white text-[10px]">6</span>
                        </div>
                    </div>
                    <h4 className="font-outfit font-extrabold text-midnight text-sm mb-1">Final Delivery</h4>
                    <p className="text-slate-400 text-xs font-medium leading-snug">Take home your perfectly finished outfit
                    </p>
                </div>
            
            </div>

            <div className="md:hidden space-y-4">
                <div className="flex items-start gap-5 bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
                    <div className="relative shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-blue-950 flex items-center justify-center">
                            <span className="material-symbols-outlined text-rose-100 text-lg">storefront</span>
                        </div>
                        <div
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-800 flex items-center justify-center">
                            <span className="font-outfit font-black text-white text-[9px]">1</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-outfit font-extrabold text-midnight mb-1">Visit Our Shop</h4>
                        <p className="text-slate-500 text-sm font-medium">Walk in or book your appointment with us in
                            advance.</p>
                    </div>
                </div>
                <div className="flex items-start gap-5 bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
                    <div className="relative shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-blue-950 flex items-center justify-center">
                            <span className="material-symbols-outlined text-rose-100 text-lg">palette</span>
                        </div>
                        <div
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-800 flex items-center justify-center">
                            <span className="font-outfit font-black text-white text-[9px]">2</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-outfit font-extrabold text-midnight mb-1">Choose Design & Fabric</h4>
                        <p className="text-slate-500 text-sm font-medium">Browse our latest catalogue and choose your style
                            and fabric.</p>
                    </div>
                </div>
                <div className="flex items-start gap-5 bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
                    <div className="relative shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-blue-950 flex items-center justify-center">
                            <span className="material-symbols-outlined text-rose-100 text-lg">straighten</span>
                        </div>
                        <div
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-800 flex items-center justify-center">
                            <span className="font-outfit font-black text-white text-[9px]">3</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-outfit font-extrabold text-midnight mb-1">Accurate Measurements</h4>
                        <p className="text-slate-500 text-sm font-medium">We take precise measurements and save them for
                            your future orders.</p>
                    </div>
                </div>
                <div className="flex items-start gap-5 bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
                    <div className="relative shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-red-800 flex items-center justify-center">
                            <span className="material-symbols-outlined text-rose-100 text-lg">sewing</span>
                        </div>
                        <div
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-blue-950 flex items-center justify-center">
                            <span className="font-outfit font-black text-white text-[9px]">4</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-outfit font-extrabold text-midnight mb-1">Stitching by Experts</h4>
                        <p className="text-slate-500 text-sm font-medium">Our skilled tailors carefully craft your garment
                            with premium finish.</p>
                    </div>
                </div>
                <div className="flex items-start gap-5 bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
                    <div className="relative shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-red-800 flex items-center justify-center">
                            <span className="material-symbols-outlined text-rose-100 text-lg">how_to_reg</span>
                        </div>
                        <div
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-blue-950 flex items-center justify-center">
                            <span className="font-outfit font-black text-white text-[9px]">5</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-outfit font-extrabold text-midnight mb-1">Trial Fitting Session</h4>
                        <p className="text-slate-500 text-sm font-medium">Try your outfit and request any adjustments — we
                            get it right.</p>
                    </div>
                </div>
                <div className="flex items-start gap-5 bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
                    <div className="relative shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-red-800 flex items-center justify-center">
                            <span className="material-symbols-outlined text-rose-100 text-lg">celebration</span>
                        </div>
                        <div
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-blue-950 flex items-center justify-center">
                            <span className="font-outfit font-black text-white text-[9px]">6</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-outfit font-extrabold text-midnight mb-1">Final Delivery</h4>
                        <p className="text-slate-500 text-sm font-medium">Take home your beautifully finished outfit and
                            look stunning.</p>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <section id="outfits" className="bg-white py-20 md:py-28">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <div className="text-center mb-14">
      <div className="flex items-center justify-center gap-3 mb-3">
        <span className="w-8 h-[2px] bg-red-800"></span>
        <span className="text-red-800 font-black text-[11px] uppercase tracking-[0.35em]">
          Our Specialities
        </span>
        <span className="w-8 h-[2px] bg-red-800"></span>
      </div>
      <h2 className="font-outfit text-3xl md:text-5xl font-extrabold text-midnight mb-4">
        Popular Outfits We Stitch
      </h2>
      <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto leading-relaxed">
        From everyday kurtis to grand bridal wear — every outfit stitched with love and precision.
      </p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">

      {/* 1. Bridal Blouse */}
      <div className="group bg-offwhite rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:shadow-red-800/10 transition-all duration-300 cursor-default">
        <div className="aspect-square overflow-hidden bg-slate-100">
          <img 
            src="/images/Bridalblouse.avif" 
            alt="Bridal Blouse" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-4 md:p-5">
          <h4 className="font-outfit font-extrabold text-midnight text-sm md:text-base mb-1 leading-tight">
            Bridal Blouse
          </h4>
          <p className="text-slate-400 text-[10px] md:text-xs font-medium leading-relaxed">
            Custom fit with intricate embroidery
          </p>
        </div>
      </div>

      {/* 2. Designer Lehenga */}
      <div className="group bg-offwhite rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:shadow-red-800/10 transition-all duration-300 cursor-default">
        <div className="aspect-square overflow-hidden bg-slate-100">
          <img 
            src="/images/Bridal-Lehenga.jpg" 
            alt="Designer Lehenga" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h4 className="font-outfit font-extrabold text-midnight text-sm mb-1 leading-tight">
            Bride Lehenga Fitting
          </h4>
          <p className="text-slate-400 text-[11px] font-medium">Festival & wedding wear</p>
        </div>
      </div>

      {/* 3. Kurti with Pant */}
      <div className="group bg-offwhite rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:shadow-red-800/10 transition-all duration-300 cursor-default">
        <div className="aspect-square overflow-hidden bg-slate-100">
          <img 
            src="/images/Kurtipant.jpg" 
            alt="Kurti Pant" 
            className="w-full h-full object-cover object-bottom transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h4 className="font-outfit font-extrabold text-midnight text-sm mb-1 leading-tight">
            Kurti with Pant
          </h4>
          <p className="text-slate-400 text-[11px] font-medium">Indo-western style</p>
        </div>
      </div>

      {/* 4. Kurti with Salwar */}
      <div className="group bg-offwhite rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:shadow-red-800/10 transition-all duration-300 cursor-default">
        <div className="aspect-square overflow-hidden bg-slate-100">
          <img 
            src="https://assets.myntassets.com/w_360,q_50,,dpr_2,fl_progressive,f_webp/assets/images/2025/FEBRUARY/11/sYy0mNXt_05e539c7801e411d8dda6a8f268b8e0d.jpg" 
            alt="Salwar Kameez" 
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h4 className="font-outfit font-extrabold text-midnight text-sm mb-1 leading-tight">
            Kurti with Salwar
          </h4>
          <p className="text-slate-400 text-[11px] font-medium">Classic modern comfort</p>
        </div>
      </div>


    </div>

    <div className="text-center mt-10">
      <a href="#contact"
        className="inline-flex items-center gap-2 bg-blue-950 text-rose-50 px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-red-800 transition-all shadow-xl active:scale-95">
        <span className="material-symbols-outlined text-base">add_circle</span>
        Book an Outfit Stitching
      </a>
    </div>

  </div>
</section>

    <section className="bg-blue-950 py-20 md:py-24 relative overflow-hidden">

        <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/[0.03] -translate-y-1/2 translate-x-1/2 pointer-events-none">
        </div>
        <div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/[0.03] translate-y-1/2 -translate-x-1/2 pointer-events-none">
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

            <div className="text-center mb-14">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <span className="w-8 h-[2px] bg-red-800"></span>
                    <span className="text-rose-200/70 font-black text-[11px] uppercase tracking-[0.35em]">Numbers That
                        Speak</span>
                    <span className="w-8 h-[2px] bg-red-800"></span>
                </div>
                <h2 className="font-outfit text-3xl md:text-5xl font-extrabold text-rose-50 mb-4">
                    Trusted by Thousands of Families
                </h2>
                <p className="text-rose-200/60 text-lg font-medium max-w-xl mx-auto leading-relaxed">
                    Our legacy in numbers — built on craftsmanship, trust, and thousands of perfectly fitted garments.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">

                <div
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors duration-300 cursor-default">
                    <div className="w-12 h-12 rounded-2xl bg-red-800/80 flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-rose-100 text-xl">workspace_premium</span>
                    </div>
                    <p className="font-outfit font-black text-5xl text-rose-50 mb-2">25<span
                            className="text-red-400 text-3xl">+</span></p>
                    <p className="text-[11px] font-black uppercase tracking-[0.25em] text-rose-200/60">Years Experience</p>
                </div>

                <div
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors duration-300 cursor-default">
                    <div className="w-12 h-12 rounded-2xl bg-red-800/80 flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-rose-100 text-xl">people</span>
                    </div>
                    <p className="font-outfit font-black text-5xl text-rose-50 mb-2">5K<span
                            className="text-red-400 text-3xl">+</span></p>
                    <p className="text-[11px] font-black uppercase tracking-[0.25em] text-rose-200/60">Happy Customers</p>
                </div>

                <div
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors duration-300 cursor-default">
                    <div className="w-12 h-12 rounded-2xl bg-red-800/80 flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-rose-100 text-xl">checkroom</span>
                    </div>
                    <p className="font-outfit font-black text-5xl text-rose-50 mb-2">12K<span
                            className="text-red-400 text-3xl">+</span></p>
                    <p className="text-[11px] font-black uppercase tracking-[0.25em] text-rose-200/60">Outfits Stitched</p>
                </div>

                <div
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors duration-300 cursor-default">
                    <div className="w-12 h-12 rounded-2xl bg-red-800/80 flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-rose-100 text-xl">favorite</span>
                    </div>
                    <p className="font-outfit font-black text-5xl text-rose-50 mb-2">95<span
                            className="text-red-400 text-3xl">%</span></p>
                    <p className="text-[11px] font-black uppercase tracking-[0.25em] text-rose-200/60">Repeat Customers</p>
                </div>

            </div>

           <div className="w-full max-w-4xl mx-auto">
                {/* Scrollable Container - limited to ~10 comments height */}
                <div className="mt-14 space-y-4 max-h-[700px] overflow-y-auto pr-2 overflow-x-hidden">
                    {/*Comments Display Data Function COme here ------------ */}
                        {/* {commentsDatadisplay()} */}
                    {/* End Comment Card */}
                    </div>

                    {/* See More Button */}
                    <Link href="/comments/HomedisplayComments" className="mt-8 flex justify-center">
                        <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-rose-50 rounded-xl font-bold transition-all flex items-center gap-2 group">
                        View Customer Reviews
                        <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">
                            expand_more
                        </span>
                        </button>
                    </Link>
                    </div>
        </div>
    </section>

    <section className="bg-offwhite py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

                <div className="relative">
                    <div className="bg-white rounded-3xl border border-stone-100 shadow-xl p-10 relative overflow-hidden">

                        <div
                            className="absolute top-0 right-0 w-48 h-48 bg-red-100 rounded-full -translate-y-1/4 translate-x-1/4 pointer-events-none">
                        </div>

                        <div className="w-20 h-20 rounded-2xl bg-blue-950 flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-rose-100 text-4xl">emoji_events</span>
                        </div>

                        <h3 className="font-outfit font-extrabold text-2xl md:text-3xl text-midnight mb-3 leading-tight">
                            Stitching That Feels Like It Was Made for You
                        </h3>
                        <p className="text-slate-500 font-medium leading-relaxed mb-8">
                            At Yogeshwar Tailor, we don't just stitch clothes. We craft experiences that make you feel
                            confident, beautiful, and uniquely you.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-offwhite rounded-2xl p-4 border border-stone-100">
                                <p className="font-outfit font-black text-2xl text-red-800">100%</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">Custom
                                    Made</p>
                            </div>
                            <div className="bg-offwhite rounded-2xl p-4 border border-stone-100">
                                <p className="font-outfit font-black text-2xl text-blue-950">Free</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">
                                    Alterations</p>
                            </div>
                            <div className="bg-offwhite rounded-2xl p-4 border border-stone-100">
                                <p className="font-outfit font-black text-2xl text-red-800">7–10</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">Days
                                    Delivery</p>
                            </div>
                            <div className="bg-offwhite rounded-2xl p-4 border border-stone-100">
                                <p className="font-outfit font-black text-2xl text-blue-950">∞</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">Saved
                                    Records</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="absolute -bottom-5 -right-5 bg-emerald-800 text-rose-50 rounded-2xl p-4 shadow-xl hidden sm:flex items-center gap-3">
                        <span className="material-symbols-outlined text-2xl">verified</span>
                        <div>
                            <p className="font-outfit font-black text-sm">Satisfaction</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-rose-200/70">Guaranteed</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <span className="w-8 h-[2px] bg-red-800"></span>
                        <span className="text-red-800 font-black text-[11px] uppercase tracking-[0.35em]">Why Customers Love
                            Us</span>
                    </div>
                    <h2 className="font-outfit text-3xl md:text-4xl font-extrabold text-midnight mb-4 leading-tight">
                        Benefits of Stitching<br/>at Our Shop
                    </h2>
                    <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                        Every visit to Yogeshwar Tailor is an experience built around you — your style, your comfort,
                        your perfection.
                    </p>

                    <div className="space-y-4">

                        <div
                            className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-stone-100 shadow-sm hover:border-red-800/30 hover:shadow-md hover:translate-x-1 transition-all duration-200 cursor-default group">
                            <div
                                className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-red-800 transition-colors duration-200">
                                <span
                                    className="material-symbols-outlined text-red-800 text-lg group-hover:text-rose-100 transition-colors duration-200">straighten</span>
                            </div>
                            <div>
                                <h4 className="font-outfit font-extrabold text-midnight mb-0.5">Perfect Fitting Guaranteed
                                </h4>
                                <p className="text-slate-500 text-sm font-medium">Every garment tailored to your exact body
                                    shape — no loose ends, no tight spots.</p>
                            </div>
                        </div>

                        <div
                            className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-stone-100 shadow-sm hover:border-red-800/30 hover:shadow-md hover:translate-x-1 transition-all duration-200 cursor-default group">
                            <div
                                className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-red-800 transition-colors duration-200">
                                <span
                                    className="material-symbols-outlined text-red-800 text-lg group-hover:text-rose-100 transition-colors duration-200">save</span>
                            </div>
                            <div>
                                <h4 className="font-outfit font-extrabold text-midnight mb-0.5">Measurements Saved for Life
                                </h4>
                                <p className="text-slate-500 text-sm font-medium">We store your records securely. Future
                                    orders are faster — no re-measurement needed.</p>
                            </div>
                        </div>

                        <div
                            className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-stone-100 shadow-sm hover:border-red-800/30 hover:shadow-md hover:translate-x-1 transition-all duration-200 cursor-default group">
                            <div
                                className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-red-800 transition-colors duration-200">
                                <span
                                    className="material-symbols-outlined text-red-800 text-lg group-hover:text-rose-100 transition-colors duration-200">design_services</span>
                            </div>
                            <div>
                                <h4 className="font-outfit font-extrabold text-midnight mb-0.5">Free Alteration Support</h4>
                                <p className="text-slate-500 text-sm font-medium">Not fully satisfied? We offer free
                                    alterations until you're completely happy with the fit.</p>
                            </div>
                        </div>

                        <div
                            className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-stone-100 shadow-sm hover:border-red-800/30 hover:shadow-md hover:translate-x-1 transition-all duration-200 cursor-default group">
                            <div
                                className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-red-800 transition-colors duration-200">
                                <span
                                    className="material-symbols-outlined text-red-800 text-lg group-hover:text-rose-100 transition-colors duration-200">trending_up</span>
                            </div>
                            <div>
                                <h4 className="font-outfit font-extrabold text-midnight mb-0.5">Latest Fashion Designs</h4>
                                <p className="text-slate-500 text-sm font-medium">We stay updated with current fashion
                                    trends so your outfit always looks modern and elegant.</p>
                            </div>
                        </div>

                        <div
                            className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-stone-100 shadow-sm hover:border-red-800/30 hover:shadow-md hover:translate-x-1 transition-all duration-200 cursor-default group">
                            <div
                                className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-red-800 transition-colors duration-200">
                                <span
                                    className="material-symbols-outlined text-red-800 text-lg group-hover:text-rose-100 transition-colors duration-200">local_florist</span>
                            </div>
                            <div>
                                <h4 className="font-outfit font-extrabold text-midnight mb-0.5">Specialist Bridal Stitching
                                </h4>
                                <p className="text-slate-500 text-sm font-medium">From bridal blouses to full lehenga sets,
                                    we make your special day look extraordinary.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>


    <section id="contact" className="bg-blue-950 py-20 md:py-28 relative overflow-hidden">

        <div className="absolute inset-0 pointer-events-none">
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-800/10">
            </div>
            <div
                className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/[0.03] translate-x-1/3 translate-y-1/3">
            </div>
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/[0.03] -translate-x-1/3 -translate-y-1/3">
            </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">

            <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-red-800"></span>
                <span className="text-rose-200/60 font-black text-[11px] uppercase tracking-[0.35em]">We'd Love to See
                    You</span>
                <span className="w-8 h-[2px] bg-red-800"></span>
            </div>

            <h2 className="font-outfit text-2xl uppercase md:text-6xl font-extrabold text-rose-50 mb-6 leading-tight">
                Visit Yogeshwar Tailor<br/>
                <span className="text-rose-300 uppercase">Today</span>
            </h2>

            <p className="text-rose-200/70 text-xl font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
                Step into our shop and experience the art of perfect tailoring. Our master tailors are ready to craft
                something beautiful — just for you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">

                <a href="tel:+918200392919"
                    className="w-full sm:w-auto flex items-center justify-center gap-3 bg-emerald-800 text-rose-50 px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-2xl active:scale-95">
                    <span className="material-symbols-outlined text-xl">calendar_month</span>
                    Book Appointment
                </a>

                <a href="tel:+918200392919"
                    className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-rose-50 px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition-all active:scale-95">
                    <span className="material-symbols-outlined text-xl">call</span>
                    Call Now
                </a>

                <a href="https://www.google.com/maps/@21.6412046,69.6036852,89m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI2MDQwMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener"
                    className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-rose-50 px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/20 transition-all active:scale-95">
                    <span className="material-symbols-outlined text-xl">location_on</span>
                    Visit Shop Location
                </a>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                <div
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors duration-300">
                    <span className="material-symbols-outlined text-emerald-600 text-3xl mb-3 block">location_on</span>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-200/60 mb-2">Shop Address</p>
                    <p className="text-rose-100 font-semibold text-sm leading-relaxed">Kedareshwar road , Anand shopping center 27,<br/>Porbandar,
                        Gujarat</p>
                </div>

                <div
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors duration-300">
                    <span className="material-symbols-outlined text-emerald-600 text-3xl mb-3 block">schedule</span>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-200/60 mb-2">Shop Hours</p>
                            <p className="text-rose-100 font-semibold text-sm leading-relaxed">Mon – Sat<br />10:00 AM - 1:00 PM </p>
                            <p className="text-rose-100 font-semibold text-sm leading-relaxed">04:00 PM - 9:00 PM </p> 
                    <p className="text-rose-100 font-semibold text-sm leading-relaxed">Sunday<br/>10:00 AM – 1:00 PM</p>
                </div>

                <div
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors duration-300">
                    <span className="material-symbols-outlined text-emerald-600 text-3xl mb-3 block">call</span>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-200/60 mb-2">Contact Us</p>
                    <p className="text-rose-100 font-semibold text-sm leading-relaxed">+91 8200392919<br/>himeshbhadrecha@gmail.com</p>
                </div>

            </div>

        </div>
    </section>

    <section className="bg-white py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <span className="w-8 h-[2px] bg-red-800"></span>
                    <span className="text-red-800 font-black text-[11px] uppercase tracking-[0.35em]">Got Questions?</span>
                    <span className="w-8 h-[2px] bg-red-800"></span>
                </div>
                <h2 className="font-outfit text-3xl md:text-5xl font-extrabold text-midnight mb-4">
                    Frequently Asked Questions
                </h2>
                <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto leading-relaxed">
                    Everything you need to know before your first visit — answered honestly.
                </p>
            </div>

            <div className="space-y-3">

                <details className="group bg-offwhite rounded-2xl border border-stone-100 overflow-hidden">
                    <summary
                        className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none bg-gray-300 hover:bg-stone-100 transition-colors duration-200">
                        <div className="flex items-center gap-4 ">
                            <div className="w-9 h-9 rounded-xl bg-blue-950 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-rose-100 text-base">schedule</span>
                            </div>
                            <span className="font-outfit font-extrabold text-midnight text-base">How long does stitching
                                usually take?</span>
                        </div>
                        <span
                            className="material-symbols-outlined text-slate-400 text-xl shrink-0 group-open:rotate-45 transition-transform duration-300">add</span>
                    </summary>
                    <div className="px-6 pb-6 pt-2">
                        <div className="pl-[52px]">
                            <p className="text-slate-500 font-medium leading-relaxed">
                                Standard stitching takes <span className="font-bold text-midnight">7 to 10 working
                                    days</span> from the date measurements are taken. For simpler garments like blouses
                                and kurtis, it can be ready in 5–7 days. We always share an estimated delivery date when
                                you place your order.
                            </p>
                        </div>
                    </div>
                </details>

                <details className="group bg-offwhite rounded-2xl border bg-gray-300 border-stone-100 overflow-hidden">
                    <summary
                        className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none bg-gray-300  hover:bg-stone-100 transition-colors duration-200">
                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-xl bg-blue-950 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-rose-100 text-base">speed</span>
                            </div>
                            <span className="font-outfit font-extrabold text-midnight text-base">Do you provide urgent
                                stitching?</span>
                        </div>
                        <span
                            className="material-symbols-outlined text-slate-400 text-xl shrink-0 group-open:rotate-45 transition-transform duration-300">add</span>
                    </summary>
                    <div className="px-6 pb-6 pt-2">
                        <div className="pl-[52px]">
                            <p className="text-slate-500 font-medium leading-relaxed">
                                Yes! We offer <span className="font-bold text-midnight">urgent stitching on request</span> —
                                especially for weddings, events, and festivals. Urgent orders may have an additional
                                charge depending on timeline and garment type. Please visit our shop or call us to
                                discuss your deadline.
                            </p>
                        </div>
                    </div>
                </details>

                <details className="group bg-offwhite rounded-2xl border border-stone-100 overflow-hidden">
                    <summary
                        className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none bg-gray-300 hover:bg-stone-100 transition-colors duration-200">
                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-xl bg-blue-950 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-rose-100 text-base">inventory_2</span>
                            </div>
                            <span className="font-outfit font-extrabold text-midnight text-base">Can I bring my own
                                fabric?</span>
                        </div>
                        <span
                            className="material-symbols-outlined text-slate-400 text-xl shrink-0 group-open:rotate-45 transition-transform duration-300">add</span>
                    </summary>
                    <div className="px-6 pb-6 pt-2">
                        <div className="pl-[52px]">
                            <p className="text-slate-500 font-medium leading-relaxed">
                                Absolutely! We <span className="font-bold text-midnight">welcome customer-provided
                                    fabric</span>. Whether it's a family heirloom saree or a fabric you chose yourself —
                                we'll stitch it with the same care and skill. Just ensure you bring sufficient fabric as
                                per the garment type.
                            </p>
                        </div>
                    </div>
                </details>

                <details className="group bg-offwhite rounded-2xl border border-stone-100 overflow-hidden">
                    <summary
                        className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none bg-gray-300 hover:bg-stone-100 transition-colors duration-200">
                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-xl bg-blue-950 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-rose-100 text-base">save</span>
                            </div>
                            <span className="font-outfit font-extrabold text-midnight text-base">Do you save my measurements
                                for future orders?</span>
                        </div>
                        <span
                            className="material-symbols-outlined text-slate-400 text-xl shrink-0 group-open:rotate-45 transition-transform duration-300">add</span>
                    </summary>
                    <div className="px-6 pb-6 pt-2">
                        <div className="pl-[52px]">
                            <p className="text-slate-500 font-medium leading-relaxed">
                                Yes — we maintain a <span className="font-bold text-midnight">personal measurement
                                    record</span> for every customer. Once measured, your data is saved and used for all
                                future orders. This means faster service and more consistent fitting every time you
                                visit.
                            </p>
                        </div>
                    </div>
                </details>

                <details className="group bg-offwhite rounded-2xl border border-stone-100 overflow-hidden">
                    <summary
                        className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none bg-gray-300 hover:bg-stone-100 transition-colors duration-200">
                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-xl bg-blue-950 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-rose-100 text-base">design_services</span>
                            </div>
                            <span className="font-outfit font-extrabold text-midnight text-base">Do you offer free
                                alterations if I'm not satisfied?</span>
                        </div>
                        <span
                            className="material-symbols-outlined text-slate-400 text-xl shrink-0 group-open:rotate-45 transition-transform duration-300">add</span>
                    </summary>
                    <div className="px-6 pb-6 pt-2">
                        <div className="pl-[52px]">
                            <p className="text-slate-500 font-medium leading-relaxed">
                                Your satisfaction is our priority. If the garment doesn't fit perfectly after the first
                                trial, we offer <span className="font-bold text-midnight">free alterations</span> until it's
                                right. We stand behind every piece we stitch and never leave a customer unhappy.
                            </p>
                        </div>
                    </div>
                </details>

                <details className="group bg-offwhite rounded-2xl border border-stone-100 overflow-hidden">
                    <summary
                        className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none bg-gray-300 hover:bg-stone-100 transition-colors duration-200">
                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-xl bg-blue-950 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-rose-100 text-base">local_florist</span>
                            </div>
                            <span className="font-outfit font-extrabold text-midnight text-base">Do you specialise in bridal
                                stitching?</span>
                        </div>
                        <span
                            className="material-symbols-outlined text-slate-400 text-xl shrink-0 group-open:rotate-45 transition-transform duration-300">add</span>
                    </summary>
                    <div className="px-6 pb-6 pt-2">
                        <div className="pl-[52px]">
                            <p className="text-slate-500 font-medium leading-relaxed">
                                Yes! Bridal stitching is one of our greatest strengths. We have crafted hundreds of
                                <span className="font-bold text-midnight">bridal blouses, lehenga cholis, and chaniya
                                    cholis</span> for weddings across Gujarat. We recommend booking at least 3–4 weeks
                                in advance for bridal orders.
                            </p>
                        </div>
                    </div>
                </details>

            </div>

            <div className="mt-10 text-center">
                <p className="text-slate-500 font-medium mb-4">Still have a question? We're happy to help.</p>
                <a href="tel:+918200392919"
                    className="inline-flex items-center gap-2 bg-blue-950 text-rose-50 px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-red-800 transition-all shadow-xl active:scale-95">
                    <span className="material-symbols-outlined text-base">support_agent</span>
                    Ask Us Anything
                </a>
            </div>

        </div>
    </section>


    </div>
  );
}

