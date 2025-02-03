import { useState } from "react";
import bgPic from "/bgPIC.png";
import logo from "/igtsLOGO.png";
export default function ScoreScreen() {
  const [scores, setScores] = useState([
    { name: "ABC", score: 100 },
    { name: "DEF", score: 120 },
    { name: "GHI", score: 90 },
  ]);

  return (
    <div
    className="flex flex-col items-center text-lg text-center min-h-screen w-full bg-cover bg-center bg-[url('./bgPIC.png')]"
  >
   <img className="h-[15vh]  mb-8 mt-8" src={logo} alt="Logo" />
      <h1 className="text-3xl font-bold mb-4">SCORES</h1>
      <table className="w-3/4 bg-white bg-opacity-70 rounded-lg shadow-md text-black">
        <thead>
          <tr className="bg-purple-600 text-white">
            <th className="px-4 py-2">S.No</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((el, id) => (
            <tr key={id} className="border-b">
              <td className="px-4 py-2">{id + 1}</td>
              <td className="px-4 py-2">{el.name}</td>
              <td className="px-4 py-2">{el.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
}