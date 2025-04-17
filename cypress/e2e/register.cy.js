describe('go to register page', () => {
  
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0].replace(/-/g, ''); // 20250417
  const random = Math.floor(Math.random() * 10);
  const username = `testu${dateStr}_${random}`;
  const password = 'Test1234!';
  const email = `${username}@gmail.com`; // e.g., testu20250417_5@gmail.com

  
  it('go to home page and click register button and open registration page', () => {
    // visit the page with a specific viewport size and english language
    cy.viewport(1920, 1500);
    cy.visit('https://www.stage-volcano.com/sport-v2/live?sportId=1&lang=en&locale=en')


    // wait up to 10 seconds for the cookies button to be visible
    cy.get('.cookies-btn-wrapper > :nth-child(1) > .btn', { timeout: 10000 }) 
      .should('be.visible')
      .click();

    // click on the register button
     cy.get('.sign-up-btn')
      .should('be.visible')
      .click();
      
    // check if the URL is correct
    cy.url().should('eq', 'https://www.stage-volcano.com/user/sign-up-v2');


    // FIRST STEP - FILL IN THE FORM
    // Type username
    cy.get('#username').type(username);
    // Type password
    cy.get('#password > .input-group > .input-container > .d-flex > .form-control')
      .type(password);
    // Type password confirmation
    cy.get('#password-confirm > .input-group > .input-container > .d-flex > .form-control')
      .type(password);
    cy.get('button.w-100.btn.btn-primary.x-bet-submit-btn').contains('Next').click();


    // SECOND STEP - FILL IN THE FORM
    // Type first name
    cy.get('#firstName').type('Ivan');
    cy.get('#lastName').type('Ivanovic');
    cy.get('.ng-color-fix > .ng-select-container > .ng-value-container > .ng-input > input').click()
    cy.get('.ng-option').contains('Croatia').click(); // Select the "Engleski" option
    cy.get('.col-6 > .ng-select-searchable > .ng-select-container').click()
    cy.get('.ng-option').contains('January').click(); // Select the "Engleski" option
    cy.get('#day').type('1');
    cy.get('#year').type('1990');
    //cy.get('#tax-number').type('0101990400127');
    cy.get('#document-number').type('24839576241');
    cy.get('.mt-3 > .w-100').click();

    // THIRD STEP - FILL IN THE FORM
    cy.get('#emailAddress').type(email);
    cy.get('#phoneNumber').type('99223344');
    cy.get('.ng-select-typeahead > .ng-select-container > .ng-value-container > .ng-input').click();
    cy.get('.ng-select-typeahead .ng-input input').type('Zagreb{enter}'); // Type "Zagreb" and press Enter to select
    cy.get('.ng-select-typeahead .ng-input input').trigger('keydown', { key: 'Tab' }); // Simulate pressing the Tab key
    // // Fill the address field
    cy.get('#address').type('Kaptol 1');
    // Check the required checkboxes (assuming they are mandatory)
    cy.get('input[type="checkbox"]').check(); // Check all checkboxes (terms, conditions, etc.)
    // Click the "Finish Registration" button
    cy.get('.mt-3 > .w-100').click();


  });
})