
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      'username': 'newUser',
      'password': 'newuser',
      'name': 'testuser'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
    cy.contains('Log In')
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('login')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('newUser')
      cy.get('input:last').type('newuser')


      cy.contains('login').click()
   })

    it('fails with wrong credentials', function() {
      cy.get('input:first').type('newUser')
      cy.get('input:last').type('hehe')
      cy.contains('login').click()


      
      cy.contains('Wrong Credentials')    })
    })
  })


    describe('When logged in', function() {
      beforeEach(function () {
        cy.login('newUser', 'newuser')
        cy.get('input:first').type('newUser')
        cy.get('input:last').type('newuser')
  
  
        cy.contains('login').click()
      })

      it('Blog form is shown', function () {
        cy.contains('new blog')
        cy.contains('Blogs')
      })

      it('Create new blog form is shown', function () {
        cy.contains('new blog').click()
        cy.contains('title')
        cy.contains('author')
        cy.contains('url')
        cy.get('#cancel').click()
      })

      it('A blog can be created', function () {
        const create = (blog) => {
          cy.contains('new blog').click()
          cy.get('#title').type(blog.title)
          cy.get('#author').type(blog.author)
          cy.get('#url').type(blog.url)
          cy.get('#Add').click()
          cy.get('#cancel').click()
        }

        create({
          "title": "React patterns",
          "author": "Michael Chan",
          "url": "https://reactpatterns.com"
        })
  
  })
})
