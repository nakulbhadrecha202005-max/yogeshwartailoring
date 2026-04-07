"use client";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { db } from "@/app/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const checkAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log("Auth State Changed: ", user?.uid);
    });
    return () => checkAuth();
  }, []);

  if (!user) {
    return (
      <>
        <div className="w-95  bg-slate-200 rounded-2xl m-auto mt-45 mb-13 ml-auto mr-auto shadow-xl border border-stone-300 p-8 relative overflow-hidden font-sans">
          {/* Top Accent line to match Login Page */}
          <div className="absolute top-0 left-0 w-full h-2 bg-rose-900"></div>
          <div className="mb-6">
            <h3 className="text-xl font-extrabold text-blue-900 tracking-tight">
              Please Login to post a comments and rating.
            </h3>
            <p className="text-stone-500 text-xs mt-1 font-medium italic">
              You need to be logged in to share your feedback with us.
            </p>
          </div>
          <Link
            href="/login"
            className="w-full py-3 bg-emerald-900 hover:bg-blue-950 text-white text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Go to Login
            <span className="material-symbols-outlined text-sm">login</span>
          </Link>
        </div>
      </>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your Firebase logic here to save the comment
    if (!comment.trim() || rating === 0) {
      setIsSubmitting(false);
      return;
    }
    try {
      await addDoc(collection(db, "comments"), {
        textComments: comment,
        userId: user.uid,
        userName: user.displayName || user.email.split("@")[0] || "Anonymous",
        photoProfile:
          user.photoURL ||
          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
        createdAt: serverTimestamp(),
        rating: rating || null,
        isApproved: false,
      });
    } catch (error) {
      alert("Error submitting comment in Google Firestore : ", error);
      setIsSubmitting(false);
      return;
    }
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("Thank you for your feedback!");
      router.push("/");
      setComment("");
      setRating(0);
    }, 1500);
  };

  return (
    <div className="w-95 max-w-md bg-slate-300 rounded-2xl mt-40 mb-10 ml-auto mr-auto shadow-xl border border-stone-200 p-8 relative overflow-hidden font-sans">
      {/* Top Accent line to match Login Page */}
      <div className="absolute top-0 left-0 w-full h-2 bg-rose-900"></div>

      <div className="mb-6">
        {successMessage && (
          <p className="m-auto font-bold px-4 py-2 text-emerald-700 text-center text-md rounded-lg bg-emerald-50 border border-emerald-500 mb-4">
            {successMessage}
          </p>
        )}
        <h3 className="text-xl font-extrabold text-blue-900 tracking-tight">
          Share Your Experience
        </h3>
        <p className="text-stone-500 text-xs mt-1 font-medium italic">
          Your feedback helps us maintain our "1000+ Clients" standard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Star Rating Section */}
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-bold text-blue-900 uppercase tracking-widest">
            Overall Rating
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="transition-transform active:scale-90"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <span
                  className={`material-symbols-outlined text-3xl ${
                    (hover || rating) >= star
                      ? "text-amber-500"
                      : "text-stone-200"
                  }`}
                  style={{
                    fontVariationSettings:
                      "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  star
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Comment Textarea */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-bold text-blue-900 uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">
              chat_bubble
            </span>
            Your Comments
          </label>
          <textarea
            required
            rows="4"
            spellCheck="false"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us about the fit, fabric, or service..."
            className="w-full px-4 py-3 bg-rose-50 border text-blue-800 border-blue-100 rounded-lg focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-none transition-all text-sm resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={isSubmitting || !rating}
          type="submit"
          className="w-full py-3 bg-emerald-900 hover:bg-blue-950 text-white text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            "Posting..."
          ) : (
            <>
              Submit Review
              <span className="material-symbols-outlined text-sm">send</span>
            </>
          )}
        </button>
      </form>

      <p className="mt-4 text-[10px] text-center text-stone-400 uppercase tracking-[0.2em]">
        Yogeshwar Tailoring © 2026
      </p>
    </div>
  );
};

export default page;
