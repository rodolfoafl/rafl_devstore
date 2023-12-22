describe('add product to cart', () => {
  it('should be able to navigate to the product page and add it to the cart', () => {
    cy.visit('http://localhost:3000')

    cy.get('a[href^="/product"]').first().click()

    cy.url().should('include', '/product')
    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Carrinho (1)').should('exist')
  })

  it('should not count duplicated products on cart', () => {
    cy.visit('http://localhost:3000')

    cy.get('a[href^="/product"]').first().click()

    cy.url().should('include', '/product')
    cy.contains('Adicionar ao carrinho').click()
    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Carrinho (1)').should('exist')
  })

  it('should be able to search for a product and add it to the cart', () => {
    cy.visit('http://localhost:3000')

    cy.get('input[name=q]').type('camiseta').parent('form').submit()
    cy.wait(1500)

    cy.url().should('include', '/search')

    cy.get('a[href^="/product"]').first().click()
    cy.url().should('include', '/product')

    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Carrinho (1)').should('exist')
  })
})
