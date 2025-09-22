import React, { useEffect, useRef, useState } from 'react'

const Home = () => {
  const [image, setImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const fileInputRef = useRef(null)

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

  return (
    <div className="home-page">
      <h1>Welcome to Sortify.</h1>

      <div className="drag-drop-area" onDragOver={handleDragOver} onDrop={handleDrop}>
        <p>Drag & Drop your images here</p>
        <p>or</p>
        <input
          ref={fileInputRef}
          type="file"
          name="image"
          accept="image/*"
          className="upload-input"
          onChange={handleInputChange}
        />
      </div>

      <button
        type="button"
        className="upload-button"
        onClick={() => fileInputRef.current?.click()}
      >
        Browse Files
      </button>

      {previewImage && (
        <div className="preview">
          <img src={previewImage} alt="Selected" />
        </div>
      )}

      <p className="description">
        Sortify is an advanced image sorting application that leverages cutting-edge AI technology to categorize and organize your images with unparalleled accuracy and efficiency. Whether you're a professional photographer, a social media enthusiast, or simply someone who loves capturing moments, Sortify is designed to make managing your photo collection effortless and enjoyable.
      </p>
    </div>
  )
}

export default Home