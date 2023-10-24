import React from 'react'


import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const loggedInUser = JSON.parse(localStorage.getItem('AI-TextCraftUser'))||""
    const navigate=useNavigate()
   
    if(!loggedInUser){
    return  <Navigate to={'/login'}></Navigate>
    }
    
      return <div>
        {children}
      </div>;
}

export default PrivateRoute