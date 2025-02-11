import { Link, useNavigate } from "react-router-dom";
import { auth, db, loginWithGoogle,logout } from "../../firebaseConfig";
import logo from "/igtsLOGO.png"
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

function Home() {
  const handleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      console.log(user)
    } catch (error) {   
    }
  };

  useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
        setUser(user)
          if (user) {
              localStorage.setItem("email", user.providerData[0]?.email);
              console.log("User is logged in");
            } else {
                console.log("User is logged out");
            }
        })
    },[])

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
    }
  };
  const navigate=useNavigate();
  const [user, setUser] = useState(auth.currentUser)

  const addToQueue = async (userEmail) => {
    const formRef = doc(db, "IGTS", "Queue"); 
  
    try {
      await updateDoc(formRef, {
        users: arrayUnion(userEmail) 
      });
      console.log("Email added successfully!");
    } catch (error) {
      console.error("Error adding email:", error);
    }
  };

  const handleStartGame=async ()=>{
    await addToQueue(localStorage.getItem("email"));
    navigate('/waiting')
  }
  if(user){
    return     <div
    className="flex flex-col items-center text-lg text-center min-h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${bgPic})` }}
  >
   <img className="h-[15vh]  mb-8 mt-8" src={logo} alt="Logo" />
        <h2 className="text-white text-2xl mb-5 mt-10">{user.name}</h2>
       <div className="text-white text-2xl mb-10">{user.providerData[0]?.email}</div>
       
       <button className="h-14 w-[11.5rem] rounded-md border-4 border-black 
                   bg-black text-white text-2xl 
                   shadow-[0_0_0_4px_white,0_0_0_8px_black] 
                   hover:bg-[#E0C4E0] transition mt-10 font-mono px-2"
        onClick={() => handleStartGame()}>
  START GAME
</button>

    </div>
    }
  return (
    <div
    className="flex flex-col items-center text-lg text-center min-h-screen w-full bg-cover bg-center " style={{ backgroundImage: `url(${bgPic})` }}
  >
   <img className="h-[15vh]  mb-20 mt-10" src={logo} alt="Logo" />
   <h2 className="mb-20 font-mono text-4xl text-white [text-shadow:2px_2px_0px_black]">
  Welcome to IGTS!!
</h2>




        <button
  onClick={handleLogin}
  className="flex items-center gap-2 px-8 py-4 border  border-gray-300 rounded-xl shadow-sm transition bg-black"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30 31"
    className="w-[18px] h-[18px]"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M29.0861 15.7786C29.0861 14.7433 28.9932 13.7478 28.8207 12.792H15.0691V18.44H22.9271C22.5887 20.2651 21.56 21.8115 20.0136 22.8469V26.5104H24.7324C27.4933 23.9685 29.0861 20.2253 29.0861 15.7786Z"
      fill="#4285F4"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.0691 30.0478C19.0114 30.0478 22.3166 28.7404 24.7324 26.5104L20.0136 22.8469C18.7061 23.7229 17.0336 24.2406 15.0691 24.2406C11.2662 24.2406 8.04735 21.6721 6.89917 18.221H2.0211V22.004C4.42363 26.7759 9.36144 30.0478 15.0691 30.0478Z"
      fill="#34A853"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.89917 18.221C6.60715 17.3449 6.44123 16.4091 6.44123 15.4468C6.44123 14.4844 6.60715 13.5487 6.89917 12.6726V8.88959H2.02109C1.0322 10.8607 0.468071 13.0907 0.468071 15.4468C0.468071 17.8029 1.0322 20.0328 2.02109 22.004L6.89917 18.221Z"
      fill="#FBBC05"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.0691 6.65297C17.2128 6.65297 19.1375 7.38966 20.6507 8.83649L24.8386 4.64864C22.3099 2.29257 19.0048 0.845734 15.0691 0.845734C9.36144 0.845734 4.42363 4.1177 2.0211 8.88959L6.89917 12.6726C8.04735 9.22143 11.2662 6.65297 15.0691 6.65297Z"
      fill="#EA4335"
    />
  </svg>
  <span className="text-white text-2xl" >Sign in with Google</span>
</button>

    </div>
  );
}

export default Home;