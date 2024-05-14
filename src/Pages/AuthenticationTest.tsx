import React from 'react'
import withAuth from '../HOC/withAuth'

const AuthenticationTest = () => {
  return (<div> This page can only be accessed if role of logged in user </div>)
}

export default withAuth(AuthenticationTest)