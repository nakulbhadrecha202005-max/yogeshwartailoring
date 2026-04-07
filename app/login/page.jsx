"use client";
import React from "react";
import { useState } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from "next/link";
const page = () => {
  const router = useRouter();
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [Error, setError] = useState("");
  const [ErrorsObj, setErrors] = useState({
    email: "",
    password: "",
  });
  const [Loading, setLoading] = useState(false);
  const [GoogleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the error for this field when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const Validation = () => {
    const { email, password } = FormData;
    let newError = {};

    const Emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newError.email = "Email is required";
    } else if (!Emailregex.test(email)) {
      newError.email = "Invalid email format";
    }

    if (!password) {
      newError.password = "Password is required";
    } else if (password.length < 7) {
      newError.password = "Password must be at least 6 characters";
    }
    return newError;
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = Validation();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        FormData.email.trim(),
        FormData.password.trim(),
      );
      //console.log("User created ");
      // Redirect to home page or any other page
      router.push("/");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setError("Invalid email or password");
      } else if (error.code === "auth/wrong-password") {
        setError("Wrong password");
      } else if (error.code === "auth/user-not-found") {
        setError("No user found with this email");
      }
    } finally {
      setLoading(false);
    }
  };

  const signinWithGoogle = async () => {
    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Redirect to home page
      router.push("/");
    } catch (error) {
      //console.error(error.message);
      setError("Google Sign-In failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-25 bg-[#fdfaf7] flex flex-col items-center justify-center p-6 font-sans text-slate-900">
      {/* Main Form Container */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-stone-200 p-10 relative overflow-hidden">
        {/* Subtle Top Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-rose-900"></div>

        <div className="text-left mb-10">
          <h2 className="text-2xl font-extrabold text-blue-900 tracking-tight ">
            Yogeshwar Tailoring
          </h2>
          <div className="h-1 w-34 bg-rose-100   mt-1"></div>
          <p className="text-stone-500 text-sm mt-3 font-medium">
            1000+ Clients Served currently. Join us and experience the best
            tailoring services in town!
          </p>
        </div>

        {/* Custom Error Alert - Tailored Design */}
        {Error && (
          <div className="mb-6 flex items-start gap-3 bg-rose-100 border border-rose-200 p-3 rounded-lg shadow-sm">
            <span className="material-symbols-outlined text-rose-900 text-xl">
              report
            </span>
            <div className="flex-1">
              <p className="text-sm font-bold text-rose-900">Action Required</p>
              <p className="text-xs text-rose-800 opacity-90">{Error}</p>
            </div>
          </div>
        )}

        <form onSubmit={HandleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-blue-900 uppercase tracking-wide flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">mail</span>{" "}
              Email Address
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              disabled={Loading}
              spellCheck={false}
              value={FormData.email}
              placeholder="e.g. customer@tailor.com"
              className="w-full px-4 py-3 bg-rose-50 border text-blue-800 border-blue-200 rounded-md focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-none transition-all text-sm pr-12"
            />
            {ErrorsObj.email && (
              <p className="text-[11px] text-rose-900 font-bold flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-sm">error</span>{" "}
                {ErrorsObj.email}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-blue-900 uppercase tracking-wide flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">lock</span>{" "}
              Password
            </label>

            {/* Container for Relative Positioning */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Dynamic type
                name="password"
                spellCheck={false}
                disabled={Loading}
                onChange={handleChange}
                value={FormData.password}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-rose-50 border text-blue-800 border-blue-200 rounded-md focus:ring-1 focus:ring-blue-900 focus:border-blue-900 outline-none transition-all text-sm pr-12" // Added pr-12 for spacing
              />

              {/* Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-900 hover:text-blue-900 transition-colors flex items-center"
              >
                <span className="material-symbols-outlined">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>

            {ErrorsObj.password && (
              <p className="text-[11px] text-rose-900 font-bold flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-sm">error</span>
                {ErrorsObj.password}
              </p>
            )}
          </div>

          <Link
            href="forgotpassword"
            className="text-sm text-blue-900 hover:text-blue-900 font-semibold underline transition-all block text-left mb-3 ml-2"
          >
            Forgot Password ?
          </Link>
          {/* Submit Button */}
          <button
            disabled={Loading}
            type="submit"
            className="w-full py-3 bg-emerald-900 hover:bg-blue-950 text-white text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all active:scale-[0.99] disabled:grayscale flex items-center justify-center gap-2"
          >
            {Loading ? "Processing..." : "Secure Sign In"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-stone-400"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-stone-400 font-semibold tracking-widest">
              Or
            </span>
          </div>
        </div>

        {/* Google Button */}
        <button
          onClick={signinWithGoogle}
          disabled={GoogleLoading}
          className="w-full py-3 border border-stone-300 bg-gray-100 hover:bg-stone-200 text-stone-700 text-sm font-bold rounded-full flex items-center justify-center gap-3 transition-all shadow-sm"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-4 h-4"
          />
          {GoogleLoading ? "Verifying..." : "Continue with Google"}
        </button>

        <div className="mt-5 text-center text-[11px] text-stone-800 tracking-widest">
          Don't have an account ?{" "}
          <Link
            href="/signup"
            className="font-bold text-blue-900 underline underline-offset-4 transition-all"
            //onClick={() => /* Add your navigation logic here */}
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
