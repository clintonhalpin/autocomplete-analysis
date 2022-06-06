import searches from "./../fixtures/searches.json";

describe("DuckDuckGo Autocomplete Data Collection", () => {
  beforeEach(() => {
    cy.visit("https://duckduckgo.com/");
  });

  it("fetch autocomplete results", () => {
    const output = [];

    searches.map((query) => {
      cy.get("#search_form_input_homepage").type(query);
      cy.contains(query.toLowerCase()).should("exist");
      const elements = cy.get(`.search__autocomplete div div`);
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
          // cy.get("#search_form_input_homepage").clear();
          cy.reload();
        });
    });
    cy.writeFile("cypress/fixtures/duckduckgo-output.json", output, "utf-8");
  });
});
