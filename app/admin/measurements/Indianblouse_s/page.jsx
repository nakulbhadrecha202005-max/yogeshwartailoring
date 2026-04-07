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

  //all measurement record display
  const [allMeasurements, setAllMeasurements] = useState([]);

  const [measurements, setMeasurements] = useState({
    customer_id: "",
    customer_Number: "",
    customer_Name: "",
    TypeCloth: "",
    bust: "",
    waist: "",
    shoulder: "",
    sleeveLength: "",
    blouseLength: "",
    neckDepthFront: "",
    neckDepthBack: "",
    armRound: "",
    specialNotes: "",
  });

  const [editId, setEditId] = useState("");
 

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeasurements((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(
        doc(db, "customerMeasurement", customer.id),
        {
          name: customer.customerName,
          phone: customer.customerNumber,
        },
        { merge: true },
      );

      await addDoc(
        collection(db, "customerMeasurement", customer.id, "measurements"),
        {
          ...measurements,
          createdAt: new Date(),
        },
      );

      setMeasurements({
        customer_id: "",
        customer_Number: "",
        customer_Name: "",
        TypeCloth: "",
        bust: "",
        waist: "",
        shoulder: "",
        sleeveLength: "",
        blouseLength: "",
        neckDepthFront: "",
        neckDepthBack: "",
        armRound: "",
        specialNotes: "",
      });
    } catch (error) {
      setError("Error:" + error.message);
    }
  };

  const Update_all_measurementData = async () => {
    try {
      await updateDoc(
        doc(
          db,
          "customerMeasurement",
          measurements.customer_id,
          "measurements",
          editId,
        ),
        {
          ...measurements,
        },
      );

      setError("Updated successfully");
      setMeasurements({
        customer_id: "",
        customer_Number: "",
        customer_Name: "",
        bust: "",
        waist: "",
        shoulder: "",
        sleeveLength: "",
        blouseLength: "",
        neckDepthFront: "",
        neckDepthBack: "",
        armRound: "",
        specialNotes: "",
      });
      setEditId(""); // reset
    } catch (error) {
      setError("Error Update : " + error.message);
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
    try {
      await deleteDoc(
        doc(db, "customerMeasurement", customer_id, "measurements", id),
      );
      setMeasurements({
        customer_id: "",
        customer_Number: "",
        customer_Name: "",
        TypeCloth: "",
        bust: "",
        waist: "",
        shoulder: "",
        sleeveLength: "",
        blouseLength: "",
        neckDepthFront: "",
        neckDepthBack: "",
        armRound: "",
        specialNotes: "",
      });
      setError("Deleted successfully");
      router.push("/admin/measurements/Indianblouse_s");
    } catch (error) {
      setError("Error : " + error.message);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-40 mb-40 p-4 border rounded">
      {Error && <h1>{Error}</h1>}
      {customer && (
        <h1 className="mt-4 mb-4 ">
          ID : {customer.id} <br />
          {customer.customerName} : {customer.customerNumber}
        </h1>
      )}
      <h2 className="text-xl font-semibold mb-4">Measurement Form</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="customer_id"
          placeholder="id"
          value={measurements.customer_id}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="customer_Number"
          placeholder="Number"
          value={measurements.customer_Number}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="customer_Name"
          placeholder="Name"
          value={measurements.customer_Name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="TypeCloth"
          placeholder="TypeCloth"
          value={measurements.TypeCloth}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="bust"
          placeholder="Bust"
          value={measurements.bust}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="waist"
          placeholder="Waist"
          value={measurements.waist}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="shoulder"
          placeholder="Shoulder"
          value={measurements.shoulder}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="sleeveLength"
          placeholder="Sleeve Length"
          value={measurements.sleeveLength}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="blouseLength"
          placeholder="Blouse Length"
          value={measurements.blouseLength}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="neckDepthFront"
          placeholder="Neck Depth Front"
          value={measurements.neckDepthFront}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="neckDepthBack"
          placeholder="Neck Depth Back"
          value={measurements.neckDepthBack}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="armRound"
          placeholder="Arm Round"
          value={measurements.armRound}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="specialNotes"
          placeholder="Special Notes"
          value={measurements.specialNotes}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={Update_all_measurementData}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Update
        </button>
      </form>{" "}
      <br />
      <br />
      <br />
      <br />
      {allMeasurements.map((item) => (
        <div
          key={item.id}
          className="border text-gray-900 mt-3 mb-10 p-2 mb-2 rounded"
        >
          <p>
            <b>Name:</b> {item.customer_Name}
          </p>
          <p>
            <b>Phone:</b> {item.customer_Number}
          </p>
          <p>
            <b>Bust:</b> {item.bust}
          </p>
          <p>
            <b>Waist:</b> {item.waist}
          </p>
          <p>
            <b>Notes:</b> {item.specialNotes}
          </p>
          <p>
            <button
              onClick={() => {
                setMeasurements({
                  customer_id: item.customer_id || "",
                  customer_Name: item.customer_Name || "",
                  customer_Number: item.customer_Number || "",
                  TypeCloth: item.TypeCloth || "",
                  bust: item.bust || "",
                  waist: item.waist || "",
                  shoulder: item.shoulder || "",
                  sleeveLength: item.sleeveLength || "",
                  blouseLength: item.blouseLength || "",
                  neckDepthFront: item.neckDepthFront || "",
                  neckDepthBack: item.neckDepthBack || "",
                  armRound: item.armRound || "",
                  specialNotes: item.specialNotes || "",
                });
                setEditId(item.id);
              }}
            >
              Edit
            </button>
          </p>
          <p>
            <button
              onClick={() => deleteMeasurement(item.id, item.customer_id)}
            >
              delete
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default page;
