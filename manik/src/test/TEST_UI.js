describe("Quiz UI Tests", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5500/src/pages/index.html");
    });

    it("Loads homepage", () => {
        cy.contains("Welcome to Quiz Hub");
    });

    it("Navigates to quiz page", () => {
        cy.get(".cta-button").click();
        cy.url().should("include", "quiz.html");
    });

    it("Submits a quiz answer", () => {
        cy.get(".quiz-option").first().click();
        cy.get("#submit-btn").click();
        cy.get("#quiz-feedback").should("not.be.empty");
    });
});
