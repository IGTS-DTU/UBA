import { useState } from "react";
import logo from "/igtsLOGO.png";
import bgPic from "/bgPIC.png";

export default function InputPage() {
  const [isSubmit, setSubmit] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get("input"));
    setSubmit(true);
  };

  return (
    <div className="h-screen flex justify-center  bg-cover bg-center" style={{ backgroundImage:{bgPic} }  }>
    <div className="flex flex-col items-center">
      <img className="h-[20vh] mb-5 mt-15" src={logo} alt="Logo" />
      <h1 className="mt-6 text-5xl font-bold text-white font-sans mb-15">A</h1>
      {!isSubmit ? (
        <form onSubmit={submit} className="flex flex-col items-center mt-16 mb-12">
<input
  name="input"
  type="number"
  placeholder="INPUT"
  step="10"
  min="0"
  max="250"
  required
className="h-15 w-50  px-2  text-center text-5xl font-bold text-[#000000] placeholder-[#67325c] font-mono
         bg-gray-300 rounded-xl border-3 border-black-500 shadow-inner 
         focus:outline-none focus:ring-4 focus:ring-purple-500"
/>
<button
  type="submit"
  className="h-14 w-46  rounded-md border-4 border-black 
             bg-[#F5E1F5] text-black font-extrabold text-3xl 
             shadow-[0_0_0_4px_white,0_0_0_8px_black] 
             hover:bg-[#E0C4E0] transition mt-10"
>
  SUBMIT
</button>
</form>
      ) : (
        <button
            className="mb-30 h-14 w-46  rounded-md border-4 border-black 
             bg-[#691678] text-white text-3xl pr-5 px-2
             shadow-[0_0_0_4px_white,0_0_0_8px_black] 
             hover:bg-[#E0C4E0] transition mt-15 cursor-not-allowed"
          disabled
        >
          SUBMITTED
        </button>
      )}
      <h1 className="text-4xl mt-5 text-white" style={{fontFamily:"arial"}}>ROUND 1</h1>
    </div>
  </div>
);
}