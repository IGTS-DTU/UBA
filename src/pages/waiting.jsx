import logo from "/igtsLOGO.png"
export default function WaitingPage(){
  return (
    <div>
      <p>Please be Patient</p>
      <img src={logo} className="logo"/>
      <p>We Will Assign You To a Pool Soon....</p>
    </div>
  )
}