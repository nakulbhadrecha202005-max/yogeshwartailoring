"use client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { db } from "../../lib/firebase";
import { collection, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import { query, where, updateDoc, doc } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";

const page = () => {
  const router = useRouter();
  const [UsersData, setUsersData] = useState({
    customerName: "",
    customerNumber: "",
    dateJoin: "",
  });
  const [UsersDataedit, setUsersDataedit] = useState({
    customerNameedit: "",
    customerNumberedit: "",
    dateJoinedit: "",
  });
  const [authuser, setAuthuser] = useState(null);
  const [User, setUser] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [AllUsers, setAllUsers] = useState([]);

  //for selecting record
  const [isViewOpen, setIsViewOpen] = useState(false);

  //for edit
  const [isEditOpen, setisEditOpen] = useState(false);

  //for delete record
  const [showAlertdelete, setShowAlertdelete] = useState(false);

  //for delete select id and then passing to delette
  const [selectedId, setSelectedId] = useState("");
  //all user fetch from DB
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "customersName"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAllUsers(data);
      },
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  //dynamic Color user profile
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
      P: "bg-rose-800",
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
  const displayUserDataFunal_Fetch = () => {
    return (
      <>
        {/* Table Card */}
        <div className="bg-slate-300 rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-950 border-b border-stone-100">
                  <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-200 w-16">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-200">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-200">
                    Phone Number
                  </th>
                  <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-200">
                    Date Added
                  </th>
                  <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {AllUsers.map((user, i) => (
                  <tr
                    key={i}
                    className="table-row-hover border-b border-stone-50"
                  >
                    {/* Index */}
                    <td className="px-6 py-4 text-slate-400 text-sm font-medium">
                      {user?.id || "N/A"}
                    </td>

                    {/* User Name & Avatar */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full ${getAvatarColor(user.customerName)} flex items-center justify-center text-white text-xs font-black shrink-0`}
                        >
                          {user.customerName
                            ? user.customerName.charAt(0).toUpperCase()
                            : "U"}
                        </div>
                        <span className="font-semibold text-slate-800">
                          {user.customerName}
                        </span>
                      </div>
                    </td>

                    {/* Phone Number */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600 font-medium">
                        <span className="material-symbols-outlined text-base text-slate-400">
                          call
                        </span>
                        {user.customerNumber}
                      </div>
                    </td>

                    {/* Date Joined */}
                    <td className="px-6 py-4 text-slate-500 text-sm font-medium">
                      {user.dateJoin}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* View Button - Matches your setUsersData logic */}

                        <button
                          type="button"
                          onClick={() => {
                            router.push(`/admin/measurements?id=${user.id}`);
                          }}
                          className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-amber-600 hover:text-white flex items-center justify-center transition-all"
                        >
                          <span className="material-symbols-outlined text-sm">
                            straighten
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setUsersData({
                              customerName: user.customerName,
                              customerNumber: user.customerNumber,
                              dateJoin: user.dateJoin,
                            });
                            setIsViewOpen(true);
                          }}
                          className="action-btn w-9 h-9 rounded-xl bg-stone-100 hover:bg-blue-950 hover:text-rose-50 flex items-center justify-center transition-all"
                        >
                          <span className="material-symbols-outlined text-sm">
                            visibility
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            setUsersDataedit({
                              customerNameedit: user.customerName,
                              customerNumberedit: user.customerNumber,
                              dateJoinedit: user.dateJoin,
                            });
                            setisEditOpen(true);
                          }}
                          className="action-btn w-9 h-9 rounded-xl bg-stone-100 hover:bg-emerald-700 hover:text-white flex items-center justify-center transition-all"
                        >
                          <span className="material-symbols-outlined text-sm">
                            edit
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            //console.log("Setting ID to:", user.id);
                            setSelectedId(user.id);
                            setShowAlertdelete(true);
                          }}
                          className="action-btn w-9 h-9 rounded-xl bg-stone-100 hover:bg-red-700 hover:text-white flex items-center justify-center transition-all"
                        >
                          <span className="material-symbols-outlined text-sm">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {AllUsers.map((user, i) => (
          <div
            key={i}
            className="bg-slate-200 md:hidden divide-y divide-stone-100"
          >
            <div className="p-5 flex items-start gap-4 hover:bg-stone-50 transition-colors">
              {/* Avatar with Initials */}
              <div
                className={`w-12 h-12 rounded-full ${getAvatarColor(user.customerName)} flex items-center justify-center text-white font-black shrink-0 text-sm`}
              >
                {user.customerName.charAt(0)}
                {user.customerName.split(" ")[1]?.charAt(0) || ""}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 text-sm truncate">
                  {user.customerName}
                </p>
                <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-sm">
                    call
                  </span>
                  {user.customerNumber}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{user.dateJoin}</p>
              </div>

              {/* Action Buttons */}
              <div style={{ gap: "1px" }} className="flex  shrink-0">
                {/* View Button - Triggers your setUsersData logic */}
                <button
                  type="button"
                  onClick={() => {
                    router.push(`/admin/measurements?id=${user.id}`);
                  }}
                  className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-amber-600 hover:text-white flex items-center justify-center transition-all"
                >
                  <span className="material-symbols-outlined text-sm">
                    straighten
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUsersData({
                      customerName: user.customerName,
                      customerNumber: user.customerNumber,
                      dateJoin: user.dateJoin,
                    });
                    setIsViewOpen(true);
                  }}
                  href="#modal-view"
                  className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-blue-950 hover:text-rose-50 flex items-center justify-center transition-all"
                >
                  <span className="material-symbols-outlined text-sm">
                    visibility
                  </span>
                </button>

                <a
                  href="#modal-edit"
                  onClick={() => {
                    setUsersDataedit({
                      customerNameedit: user.customerName,
                      customerNumberedit: user.customerNumber,
                      dateJoinedit: user.dateJoin,
                    });
                    setisEditOpen(true);
                  }}
                  className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-emerald-700 hover:text-white flex items-center justify-center transition-all"
                >
                  <span className="material-symbols-outlined text-sm">
                    edit
                  </span>
                </a>

                {/* Delete Button */}
                <button
                  onClick={() => {
                    //console.log("Setting ID to:", user.id);
                    setSelectedId(user.id);
                    setShowAlertdelete(true);
                  }}
                  className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-red-700 hover:text-white flex items-center justify-center transition-all"
                >
                  <span className="material-symbols-outlined text-sm">
                    delete
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  //handle change
  const handleChange = (e) => {
    setUsersData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //handleChangeEdit
  const handleChangeedit = (e) => {
    setUsersDataedit((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //Customer adding Data to Firebase
  const AddCustomer = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await addDoc(collection(db, "customersName"), UsersData);
      setLoading(false);
    } catch (error) {
      console.log("Error adding data:", error);
    }
    // send to Firebase here

    // reset form
    setUsersData({
      customerName: "",
      customerNumber: "",
      dateJoin: "",
    });
  };

  //update code for backend
  const updateCustomerByPhone = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const q = query(
        collection(db, "customersName"),
        where("customerNumber", "==", UsersDataedit.customerNumberedit),
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const firstDoc = querySnapshot.docs[0];

        await updateDoc(doc(db, "customersName", firstDoc.id), {
          customerName: UsersDataedit.customerNameedit,
          dateJoin: UsersDataedit.dateJoinedit,
        });

        //console.log("User updated successfully");
        setisEditOpen(false);
      } else {
        setError("No user found");
      }

      setLoading(false);
    } catch (error) {
      setError("Error updating:", error);
      setLoading(false);
    }

    setUsersDataedit({
      customerNameedit: "",
      customerNumberedit: "",
      dateJoinedit: "",
    });
  };

  const handleDelete = async () => {
    if (!selectedId) {
      console.error("Delete failed: No document ID was selected.");
      setError("No user selected for deletion.");
      return;
    }

    try {
      setLoading(true);

      // 2. Ensure the collection name is EXACTLY as it appears in Firebase
      // This creates the path: "customersName/DNygMBYRv..."
      const docRef = doc(db, "customersName", selectedId);

      await deleteDoc(docRef);

      // 3. Cleanup
      setShowAlertdelete(false);
      setSelectedId(null);
      console.log("Document successfully deleted!");
    } catch (err) {
      console.error("Delete Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="text-slate-900 antialiased min-h-screen">
      <style jsx>
        {`
          :root {
            --midnight: #0b0f19;
            --berry: #581c1e;
            --off-white: #f9f7f5;
          }

          body {
            font-family: "Plus Jakarta Sans", sans-serif;
            background-color: var(--off-white);
            margin: 0;
            overflow-x: hidden;
          }

          h1,
          h2,
          h3,
          h4,
          h5 {
            font-family: "Outfit", sans-serif;
          }

          /* Marquee */
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

          /* Table row */
          .table-row-hover:hover {
            background-color: #f1f5f9;
            transition: background 0.2s ease;
          }

          /* Action buttons */
          .action-btn {
            transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .action-btn:hover {
            transform: translateY(-2px);
          }

          /* Scrollbar */
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

          /* ── CSS-ONLY MODALS via :target ── */
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
            animation: modalIn 0.22s cubic-bezier(0.4, 0, 0.2, 1);
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

          input:focus,
          select:focus {
            outline: none;
          }
        `}
      </style>
      {/* error show */}
      {error && (
        <p className="text-red-500 text-center mb-40 mt-40">{error?.message}</p>
      )}
      {/* main */}
      <main className="max-w-7xl mx-auto mt-30 px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="w-4 h-[2px] bg-red-800"></span>
              <span className="text-red-800 font-extrabold text-[11px] uppercase tracking-[0.3em]">
                Admin Panel
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              User Management
            </h1>
          </div>

          <a
            href="#modal-add"
            onClick={() => {
              // We still want to reset the state when the link is clicked
              setUsersData({
                customerName: "",
                customerNumber: "",
                dateJoin: "",
              });
            }}
            className="inline-flex items-center gap-2.5 bg-blue-950 text-rose-50 px-7 py-4 rounded-full font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-red-800 transition-all shadow-2xl shadow-blue-900/20 active:scale-95 self-start sm:self-auto no-underline group"
          >
            <span className="material-symbols-outlined text-lg leading-none transition-transform group-hover:rotate-12">
              person_add
            </span>
            <span className="relative top-[0.5px]">Add User</span>
          </a>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          {displayUserDataFunal_Fetch()}
        </div>
      </main>

      {/* custome alert User insert Data */}
      <div id="modal-add" className="modal-wrap">
        <a href="#" className="modal-backdrop"></a>
        <div className="modal-in relative bg-white rounded-3xl shadow-2xl w-full max-w-md border border-stone-100 overflow-hidden">
          {/* Form Wrapper - Using your existing AddCustomer logic */}
          <form onSubmit={AddCustomer}>
            {/* Header */}
            <div className="bg-blue-950 px-7 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-200/70 mb-0.5">
                    Yogeshwar Tailor
                  </p>
                  <h2 className="text-2xl font-extrabold text-rose-50">
                    Add New User
                  </h2>
                </div>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-rose-100 hover:bg-red-800 transition-all"
                >
                  <span className="material-symbols-outlined text-xl">
                    close
                  </span>
                </a>
              </div>
            </div>

            {/* Input Fields */}
            <div className="px-7 py-7 space-y-5">
              {/* Name Input */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    badge
                  </span>
                  <input
                    type="text"
                    name="customerName"
                    placeholder="e.g. Priya Sharma"
                    spellCheck={false}
                    value={UsersData.customerName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-stone-50 border border-stone-200 text-sm font-medium placeholder-slate-400 focus:border-red-800 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    call
                  </span>
                  <input
                    type="tel"
                    name="customerNumber"
                    placeholder="e.g. +91 98765 43210"
                    required
                    value={UsersData.customerNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-stone-50 border border-stone-200 text-sm font-medium placeholder-slate-400 focus:border-red-800 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Date Input */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                  Date Added
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    calendar_today
                  </span>
                  <input
                    type="date"
                    name="dateJoin"
                    required
                    value={UsersData.dateJoin}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-stone-50 border border-stone-200 text-sm font-medium text-slate-700 focus:border-red-800 focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-7 pb-7 flex gap-3">
              <a
                href="#"
                className="flex-1 py-3.5 rounded-xl border border-stone-200 font-bold text-sm text-slate-500 hover:border-slate-400 hover:text-slate-700 transition-colors text-center active:scale-95"
              >
                Cancel
              </a>
              <button
                type="submit"
                className="flex-1 py-3.5 rounded-xl bg-blue-950 text-rose-50 font-bold text-sm hover:bg-red-800 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">
                  save
                </span>{" "}
                Save User
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* customer alert to see details individual  */}
      {isViewOpen && (
        <div
          id="modal-view"
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto"
        >
          {/* Backdrop - Click to close */}
          <div
            className="modal-backdrop absolute inset-0 bg-black/40"
            onClick={() => setIsViewOpen(false)}
          ></div>

          <div className="modal-in relative bg-white rounded-3xl shadow-2xl w-full max-w-sm border border-stone-100 overflow-hidden z-10">
            {/* Header Section */}
            <div className="bg-blue-950 px-7 pt-8 pb-12 text-center relative">
              {/* Close Button (Top Right) */}
              <button
                onClick={() => setIsViewOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-rose-100 hover:bg-red-800 transition-all"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>

              {/* Profile Circle */}
              <div
                className="w-20 h-20 rounded-full bg-red-800 flex items-center justify-center text-3xl font-black text-white mx-auto mb-3"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {UsersData.customerName?.charAt(0)}
              </div>

              {/* Name and Status */}
              <h2 className="text-2xl font-extrabold text-rose-50 mb-1">
                {UsersData.customerName}
              </h2>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                Active Client
              </span>
            </div>

            {/* Info Cards Section */}
            <div className="px-7 py-6 -mt-4 space-y-4">
              {/* Phone Card */}
              <div className="bg-stone-50 rounded-2xl p-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-red-800 text-2xl">
                  call
                </span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Phone
                  </p>
                  <p className="font-bold text-slate-800">
                    {UsersData.customerNumber || "+91 00000 00000"}
                  </p>
                </div>
              </div>

              {/* Date Card */}
              <div className="bg-stone-50 rounded-2xl p-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-red-800 text-2xl">
                  calendar_today
                </span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Date Added
                  </p>
                  <p className="font-bold text-slate-800">
                    {UsersData.dateJoin || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Close Button */}
            <div className="px-7 pb-7">
              <button
                onClick={() => setIsViewOpen(false)}
                className="block w-full py-3.5 rounded-xl bg-blue-950 text-rose-50 font-bold text-sm hover:bg-red-800 transition-all text-center active:scale-95"
              >
                Close
              </button>
              <div className="px-7 pb-3 mt-7">
                {" "}
                {/* Added padding to match your modal structure */}
                <a
                  href={`tel:${UsersData.customerNumber}`} // Uses your Firebase state
                  className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl bg-slate-950 text-emerald-50 font-bold text-sm hover:bg-slate-800 transition-all text-center shadow-lg active:scale-95 group"
                >
                  {/* Icon with a subtle bounce on hover */}
                  <span className="material-symbols-outlined text-emerald-400 group-hover:text-white transition-transform group-hover:-rotate-12">
                    call
                  </span>

                  <span className="uppercase tracking-widest text-[11px]">
                    Call {UsersData.customerName?.split(" ")[0] || "Client"}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Customer Data */}
      {isEditOpen && (
        <div
          id="modal-edit"
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto"
        >
          {/* Backdrop - Click to close */}
          <div
            className="modal-backdrop absolute inset-0 bg-black/40"
            onClick={() => setisEditOpen(false)}
          ></div>

          <div className="modal-in relative bg-white rounded-3xl shadow-2xl w-full max-w-md border border-stone-100 overflow-hidden z-10">
            {/* Header */}
            <div className="bg-blue-950 px-7 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-200/70 mb-0.5">
                    {/* This can be the admin name or a static brand name */}
                    Yogeshwar Tailor
                  </p>
                  <h2 className="text-2xl font-extrabold text-rose-50">
                    Edit User
                  </h2>
                </div>
                <button
                  onClick={() => setisEditOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-rose-100 hover:bg-red-800 transition-all"
                >
                  <span className="material-symbols-outlined text-xl">
                    close
                  </span>
                </button>
              </div>
            </div>

            {/* Form Body */}
            <form
              onSubmit={updateCustomerByPhone}
              className="px-7 py-7 space-y-5"
            >
              {/* Full Name Input */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    badge
                  </span>
                  <input
                    type="text"
                    name="customerNameedit"
                    value={UsersDataedit.customerNameedit}
                    onChange={handleChangeedit}
                    placeholder="Enter name"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-stone-50 border border-stone-200 text-sm font-medium focus:border-red-800 focus:bg-white outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Phone Number Input (Disabled or Read-only since it's your Firebase key) */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                  Phone Number (ID)
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    call
                  </span>
                  <input
                    type="tel"
                    name="customerNumberedit"
                    value={UsersDataedit.customerNumberedit}
                    onChange={handleChangeedit}
                    readOnly // Keep readOnly if you use this to find the document in Firebase
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-stone-100 border border-stone-200 text-sm font-medium text-slate-500 cursor-not-allowed outline-none"
                  />
                </div>
              </div>

              {/* Date Input */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                  Date Added
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    calendar_today
                  </span>
                  <input
                    type="date"
                    name="dateJoinedit"
                    value={UsersDataedit.dateJoinedit}
                    onChange={handleChangeedit}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-stone-50 border border-stone-200 text-sm font-medium text-slate-700 focus:border-red-800 focus:bg-white outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setisEditOpen(false)}
                  className="flex-1 py-3.5 rounded-xl border border-stone-200 font-bold text-sm text-slate-500 hover:border-slate-400 hover:text-slate-700 transition-colors text-center active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3.5 rounded-xl bg-blue-950 text-rose-50 font-bold text-sm hover:bg-red-800 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    "Updating..."
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-base">
                        save
                      </span>{" "}
                      Update User
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAlertdelete && (
        <div
          id="modal-delete"
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 overflow-hidden"
        >
          {/* Backdrop - Click to close */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAlertdelete(false)}
          ></div>

          {/* Modal Content */}
          <div className="modal-in relative bg-slate-300 rounded-3xl shadow-2xl w-full max-w-sm border border-stone-100 p-7 text-center z-10">
            <div className="w-16 h-16 rounded-full bg-red-200 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl text-red-700">
                person_remove
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">
              Delete User?
            </h3>
            <p className="text-sm text-slate-500 mb-7">
              This action cannot be undone. The user will be permanently removed
              from the system.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowAlertdelete(false);
                  setSelectedId(null);
                }}
                className="flex-1 py-3.5 rounded-xl border-2 border-stone-500 font-bold text-sm text-slate-500 hover:border-slate-400 transition-colors text-center active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3.5 rounded-xl bg-red-700 text-white font-bold text-sm hover:bg-red-800 transition-all active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
