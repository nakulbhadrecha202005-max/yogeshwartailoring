"use client";

import React, { useState, useEffect } from "react";
import { auth, db } from "../../lib/firebase"; // Adjust paths to your firebase config
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  where,
} from "firebase/firestore";

export default function CommentSection() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  // Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  // 1. Check Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Fetch Comments from Firebase
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "comments"),
      where("userId", "==", user.uid),
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const commentData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentData);
      },
      (err) => {
        setError("Failed to fetch comments: " + err.message);
      },
    );

    return () => unsubscribe();
  }, [user]);

  if (comments.length === 0) {
    return (
      <div className="p-10 text-center mt-40 mb-30">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          No Comments Found
        </h2>
        <p className="text-slate-600">You haven't uploaded any comments yet.</p>
      </div>
    );
  }

  const confirmDelete = (id) => {
    setCommentToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (commentToDelete) {
        await deleteDoc(doc(db, "comments", commentToDelete));
        setIsDeleteModalOpen(false);
        setCommentToDelete(null);
      }
    } catch (err) {
      setError("Could not delete comment.");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  // Access Denied if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center p-8 border border-red-200 rounded-2xl bg-red-50">
          <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
          <p className="text-slate-600">
            Please log in to view and manage comments.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {error && (
        <p className="text-center text-red-500 font-medium mt-4">{error}</p>
      )}

      <div className="relative min-h-screen mt-30 bg-white py-10 px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="relative bg-slate-300 rounded-2xl p-5 md:p-6 shadow-sm border border-slate-400/20"
            >
              {/* --- ONLY SHOW DELETE IF UID MATCHES --- */}
              {user.uid === comment.userId && (
                <button
                  onClick={() => confirmDelete(comment.id)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-400/20 text-slate-600 hover:bg-red-500 hover:text-white transition-all duration-200"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    delete
                  </span>
                </button>
              )}

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
                      className={`material-symbols-outlined text-xl ${
                        i < (comment.rating || 5)
                          ? "text-orange-500"
                          : "text-slate-400"
                      }`}
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

        {/* --- DELETE MODAL --- */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl border border-slate-200">
              <div className="flex flex-col items-center text-center">
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
                  removed.
                </p>
                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="flex-1 px-4 py-3 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-4 py-3 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600 shadow-lg"
                  >
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
}
