import React,{useContext,useRef,useState} from 'react'
import "./share.css"
import {AuthContext} from "../../context/AuthContext"
import axios from "axios"
import {Cancel} from "@mui/icons-material"

function Share() {

  const {user}=useContext(AuthContext)
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  const desc=useRef()
  const [file,setFile]=useState(null)

  const submitHandler=async (e)=>{
    e.preventDefault()
    const newPost={
      userId:user._id,
      // for userefs variables you have to use .current.value
      desc:desc.current.value,
    }
    if(file){
      const data=new FormData()
      const fileName=""+Date.now()+file.name
      // const fileName=""+file.name
      console.log(fileName)
      data.append("name",fileName)
      data.append("file",file)
      newPost.img=fileName
      try{
        await axios.post("/upload", data)
      }catch(err){
        console.log(err)
      }
    }
    try{
      await axios.post("/posts",newPost)
      window.location.reload()
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePicture||PF+"no_profile.jpg"} alt="" />
          <input
            placeholder={"Share your latest innovations, "+user.username+"!"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr"/>
        {file&&(
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={()=>setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
                <label htmlFor='file' className="shareOption">
                    <i class="fa-solid fa-photo-film shareIcon"></i>
                    <span className="shareOptionText">Photo or Video</span>
                    <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}></input>
                </label>
                <div className="shareOption">
                    <i class="fa-solid fa-tag shareIcon"></i>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <i class="fa-solid fa-location-dot shareIcon"></i>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <i class="fa-solid fa-face-smile-wink shareIcon"></i>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button type="submit" className="shareButton">Share</button>
        </form>
      </div>
    </div>
  )
}

export default Share;
