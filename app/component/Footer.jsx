import Link from "next/link";
const Footer = () => {
  return (
    <>
      <footer className="bg-blue-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="lg:col-span-2">
              <span className="font-outfit text-2xl font-black tracking-tighter text-rose-100 uppercase block mb-4">
                Yogeshwar<span className="text-red-800">.</span>
              </span>
              <p className="text-rose-200/60 font-medium text-sm leading-relaxed max-w-sm mb-6">
                Premium ladies bespoke tailoring since 1999. Every garment
                stitched with love, skill, and an unwavering commitment to the
                perfect fit.
              </p>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400 text-lg">
                  star
                </span>
                <span className="material-symbols-outlined text-amber-400 text-lg">
                  star
                </span>
                <span className="material-symbols-outlined text-amber-400 text-lg">
                  star
                </span>
                <span className="material-symbols-outlined text-amber-400 text-lg">
                  star
                </span>
                <span className="material-symbols-outlined text-amber-400 text-lg">
                  star
                </span>
                <span className="text-rose-200/50 text-sm font-medium ml-2">
                  5000+ Happy Customers
                </span>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-200/50 mb-5">
                Quick Links
              </p>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-rose-100/80 text-sm font-medium hover:text-rose-50 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#why-us"
                    className="text-rose-100/80 text-sm font-medium hover:text-rose-50 transition-colors"
                  >
                    Why Choose Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#outfits"
                    className="text-rose-100/80 text-sm font-medium hover:text-rose-50 transition-colors"
                  >
                    Our Outfits
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="text-rose-100/80 text-sm font-medium hover:text-rose-50 transition-colors"
                  >
                    Visit Shop
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-rose-100/80 text-sm font-medium hover:text-rose-50 transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-200/50 mb-5">
                Contact
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-rose-100/80 text-sm font-medium">
                  <span className="material-symbols-outlined text-red-800 text-base shrink-0 mt-0.5">
                    location_on
                  </span>
                  Kedareshwar Road , Anand shopping center 2nd floor 27 ,
                  Porbandar-360675, Gujarat , India
                </li>
                <li className="flex items-center gap-2 text-rose-100/80 text-sm font-medium">
                  <span className="material-symbols-outlined text-red-800 text-base shrink-0">
                    call
                  </span>
                  +91 8200392919
                </li>
                <li className="flex items-center gap-2 text-rose-100/80 text-sm font-medium">
                  <span className="material-symbols-outlined text-red-800 text-base shrink-0">
                    mail
                  </span>
                  himeshbhadrecha@gmail.com
                </li>
                <li className="flex items-center gap-2 text-rose-100/80 text-sm font-medium">
                  <span className="material-symbols-outlined text-red-800 text-base shrink-0">
                    schedule
                  </span>
                  Monday–Saturday <br /> Morning : 10 AM - 1 PM <br /> Evening :
                  4 PM - 9 PM
                  <br /> (Sunday : 9 AM - 1 PM)
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-rose-200/40">
              © 2026 Yogeshwar Tailor — Premium Bespoke Since 1999
            </p>
            <p className="text-[11px] font-bold  tracking-widest text-rose-200/40 flex items-center gap-2">
              Made By &nbsp; : &nbsp; &lt;Er. Bhadrecha Nakul/&gt;
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
