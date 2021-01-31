import React, { useState, useRef } from "react"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import "./upload.css"
import Dropbox from "../dropbox/Dropbox"

toast.configure()
const Upload = ()=>{
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const inputEl = useRef()
    const inputEl1 = useRef()
    const notify = (reason, message)=>{
      if (reason === "success"){
        setEmail("")
        setName("")
        inputEl.current.value =""
        inputEl1.current.value =""
        toast.success(message, {position: toast.POSITION.BOTTOM_RIGHT})
      }
      else{
        toast.error(message, {position: toast.POSITION.BOTTOM_RIGHT})
      }
    }
    return(
        <div className="login-page" >
            
            <div className="form">
            <h1 style={{marginBottom: "30px",color:  "#FFFF"}}><span><i className="fas fa-share-alt-square"></i><b style={{marginLeft:"10px"}}>File Share</b></span></h1>
              <form>
                <input ref={inputEl1} type="text" placeholder="Your Name" onChange={e => setName(e.target.value) }   required/>
                <input ref={inputEl} type="text" placeholder="Email to Share" onChange={e => setEmail(e.target.value)}  required/>
                <Dropbox name={name} email={email} notify={notify}/>             
              </form>
               
          </div>
        </div>
    )
}

export default Upload;

