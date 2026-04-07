"use client";
import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="text-center mt-39 mb-30  ">
      <h1>
        Admin Dashboard <br />
        <Link
          href="/admin/ManageCustomerName"
          className="bg-blue-900 text-white text-sm font-bold px-4 py-2 rounded-full ml-4 transition-all hover:bg-blue-950 shadow-md hover:shadow-lg"
        >
          Manage Customer Name
        </Link>{" "}
        <br />
        <Link
          href="/admin/ManageCustomerMeasurementsCloth"
          className="bg-blue-900 text-white mt-5 text-sm font-bold px-4 py-2 rounded-full ml-4 transition-all hover:bg-blue-950 shadow-md hover:shadow-lg"
        >
          Manage Customer Measurements Cloth
        </Link>
        <br />
        <Link
          href="/admin/ManageCustomernameUI"
          className="bg-blue-900 text-white mt-10 text-sm font-bold px-4 py-2 rounded-full ml-4 transition-all hover:bg-blue-950 shadow-md hover:shadow-lg"
        >
          Manage Customer Name UI
        </Link>{" "}
        <br /> <br />
        <Link
          href="/admin/Himeshbhai"
          className="bg-blue-900 text-white mt-10 text-sm font-bold px-4 py-2 rounded-full ml-4 transition-all hover:bg-blue-950 shadow-md hover:shadow-lg"
        >
          Custom UI
        </Link>{" "}
        <br /> <br />
        <Link
          href="/admin/measurements/voiceRec"
          className="bg-blue-900 text-white mt-10 text-sm font-bold px-4 py-2 rounded-full ml-4 transition-all hover:bg-blue-950 shadow-md hover:shadow-lg"
        >
          Custom UI
        </Link>
      </h1>
    </div>
  );
};

export default page;
