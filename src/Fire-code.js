import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const newUser = {
  name: "yau",
  password: "yau",
  position: "secreatary",
  address:
    "Sunset Bay Condos, 789 Lorong Senja, Sunville, Johor Bahru, Malaysia",
  messages: [
    "Welcome to the strata expert system, how can I help you today ?",
    "Is it compulsory to enter financial reporting of our strata/condo site every month?",
    "Yes, it is compulsory in order for COB to know the monthly income/expenses for the building. For all type of users, JMB/MC/Agent or Developer have to report their monthly financial reporting to COB.",
    "Can maintenance and sinking funds combine into one accounting account/bank account?",
    "No, maintenance and sinking fund have to be separated into two accounts",
    "If I become a committee member, how long can I stay as a committee member?",
    "Maximum is 3 years. This is if the owner wins on the yearly election process. If the member wants to stand for election on the 4th year, he will not be entitled as he have been a committee member for the past 3 years",
  ],
};

export function Demo() {
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, "users");
  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(userCollectionRef);
  //     setUsers(
  //       data.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }))
  //     );
  //   };
  //   getUsers();
  // }, []);

  const createUser = async () => {
    await addDoc(userCollectionRef, newUser);
  };

  const updateUser = async () => {
    const userDoc = doc(db, "users", "C4UFikBpjaPzG3Vt0E5E");
    await updateDoc(userDoc, newUser);
  };

  const deleteUser = async () => {
    const userDoc = doc(db, "users", "C4UFikBpjaPzG3Vt0E5E");
    await deleteDoc(userDoc, newUser);
  };

  return (
    <div style={{ minWidth: "850px" }}>
      {users.map((user) => {
        return (
          <div>
            <button onClick={createUser}>create User</button>
            <button onClick={updateUser}>update User</button>
            <button onClick={deleteUser}>delete User</button>
            <h1>Name: {user.name}</h1>
            <h1>position: {user.position}</h1>
            <h1>address: {user.address}</h1>
            <h1>messages: {user.messages}</h1>
          </div>
        );
      })}
    </div>
  );
}
