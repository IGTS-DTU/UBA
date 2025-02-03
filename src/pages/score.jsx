import { useState } from "react";

export default function ScoreScreen() {
  const [scores, setScores] = useState([
    { name: "ABC", score: 100 },
    { name: "DEF", score: 120 },
    { name: "GHI", score: 90 }
  ]);

  return (
    <div>
      <h1>SCORES</h1>
        <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((el, id) => (
            <tr key={id}>
              <td>{id + 1}</td>
              <td>{el.name}</td>
              <td>{el.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}