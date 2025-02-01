import igtslogo from "/igtsLOGO.png"
import "../desktop.css"
export default function App(){
  
  return (
    <div>
      <h1>DINER'S GAME</h1>
      <div className="pool-bar">
        <button>Pool A</button>
        <button>Pool B</button>
        <button>Pool C</button>
        <button>Pool D</button>
        <button>Pool E</button>
      </div>
      <h3>ROUND 1</h3>
      <div className="grid-container">
        <img src={igtslogo} className="transp-logo"/>
        {Array(60).fill().map((_, idx) => (
          <div className="box" key={idx}>
            {idx === 0 && "Name"}
            {idx === 15 && "Email"}
            {idx === 30 && "Order"}
            {idx === 45 && "Score"}
          </div>
        ))}
      </div>
      <h3>ROUND 2</h3>
      <div className="grid-container">
      {Array(60).fill().map((_, idx) => (
        <div className="box" key={idx}>
          {idx === 0 && "Name"}
          {idx === 15 && "Email"}
          {idx === 30 && "Order"}
          {idx === 45 && "Score"}
        </div>
      ))}
      </div>
      
    </div>
  )
}