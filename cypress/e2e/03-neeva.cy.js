import searches from "./../fixtures/searches.json";

describe("Neeva Autocomplete Data Collection", () => {
  beforeEach(() => {
    cy.visit("https://neeva.com/");
  });

  it("fetch autocomplete results", () => {
    const output = [];

    searches.map((query) => {
      cy.get("form input:first-child").type(query);
      cy.contains(query.toLowerCase()).should("exist");
      const elements = cy.get(`form div a`);
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
          cy.get("form input:first-child").clear();
        });
    });
    cy.writeFile("cypress/fixtures/neeva-output.json", output, "utf-8");
  });
});
