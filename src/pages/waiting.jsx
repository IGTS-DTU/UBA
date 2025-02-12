import logo from "/igtsLOGO.png"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onSnapshot, doc, collection, getDocs, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";

import bgPic from "/bgPIC.png";
export default function WaitingPage(){
  const navigate=useNavigate();
  useEffect(() => {

    const fetchIndex = async (poolno) => {
        const users = await getDoc(doc(db,"IGTS", `uba`,"pool"+poolno,`users`));
        //console.log(users.data().users);
        let userId = localStorage.getItem("email");
        console.log(userId)
        const index = users.data().users.findIndex(user => user == userId);
        console.log(users.data())
        if(index>-1)
          localStorage.setItem("index", index);
        
    };
    
    const fetchPool = async () => {
      let docRef=doc(db,"IGTS", "Users","pool",localStorage.getItem("email"));
      const querySnapshot = await getDoc(docRef);
      if(querySnapshot.exists())
      localStorage.setItem("pool",querySnapshot.data().pool);
    };
    

    const startedornot = onSnapshot(doc(db,"IGTS","started"), async(doc) => {
      if (doc.exists()) {
        //setStarted(doc.data().Started);
        if (doc.data().started) {
          await fetchPool();
          await fetchIndex(localStorage.getItem("pool"));

          navigate("/input");
        }
      }
    });
    
    
    
    //fetchUsers();
    //fetchPoolno("pool1");
    return () => startedornot();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-cover  bg-center" style={{ backgroundImage: `url(${bgPic})` }}>
      <p className="text-white text-2xl">Please be Patient</p>
      <img 
        src={logo} 
        className="h-[20vh] my-[10vh] logoRotate" 
        alt="Logo" 
        
      />
      <p className="text-white text-xl">We Will Assign You To a Pool Soon....</p>
    </div>
  )
}
