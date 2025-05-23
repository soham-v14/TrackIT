import React, { useEffect } from 'react'
import "./style.css";
import { auth } from "../../firebase";
//import { useAuthState } from "react-firebase-hooks";
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import userImg from "../../assets/user.svg"
function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  

  useEffect(() => {
    if(user) { 
      navigate("/Dashboard");

    }
  }, [user, loading]);
  function logoutfnc(){
    try{
      signOut(auth)
        .then (() => {
          toast.success("Logged Out Successfully");
          navigate("/");

        })
        .catch((error) => {
          toast.error(error.message);
        })
      
      }catch(e){
      toast.error(e.message);
    }
  }
  
  
  return (
    <div className='navbar'>
      <p className='logo'>TrackIT.</p>
      {user && (
        <div style = {{display:"flex", alignItems:"center",gap:"0.1rem"}}        >
        <img src={user.photoURL?user.photoURL :userImg}  style={{borderRadius:"50%" , height:"1.5rem", width:"1.5  rem"}} />
        <p className='logo link' onClick={logoutfnc}>
        Logout
      </p>
      </div>
      )}
      
      
    </div>
  )
}

export default Header;
