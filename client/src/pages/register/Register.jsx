import React,{useRef} from 'react'
import "./register.css"
import axios from "axios"
import {useNavigate} from "react-router"

export default function Login() {
  const username=useRef();
  const email=useRef();
  const password=useRef();
  const passwordAgain=useRef();

  const navigate=useNavigate()

  const handleClick=async (e)=>{
    // prevents refreshing when clicked
    e.preventDefault();
    if(password.current.value!=passwordAgain.current.value){
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    }else{
      const user= {
        username:username.current.value,
        email:email.current.value,
        password:password.current.value
      }
      try{
        await axios.post("/auth/register",user)
        navigate("/login")

      }catch(err){
        console.log(err)
      }
    }
  }

  return (
    <div>
      <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">AgriConnect</h3>
                <span className="loginDesc">Connect with farmers around the world on AgriConnect!</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Username" required className="loginInput" ref={username} />
                    <input placeholder="Email" type="email" required className="loginInput" ref={email}/>
                    <input placeholder="Password" type="password" minLength={6} required className="loginInput" ref={password}/>
                    <input placeholder="Password Again" type="password" minLength={6} required className="loginInput" ref={passwordAgain}/>
                    <button className="loginButton" type="submit">Sign Up</button>
                    <button className="loginRegisterButton">
                        Log into Account
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}
