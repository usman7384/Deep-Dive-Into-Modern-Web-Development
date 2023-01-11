import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import React from 'react'

import Blog from './Blog'
import CreateBlog from './CreateBlog'

const blog = {
  'title': "The Gentlemen",
  'author': "Guy Ritchie",
  'url': "go watch on netflix",
  'likes': 1000
}

test('blog renders the blogs title and author by default', () => {
  const component = render(
    <Blog blog={blog} />
  )
  const blogTitle = component.container.querySelector('.blogTitle')
  expect(blogTitle).toBeDefined()
  expect(blogTitle).toBeVisible()
  expect(blogTitle).toHaveTextContent(`${blog.title} by ${blog.author}`)
})

test('URL and number of likes are shown when the button controlling the shown details has been clicked',( ) => {
  const component = render(
    <Blog blog={blog} />
  )
  const buttonView = component.getByText('view')
  fireEvent.click(buttonView)
  const AllBlogs = component.container.querySelector('.AllBlogs')
  expect(AllBlogs).toBeVisible()
  expect(AllBlogs).toHaveTextContent(`${blog.url}`)
  expect(AllBlogs).toHaveTextContent(`${blog.likes}`)
})



test('like button is clicked twice',() => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} handleLikeChange={mockHandler} />
  )
  const buttonView = component.getByText('view')
  fireEvent.click(buttonView)
  const buttonLike = component.getByText('like')
  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)
  expect(mockHandler.mock.calls).toHaveLength(2)
})


test('Add New blog', () => {
  const component = render(
    <CreateBlog />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeDefined()
})

