import searches from "./../fixtures/searches.json";

describe("Etsy Autocomplete Data Collection", () => {
  beforeEach(() => {
    cy.visit("https://etsy.com/");
  });

  it("fetch autocomplete results", () => {
    const output = [];

    searches.map((query) => {
      cy.wait(2000);
      cy.get("#global-enhancements-search-query").type(query);
      cy.contains(query.toLowerCase()).should("exist");
      const elements = cy.get(`#global-enhancements-search-suggestions li`);
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
          results.pop();
          output.push({
            query,
            results,
          });
          cy.reload();
        });
    });
    cy.writeFile("cypress/fixtures/etsy-output.json", output, "utf-8");
  });
});
