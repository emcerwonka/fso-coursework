import React from 'react'

const Notification = ({ message, errorState }) => {
  const messageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const errorStyle = { ...messageStyle, color: 'red' }

  if (message === null) {
    return null
  }

  if (errorState) {
    return (
      <div style={errorStyle} >
        {message}
      </div>
    )
  }

  return (
    <div style={messageStyle} >
      {message}
    </div>
  )
}

export default Notification