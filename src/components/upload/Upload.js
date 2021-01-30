import React, { useState } from "react"
import "./upload.css"
import Dropbox from "../dropbox/Dropbox"

const Upload = ()=>{
    const [loginClass, setEmail] = useState("")
    const [resetClass, setPassword] = useState("d-none")
    return(
        <div className="login-page" >
            
            <div className="form">
            <h1 style={{marginBottom: "30px",color:  "#FFFF"}}><span><i className="fas fa-share-alt-square"></i><b style={{marginLeft:"10px"}}>File Share</b></span></h1>
              <form>
                <input type="text" placeholder="Your Name" onChange={e => setEmail(e.target.value) }  required/>
                <input type="text" placeholder="Email to Share" onChange={e => setPassword(e.target.value)} required/>
                            
              </form>
              <Dropbox />   
          </div>
        </div>
    )
}

export default Upload;

