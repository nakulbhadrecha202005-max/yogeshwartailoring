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

const page = () => {
  const router = useRouter();
  const [UsersData, setUsersData] = useState({
    customerName: "",
    customerNumber: "",
    dateJoin: "",
  });
  const [authuser, setAuthuser] = useState(null);
  const [User, setUser] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [AllUsers, setAllUsers] = useState([]);

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

  //fetch users from frebase
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

  //auth user check
  if (!authuser) {
    return (
      <div className="text-center mt-40 mb-40">
        <h1>Loading........</h1>
      </div>
    );
  }

  //handle change
  const handleChange = (e) => {
    setUsersData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

  //Mapping all Users fetch data from firebase
  const display_users = () => {
    return (
      <>
        {AllUsers.map((user, i) => (
          <div key={i}>
            <span>{user.customerName}</span> &nbsp; &nbsp;&nbsp;
            <span>{user.customerNumber}</span> &nbsp;&nbsp;&nbsp;
            <span>{user.dateJoin}</span> &nbsp;&nbsp;&nbsp;
            <button
              className="border"
              onClick={() => {
                setUsersData({
                  customerName: user.customerName,
                  customerNumber: user.customerNumber,
                  dateJoin: user.dateJoin,
                });
              }}
            >
              See Data
            </button>
            <button>Delete Data</button>
          </div>
        ))}
      </>
    );
  };

  const updateCustomerByPhone = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const q = query(
        collection(db, "customersName"),
        where("customerNumber", "==", UsersData.customerNumber),
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const firstDoc = querySnapshot.docs[0];

        await updateDoc(doc(db, "customersName", firstDoc.id), {
          customerName: UsersData.customerName,
          dateJoin: UsersData.dateJoin,
        });

        console.log("User updated successfully");
      } else {
        console.log("No user found");
      }

      setLoading(false);
    } catch (error) {
      console.log("Error updating:", error);
      setLoading(false);
    }

    setUsersData({
      customerName: "",
      customerNumber: "",
      dateJoin: "",
    });
  };

  return (
    <div className="mt-40 mb-40">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <h1 className="text-3xl font-bold text-center mt-10">
        Admin Dashboard <br /> (Manage Users)
      </h1>
      <br />
      {/*    */}
      <br />
      <form action="" onSubmit={AddCustomer}>
        <label htmlFor="customerName">Customer Name:</label>
        <input
          type="text"
          spellCheck={false}
          className="border"
          id="customerName"
          value={UsersData.customerName}
          onChange={handleChange}
          name="customerName"
        />{" "}
        <br />
        <label htmlFor="customerNumber">Phone number:</label>
        <input
          type="number"
          required
          minLength={14}
          spellCheck={false}
          className="border w-50"
          id="customerNumber"
          value={UsersData.customerNumber}
          onChange={handleChange}
          name="customerNumber"
        />{" "}
        <br />
        <label htmlFor="dateJoin">Date :</label>
        <input
          type="date"
          required
          spellCheck={false}
          onChange={handleChange}
          value={UsersData.dateJoin}
          className="border w-50"
          id="dateJoin"
          name="dateJoin"
        />{" "}
        <br /> <br />
        <button type="submit" className="px-2 py-2 m-4 border">
          Submit
        </button>
      </form>
      <button
        type="submit"
        onClick={updateCustomerByPhone}
        className="px-2 py-2 m-4 border"
      >
        update
      </button>
      <br /> <br />
      {display_users()}
    </div>
  );
};

export default page;
