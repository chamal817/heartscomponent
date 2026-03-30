describe("Smoke", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("loads app home", () => {
      cy.contains("Hearts Component Library").should("be.visible");
    });
  
    it("opens and closes modal", () => {
      cy.contains("button", "Open Modal").click();
      cy.get('[role="dialog"]').should("be.visible");
      cy.get('button[aria-label="Close"]').click();
      cy.get('[role="dialog"]').should("not.exist");
    });
  
    it("selects dropdown option", () => {
      cy.get('[role="combobox"]').click();
      cy.contains('[role="option"]', "React").click();
      cy.contains("Selected: react").should("be.visible");
    });
  });