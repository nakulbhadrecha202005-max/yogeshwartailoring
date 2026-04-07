import React from "react";

const page = () => {
  return (
    <div>
      <section id="outfits" className="bg-white mt-25 py-20 md:py-28">
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
              From everyday kurtis to grand bridal wear — every outfit stitched
              with love and precision.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {/* 1. Bridal Blouse */}
            <div className="group bg-offwhite rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:shadow-red-800/10 transition-all duration-300 cursor-default">
              <div className="aspect-square overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1620733723572-11c53f73a2ad?q=80&w=500&auto=format&fit=crop"
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
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=500&auto=format&fit=crop"
                  alt="Designer Lehenga"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h4 className="font-outfit font-extrabold text-midnight text-sm mb-1 leading-tight">
                  Designer Lehenga
                </h4>
                <p className="text-slate-400 text-[11px] font-medium">
                  Festival & wedding wear
                </p>
              </div>
            </div>

            {/* 3. Kurti with Pant */}
            <div className="group bg-offwhite rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:shadow-red-800/10 transition-all duration-300 cursor-default">
              <div className="aspect-square overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1663162383792-710899f92931?q=80&w=500&auto=format&fit=crop"
                  alt="Kurti Pant"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h4 className="font-outfit font-extrabold text-midnight text-sm mb-1 leading-tight">
                  Kurti with Pant
                </h4>
                <p className="text-slate-400 text-[11px] font-medium">
                  Indo-western style
                </p>
              </div>
            </div>

            {/* 4. Kurti with Salwar */}
            <div className="group bg-offwhite rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:shadow-red-800/10 transition-all duration-300 cursor-default">
              <div className="aspect-square overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1589131408576-ac7833f6a6ca?q=80&w=500&auto=format&fit=crop"
                  alt="Salwar"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h4 className="font-outfit font-extrabold text-midnight text-sm mb-1 leading-tight">
                  Kurti with Salwar
                </h4>
                <p className="text-slate-400 text-[11px] font-medium">
                  Classic modern comfort
                </p>
              </div>
            </div>

            {/* 5. Chaniya Choli */}
            <div className="group bg-offwhite rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:shadow-red-800/10 transition-all duration-300 cursor-default">
              <div className="aspect-square overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1612459284970-e8f027596582?q=80&w=500&auto=format&fit=crop"
                  alt="Chaniya Choli"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h4 className="font-outfit font-extrabold text-midnight text-sm mb-1 leading-tight">
                  Chaniya Choli Fitting
                </h4>
                <p className="text-slate-400 text-[11px] font-medium">
                  Gujarati Garba special
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-blue-950 text-rose-50 px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-red-800 transition-all shadow-xl active:scale-95"
            >
              <span className="material-symbols-outlined text-base">
                add_circle
              </span>
              Book an Outfit Stitching
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
