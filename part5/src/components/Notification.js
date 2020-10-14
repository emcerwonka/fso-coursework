import React from 'react'

const Notification = ({ message, errorState }) => {
  if (message === null) {
    return null
  }

  return errorState ?
    (<div className="error">
      {message}
    </div>)
    :
    (<div className="notification">
      {message}
    </div>)
}

export default Notification