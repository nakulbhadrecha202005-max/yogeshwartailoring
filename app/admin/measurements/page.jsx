"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useSearchParams, useRouter } from "next/navigation";
import { collection, getDocs, addDoc, onSnapshot } from "firebase/firestore";
import { query, where, updateDoc } from "firebase/firestore";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  console.log("ID:", id); // ✅ now aavse
  const [authuser, setAuthuser] = useState(null);
  const [User, setUser] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //fetch auth user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAuthuser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  //admin data from admin collection
  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //console.log("Fetched Users:", data);
      setUser(data);
    };

    fetchUsers();
  }, []);

  //matching with user email and admin collection email
  useEffect(() => {
    if (!authuser || User.length === 0) return;
    const matchUser = User.find((U) => U.email === authuser.email);
    if (!matchUser) {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* <div
          id="add-measurement-form"
          className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden "
        > */}

        {/* type of cloth selection */}
        <div className="mt-20 mb-30 px-6 md:px-8 py-8 space-y-10">
          <div className="mt-4 mb-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            <div
              onClick={() =>
                router.push(`/admin/measurements/Indianblowse?id=${id}`)
              }
              className="cloth-card bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 flex flex-col items-center gap-2 text-center shadow-sm"
            >
              <div className="w-11 h-11 rounded-xl bg-red-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-xl">
                  checkroom
                </span>
              </div>
              <p className="text-[11px] font-black uppercase tracking-wider text-slate-800 leading-tight">
                Indian
                <br />
                Blouse
              </p>
            </div>

            <div
              onClick={() => router.push(`/admin/measurements/dress?id=${id}`)}
              className="cloth-card bg-white border-2 border-stone-200 rounded-2xl p-4 flex flex-col items-center gap-2 text-center shadow-sm hover:border-red-800"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-xl">
                  style
                </span>
              </div>
              <p className="text-[11px] font-black uppercase tracking-wider text-slate-800 leading-tight">
                Kurti +<br />
                Pant
              </p>
              <span className="text-[9px] font-medium text-slate-400 tracking-wide">
                Click to select
              </span>
            </div>
          </div>
        </div>
        {/* </div> */}
      </main>
    </div>
  );
};

export default page;
