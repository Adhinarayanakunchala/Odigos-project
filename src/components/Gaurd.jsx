import React from 'react'
import { Navigate } from 'react-router-dom';

export const Gaurd = ({element}) => {
    const token = localStorage.getItem("Token");

  return (
    
    
        token ?element:<Navigate to={'/'}/>
    
    
  )
}

