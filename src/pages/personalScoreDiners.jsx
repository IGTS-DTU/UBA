import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
//import "./personalScore.css";
import logo from "/igtsLOGO.png"; 

const POOLS = ["Pool A", "Pool B", "Pool C", "Pool D", "Pool E"];

const PersonalScoreDiners = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [userPool, setUserPool] = useState(null);
  const [scores, setScores] = useState([]);
  const [finalScore, setFinalScore] = useState(null);
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
              allScores[round]?.[index] ?? "-"
            );
  
  
          setScores(userScores);
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
            setFinalScore(userFinalScore);
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
    <div className="personal-score-container">
      <div className="score-card">
        <div>
          <img src={logo} alt="IGTS Logo" className="logo" />
        </div>

        <div className="title">Diner's : {userPool}</div>

        <div className="final-score">YOUR FINAL SCORE</div>

        <div className="score-table">
          <table>
            <thead>
              <tr>
                <th>ROUND</th>
                <th>SCORE</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr key={index}>
                  <td>Round {index + 1}</td>
                  <td>{score}</td>
                </tr>
              ))}
              <tr className="total-score">
                <td>Total</td>
                <td>{finalScore}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rank-section">
          <div>YOUR RANK IS</div>
          <div className="rank-number">#{rank}</div>
        </div>
      </div>
    </div>
  );
};

export default PersonalScoreDiners;
