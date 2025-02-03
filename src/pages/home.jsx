import { Link, useNavigate } from "react-router-dom";
import { auth, loginWithGoogle,logout } from "../../firebaseConfig";
import logo from "/igtsLOGO.png"
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

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
  if(user){
    return <div>
        <img src={logo} />
        <h2>Welcome {user.displayName}</h2>
       <div>{user.email}</div>
       
       <button onClick={()=>{
        navigate('/waiting')
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
