import React, { useState } from 'react'
import "./style.css"
import Input from '../Input';
import Button from '../Button';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import { auth, db, provider,  } from '../../firebase'; 

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc,} from "firebase/firestore"; 

import { GoogleAuthProvider } from 'firebase/auth';


function SignupSigninComponent() {
  const[name,setName] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[confirmpassword,setConfirmPassword] = useState("");
  const[loginForm,setLoginForm] = useState(false);
  const[loading,setLoading] = useState(false);
  const navigate = useNavigate();

function signupWithEmail(){
  setLoading(true);
  console.log("Name", name);
  console.log("Email", email);
  console.log("Password", password);
  console.log("ConfirmPassword", confirmpassword);

if(name !== "" && email !== "" && password !== "" && confirmpassword !== ""){
  if(password == confirmpassword){

  
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("User>>>", user);
    toast.success("User Created");
    setLoading(false);
    setConfirmPassword("");
    setName("");
    setEmail("");
    setPassword("");
    createDoc(user);
    navigate("/Dashboard");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
    setLoading(false);
  });
  
}
  else{
    toast.error("Password & Confirm Password dont't match!")
    setLoading(false);
  }
  }else{
        toast.error("All fields are mandatory")
        setLoading(false);
      }
  
} 
  function loginUsingEmail(){
    console.log("Email", email);
    console.log("Password" , password);
    setLoading(true);

    if(email !== "" && password !== "" ){

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        const user = userCredential.user;
        toast.success("User Logged In!");
        console.log("User Logged in", user);
        setLoading(false);
        navigate("/Dashboard");
      })
        .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         setLoading(false);
         toast.error(errorMessage);
      });
    }else{
      toast.error("All fields are mandatory!");
      setLoading(false);
  }
}

  async function createDoc(user){
    setLoading(true);
    if(!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);



    if(!userData.exists()){
      try{
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL : user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc Created!");
        setLoading(false);
      }
      catch(e){
        toast.error(e.message);
        setLoading(false);
      }

    }
    else{
      //toast.error("Doc Already Exists");
      setLoading(false);
    }


  }


  function googleAuth(){
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("user>>>" , user);
          createDoc(user);
          setLoading(false);
          navigate("/Dashboard")
          toast.success("User Authenticated!")
          
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        toast.error(errorMessage)
        
      });
    } catch (e) {
      setLoading(false);
      toast.error(e.message);
    }
    
    
  }


  return (
    <>
    {loginForm ? (
      <div className='signup-wrapper'>
      <h2 className='title'>
        Login on <span style={{color: "var(--theme)"}}>TrackIT.</span>
      </h2>
      <form>
        

        <Input 
          type="email"
          label={"Email"} 
          state={email} 
          setState={setEmail} 
          placeholder={"JonSnow@gmail.com"}
        />

        <Input 
          type="password"
          label={"Password"} 
          state={password} 
          setState={setPassword} 
          placeholder={"Gh0$T"}
        />

        
      <Button 
        disabled={loading}
        text={loading ? "Loading..." : "Login Using Email & Password"} 
        onClick={loginUsingEmail}
      />
      <p className='p-login'>or</p>
      <Button 
        onClick={googleAuth}
        text={loading ? "Loading..." : "Login Using Google"} 
        blue={true} 
      />
      <p className='p-login' style={{cursor : "pointer"}} 
         onClick={() => setLoginForm(!loginForm)}
      >
        Or Don't Have An Account? 
      </p>

      <p className='p-Logo' style={{cursor : "pointer"}} 
         onClick={() => setLoginForm(!loginForm)}
      >
        Click Here
      </p>


      </form>
    </div>

    ):(
      <div className='signup-wrapper'>
      <h2 className='title'>
        Sign Up on <span style={{color: "var(--theme)"}}>TrackIT.</span>
      </h2>
      <form>
        <Input  
          label={"Full Name"} 
          state={name} 
          setState={setName} 
          placeholder={"Jon Snow"}
        />

        <Input 
          type="email"
          label={"Email"} 
          state={email} 
          setState={setEmail} 
          placeholder={"JonSnow@gmail.com"}
        />

        <Input 
          type="password"
          label={"Password"} 
          state={password} 
          setState={setPassword} 
          placeholder={"Gh0$T"}
        />

        <Input 
          type="password"
          label={"Confirm Password"} 
          state={confirmpassword} 
          setState={setConfirmPassword} 
          placeholder={"Gh0$T"}
        />

      <Button 
        disabled={loading}
        text={loading ? "Loading..." : "Signup Using Email & Password"} 
        onClick={signupWithEmail}
      />
      <p className='p-login'>or</p>
      <Button 
        onClick={googleAuth}
        text={loading ? "Loading..." : "Signup Using Google"} 
        blue={true} 
      />
      <p className='p-login' style={{cursor : "pointer"}} 
         onClick={() => setLoginForm(!loginForm)}
      >
        Or Have An Account Already? 
      </p>

      <p className='p-Logo' style={{cursor : "pointer"}} 
         onClick={() => setLoginForm(!loginForm)}
      >
        Click Here
      </p>
      </form>
    </div>

    )}

  </>
  )
}

export default SignupSigninComponent;
