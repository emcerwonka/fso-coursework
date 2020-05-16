const dummy = (blogs) => {
  return 1
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
  totalLikes
}