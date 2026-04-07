"use client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "@/app/lib/firebase";
import { collection, getDoc, addDoc, onSnapshot } from "firebase/firestore";
import { updateDoc, doc, setDoc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { collectionGroup } from "firebase/firestore";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [customer, setCustomer] = useState("");
  const [Error, setError] = useState("");
  const [editId, setEditId] = useState("");

  //all measurement record display
  const [allMeasurements, setAllMeasurements] = useState([]);

  const [measurements, setMeasurements] = useState({
    customer_id: "",
    customer_Number: "",
    customer_Name: "",
    TypeCloth: "dress",
    bust: "",
    waist: "",
    shoulder: "",
    sleeveLength: "",
    blouseLength: "",
    neckDepthFront: "",
    neckDepthBack: "",
    armRound: "",
    specialNotes: "",
    // Grid and Branch fields
    m7: "",
    m8: "",
    m9: "",
    m10: "",
    m11: "",
    m12: "",
    m13: "",
    m14: "",
    m15: "",
    m16: "",
    m17: "",
    m18: "",
    m19: "",
    m20: "",
    m21: "",
    m22: "",
    m23: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeasurements((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setMeasurements({
      customer_id: customer.id,
      customer_Number: customer.customerNumber,
      customer_Name: customer.customerName,
      TypeCloth: "blouse",
      bust: "",
      waist: "",
      shoulder: "",
      sleeveLength: "",
      blouseLength: "",
      neckDepthFront: "",
      neckDepthBack: "",
      armRound: "",
      specialNotes: "",
      m7: "",
      m8: "",
      m9: "",
      m10: "",
      m11: "",
      m12: "",
      m13: "",
      m14: "",
      m15: "",
      m16: "",
      m17: "",
      m18: "",
      m19: "",
      m20: "",
      m21: "",
      m22: "",
      m23: "",
    });
  };
  const [SearchItem, setSearchItem] = useState("");
  const [itemToDelete, setItemToDelete] = useState(null);
  //const [selectedMeasure, setSelectedMeasure] = useState("");

  //fetch data customerName
  useEffect(() => {
    if (!id) return;

    const fetchCustomer = async () => {
      try {
        const docRef = doc(db, "customersName", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCustomer({
            id: docSnap.id,
            ...docSnap.data(),
          });
        } else {
          setError("No such document!");
        }
      } catch (error) {
        setError("Error : " + error.message);
      }
    };

    fetchCustomer();
  }, [id]);

  //for setting value in object
  useEffect(() => {
    if (customer) {
      setMeasurements((prev) => ({
        ...prev,
        customer_id: customer.id,
        customer_Name: customer.customerName,
        customer_Number: customer.customerNumber,
      }));
    }
  }, [customer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Update/Set the main customer contact info
      await setDoc(
        doc(db, "customerMeasurement", customer.id),
        {
          name: customer.customerName,
          phone: customer.customerNumber,
          // Using the ID from the state if you want it saved at the top level
          customer_id: measurements.customer_id,
        },
        { merge: true },
      );

      // 2. Add the specific measurement record to the sub-collection
      await addDoc(
        collection(db, "customerMeasurement", customer.id, "measurements"),
        {
          ...measurements,
          createdAt: new Date(),
        },
      );

      // 3. Reset the form with "dress" as the default type
      setMeasurements({
        customer_id: customer.id,
        customer_Name: customer.customerName,
        customer_Number: customer.customerNumber,
        TypeCloth: "dress", // Changed from blouse to dress
        bust: "",
        waist: "",
        shoulder: "",
        sleeveLength: "",
        blouseLength: "",
        neckDepthFront: "",
        neckDepthBack: "",
        armRound: "",
        specialNotes: "",
        // Reset all custom tree/grid fields
        m7: "",
        m8: "",
        m9: "",
        m10: "",
        m11: "",
        m12: "",
        m13: "",
        m14: "",
        m15: "",
        m16: "",
        m17: "",
        m18: "",
        m19: "",
        m20: "",
        m21: "",
        m22: "",
        m23: "",
      });

      // Optional: Add a success alert or toast here
      alert("Record saved successfully!");
    } catch (error) {
      console.error("Error saving document: ", error);
      setError("Error: " + error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collectionGroup(db, "measurements"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAllMeasurements(data);
      },
    );

    return () => unsubscribe();
  }, []);

  const deleteMeasurement = async (id, customer_id) => {
    // Guard check: ensure we have both IDs required for the subcollection path
    if (!id || !customer_id) {
      setError("Error: Missing ID for deletion");
      return;
    }

    try {
      // 1. Delete from Firestore
      await deleteDoc(
        doc(db, "customerMeasurement", customer_id, "measurements", id),
      );

      await deleteDoc(doc(db, "customerMeasurement", customer_id));

      // 2. Full Reset of the Measurements state (including all m-series fields)
      setMeasurements({
        customer_id: customer.id,
        customer_Number: customer.customerNumber,
        customer_Name: customer.customerName,
        TypeCloth: "dress", // Default to your primary type
        bust: "",
        waist: "",
        shoulder: "",
        sleeveLength: "",
        blouseLength: "",
        neckDepthFront: "",
        neckDepthBack: "",
        armRound: "",
        specialNotes: "",
        // Important: Clear out the pattern specs so they don't linger in the UI
        m7: "",
        m8: "",
        m9: "",
        m10: "",
        m11: "",
        m12: "",
        m13: "",
        m14: "",
        m15: "",
        m16: "",
        m17: "",
        m18: "",
        m19: "",
        m20: "",
        m21: "",
        m22: "",
        m23: "",
      });

      // 3. UI Cleanup
      setError("Record deleted successfully");
      setItemToDelete(null);
      setEditId(""); // Clear edit state if the item deleted was being edited

      // 4. Close Modals
      window.location.hash = "";
    } catch (error) {
      console.error("Delete Error:", error);
      setError("Error : " + error.message);
    }
  };

  const filterMeasurementData = () => {
    return allMeasurements.filter((e) =>
      e.customer_Name?.toLowerCase().includes(SearchItem?.toLowerCase()),
    );
  };

  const handleEditClick = (item) => {
    setEditId(item.id); // ✅ VERY IMPORTANT

    setMeasurements({
      // Main Identifiers
      customer_id: item?.customer_id || "",
      customer_Number: item?.customer_Number || "",
      customer_Name: item?.customer_Name || "",
      TypeCloth: item?.TypeCloth || "dress",

      // Core Measurements
      bust: item?.bust || "",
      waist: item?.waist || "",
      shoulder: item?.shoulder || "",
      sleeveLength: item?.sleeveLength || "",
      blouseLength: item?.blouseLength || "",
      neckDepthFront: item?.neckDepthFront || "",
      neckDepthBack: item?.neckDepthBack || "",
      armRound: item?.armRound || "",
      specialNotes: item?.specialNotes || "",

      // Added Grid Fields (m7 to m23)
      m7: item?.m7 || "",
      m8: item?.m8 || "",
      m9: item?.m9 || "",
      m10: item?.m10 || "",
      m11: item?.m11 || "",
      m12: item?.m12 || "",
      m13: item?.m13 || "",
      m14: item?.m14 || "",
      m15: item?.m15 || "",
      m16: item?.m16 || "",
      m17: item?.m17 || "",
      m18: item?.m18 || "",
      m19: item?.m19 || "",
      m20: item?.m20 || "",
      m21: item?.m21 || "",
      m22: item?.m22 || "",
      m23: item?.m23 || "",
    });
  };

  // hashing value clear
  useEffect(() => {
    const handleHashChange = () => {
      // If the URL no longer contains the modal ID, reset the fields
      if (!window.location.hash.includes("modal-view-measure")) {
        setMeasurements((prev) => ({
          ...prev, // Keep current state first
          // Reset only the measurement fields
          TypeCloth: "blouse",
          // bust: "",
          // waist: "",
          // shoulder: "",
          // sleeveLength: "",
          // blouseLength: "",
          // neckDepthFront: "",
          // neckDepthBack: "",
          // armRound: "",
          // specialNotes: "",
          // Note: customer_id, Name, and Number remain what they were
          // because we aren't overwriting them here.
        }));
      }
    };

    // Listen for the hash change event
    window.addEventListener("hashchange", handleHashChange);

    // Clean up the listener when component unmounts
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const Update_all_measurementData = async () => {
    // Guard clause to prevent updating without an ID
    if (!editId || !measurements.customer_id) {
      setError("No record selected to update");
      return;
    }

    try {
      const docRef = doc(
        db,
        "customerMeasurement",
        measurements.customer_id,
        "measurements",
        editId,
      );

      await updateDoc(docRef, {
        ...measurements,
        lastUpdated: new Date().toISOString(), // Good for record keeping
      });

      // 1. Show Success Message
      setError("Record updated successfully!");

      // 2. Reset the form to blank (including all m7-m23 fields)
      setMeasurements({
        customer_id: customer.id,
        customer_Name: customer.customerName,
        customer_Number: customer.customerNumber,
        TypeCloth: "dress",
        bust: "",
        waist: "",
        shoulder: "",
        sleeveLength: "",
        blouseLength: "",
        neckDepthFront: "",
        neckDepthBack: "",
        armRound: "",
        specialNotes: "",
        // Reset all pattern fields
        m7: "",
        m8: "",
        m9: "",
        m10: "",
        m11: "",
        m12: "",
        m13: "",
        m14: "",
        m15: "",
        m16: "",
        m17: "",
        m18: "",
        m19: "",
        m20: "",
        m21: "",
        m22: "",
        m23: "",
      });

      // 3. Clear Edit ID and close modal/form view
      setEditId("");
      window.location.hash = "#"; // Close the modal if it's open via hash
    } catch (error) {
      console.error("Update Error:", error);
      setError("Error Updating: " + error.message);
    }
  };

  const getAvatarColor = (name) => {
    const firstLetter = name?.charAt(0).toUpperCase() || "U";

    // Map letters to specific Tailwind colors
    const colors = {
      A: "bg-red-800",
      B: "bg-blue-800",
      C: "bg-green-800",
      D: "bg-yellow-700",
      E: "bg-indigo-800",
      F: "bg-purple-800",
      G: "bg-pink-800",
      H: "bg-orange-700",
      I: "bg-teal-800",
      J: "bg-cyan-800",
      K: "bg-lime-700",
      L: "bg-amber-700",
      M: "bg-emerald-800",
      N: "bg-violet-800",
      O: "bg-fuchsia-800",
      P: "bg-rose-950",
      Q: "bg-sky-800",
      R: "bg-stone-700",
      S: "bg-neutral-700",
      T: "bg-zinc-700",
      U: "bg-gray-700",
      V: "bg-slate-700",
      W: "bg-red-600",
      X: "bg-blue-600",
      Y: "bg-green-600",
      Z: "bg-yellow-600",

      // ... add more or use a default
    };

    return colors[firstLetter] || "bg-slate-700"; // Default color
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <style>{`
        :root {
            --midnight: #0B0F19;
            --berry: #581C1E;
            --off-white: #F9F7F5;
        }

        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: var(--off-white);
            margin: 0;
            overflow-x: hidden;
        }

        h1,
        h2,
        h3,
        h4,
        h5 {
            font-family: 'Outfit', sans-serif;
        }

        /* ── Marquee ── */
        .marquee-wrapper {
            background: var(--berry);
            white-space: nowrap;
            overflow: hidden;
            display: flex;
            align-items: center;
            height: 40px;
        }

        .marquee-content {
            display: inline-flex;
            animation: scroll-left 40s linear infinite;
        }

        @keyframes scroll-left {
            0% {
                transform: translateX(0);
            }

            100% {
                transform: translateX(-50%);
            }
        }

        /* ── Form input focus ── */
        input:focus,
        select:focus,
        textarea:focus {
            outline: none;
        }

        /* ── Table row hover ── */
        .table-row-hover:hover {
            background-color: #f1f5f9;
            transition: background 0.2s ease;
        }

        /* ── Action button lift ── */
        .action-btn {
            transition: all 0.18s cubic-bezier(.4, 0, .2, 1);
        }

        .action-btn:hover {
            transform: translateY(-2px);
        }

        /* ── Cloth type card selected state (CSS-only visual) ── */
        .cloth-card {
            transition: all 0.18s cubic-bezier(.4, 0, .2, 1);
            cursor: pointer;
        }

        .cloth-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.10);
        }

        /* ── Scrollbar ── */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }

        ::-webkit-scrollbar-track {
            background: transparent;
        }

        ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 99px;
        }

        /* ── Section divider label ── */
        .section-label {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 1.25rem;
        }

        .section-label::after {
            content: '';
            flex: 1;
            height: 1px;
            background: #e7e5e4;
        }

        /* ── Measurement grid input ── */
        .measure-input {
            width: 100%;
            padding: 0.75rem 1rem;
            border-radius: 0.75rem;
            background: #f9f7f5;
            border: 1.5px solid #e7e5e4;
            font-size: 0.875rem;
            font-weight: 500;
            color: #1e293b;
            font-family: 'Plus Jakarta Sans', sans-serif;
            transition: border-color 0.15s, background 0.15s;
        }

        .measure-input:focus {
            border-color: #991b1b;
            background: #fff;
        }

        .measure-input::placeholder {
            color: #94a3b8;
        }

        /* ── Unit badge inside input wrapper ── */
        .unit-badge {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.1em;
            color: #94a3b8;
            text-transform: uppercase;
            pointer-events: none;
            font-family: 'Outfit', sans-serif;
        }

        /* ── CSS :target modals ── */
        .modal-wrap {
            display: none;
            position: fixed;
            inset: 0;
            z-index: 200;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }

        .modal-wrap:target {
            display: flex;
        }

        .modal-backdrop {
            backdrop-filter: blur(6px);
            background: rgba(11, 15, 25, 0.6);
            position: absolute;
            inset: 0;
        }

        .modal-in {
            animation: modalIn 0.22s cubic-bezier(.4, 0, .2, 1);
        }

        @keyframes modalIn {
            from {
                opacity: 0;
                transform: scale(0.96) translateY(16px);
            }

            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }

        /* ── Required asterisk ── */
        .req {
            color: #991b1b;
            font-size: 11px;
            margin-left: 2px;
        }

        /* Chrome, Safari, Edge */
        .no-spinner::-webkit-outer-spin-button,
        .no-spinner::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        .no-spinner {
          -moz-appearance: textfield;
        }
    `}</style>

      {Error && <h1>{Error}</h1>}
      {customer && (
        <h1 className="mt-0 mb-1 ">
          ID : {customer.id} <br />
          {customer.customerName} : {customer.customerNumber}
        </h1>
      )}

      {/* add Measurement */}
      <div
        id="add-measurement-form"
        className="bg-slate-400 mt-10 rounded-[2.5rem] shadow-2xl border border-stone-100 overflow-hidden mb-10 max-w-200 mx-auto font-outfit"
      >
        {/* --- TOP HEADER SECTION (ID, NAME, NUMBER, CLOTH) --- */}
        <div className="bg-blue-950 px-8 py-8 text-white rounded-t-[2rem] shadow-2xl relative overflow-hidden">
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>

          <div className="flex justify-between items-start mb-8 relative z-10">
            {/* ID Number Box - Enhanced with Glassmorphism */}
            <div className="w-20">
              <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-rose-200/40 mb-2 text-center">
                ID No.
              </label>
              <div className="relative group">
                <input
                  type="text"
                  name="customer_id"
                  maxLength={2}
                  value={measurements?.customer_id || ""}
                  onChange={handleChange}
                  spellCheck="false"
                  className="w-44 bg-white/5 border border-white/10 rounded-2xl py-1 text-center text-sm font-black text-rose-50 outline-none focus:border-rose-500/50 focus:bg-white/10 transition-all shadow-inner"
                  placeholder="00"
                />
                <div className="absolute inset-0 rounded-2xl bg-rose-500/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
              </div>
            </div>

            {/* Branding Section */}
            <div className="text-right">
              <h1 className="text-[11px] font-black uppercase tracking-[0.4em] text-rose-100 leading-none">
                Yogeshwar Tailor
              </h1>
              <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-rose-200/40 mt-1">
                Premium Stitching Studio
              </p>
              <div className="h-1 w-10 bg-gradient-to-r from-transparent to-rose-500 ml-auto mt-2 rounded-full"></div>
            </div>
          </div>

          <div className="space-y-6 relative z-10">
            {/* Customer Name Input */}
            <div className="relative group">
              <label className="text-[8px] font-black text-rose-200/40 uppercase tracking-widest mb-1 block ml-1">
                Full Name
              </label>
              <input
                type="text"
                name="customer_Name"
                value={measurements.customer_Name || ""}
                onChange={handleChange}
                required
                spellCheck="false"
                placeholder="Enter Customer Name"
                className="w-full bg-transparent border-b-2 border-white/10 py-2 text-xl font-extrabold text-white outline-none placeholder:text-white/10 focus:border-rose-500 transition-all duration-300"
              />
            </div>

            <div className="flex gap-8">
              {/* Contact Input */}
              <div className="flex-1 relative group">
                <label className="text-[8px] font-black text-rose-200/40 uppercase tracking-widest mb-1 block ml-1">
                  Contact Number
                </label>
                <div className="flex items-center gap-2 border-b-2 border-white/10 focus-within:border-rose-500 transition-all duration-300">
                  <span className="material-symbols-outlined text-xs text-rose-200/30">
                    call
                  </span>
                  <input
                    type="number"
                    name="customer_Number"
                    value={measurements.customer_Number || ""}
                    onChange={handleChange}
                    required
                    placeholder="98765 43210"
                    className="w-full bg-transparent py-2 text-sm font-bold text-white outline-none placeholder:text-white/10"
                  />
                </div>
              </div>

              {/* Cloth Type Input */}
              <div className="w-2/5 relative group">
                <label className="text-[8px] font-black text-rose-200/40 uppercase tracking-widest mb-1 block ml-1">
                  Garment Type
                </label>
                <div className="flex items-center gap-2 border-b-2 border-white/10 focus-within:border-rose-500 transition-all duration-300">
                  <span className="material-symbols-outlined text-xs text-rose-200/30">
                    styler
                  </span>
                  <input
                    type="text"
                    name="TypeCloth"
                    value={measurements.TypeCloth || ""}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Blouse"
                    className="w-full bg-transparent py-2 text-sm font-bold text-white outline-none placeholder:text-white/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- MEASUREMENT TREE SECTION --- */}
        <form onSubmit={handleSubmit} className="p-8 bg-slate-50/30">
          <div className="flex flex-col items-center">
            {/* 1. Bust (Top of Tree) */}
            <div className="w-20">
              <input
                type="number"
                name="bust"
                value={measurements.bust}
                onChange={handleChange}
                placeholder="Bust"
                className="measure-input text-center text-2xl font-black text-red-800 border-2 border-blue-900 bg-white rounded-2xl shadow-sm outline-none"
              />
            </div>

            <div className="h-6 w-px border-l-2 border-dotted border-slate-300 my-1"></div>

            {/* 2. Waist */}
            <div className="w-24">
              <input
                type="number"
                name="waist"
                value={measurements.waist}
                onChange={handleChange}
                className="measure-input text-center font-bold bg-white"
                placeholder="Waist"
              />
            </div>

            <div className="h-6 w-px border-l-2 border-dotted border-slate-300 my-1"></div>

            {/* --- CROSS SECTION --- */}
            <div className="w-full flex justify-between items-start gap-4 px-2">
              {/* Left Side: Vertical 4 */}
              <div className="flex flex-col space-y-2 w-24">
                <input
                  type="number"
                  name="shoulder"
                  value={measurements.shoulder}
                  onChange={handleChange}
                  className="measure-input text-center bg-white py-2"
                  placeholder="Shldr"
                />
                <input
                  type="number"
                  name="sleeveLength"
                  value={measurements.sleeveLength}
                  onChange={handleChange}
                  className="measure-input text-center bg-white py-2"
                  placeholder="Slve"
                />
                <input
                  type="number"
                  name="blouseLength"
                  value={measurements.blouseLength}
                  onChange={handleChange}
                  className="measure-input text-center bg-white py-2"
                  placeholder="Bl-L"
                />
                <input
                  type="number"
                  name="armRound"
                  value={measurements.armRound}
                  onChange={handleChange}
                  className="measure-input text-center bg-white py-2"
                  placeholder="Arm"
                />
              </div>

              {/* Right Side: 2 * 4 Grid */}
              <div className="grid grid-cols-2 gap-2 flex-1 max-w-[180px]">
                <input
                  type="number"
                  name="m7"
                  value={measurements.m7}
                  onChange={handleChange}
                  className="measure-input text-center bg-white py-2 text-xs"
                  placeholder="no"
                />
                <input
                  type="number"
                  name="m8"
                  value={measurements.m8}
                  onChange={handleChange}
                  className="measure-input text-center bg-white py-2 text-xs"
                  placeholder="no"
                />
                <input
                  type="number"
                  name="m9"
                  value={measurements.m9}
                  onChange={handleChange}
                  className="measure-input text-center bg-white py-2 text-xs"
                  placeholder="no"
                />
                <input
                  type="number"
                  name="m10"
                  value={measurements.m10}
                  onChange={handleChange}
                  className="measure-input text-center bg-white py-2 text-xs"
                  placeholder="no"
                />
                <input
                  type="number"
                  name="m11"
                  value={measurements.m11}
                  onChange={handleChange}
                  className="measure-input text-center bg-white py-2 text-xs"
                  placeholder="no"
                />
                <input
                  type="number"
                  name="m12"
                  value={measurements.m12}
                  onChange={handleChange}
                  className="measure-input text-center bg-white py-2 text-xs"
                  placeholder="no"
                />
                <input
                  type="number"
                  name="m13"
                  value={measurements.m13}
                  onChange={handleChange}
                  className="measure-input text-center bg-white py-2 text-xs"
                  placeholder="no"
                />
                <input
                  type="number"
                  name="m14"
                  value={measurements.m14}
                  onChange={handleChange}
                  className="measure-input text-center bg-white py-2 text-xs"
                  placeholder="no"
                />
              </div>
            </div>

            <div className="py-6 flex flex-col items-center">
              <div className="w-12 h-px bg-slate-200"></div>
            </div>

            {/* Row: Necks */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-[320px]">
              <input
                type="number"
                name="neckDepthFront"
                value={measurements.neckDepthFront}
                onChange={handleChange}
                placeholder="Neck F"
                className="measure-input text-center text-xs py-3 bg-white"
              />
              <input
                type="number"
                name="neckDepthBack"
                value={measurements.neckDepthBack}
                onChange={handleChange}
                placeholder="Neck B"
                className="measure-input text-center text-xs py-3 bg-white"
              />
              <input
                type="number"
                name="m15"
                value={measurements.m15}
                onChange={handleChange}
                placeholder="no"
                className="measure-input text-center text-xs py-3 bg-white"
              />
            </div>

            {/* Extra Input Area */}
            <div className="w-full mt-4">
              <textarea
                name="specialNotes"
                rows="2"
                value={measurements.specialNotes}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl bg-white border border-slate-200 text-sm focus:border-blue-900 transition-all outline-none italic"
                placeholder="Special Notes"
              ></textarea>
            </div>

            <div className="h-8"></div>

            {/* Bottom Branch 1 */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-[320px]">
              <input
                type="number"
                name="m16"
                value={measurements.m16}
                onChange={handleChange}
                placeholder="no"
                className="measure-input text-center text-xs py-3 bg-white border-blue-50"
              />
              <input
                type="number"
                name="m17"
                value={measurements.m17}
                onChange={handleChange}
                placeholder="no"
                className="measure-input text-center text-xs py-3 bg-white border-blue-50"
              />
              <input
                type="number"
                name="m18"
                value={measurements.m18}
                onChange={handleChange}
                placeholder="no"
                className="measure-input text-center text-xs py-3 bg-white border-blue-50"
              />
            </div>

            {/* Bottom Branch 2 */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-[320px] mt-3">
              <input
                type="number"
                name="m19"
                value={measurements.m19}
                onChange={handleChange}
                placeholder="no"
                className="measure-input text-center text-xs py-3 bg-white border-blue-50"
              />
              <input
                type="number"
                name="m20"
                value={measurements.m20}
                onChange={handleChange}
                placeholder="no"
                className="measure-input text-center text-xs py-3 bg-white border-blue-50"
              />
              <input
                type="number"
                name="m21"
                value={measurements.m21}
                onChange={handleChange}
                placeholder="no"
                className="measure-input text-center text-xs py-3 bg-white border-blue-50"
              />
            </div>

            {/* ── NEW: Bottom Branch 3 (m22 & m23) ── */}
            <div className="grid grid-cols-2  gap-3 w-full max-w-[200px] mt-3">
              <input
                type="number"
                name="m22"
                value={measurements.m22}
                onChange={handleChange}
                placeholder="no"
                className="measure-input text-center text-xs py-3 bg-white border-blue-50"
              />
              <input
                type="number"
                name="m23"
                value={measurements.m23}
                onChange={handleChange}
                placeholder="no"
                className="measure-input text-center text-xs py-3 bg-white border-blue-50"
              />
            </div>

            {/* --- BUTTONS --- */}
            <div className="w-full pt-10 space-y-3">
              <button
                type="submit"
                className="w-full bg-blue-950 text-white py-5 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.25em] shadow-2xl hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined text-base">
                  save
                </span>
                Save Record
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={Update_all_measurementData}
                  className="flex-1 bg-emerald-900 text-slate-200 py-2 rounded-2xl font-bold text-[16px] hover:bg-emerald-800"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 border bg-rose-900 border-slate-200 text-bold text-rose-200 py-3 rounded-2xl font-bold text-[16px] hover:bg-rose-950 hover:text-red-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <button
        onClick={() => router.push("/admin/ManageCustomernameUI")}
        className="flex items-center gap-2 px-5 py-2.5 mb-10 rounded-lg bg-gradient-to-r from-slate-800 to-blue-900 text-white font-medium shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 active:scale-95"
      >
        {/* Google-style back arrow icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back Users ( Admin Screen )
      </button>
      {/* end form card */}
      <div>
        {/* Table Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-3 mb-0.5">
              <span className="w-4 h-[2px] bg-red-800"></span>
              <span className="text-red-800 font-extrabold text-[11px] uppercase tracking-[0.3em]">
                Records
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">
              Measurement History
            </h2>
          </div>

          {/* Search bar */}
          <div className="flex flex-row sm:flex-row gap-2 sm:gap-3 items-center">
            {/* Search Input - Shrinks on mobile to save space */}
            <div className="relative flex-1 sm:flex-none">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                search
              </span>
              <input
                type="text"
                value={SearchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                placeholder="Search..."
                className="pl-9 pr-2 py-2.5 sm:py-3 rounded-xl bg-white border border-stone-200 text-sm font-medium placeholder-slate-400 focus:border-red-800 transition-all w-full sm:w-56"
              />
            </div>

            {/* Filter Dropdown - Compact on mobile */}
            <div className="relative flex-1 sm:flex-none">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                filter_list
              </span>
              <select className="pl-9 pr-8 py-2.5 sm:py-3 rounded-xl bg-white border border-stone-200 text-sm font-medium text-slate-700 focus:border-red-800 transition-colors appearance-none cursor-pointer w-full sm:min-w-[160px]">
                <option>All Types</option>
                <option>Indian Blouse</option>
                <option>Kurti/Salwar</option>
                {/* These options remain available in the dropdown list, 
          but the UI stays thin due to 'w-full' on a flex-1 container */}
                <option className="hidden sm:block">Kurti with Pant</option>
                <option className="hidden sm:block">Chaniya Choli</option>
                <option className="hidden sm:block">Western Dress</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* Table Card for searching*/}
        <div className="bg-olive-300 rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-950 border-b border-stone-100">
                  <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 w-12">
                    #
                  </th>
                  <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Customer
                  </th>
                  <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Contact
                  </th>
                  {/* <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Cloth Type
                  </th> */}
                  <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Date
                  </th>
                  {/* <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Status
                  </th> */}
                  <th className="px-5 py-4 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>
              {filterMeasurementData().map((item) => (
                <tbody key={item.id}>
                  {/* Row 1 */}
                  <tr className="table-row-hover border-b border-stone-50">
                    <td className="px-5 py-4 text-slate-400 text-sm font-medium">
                      {item?.id || ""}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl ${getAvatarColor(item?.customer_Name)} flex items-center justify-center text-white text-xs font-black shrink-0`}
                        >
                          {item?.customer_Name?.slice(0, 2).toUpperCase() || ""}
                        </div>
                        <span className="font-semibold text-slate-800">
                          {item?.customer_Name || ""}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-slate-500 font-medium text-sm">
                        <span className="material-symbols-outlined text-slate-400 text-base">
                          call
                        </span>
                        {item?.customer_Number || ""}
                      </div>
                    </td>
                    {/* <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 bg-olive-200 text-slate-800 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                        <span className="material-symbols-outlined text-sm">
                          checkroom
                        </span>{" "}
                        {item?.TypeCloth || ""}
                      </span>
                    </td> */}
                    <td className="px-5 py-4 text-slate-500 text-sm font-medium">
                      {item?.createdAt?.seconds
                        ? new Date(
                            item.createdAt.seconds * 1000,
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "No date"}
                    </td>
                    {/* <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                      <span className="material-symbols-outlined text-sm">
                        check_circle
                      </span>{" "}
                      Completed
                    </span>
                  </td> */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* TODO: Add JavaScript functionality for View Measurement (open view modal with this row's data) */}
                        <a
                          href="#modal-view-measure"
                          onClick={() => handleEditClick(item)}
                          className="action-btn w-9 h-9 rounded-xl bg-stone-100 hover:bg-blue-950 hover:text-rose-50 flex items-center justify-center transition-all"
                          title="View Measurements"
                        >
                          <span className="material-symbols-outlined text-sm">
                            visibility
                          </span>
                        </a>

                        {/* Edit Measurement Button */}
                        <a
                          href="#add-measurement-form"
                          onClick={() => {
                            setEditId(item.id); // Set the ID first to trigger edit mode
                            setMeasurements({
                              customer_id: item.customer_id || "",
                              customer_Name: item.customer_Name || "",
                              customer_Number: item.customer_Number || "",
                              TypeCloth: item.TypeCloth || "dress", // Updated default
                              bust: item.bust || "",
                              waist: item.waist || "",
                              shoulder: item.shoulder || "",
                              sleeveLength: item.sleeveLength || "",
                              blouseLength: item.blouseLength || "",
                              neckDepthFront: item.neckDepthFront || "",
                              neckDepthBack: item.neckDepthBack || "",
                              armRound: item.armRound || "",
                              specialNotes: item.specialNotes || "",

                              // ✅ Populate the new grid fields from the item data
                              m7: item.m7 || "",
                              m8: item.m8 || "",
                              m9: item.m9 || "",
                              m10: item.m10 || "",
                              m11: item.m11 || "",
                              m12: item.m12 || "",
                              m13: item.m13 || "",
                              m14: item.m14 || "",
                              m15: item.m15 || "",
                              m16: item.m16 || "",
                              m17: item.m17 || "",
                              m18: item.m18 || "",
                              m19: item.m19 || "",
                              m20: item.m20 || "",
                              m21: item.m21 || "",
                              m22: item.m22 || "",
                              m23: item.m23 || "",
                            });
                          }}
                          className="action-btn w-9 h-9 rounded-xl bg-stone-100 hover:bg-emerald-700 hover:text-white flex items-center justify-center transition-all"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-sm">
                            edit
                          </span>
                        </a>

                        {/* TODO: Add JavaScript functionality for Delete Measurement (confirm & delete this record) */}
                        <a
                          href="#modal-delete-confirm"
                          onClick={() => setItemToDelete(item)}
                          className="action-btn w-9 h-9 rounded-xl bg-stone-100 hover:bg-red-700 hover:text-white flex items-center justify-center transition-all"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-sm">
                            delete
                          </span>
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
          {/* end desktop table */}

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-stone-100">
            {filterMeasurementData().map((item) => (
              <div
                key={item.id}
                className="p-5 hover:bg-stone-50 transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  {/* Profile Icon with Initials */}
                  <div
                    className={`w-11 h-11 rounded-xl ${getAvatarColor(item?.customer_Name.slice(0, 2).toUpperCase() || "NA")}  flex items-center justify-center text-white font-black shrink-0 text-sm`}
                  >
                    {item?.customer_Name?.slice(0, 2).toUpperCase() || "NA"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 truncate">
                      {item?.customer_Name || "Unnamed Customer"}
                    </p>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-sm">
                        call
                      </span>
                      {item?.customer_Number || "No Number"}
                    </p>
                  </div>

                  <div className="flex gap-1.5 shrink-0">
                    {/* Action: View */}
                    <a
                      href="#modal-view-measure"
                      onClick={() => handleEditClick(item)}
                      className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-blue-950 hover:text-rose-50 flex items-center justify-center transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">
                        visibility
                      </span>
                    </a>

                    {/* Action: Edit */}
                    <a
                      href="#add-measurement-form"
                      onClick={() => {
                        // 1. Set the Edit ID first to signal the form is in 'Update' mode
                        setEditId(item.id);

                        // 2. Populate the entire state object
                        setMeasurements({
                          // IDs and Info
                          customer_id: item.customer_id || "",
                          customer_Name: item.customer_Name || "",
                          customer_Number: item.customer_Number || "",
                          TypeCloth: item.TypeCloth || "dress", // Defaulting to dress as per your requirement

                          // Core Measurements
                          bust: item.bust || "",
                          waist: item.waist || "",
                          shoulder: item.shoulder || "",
                          sleeveLength: item.sleeveLength || "",
                          blouseLength: item.blouseLength || "",
                          neckDepthFront: item.neckDepthFront || "",
                          neckDepthBack: item.neckDepthBack || "",
                          armRound: item.armRound || "",
                          specialNotes: item.specialNotes || "",

                          // Added Logic: Grid and Branch fields (m7 - m23)
                          m7: item.m7 || "",
                          m8: item.m8 || "",
                          m9: item.m9 || "",
                          m10: item.m10 || "",
                          m11: item.m11 || "",
                          m12: item.m12 || "",
                          m13: item.m13 || "",
                          m14: item.m14 || "",
                          m15: item.m15 || "",
                          m16: item.m16 || "",
                          m17: item.m17 || "",
                          m18: item.m18 || "",
                          m19: item.m19 || "",
                          m20: item.m20 || "",
                          m21: item.m21 || "",
                          m22: item.m22 || "",
                          m23: item.m23 || "",
                        });
                      }}
                      className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-emerald-700 hover:text-white flex items-center justify-center transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">
                        edit
                      </span>
                    </a>

                    {/* Action: Delete */}
                    <a
                      href="#modal-delete-confirm"
                      onClick={() => setItemToDelete(item)}
                      className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-red-700 hover:text-white flex items-center justify-center transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">
                        delete
                      </span>
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Cloth Type Tag */}
                  <span className="inline-flex items-center gap-1 bg-red-50 text-red-800 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                    <span className="material-symbols-outlined text-xs">
                      checkroom
                    </span>
                    {item?.TypeCloth || "General"}
                  </span>

                  {/* Dynamic Date */}
                  <span className="text-[10px] text-slate-400 font-medium">
                    {item?.createdAt?.seconds
                      ? new Date(
                          item.createdAt.seconds * 1000,
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "No date"}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* end mobile cards */}
        </div>
        {/* end table card */}
      </div>

      {/* select alert open when user cllick on button of customer */}
      {/* {selectedMeasure.map((item) => (
        <div key={item.id}> */}
      <div id="modal-view-measure" className="modal-wrap">
        <button className="modal-backdrop"></button>
        <div className="modal-in relative bg-white rounded-3xl shadow-2xl w-full max-w-lg border border-stone-100 overflow-hidden">
          {/* Modal Header - STYLING PRESERVED */}
          <div className="bg-blue-950 px-7 py-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-200/70 mb-0.5">
                  Measurement Record
                </p>
                <h2 className="text-2xl font-extrabold text-rose-50">
                  {measurements.customer_Name || "Select Record"}
                </h2>
              </div>
              <button
                onClick={() => {
                  // 1. Reset data
                  setMeasurements({
                    customer_id: customer.id,
                    customer_Name: customer.customerName,
                    customer_Number: customer.customerNumber,
                    TypeCloth: "dress",
                    bust: "",
                    waist: "",
                    shoulder: "",
                    sleeveLength: "",
                    blouseLength: "",
                    neckDepthFront: "",
                    neckDepthBack: "",
                    armRound: "",
                    specialNotes: "",
                    m7: "",
                    m8: "",
                    m9: "",
                    m10: "",
                    m11: "",
                    m12: "",
                    m13: "",
                    m14: "",
                    m15: "",
                    m16: "",
                    m17: "",
                    m18: "",
                    m19: "",
                    m20: "",
                    m21: "",
                    m22: "",
                    m23: "",
                  });
                  // 2. CLOSE THE MODAL UI
                  window.location.hash = "#";
                }}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-rose-100 hover:bg-red-800 transition-all"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <span className="inline-flex items-center gap-1.5 bg-white/10 text-rose-100 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                <span className="material-symbols-outlined text-sm">
                  checkroom
                </span>{" "}
                {measurements.TypeCloth}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 text-rose-100 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                <span className="material-symbols-outlined text-sm">phone</span>{" "}
                {measurements.customer_Number}
              </span>
            </div>
          </div>

          {/* Measurement Body - NEW STRUCTURE, SAME STYLING */}
          <div className="px-7 py-6 overflow-y-auto max-h-[50vh] bg-slate-50/30">
            <div className="flex flex-col items-center">
              {/* 1. BUST (Top of Tree) */}
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
                Bust
              </p>
              <div className="w-24 bg-white border-2 border-blue-900 rounded-2xl py-2.5 shadow-sm flex flex-col items-center">
                <span className="text-2xl font-black text-red-800 leading-none">
                  {measurements.bust || "0"}
                </span>
                <span className="text-[8px] font-bold text-slate-300 uppercase mt-0.5">
                  inches
                </span>
              </div>

              {/* Connector */}
              <div className="h-6 w-px border-l-2 border-dotted border-slate-300 my-1"></div>

              {/* 2. WAIST */}
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
                Waist
              </p>
              <div className="w-24 bg-white border border-slate-200 rounded-xl py-2 shadow-sm text-center">
                <span className="font-bold text-slate-700">
                  {measurements.waist || "0"}
                </span>
              </div>

              {/* Connector */}
              <div className="h-6 w-px border-l-2 border-dotted border-slate-300 my-1"></div>

              {/* --- CROSS SECTION (The Side-by-Side Area) --- */}
              <div className="w-full flex justify-between items-start gap-4 px-2 mt-2">
                {/* Left Side: Core Measurements (Shoulder to Arm Round) */}
                <div className="flex flex-col space-y-2 w-28">
                  {[
                    { label: "Shldr", val: measurements.shoulder },
                    { label: "Slve", val: measurements.sleeveLength },
                    { label: "Bl-L", val: measurements.blouseLength },
                    { label: "Arm", val: measurements.armRound },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white border border-slate-100 p-2.5 rounded-xl shadow-sm flex justify-between items-center"
                    >
                      <span className="text-[9px] font-black text-slate-400 uppercase">
                        {item.label}
                      </span>
                      <span className="font-extrabold text-blue-950">
                        {item.val || "0"}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Right Side: 2x4 Pattern Grid (m7 to m14) */}
                <div className="grid grid-cols-2 gap-1.5 flex-1 max-w-[180px] bg-stone-100/50 p-2 rounded-2xl border border-stone-200">
                  {["m7", "m8", "m9", "m10", "m11", "m12", "m13", "m14"].map(
                    (key) => (
                      <div
                        key={key}
                        className="bg-white rounded-lg p-2 border border-stone-50 text-center"
                      >
                        <p className="text-[8px] font-black text-slate-300 uppercase mb-0.5">
                          {key}
                        </p>
                        <p className="text-sm font-black text-blue-900 leading-none">
                          {measurements[key] || "-"}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Divider Line */}
              <div className="py-8 flex flex-col items-center">
                <div className="w-16 h-px bg-slate-200"></div>
              </div>

              {/* Row: Necks & m15 */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-[340px]">
                {[
                  { label: "Neck F", val: measurements.neckDepthFront },
                  { label: "Neck B", val: measurements.neckDepthBack },
                  { label: "Ref m15", val: measurements.m15 },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white border border-slate-200 rounded-xl p-2.5 text-center shadow-sm"
                  >
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm font-extrabold text-slate-800">
                      {item.val || "0"}
                    </p>
                  </div>
                ))}
              </div>

              {/* SPECIAL NOTES */}
              <div className="w-full mt-6 bg-amber-50/70 border border-amber-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-amber-600 text-sm">
                    description
                  </span>
                  <p className="text-[9px] font-black text-amber-700 uppercase tracking-widest">
                    Special Instructions
                  </p>
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  {measurements.specialNotes ||
                    "No specific instructions provided."}
                </p>
              </div>

              {/* BOTTOM BRANCHES (m16 to m21) */}
              <div className="w-full max-w-[340px] mt-6 space-y-3">
                {/* Branch Row 1 */}
                <div className="grid grid-cols-3 gap-3">
                  {["m16", "m17", "m18"].map((key) => (
                    <div
                      key={key}
                      className="bg-white border border-blue-50 rounded-xl p-2.5 text-center shadow-sm"
                    >
                      <p className="text-[8px] font-black text-slate-300 uppercase mb-0.5">
                        {key}
                      </p>
                      <p className="text-sm font-bold text-blue-900">
                        {measurements[key] || "0"}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Branch Row 2 */}
                <div className="grid grid-cols-3 gap-3">
                  {["m19", "m20", "m21"].map((key) => (
                    <div
                      key={key}
                      className="bg-white border border-blue-50 rounded-xl p-2.5 text-center shadow-sm"
                    >
                      <p className="text-[8px] font-black text-slate-300 uppercase mb-0.5">
                        {key}
                      </p>
                      <p className="text-sm font-bold text-blue-900">
                        {measurements[key] || "0"}
                      </p>
                    </div>
                  ))}
                </div>
                {/* ── NEW: Branch Row 3 (m22 & m23) ── */}
                <div className="grid grid-cols-2 gap-3">
                  {["m22", "m23"].map((key) => (
                    <div
                      key={key}
                      className="bg-white border border-blue-50 rounded-xl p-2.5 text-center shadow-sm"
                    >
                      <p className="text-[8px] font-black text-slate-300 uppercase mb-0.5">
                        {key}
                      </p>
                      <p className="text-sm font-bold text-blue-900">
                        {measurements[key] || "0"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer - STYLING PRESERVED */}
          <div className="px-7 pb-7 flex gap-3 border-t border-stone-100 pt-5 bg-white">
            <button
              onClick={() => {
                window.location.hash = "add-measurement-form";
              }}
              className="flex-1 py-3.5 rounded-xl bg-blue-950 text-rose-50 font-bold text-sm hover:bg-emerald-800 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <span className="material-symbols-outlined text-base">edit</span>{" "}
              Edit
            </button>
            <button
              onClick={() => {
                // 1. Reset data
                setMeasurements({
                  customer_id: customer.id,
                  customer_Name: customer.customerName,
                  customer_Number: customer.customerNumber,
                  TypeCloth: "dress",
                  bust: "",
                  waist: "",
                  shoulder: "",
                  sleeveLength: "",
                  blouseLength: "",
                  neckDepthFront: "",
                  neckDepthBack: "",
                  armRound: "",
                  specialNotes: "",
                  m7: "",
                  m8: "",
                  m9: "",
                  m10: "",
                  m11: "",
                  m12: "",
                  m13: "",
                  m14: "",
                  m15: "",
                  m16: "",
                  m17: "",
                  m18: "",
                  m19: "",
                  m20: "",
                  m21: "",
                  m22: "",
                  m23: "",
                });
                // 2. CLOSE THE MODAL UI
                window.location.hash = "#";
              }}
              className="flex-1 py-3.5 rounded-xl border border-stone-200 font-bold text-sm text-slate-500 hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      {/* </div>
      // ))} */}

      {/* alert open for conform user delete for admin */}
      <div id="modal-delete-confirm" className="modal-wrap">
        <a href="#" className="modal-backdrop"></a>
        <div className="modal-in relative bg-white rounded-3xl shadow-2xl w-full max-w-sm border border-stone-100 p-7 text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl text-red-700">
              delete_forever
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 mb-2">
            Delete Measurement?
          </h3>
          <p className="text-sm text-slate-500 mb-2">
            You are about to delete the measurement record for:
          </p>

          {/* DYNAMIC NAME & CATEGORY */}
          <p className="text-base font-black text-red-800 mb-6">
            {itemToDelete?.customer_Name || "Customer"} —{" "}
            {itemToDelete?.TypeCloth || "Record"}
          </p>

          <p className="text-xs text-slate-400 mb-7">
            This action cannot be undone. All measurement data for this customer
            will be permanently removed.
          </p>

          <div className="flex gap-3">
            <a
              href="#"
              className="flex-1 py-3.5 rounded-xl border border-stone-200 font-bold text-sm text-slate-500 hover:border-slate-400 transition-colors text-center active:scale-95"
            >
              Cancel
            </a>

            {/* FINAL DELETE BUTTON */}
            <button
              onClick={() => {
                if (itemToDelete) {
                  deleteMeasurement(itemToDelete.id, itemToDelete.customer_id);
                }
              }}
              className="flex-1 py-3.5 rounded-xl bg-red-700 text-white font-bold text-sm hover:bg-red-800 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">
                delete
              </span>{" "}
              Delete
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
