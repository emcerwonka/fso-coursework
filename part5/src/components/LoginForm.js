import React from 'react'
import Notification from './Notification'

const LoginForm = ({
  notification,
  errorState,
  login,
  username,
  setUsername,
  password,
  setPassword
}) => {
  return (
    <div>
      <h2>log in to ( Blog)(List )</h2>
      <Notification
        message={notification}
        errorState={errorState}
      />
      <form onSubmit={login}>
        <div>
          u s e r n a m e :
          <input
            type="text"
            value={username}
            name="username"
            onChange={setUsername}
          />
        </div>
        <div>
          p a s s w o r d :
          <input
            type="password"
            value={password}
            name="password"
            onChange={setPassword}
          />
        </div>
        <button type="submit">l o g i n</button>
      </form>
    </div>
  )
}

export default LoginForm