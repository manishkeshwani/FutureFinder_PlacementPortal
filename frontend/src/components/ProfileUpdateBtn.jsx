import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileUpdateBtn = (props) => {
    const updateNavigation = useNavigate('');
    const handleUpdateProfile=()=>{
        updateNavigation(`${props.navigateLink}`)
    }
  return (
    props.updateBtnVisibility && (
    <div>
      <button type="button" onClick={handleUpdateProfile} className="btn btn-primary mt-3" style={{backgroundColor:'wheat', border:'1px solid wheat', color:'#e55d1b', fontWeight:'600'}}>Update Profile</button>
    </div>
    )
  )
}

export default ProfileUpdateBtn
