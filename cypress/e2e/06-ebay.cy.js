import searches from "./../fixtures/searches.json";

describe("Ebay Autocomplete Data Collection", () => {
  beforeEach(() => {
    cy.visit("https://ebay.com/");
  });

  it("fetch autocomplete results", () => {
    const output = [];

    searches.map((query) => {
      cy.get("#gh-ac").type(query);
      cy.contains(query.toLowerCase()).should("exist");
      const elements = cy.get(`#ui-id-1 li`);
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
          console.log(query, results);
          output.push({
            query,
            results,
          });
          cy.get("#gh-ac").clear();
        });
    });
    cy.writeFile("cypress/fixtures/ebay-output.json", output, "utf-8");
  });
});
