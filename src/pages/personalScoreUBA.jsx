import React from "react";
import "./personalScore.css";
import logo from "/igtsLOGO.png";

const PersonalScoreUBA = () => {
  // Mock data
  const mockData = {
    diner: [10, 20, 15],
    uba: [5, 10, 35],
  };

  const pool = { name: "A" };

  const mockRank = 1;
  const totalScore = mockData.uba.reduce((acc, score) => acc + score, 0);

  return (
    <div className="personal-score-container">
      <div className="score-card">
        <div>
          <img src={logo} alt="IGTS Logo" className="logo" />
        </div>

        <div className="title">UBA : Pool {pool.name}</div>

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
              {mockData.uba.map((score, index) => (
                <tr key={index}>
                  <td>Round {index + 1}</td>
                  <td>{score}</td>
                </tr>
              ))}
              <tr className="total-score">
                <td>Total</td>
                <td>{totalScore}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rank-section">
          <div>YOUR RANK IS</div>
          <div className="rank-number">#{mockRank}</div>
        </div>
      </div>
    </div>
  );
};

export default PersonalScoreUBA;
