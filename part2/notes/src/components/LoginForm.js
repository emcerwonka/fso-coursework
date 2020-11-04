import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = (event) => {
    event.preventDefault()
    console.log(`LoginForm.loginUser for ${username} with password ${password}`)
    handleLogin(username, password)

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={loginUser}>
        <div>
          u s e r n a m e :
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          p a s s w o r d :
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">l o g i n</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm