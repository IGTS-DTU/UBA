import { useEffect, useState } from "react";
import logo from "/igtsLOGO.png";
import bgPic from "/bgPIC.png";
import { collection, doc, getDoc, runTransaction } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";


export default function InputPage() {
  const [isSubmit,setSubmit] = useState(false)
  const [round, setRound] = useState(0)
  const navigate=useNavigate()
  useEffect(() => {
    async function getRound() {
      let pool = localStorage.getItem("pool");
      const roundRef = doc(db, "IGTS","uba","pool"+pool,"details"); 
    

      let r=await getDoc(roundRef)
      setRound(r.data().round)
      localStorage.setItem("round",r.data().round)
      if(r.data().status){
        navigate("/result")
      }
    }
    getRound()

    async function checkManualRoute() {
          const startRef = doc(db, "IGTS","started"); 
          let docRef=doc(db,"IGTS", "Users","pool",localStorage.getItem("email"));
          const querySnapshot = await getDoc(docRef);
          if(!querySnapshot.exists()){
            navigate("/waiting")
          }
          let s=await getDoc(startRef)
          if(!s.data().started){
            navigate("/waiting")
          }
        }
        checkManualRoute()
  }, []);
  const submit = async (e) => {
    e.preventDefault(); 
    const formData = new FormData(e.target); 
    const bid1 = formData.get("bid1");
    const bid2 = formData.get("bid2");
    const bid3 = formData.get("bid3");
    let pool = localStorage.getItem("pool");
    let index = localStorage.getItem("index");
    const docRef = doc(db, "IGTS","uba","pool"+pool,"input"); 
    const roundRef = doc(db, "IGTS","uba","pool"+pool,"details"); 
    let rd=await getDoc(roundRef)
    let r=rd.data().round
    localStorage.setItem("round",r)
    try {
      await runTransaction(db, async (transaction) => {
        const docSnapshot = await transaction.get(docRef);
        if (!docSnapshot.exists()) {
          throw new Error("doc does not exist!");
        }
        
        let input = docSnapshot.data() ;
        console.log(input)
        
        if (index < 0 || index >= input.length) {
          throw new Error("Invalid index!");
        }
        input["round"+r][index] = [Number(bid1),Number(bid2),Number(bid3)];
        
        transaction.update(docRef, input );
      });
      console.log("Email updated successfully!");
      navigate("/roundWait")
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  return (
    <div className="h-screen flex justify-center  bg-cover  bg-center" style={{ backgroundImage: `url(${bgPic})` }}>
    <div className="flex flex-col items-center">
      <img className="h-[20vh] mb-5 mt-10" src={logo} alt="Logo" />
      <h2 className=" text-4xl font-bold text-white font-sans ">{String.fromCharCode(64 + Number(localStorage.getItem("pool")))}</h2>
      <h2 className="text-3xl mt-2 text-white" style={{fontFamily:"arial"}}>ROUND {round}</h2>
      {!isSubmit ? (
        <form onSubmit={submit} className="flex flex-col items-center mt-16 mb-12">
<input
  name="bid1"
  type="number"
  placeholder="Bid 1"
  step="1"
  min="1"
  max="30"
  required
className="h-15 mb-1 w-50  px-2  text-center text-5xl font-bold text-[#000000] placeholder-[#67325c] font-mono
         bg-gray-300 rounded-xl border-3 border-black-500 shadow-inner 
         focus:outline-none focus:ring-4 focus:ring-purple-500"
/>
<input
  name="bid2"
  type="number"
  placeholder="Bid 2"
  step="1"
  min="1"
  max="30"
  required
className="h-15 mb-1 w-50  px-2  text-center text-5xl font-bold text-[#000000] placeholder-[#67325c] font-mono
         bg-gray-300 rounded-xl border-3 border-black-500 shadow-inner 
         focus:outline-none focus:ring-4 focus:ring-purple-500"
/>
<input
  name="bid3"
  type="number"
  placeholder="Bid 3"
  step="1"
  min="1"
  max="30"
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
      
    </div>
  </div>
);
}