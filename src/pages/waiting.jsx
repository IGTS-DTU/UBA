import logo from "/igtsLOGO.png";

export default function WaitingPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-cover bg-center bg-[url('./bgPIC.png')]">
      <p className="text-white text-2xl">Please be Patient</p>
      <img 
        src={logo} 
        className="h-[20vh] my-[10vh]" 
        alt="Logo" 
        style={{
          animation: "rotate 2s linear 2s infinite"
        }}
      />
      <p className="text-white text-xl">We Will Assign You To a Pool Soon....</p>
    </div>
  );
}
