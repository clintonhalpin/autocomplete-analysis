import searches from "./../fixtures/searches.json";

describe("Bing Autocomplete Data Collection", () => {
  beforeEach(() => {
    cy.visit("https://bing.com/");
  });

  it("fetch autocomplete results", () => {
    const output = [];
    searches.map((query) => {
      cy.wait(5000);
      cy.get("#sb_form_q").type(query);
      cy.contains(query.toLowerCase()).should("exist");
      const elements = cy.get(`.sa_sg`);
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
    cy.writeFile("cypress/fixtures/bing-output.json", output, "utf-8");
  });
});
