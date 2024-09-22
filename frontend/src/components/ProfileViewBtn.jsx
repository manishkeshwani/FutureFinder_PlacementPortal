import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileViewBtn = (props) => {
    const updateNavigation = useNavigate('');
    const handleProfileView=()=>{
        updateNavigation(`${props.navigateLink}`)
    }
  return (

    props.viewBtnVisibilty && (
    <div>
      <button type="button" onClick={handleProfileView} className="btn btn-primary mt-3" style={{backgroundColor:'wheat', border:'1px solid wheat', color:'#e55d1b', fontWeight:'600'}}>View Profile</button>
    </div>
    )
    
  )
}

export default ProfileViewBtn
