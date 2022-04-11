import React from 'react'
import Toggle from './Toggle'
import PropTypes from 'prop-types'


const LoginForm = ({handleSubmit, username, password, handleUsernameChange, handlePasswordChange}) => {
  

  return (
    <div>
      <Toggle buttonLabel='Show login'>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={username} 
            placeholder='Username' 
            onChange={handleUsernameChange}/>
          <input 
            type="password" 
            value={password} 
            placeholder='Password' 
            onChange={handlePasswordChange}/>
          <button>Log in</button>
        </form>
      </Toggle>
    </div>
  )
}

LoginForm.protoTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
}


export default LoginForm