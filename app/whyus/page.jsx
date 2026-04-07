import React from "react";

const page = () => {
  return (
    <div>
      <section
        id="why-us"
        className="bg-gradient-to-b from-slate-300 mt-25 to-blue-300 py-20 md:py-32 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-red-800"></span>
              <span className="text-red-800 font-black text-[11px] uppercase tracking-[0.35em]">
                Why Choose Us
              </span>
              <span className="w-8 h-[2px] bg-red-800"></span>
            </div>
            <h2 className="font-outfit text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
              We Make Clothes That <br />
              <span className="text-red-800">Fit You Perfectly.</span>
            </h2>
            <p className="text-slate-600 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              We don't just sew clothes. We make sure you feel happy and
              confident in every outfit we make.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Experience */}
            {/* Card 1: Experience */}
            <div className="group p-8 rounded-3xl bg-slate-300 border border-slate-200 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-800 transition-colors">
                <span className="material-symbols-outlined text-3xl text-red-800 group-hover:text-white">
                  history_edu
                </span>
              </div>
              <h3 className="font-outfit text-xl font-bold text-slate-900 mb-3">
                25 Years Experience
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We have been stitching clothes since 1999. We know exactly how
                to give you the best look.
              </p>
            </div>

            {/* Card 2: Precision (Now looks exactly like Card 1) */}
            <div className="group p-8 rounded-3xl bg-slate-300 border border-slate-200 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-800 transition-colors">
                <span className="material-symbols-outlined text-3xl text-red-800 group-hover:text-white">
                  straighten
                </span>
              </div>
              <h3 className="font-outfit text-xl font-bold text-slate-900 mb-3">
                Perfect Measurements
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We take careful measurements to make sure the dress fits your
                body shape perfectly. No loose or tight fits.
              </p>
            </div>

            {/* Card 3: Timely Delivery */}
            <div className="group p-8 rounded-3xl bg-slate-300 border border-slate-200 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-800 transition-colors">
                <span className="material-symbols-outlined text-3xl text-red-800 group-hover:text-white">
                  schedule
                </span>
              </div>
              <h3 className="font-outfit text-xl font-bold text-slate-900 mb-3">
                On Time Delivery
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We always give your clothes on time. You will never have to wait
                for your special function.
              </p>
            </div>

            {/* Card 4: Latest Design */}
            <div className="group p-8 rounded-3xl bg-slate-300 border border-slate-200 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-800 transition-colors">
                <span className="material-symbols-outlined text-3xl text-red-800 group-hover:text-white">
                  auto_awesome
                </span>
              </div>
              <h3 className="font-outfit text-xl font-bold text-slate-900 mb-3">
                Modern Styles
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We stay updated with the latest fashion and designs. We can make
                any design you show us.
              </p>
            </div>

            {/* Card 5: Fabric Quality */}
            <div className="group p-8 rounded-3xl bg-slate-300 border border-slate-200 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-800 transition-colors">
                <span className="material-symbols-outlined text-3xl text-red-800 group-hover:text-white">
                  check_circle
                </span>
              </div>
              <h3 className="font-outfit text-xl font-bold text-slate-900 mb-3">
                Best Quality Work
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                We use high-quality thread and materials. Our stitching is
                strong and looks very clean.
              </p>
            </div>

            {/* Card 6: Free Alteration */}
            <div className="group p-8 rounded-3xl bg-slate-300 border border-slate-200 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-800 transition-colors">
                <span className="material-symbols-outlined text-3xl text-red-800 group-hover:text-white">
                  support_agent
                </span>
              </div>
              <h3 className="font-outfit text-xl font-bold text-slate-900 mb-3">
                Easy Changes
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                If you want any small change after the dress is ready, we do it
                for free with a smile.
              </p>
            </div>
          </div>

          {/* Bottom Box */}
          <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 p-10 rounded-[2.5rem] bg-blue-900 shadow-2xl shadow-blue-900/20">
            <div className="text-center md:text-left">
              <p className="font-outfit font-extrabold text-white text-2xl mb-2">
                Design your dream outfit with us
              </p>{" "}
              <p className="text-blue-200 text-sm font-medium">
                Contact us today and get your dream outfit ready!
              </p>
            </div>
            {/* DARK BLUE BUTTON (No Rose Color) */}
            <a
              href="tel:+918200392919"
              className="bg-slate-300 text-blue-900 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 group"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                <span className="material-symbols-outlined text-base animate-pulse">
                  call
                </span>
              </div>
              <span>Book My Appointment</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
