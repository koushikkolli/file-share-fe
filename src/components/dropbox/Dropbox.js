import React, { useMemo, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios"
import backend from "../apis/backend"

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

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};


function Dropbox(props) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    open
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles:1
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject]
  );

  const uploadFile = ()=>{
        console.log(acceptedFiles)
        const fileObject = {
            image : acceptedFiles[0]
        }
        console.log(fileObject)
        backend.post("/upload", fileObject)
  }



  const filepath = acceptedFiles.map((file, i) => (
    <small key={file.path}>
      {file.path}
    </small>
  ));
  return (
    <div>
      <div {...getRootProps({ style  })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here</p>
        <button type="button" onClick={open}>
          Browse
        </button>
      </div>
      <aside>
        <div>{filepath}</div>
      </aside>
      <button onClick={()=>uploadFile()}style={{marginTop:"20px"}}>Upload</button>
    </div>
  );
}

export default Dropbox