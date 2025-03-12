import React from 'react'

export default function Logout() {

    const logout = () => {
        localStorage.clear(); 
        window.location.href = '/auth/login';
    }
  return (
    <div>
      <button onClick={(logout)}>Log Out</button>
    </div>
  )
}
