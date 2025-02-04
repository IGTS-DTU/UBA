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
    } catch (error) {   
    }
  };

  useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
        setUser(user)
          if (user) {
              localStorage.setItem("email", user.email);
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
    return <div>
        <img src={logo} />
        <h2>Welcome {user.displayName}</h2>
       <div>{user.email}</div>
       
       <button onClick={()=>{
        handleStartGame();
        
       }}>Start Game</button>
    </div>
    }
  return (
    <div>
        <img src={logo} />
        <h2>Welcome to IGTS!!</h2>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}

export default Home;
