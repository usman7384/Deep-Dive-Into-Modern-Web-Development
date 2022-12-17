const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, elem) => total + elem.likes, 0);
};

const favoriteBlog = (blogs) => {
  let likes = blogs.map((blog) => blog.likes);
  let maxValue = likes.indexOf(Math.max(...likes));
  return blogs[maxValue];
};

const mostBlogs = (blogs) => {
  let authors = blogs.map((blog) => blog.author);
  authors = [...new Set(authors)];

  let authorBlogs = new Array(authors.length).fill(0);
  blogs.map((blog) => (authorBlogs[authors.indexOf(blog.author)] += 1));

  let maxValue = authorBlogs.indexOf(Math.max(...authorBlogs));

  return {
    author: authors[maxValue],
    blogs: authorBlogs[maxValue],
  };
};

const mostLikes = (blogs) => {
  let authors = blogs.map((blog) => blog.author);
  authors = [...new Set(authors)];

  let authorLikes = new Array(authors.length).fill(0);
  blogs.map((blog) => (authorLikes[authors.indexOf(blog.author)] += blog.likes));

  let maxvalue = authorLikes.indexOf(Math.max(...authorLikes));

  return {
    author: authors[maxvalue],
    likes: authorLikes[maxvalue],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
