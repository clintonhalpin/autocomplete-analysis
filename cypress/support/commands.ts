/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

// Cypress.Commands.add("search", (query, provider) => {
//   if ("google" === provider) {
//     cy.get("[name=q]").type(query);
//   }
// });

// Cypress.Commands.add("analyze", (provider) => {
//   if ("google" === provider) {
//     const elements = cy.get(`form[role="search"] li`);
//     const results = [];
//     elements
//       .each(($el, $index) => {
//         results.push({
//           index: $index,
//           text: $el[0].innerText,
//           html: $el[0].innerHTML,
//         });
//       })
//       .then(() => {
//         // Last element is delete
//         results.pop();
//         cy.get("[name=q]").clear();
//         return results;
//       });
//   }
// });
