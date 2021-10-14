import React from 'react'
import axios from 'axios'

const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

function ImageUploadField({ value, onChange }) {

  const handleUpload = async (e) => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('upload_preset', uploadPreset)
    const response = await axios.post(uploadUrl, data)
    onChange(response.data.url)
  }

  return (
    <>
      { value && (
        <div>
          <img alt="dogimage"src={value}/>
        </div>
      )}
      {!value && (
        <div className="file is-boxed is-fullwidth has-text-centered">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              // eslint-disable-next-line no-restricted-globals
              name={name}
              onChange={handleUpload}
            />
            <span className="file-cta">
              <span className="file-label">Choose a file…</span>
            </span>
          </label>
        </div>
      )
      } 
    </>
  )
}

export default ImageUploadField