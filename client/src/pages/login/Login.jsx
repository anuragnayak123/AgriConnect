import { useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {CircularProgress} from "@mui/material"

export default function Login() {
  const email=useRef();
  const password=useRef();
  const {user,isFetching,error,dispatch}=useContext(AuthContext)
  const handleClick=(e)=>{
    // prevents refreshing when clicked
    e.preventDefault();
    loginCall({email:email.current.value,password:password.current.value},dispatch)
  }
  console.log(user)
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
                    <input placeholder="Email" type="email" required className="loginInput" ref={email} />
                    <input placeholder="Password" type="password" minLength={6} required className="loginInput" ref={password} />
                    <button className="loginButton" type="submit" disabled={isFetching}>{isFetching?<CircularProgress color="success"/>:"Log In"}</button>
                    <span className="loginForgot">Forgot Password</span>
                    <button className="loginRegisterButton">
                    {isFetching?<CircularProgress color="success"/>:"Create a New Account"}
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}
