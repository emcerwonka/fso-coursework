import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [errorState, setErrorState] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // Fetch all blogs upon page load
  useEffect(() => {
    const fetchAllBlogs = async () => {
      const blogs = await blogService.getAllBlogs()
      setBlogs(blogs)
    }
    fetchAllBlogs()
  }, [])

  // Get cached logged in user if exists
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON)
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
    }
  }, [])

  // Ref for toggling CreateBlogForm
  const createBlogFormRef = useRef()

  // Provides Notification, CreateBlogForm, and Blogs components
  const blogForm = () => (
    <div>
      <Notification
        message={notification}
        errorState={errorState}
      />
      <div>
        {user.name} logged in. <button onClick={logoutHandler}>l o g o u t</button>
      </div>
      <div>
        <Togglable buttonLabel="new  b l o g" ref={createBlogFormRef}>
          <CreateBlogForm
            createBlog={createBlog}
          />
        </Togglable>
      </div>
      <Blogs
        blogs={blogs}
        addLike={addLike}
        deleteBlog={deleteBlog}
      />
    </div>
  )

  // Provides LoginForm componenent
  const loginForm = () => (
    <Togglable buttonLabel="l o g i n">
      <LoginForm
        errorState={errorState}
        login={loginHandler}
        notification={notification}
        password={password}
        setPassword={setPasswordHandler}
        setUsername={setUserNameHandler}
        username={username}
      />
    </Togglable>
  )

  const createBlog = async (blogTitle, blogAuthor, blogUrl) => {
    if (blogTitle && blogAuthor && blogUrl) {
      const newBlog = {
        'title': blogTitle,
        'author': blogAuthor,
        'url': blogUrl
      }
      createBlogFormRef.current.toggleVisibility()

      await blogService.createBlog(newBlog)

      const blogs = await blogService.getAllBlogs()
      setBlogs(blogs)
      setNotification(`New Blog ${blogTitle} by ${blogAuthor} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const addLike = async (blog) => {
    await blogService.updateBlog(blog)
    const blogs = await blogService.getAllBlogs()
    setBlogs(blogs)
    setNotification(`Liked Blog ${blog.title} by ${blog.author}`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const deleteBlog = async (blog) => {
    if (blog.user.username !== user.username) {
      setErrorState(true)
      setNotification(`You cannot remove blogs added by other users.`)
      setTimeout(() => {
        setNotification(null)
        setErrorState(false)
      }, 5000)
      return
    }
    const removedBlogTitle = blog.title
    const removedBlogAuthor = blog.author
    await blogService.deleteBlog(blog)
    const blogs = await blogService.getAllBlogs()
    setBlogs(blogs)
    setNotification(`Removed Blog ${removedBlogTitle} by ${removedBlogAuthor}`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

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

  const logoutHandler = async (event) => {
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

  return (
    <div>
      <h1>B L O G S</h1>

      {user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App