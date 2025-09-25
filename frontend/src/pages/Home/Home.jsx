import React, { useEffect, useRef, useState } from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import { postData } from '../../services/api'
import '../../styles/home.css'

const Home = () => {

  const [image, setImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const fileInputRef = useRef(null)
  const [loadingAnime, setLoadingAnime] = useState(false);
  const navigate=useNavigate()

  // Centralized intake so drag/drop and browse reuse logic
  const pickFile = (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.')
      return
    }

    // Revoke old preview URL to avoid memory leaks
    if (previewImage) URL.revokeObjectURL(previewImage)
    setImage(file)
    setPreviewImage(URL.createObjectURL(file))
  }



  // Handle browse -> file input change
  const handleInputChange = (e) => {
    const file = e.target.files?.[0]
    pickFile(file)
  }

  // Drag & drop
  const handleDragOver = (e) => e.preventDefault()
  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    pickFile(file)
  }

  // Cleanup when component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage)
    }
  }, [previewImage])

  
  //handle the classification
  const handleClassify=async ()=>{
    //check whether the image is selected
    if(!image){
      alert("Please select an image first")
      return
    } //api-call
      //postData returns a promise
      //when the promise is resolved(HTTP req finished), we get the data and then is exec
      //
    setLoadingAnime(true)
    postData(image).then((data)=>{
      
      setLoadingAnime(false)
      navigate('/result',{state:{data:image}})

    })
  }

  return (
    <div className="home-page">
      <div className='main-text'>
        
        <h1>Welcome to <span className="sortify-brand">Sortify</span>.</h1></div>
      
      <div className='main-area'>
        <div className="home-content-row">
          <div className="drag-drop-area" onDragOver={handleDragOver} onDrop={handleDrop}>
            {!previewImage && <p>Drag & Drop your images here</p>}
            {previewImage && (
              <div className="preview">
                <img src={previewImage} alt="Selected" />
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              name="image"
              accept="image/*"
              className="upload-input"
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="attach-button"
              onClick={() => fileInputRef.current?.click()}
            >
              <img src="/src/assets/attach.svg" alt="Attach" style={{ width: '48px', height: '48px' }} />
            </button>
          </div>
          <button
            type="button"
            className="classify-button"
            onClick={()=>handleClassify()}
            
          ><img src='./src/assets/classifyButton.svg'style={{ paddingRight:'5px',width: '240px' , height: '240px' }}></img> </button> 
          
        </div>
      </div>
      
       
        <div className='authors'>Made By - 2021/E/045 , 2021/E/179</div>
    </div>
  )
}

export default Home