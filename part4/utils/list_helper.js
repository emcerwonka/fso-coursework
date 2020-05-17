const dummy = (blogs) => {
  return 1
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? {}
    : findFavorite(blogs)
}

const findFavorite = (blogs) => {
  const maxLikes =
    blogs
      .map(blog => blog.likes)
      .reduce((prevLikes, nextLikes) => {
        return Math.max(prevLikes, nextLikes)
      })
  // Math.max(blogs.map(blog => blog.likes))
  console.log(maxLikes)

  return blogs.find(blog => blog.likes === maxLikes)
}

const totalLikes = (blogs) => {
  const likeSum = (sumLikes, nextLike) => {
    return sumLikes + nextLike
  }

  return blogs.length === 0
    ? 0
    : blogs.map(blog => blog.likes).reduce(likeSum)
}

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes
}