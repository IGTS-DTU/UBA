import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import logo from "/igtsLOGO.png"; 
import bgPic from "/bgPIC.png";

const POOLS = ["Pool A", "Pool B", "Pool C", "Pool D", "Pool E"];

const PersonalScoreDiners = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [userPool, setUserPool] = useState(null);
  const [scores, setScores] = useState([]);
  const [finalScore, setFinalScore] = useState(null);
  const [totalScore, setTotalScore] = useState(null);
  const [rank, setRank] = useState(null);

  useEffect(() => {
      const storedEmail = localStorage.getItem("email");
      // const storedEmail = "igts.tech@gmail.com"; //used it for testing
      
  
      if (storedEmail) {
        setUserEmail(storedEmail);
        findUserPool(storedEmail);
      } else {
        console.error("User email not found in localStorage.");
      }
  }, []);
  
    const findUserPool = async (email) => {
      try {
        for (let pool of POOLS) {
          const poolDoc = `pool${POOLS.indexOf(pool) + 1}`;
          const usersRef = doc(db, "IGTS", "diners", poolDoc, "users");
          const usersSnap = await getDoc(usersRef);
  
          if (usersSnap.exists() && usersSnap.data().users.includes(email)) {
            const index = usersSnap.data().users.indexOf(email);
            setUserPool(pool);
            fetchUserScores(pool, index);
            fetchFinalScore(pool, index);
            return;
          }
        }
      } catch (error) {
        console.error("Error finding user pool:", error);
      }
  };
  
    const fetchUserScores = async (pool, index) => {
      try {
        const poolDoc = `pool${POOLS.indexOf(pool) + 1}`;
        const scoresRef = doc(db, "IGTS", "diners", poolDoc, "scores");
        const scoresSnap = await getDoc(scoresRef);
  
        if (scoresSnap.exists()) {
          const allScores = scoresSnap.data();
          const userScores = ["round1", "round2", "round3"].map(
            (round) => (allScores[round]?.[index] ?? "-") === 0 ? 0 :
              parseFloat(allScores[round]?.[index]).toFixed(2) ?? "-"
            );
  
  
          setScores(userScores);

           //Calculate Total Score (Ignore "-" and replace with 0)
        const numericScores = userScores.map((score) => (score === "-" ? 0 : parseFloat(score)));
        setTotalScore(numericScores.reduce((acc, curr) => acc + curr, 0).toFixed(2));
        }
      } catch (error) {
        console.error("Error fetching user scores:", error);
      }
  };
  
    const fetchFinalScore = async (pool, index) => {
      try {
        const poolDoc = `pool${POOLS.indexOf(pool) + 1}`;
        const finalScoresRef = doc(db, "IGTS", "diners", poolDoc, "finalScores");
        const finalScoresSnap = await getDoc(finalScoresRef);
  
        if (finalScoresSnap.exists()) {
          const allScores = finalScoresSnap.data();
          // const userIndex = allScores.users.indexOf(email);
  
          if (index !== -1) {
            const userFinalScore = allScores.finalScores[index] || 0;
            setFinalScore(userFinalScore.toFixed(2));
            setRank(calculateRank(userFinalScore, allScores.finalScores));
          }
        }
      } catch (error) {
        console.error("Error fetching final scores:", error);
      }
    };

  
   const calculateRank = (userFinalScore, allFinalScores) => {
    const sortedScores = [...allFinalScores].sort((a, b) => b - a);
    return sortedScores.indexOf(userFinalScore) + 1;
  };



  return (
   <div className="flex flex-col items-center text-lg text-center min-h-screen w-full bg-cover bg-center bg-[url('./bgPIC.png')]" style={{ backgroundImage: `url(${bgPic})` }}>
       
       <div className="score-card flex flex-col items-center ">
         <img src={logo}  alt="IGTS Logo" className="logo h-[15vh]  mb-8 mt-8" />
         <div className="title text-3xl text-white font-bold">Diner's : {userPool}</div>
         <div className="final-score mb-10 h-14 w-60  rounded-2xl border-4 border-black 
              bg-[#691678] text-white pr-5 px-2 text-center justify-center p-2 text-xl
              shadow-[0_0_0_4px_white,0_0_0_8px_black] 
              hover:bg-[#E0C4E0] transition mt-15 font-[inria_Sans]">YOUR FINAL SCORE</div>
 
 <div className="score-table flex justify-center mt-4 w-80 mb-10">
   <table className="border-2 border-black w-full max-w-md text-center text-xl bg-white shadow-lg rounded-lg overflow-hidden">
     <thead>
       <tr className="bg-gray-200 text-black uppercase border border-black first:rounded-t-lg">
         <th className="py-2 px-4 border border-black">ROUND</th>
         <th className="py-2 px-4 border border-black">SCORE</th>
       </tr>
     </thead>
     <tbody className="bg-white">
       {scores.map((score, index) => (
         <tr key={index} className="border border-black text-black bg-white">
           <td className="py-2 px-4 border border-black">Round {index + 1}</td>
           <td className="py-2 px-4 border border-black">{score}</td>
         </tr>
       ))}
 
       <tr className="total-score font-semibold border border-black text-black bg-white last:rounded-b-lg">
         <td className="py-2 px-4 border border-black">Normalized</td>
         <td className="py-2 px-4 border border-black">{finalScore}</td>
              </tr>
        <tr className="total-score font-semibold border border-black text-black bg-white last:rounded-b-lg">
         <td className="py-2 px-4 border border-black">Total</td>
         <td className="py-2 px-4 border border-black">{totalScore}</td>
       </tr>
     </tbody>
   </table>
 </div>
 
         <div className="rank-section">
         <div className="text-white text-[40px] leading-[48px] tracking-normal text-center font-[400] font-['Pixelify_Sans']">
   YOUR RANK IS #{rank}</div>
         </div>
       </div>
     </div>
  );
};

export default PersonalScoreDiners;
