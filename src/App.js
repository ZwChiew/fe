import React from "react";
// import { addDoc, collection } from "firebase/firestore";
// import { db } from "./firebase-config";
import { Routers } from "./router";
// import { useState } from "react";
// import axios from "axios";

function App() {
  //const userCollectionRef = collection(db, "users");
  // const createUser = async () => {
  //   await addDoc(userCollectionRef, newU);
  // };

  // const [output, setOutput] = useState();
  // const newU = {
  //   name: "kky",
  //   fullname: "Tan Woon Cong",
  //   password: "kky",
  //   position: "Chairman",
  //   address:
  //     "Ocean View Residences, 123 Jalan Pantai, Seaville, Kuala Lumpur, Malaysia",
  //   messages: [
  //     "Welcome to the strata expert system, how can I help you today ?",
  //     "Where do I key in my expenses and income in the accounting books?",
  //     "All jmb/mc need to have their own record for accounting. High cost usually will get an accounting system or hire an accounting firm to manage their expenses.",
  //     "How am i eligible to vote",
  //     "In order for u to be eligible to vote, u need to ensure your unit have valid strata title and u are not a defaulter",
  //     "If the house is under two owners (joint owners), who can and suppose to vote?",
  //     "If house under two owners, main owner need to assign a proxy either himself or the other owner as the person who will vote.",
  //   ],
  // };

  // const handleButtonClick = async () => {
  //   var myParams = {
  //     data: "What is the formula to calculate maintenances fees",
  //   };
  //   await axios
  //     .post("http://localhost:5000/api/query", myParams)
  //     .then(function (response) {
  //       setOutput(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };
  return (
    <div style={{ minWidth: "900px" }}>
      <Routers></Routers>
      {/* <Typography style={{ whiteSpace: "pre-line" }}>
        {output.replace(/\\n/g, "\n")}
      </Typography> */}
      {/* <button onClick={handleButtonClick}>Hello</button> */}
    </div>
  );
}

export default App;
