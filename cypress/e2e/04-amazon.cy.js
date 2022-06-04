import searches from "./../fixtures/searches.json";

describe("Amazon Autocomplete Data Collection", () => {
  beforeEach(() => {
    cy.visit("https://amazon.com/");
  });

  it("fetch autocomplete results", () => {
    const output = [];

    searches.map((query) => {
      cy.get("#twotabsearchtextbox").type(query);
      const elements = cy.get(`.autocomplete-results-container div`);
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
          cy.get("#twotabsearchtextbox").clear();
        });
    });
    cy.writeFile("cypress/fixtures/amazon-output.json", output, "utf-8");
  });
});
