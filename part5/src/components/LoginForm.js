import React from 'react'
import Notification from './Notification'
const LoginForm = (props) => (
  <div>
    <h2>log in to ( Blog)(List )</h2>
    <Notification 
      message={props.notification}
      errorState={props.errorState}
    />
    <form onSubmit={props.login}>
      <div>
        u s e r n a m e :
      <input
          type="text"
          value={props.username}
          name="username"
          onChange={props.setUsername}
        />
      </div>
      <div>
        p a s s w o r d :
      <input
          type="password"
          value={props.password}
          name="password"
          onChange={props.setPassword}
        />
      </div>
      <button type="submit">l o g i n</button>
    </form>
  </div>
)

export default LoginForm