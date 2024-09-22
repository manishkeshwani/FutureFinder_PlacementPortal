import { createContext, useEffect, useState } from "react";
export const TPOAuthContext = createContext('');

const TPOAuth = (props)=>{

    const [TPOdata,setTPOData] = useState(localStorage.getItem('TPOauthData'));
  
    const saveTPOData = (token,adminID)=>{
      const newData = {token,adminID};
      setTPOData(newData);
      localStorage.setItem('TPOauthData',JSON.stringify(newData));
    }
    const deleteTPOData = ()=>{
        setTPOData(null);
      localStorage.removeItem('TPOauthData');
    }

    useEffect(()=>{
        const storedData = JSON.parse(localStorage.getItem('TPOauthData'));
        if(storedData){
            setTPOData(storedData);
        }
    },[])

      
    return(
      <TPOAuthContext.Provider value = {{TPOdata,saveTPOData,deleteTPOData}}>
        {props.children}
      </TPOAuthContext.Provider>
    )
  }
  
  export default TPOAuth;



  
  