"use client";
import React from "react";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { deleteDoc, doc } from "firebase/firestore";

const page = () => {
  const router = useRouter();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [error, setError] = useState("");
  const confirmDelete = async (id) => {
    setTargetId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    // Add your actual delete logic here using targetId
    //console.log("Deleted item:", targetId);
    try {
      await deleteDoc(doc(db, "comments", targetId));
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== targetId),
      );

      // Reset and close
      setIsDeleteModalOpen(false);
      setTargetId(null);
      setError(""); // Clear any previous errors
    } catch (error) {
      setError("Failed to delete comment. Please try again.");
    }
    setIsDeleteModalOpen(false);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "admin_users"));

      const result = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(result);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loading) return; // wait for auth
    if (!user) {
      router.push("/login");
      return;
    }
    if (data.length === 0) return; // wait for firestore

    const isAdmin = data.some((item) => item.email === user.email);

    if (!isAdmin) {
      router.push("/login");
    }
  }, [user, data, loading]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "comments"));
        const commentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="relative min-h-screen mt-30 bg-white py-10 px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="relative bg-slate-300 rounded-2xl p-5 md:p-6 shadow-sm border border-slate-400/20"
            >
              {/* --- CUSTOM DELETE ICON --- */}
              <button
                onClick={() => confirmDelete(comment.id)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-400/20 text-slate-600 hover:bg-red-500 hover:text-white transition-all duration-200"
              >
                <span className="material-symbols-outlined text-[20px]">
                  delete
                </span>
              </button>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex items-center md:items-start gap-4">
                  <div className="shrink-0">
                    {comment.avatar ? (
                      <img
                        src={comment.avatar}
                        alt={comment.userName}
                        className="w-12 h-12 rounded-full object-cover border border-slate-400"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-slate-500 flex items-center justify-center text-white font-bold">
                        {comment.userName?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-slate-900 font-bold text-base leading-tight">
                      {comment.userName || "Anonymous"}
                    </h3>
                    <p className="text-slate-600 text-[10px] uppercase tracking-wider">
                      {comment.date || "March 31, 2026"}
                    </p>
                  </div>
                </div>

                <div className="flex-1 pr-6">
                  <p className="text-slate-800 text-sm md:text-base leading-relaxed">
                    {comment.textComments || "No comment provided."}
                  </p>
                </div>
              </div>

              {/* Stars Section */}
              <div className="mt-4 pt-3 border-t border-slate-400/30 flex justify-center">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`material-symbols-outlined text-xl ${i < (comment.rating || 5) ? "text-orange-500" : "text-slate-400"}`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- CUSTOM TAILWIND ALERT MODAL --- */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl transform transition-all border border-slate-200">
              <div className="flex flex-col items-center text-center">
                {/* Warning Icon Container */}
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-red-600 text-3xl">
                    warning
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  Are you sure?
                </h2>
                <p className="text-slate-500 text-sm mb-8">
                  This action cannot be undone. This comment will be permanently
                  removed from the system.
                </p>

                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="flex-1 px-4 py-3 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-4 py-3 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">
                      delete
                    </span>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
