import searches from "./../fixtures/searches.json";

describe("Google Autocomplete Data Collection", () => {
  beforeEach(() => {
    cy.visit("https://www.google.com/");
  });

  it("fetch autocomplete results", () => {
    const output = [];

    searches.map((query) => {
      cy.get("[name=q]").type(query);
      cy.contains(query.toLowerCase()).should("exist");
      const elements = cy.get(`form[role="search"] li`);
      const results = [];

      elements
        .each(($el, $index) => {
          results.push({
            index: $index,
            text: $el[0].innerText,
            html: $el[0].innerHTML,
            height: $el[0].offsetHeight,
          });
        })
        .then(() => {
          /**
           * The Last element equals delete so we hide it
           */
          results.pop();
          console.log(query, results);
          output.push({
            query,
            results,
          });
          cy.reload();
        });
    });
    cy.writeFile("cypress/fixtures/google-output.json", output, "utf-8");
  });
});
