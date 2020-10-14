import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [errorState, setErrorState] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const blogs = await blogService.getAllBlogs()
      setBlogs(blogs)
    }
    fetchAllBlogs()
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON)
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
    }
  }, [])

  const loginHandler = async (event) => {
    event.preventDefault()
    console.log('Logging in with: ', username, password)

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorState(true)
      setNotification('Incorrect credentials')
      setTimeout(() => {
        setNotification(null)
        setErrorState(false)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('Logging out: ', username)
    setUser(null)
    setUsername('')
    setPassword('')
    blogService.setToken(null)
    window.localStorage.setItem(
      'loggedInUser', ''
    )
  }

  const setUserNameHandler = (event) => {
    setUsername(event.target.value)
  }

  const setPasswordHandler = (event) => {
    setPassword(event.target.value)
  }

  return user === null
    ? <LoginForm
      errorState={errorState}
      login={loginHandler}
      notification={notification}
      password={password}
      setPassword={setPasswordHandler}
      setUsername={setUserNameHandler}
      username={username}
    />
    : <Blogs
      blogs={blogs}
      errorState={errorState}
      logout={handleLogout}
      notification={notification}
      setBlogs={setBlogs}
      setErrorState={setErrorState}
      setNotification={setNotification}
      user={user}
    />
}

export default App