import searches from "./../fixtures/searches.json";

describe("Yahoo Autocomplete Data Collection", () => {
  beforeEach(() => {
    cy.visit("https://yahoo.com/");
  });

  it("fetch autocomplete results", () => {
    const output = [];
    searches.map((query) => {
      cy.wait(1000);
      cy.get("#ybar-sbq").type(query);
      cy.contains(query.toLowerCase()).should("exist");
      const elements = cy.get(`._yb_1w0j9 li`);
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
          cy.reload();
        });
    });
    cy.writeFile("cypress/fixtures/yahoo-output.json", output, "utf-8");
  });
});
