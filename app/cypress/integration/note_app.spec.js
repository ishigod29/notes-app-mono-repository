describe('Note App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')

    cy.request('POST', 'http://localhost:3002/api/testing/reset')

    const user = {
      firstname: 'michell',
      username: 'michell29',
      password: '123456789'
    }

    cy.request('POST', 'http://localhost:3002/api/users', user)
  })

  it('frontpage can be opened', () => {
    cy.contains('Notes')
  })

  it('login fore can be opened', () => {
    cy.contains('Show login').click()
  })

  it('user can login', () => {
    cy.contains('Show login').click()
    cy.get('input:first').type('michell29')
    cy.get('input:last').type('123456789')
    cy.contains('Log in').click()
    cy.contains('New Note')
  })

  /*it.only('login fails with wrong password', () => {
    cy.contains('Show login').click()
    cy.get('input:first').type('michell29')
    cy.get('input:last').type('123456789278781')
    cy.contains('Log in').click()
    
    cy.contains('Wrong Credentials')
  })*/

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({
        username: 'michell29', 
        password:'123456789'
      })
    })

    it('a new note can be created', () => {
      cy.contains('New Note').click()
      cy.get('input:first').type('a note created by cypress')
      cy.contains('Save').click()
    })

    describe('and a note exist', () => {
      beforeEach(() => {
        cy.createNote({
          content:'a new note from cypress2',
          important: false
        })

        cy.createNote({
          content:'a new note from cypress3',
          important: false
        })

        cy.createNote({
          content:'a new note from cypress4',
          important: true
        })
      })

      it('it can be made important', () => {
        cy.contains('a new note from cypress2').as('theNote')

        cy.contains('is not important').first().click()

        cy.contains('is important')
      })
    })
  })
})