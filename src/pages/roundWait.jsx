import logo from "/igtsLOGO.png"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onSnapshot, doc, collection, getDocs, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";

export default function RoundWaiting(){
  const navigate=useNavigate();
  useEffect(() => {
    let pool=localStorage.getItem("pool");
    const roundRef = doc(db, "IGTS","uba","pool"+pool,"details");
    const startedornot = onSnapshot(roundRef, async(doc) => {
      if (doc.exists()) {
        console.log(doc.data().round);
        console.log(localStorage.getItem("round"));

        if (doc.data().round!=Number(localStorage.getItem("round"))) {
          navigate("/input");
        }
      }
    });
    
    return () => startedornot();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-cover bg-center bg-[url('./bgPIC.png')]">
      <p className="text-white text-2xl">Please be Patient</p>
      <img 
        src={logo} 
        className="h-[20vh] my-[10vh] logoRotate" 
        alt="Logo" 
        
      />
      <p className="text-white text-xl">Waiting for others people ....</p>
    </div>
  )
}
