import React from 'react'
import Blog from './Blog'

const Blogs = ({
  blogs,
  addLike,
  deleteBlog
}) => {

  return (
    <div>
      {blogs
        .sort((firstBlog, secondBlog) => {
          return firstBlog.likes - secondBlog.likes
        })
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            deleteBlog={deleteBlog}
          />
        )}
    </div>
  )
}

export default Blogs