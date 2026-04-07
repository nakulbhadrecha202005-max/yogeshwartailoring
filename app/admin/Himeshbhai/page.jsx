"use client";
import React, { useState } from "react";

export default function page() {
  const [formData, setFormData] = useState({
    id: "",
    no: "",
    bust: "",
    waist: "",
    hip: "",
    shoulder: "",
    neckF: "",
    neckB: "",
    sleeve: "",
    notes: "",
    totalLength: "",
    armRound: "",
    ghera: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Measurement Saved:", formData);
    alert("Measurement Saved Successfully!");
  };

  return (
    <main className="min-h-screen mt-30 bg-[#f8fafc] font-sans antialiased py-10 px-4">
      {/* Import Google Icons and Fonts via Standard Link (Or use a library like Lucide) */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-md  mx-auto font-outfit">
        {/* Header Card */}
        <div className="bg-rose-100 p-6 rounded-t-[2.5rem] border-b border-dashed border-slate-200 shadow-sm text-center">
          <div className="w-14 h-14 bg-red-800 rounded-2xl flex items-center justify-center text-white mx-auto mb-3 shadow-lg shadow-red-800/20">
            <span className="material-symbols-outlined text-3xl">
              edit_square
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 uppercase tracking-tight">
            Measurement Form
          </h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">
            Yogeshwar Tailor Shop
          </p>
        </div>

        {/* Vertical Form Body */}
        <form
          onSubmit={handleSubmit}
          className="bg-blue-950 p-8 rounded-b-[2.5rem] shadow-2xl shadow-slate-200/60 space-y-6"
        >
          {/* SECTION 1: IDENTIFICATION (Col 1 to 4) */}
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="block text-[10px] font-black uppercase tracking-widest text-red-800 mb-2">
                ID (Col 1)
              </label>
              <input
                type="number"
                name="id"
                value={formData.id}
                onChange={(e) => {
                  if (e.target.value.length <= 2) handleChange(e);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-4 font-black text-center text-xl outline-none focus:ring-2 focus:ring-red-800 focus:bg-white transition-all text-red-800"
                placeholder="00"
              />
            </div>

            {/* Blank Space Indicator (Col 2) */}
            <div className="w-8 flex items-center justify-center opacity-20 mb-4">
              <span className="material-symbols-outlined text-slate-400">
                space_bar
              </span>
            </div>

            <div className="flex-1">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                No. (Col 3)
              </label>
              <input
                type="number"
                name="no"
                value={formData.no}
                onChange={(e) => {
                  if (e.target.value.length <= 2) handleChange(e);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-4 font-black text-center text-xl outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-slate-900"
                placeholder="01"
              />
            </div>
          </div>

          {/* Blank Space Visual (Col 4) */}
          <div className="h-2"></div>

          {/* SECTION 2: BODY SIZES (Col 5 to 8) */}
          <div className="space-y-5 pt-6 border-t border-slate-100">
            {[
              { label: "Bust Size", name: "bust", col: "C5" },
              { label: "Waist Size", name: "waist", col: "C6" },
              { label: "Hip Size", name: "hip", col: "C7" },
              { label: "Shoulder", name: "shoulder", col: "C8" },
            ].map((field) => (
              <div key={field.name} className="flex items-center gap-4 group">
                <span className="w-10 text-[10px] font-black text-slate-300 group-focus-within:text-red-800 transition-colors">
                  {field.col}
                </span>
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="flex-1 bg-blue-950 border-b-2 border-slate-100 py-3 outline-none focus:border-red-800 transition-all font-bold text-slate-700 placeholder:font-normal placeholder:text-slate-300"
                  placeholder={field.label}
                />
              </div>
            ))}
          </div>

          {/* Blank Space (Col 9) */}
          <div className="py-4 flex justify-center">
            <div className="w-full border-t border-dashed border-slate-200"></div>
          </div>

          {/* SECTION 3: NECK & SLEEVE (Col 10, 11, 12) - Red Group */}
          <div className="grid grid-cols-3 gap-3 bg-red-50/50 p-5 rounded-[1.5rem] border border-red-100">
            {[
              { label: "Neck F", name: "neckF" },
              { label: "Neck B", name: "neckB" },
              { label: "Sleeve", name: "sleeve" },
            ].map((item) => (
              <div key={item.name}>
                <label className="block text-[9px] font-black uppercase text-red-800 mb-2 text-center">
                  {item.label}
                </label>
                <input
                  type="text"
                  name={item.name}
                  value={formData[item.name]}
                  onChange={handleChange}
                  className="w-full bg-white border border-red-200 rounded-xl py-3 px-2 text-center text-sm font-black text-red-900 outline-none focus:ring-2 focus:ring-red-800 transition-all"
                  placeholder="0.0"
                />
              </div>
            ))}
          </div>

          {/* SECTION 4: NOTES (Col 13, 14, 15) */}
          <div className="pt-4">
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
              Specific Design Notes
            </label>
            <textarea
              rows="3"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] py-4 px-5 text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-blue-900 transition-all text-slate-600"
              placeholder="Neck pattern, Dori details, etc."
            ></textarea>
          </div>

          {/* FINAL BOTTOM INPUTS (Blue Group) */}
          <div className="space-y-3 pt-6 border-t border-slate-100">
            {[
              { label: "Total Length", name: "totalLength", icon: "straight" },
              { label: "Arm Round", name: "armRound", icon: "restart_alt" },
              { label: "Ghera Size", name: "ghera", icon: "architecture" },
            ].map((bot) => (
              <div
                key={bot.name}
                className="flex items-center gap-4 bg-blue-50/50 p-4 rounded-2xl border border-blue-100 group focus-within:bg-blue-50 transition-all"
              >
                <span className="material-symbols-outlined text-blue-900 text-xl group-focus-within:scale-110 transition-transform">
                  {bot.icon}
                </span>
                <input
                  type="text"
                  name={bot.name}
                  value={formData[bot.name]}
                  onChange={handleChange}
                  className="flex-1 bg-transparent outline-none font-black text-blue-900 placeholder:text-blue-300 placeholder:font-bold"
                  placeholder={bot.label}
                />
              </div>
            ))}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-6 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.25em] shadow-xl shadow-slate-200 hover:bg-red-800 active:scale-95 transition-all flex items-center justify-center gap-3 mt-8"
          >
            <span className="material-symbols-outlined">save</span>
            Save Measurement
          </button>
        </form>

        <p className="text-center mt-8 text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">
          Yogeshwar Tailors Digital System
        </p>
      </div>

      <style jsx global>{`
        .font-outfit {
          font-family: "Outfit", sans-serif;
        }
      `}</style>
    </main>
  );
}
