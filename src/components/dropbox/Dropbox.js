import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios"




const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "10px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out"
};

const activeStyle = {
  borderColor: "#2196f3"
};


const rejectStyle = {
  borderColor: "#ff1744"
};


function Dropbox(props) {
  const [files, setFiles] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    acceptedFiles,
    open
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles:1,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );}
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject]
  );

  const uploadFile = async (event)=>{
       /* console.log(acceptedFiles)
        const fileObject = {
            image : acceptedFiles[0]
        }
        console.log(fileObject)
        axios.post("https://file-share-be.herokuapp.com/upload", fileObject, )*/
        event.preventDefault()
        
        try{
          if (props.name === undefined || props.name === ""){
            props.notify("empty", "Please fill your Name")
          }
          else if(props.email === undefined || props.email === ""){
            props.notify("empty", "Please fill Email")
          }
          else if(acceptedFiles === undefined || acceptedFiles.length === 0){
            props.notify("empty", "Please select a Single File")
          }
          else{
            const fd = new FormData()
            fd.append("image", acceptedFiles[0])
            fd.append("email", props.email)
            fd.append("from", props.name)
            fd.append("name", acceptedFiles[0].name)
            const config = {
              headers:{
                'Content-Type':'multipart/form-data'
              }
            }
            await axios.post("http://localhost:3001/upload", fd, config)
            acceptedFiles.pop()
            setFiles([])
            props.notify("success", "Files Shared!")

          }
          
        }
        catch(err){
          console.log(err)
          props.notify("error", "Unable to share file")
        }
        
  }



  const filepath = files.map((file, i) => (
    <small key={file.path}>
      {file.path}
    </small>
  ));
  return (
    <div>
      <div {...getRootProps({ style  })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop a file here</p>
        <button type="button" onClick={open}>
          Browse
        </button>
      </div>
      <aside>
        <div>{filepath}</div>
      </aside>
      <button onClick={(e)=>uploadFile(e)}style={{marginTop:"20px"}}>Upload</button>
    </div>
  );
}

export default Dropbox
