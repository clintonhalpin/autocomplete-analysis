import searches from "./../fixtures/searches.json";

describe("Walmart Autocomplete Data Collection", () => {
  beforeEach(() => {
    cy.visit("https://target.com/");
  });

  it("fetch autocomplete results", () => {
    const output = [];

    searches.map((query) => {
      cy.wait(1000);
      cy.get("input[type=search]").type(query);
      const elements = cy.get(`#typeahead li`);
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
    cy.writeFile("cypress/fixtures/target-output.json", output, "utf-8");
  });
});
