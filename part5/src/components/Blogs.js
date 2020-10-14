import React from 'react'
import Blog from './Blog'
import CreateBlog from './CreateBlog'
import Notification from './Notification'

const Blogs = (props) => (
  <div>
    <h2>blogs</h2>
    <Notification 
      message={props.notification}
    />
    <div>
      {props.user.name} logged in. <button onClick={props.logout}>l o g o u t</button>
    </div>
    <div>
      <CreateBlog
        setBlogs={props.setBlogs}
        setNotification={props.setNotification}
      />
    </div>
    <div>
      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  </div>
)

export default Blogs