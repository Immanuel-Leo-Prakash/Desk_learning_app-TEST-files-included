// import buildUser from "../support/generate";

describe("desk learning app Home Test", () => {
  it("should add new ticket in the Home", () => {
    // const user = buildUser.one();
    let name = "Immanuel";
    let email = "silpmonk@gmail.com";
    let subject = "Refund";
    cy.visit("/");
    cy.findByText(/add ticket/i).click();
    cy.url().should("eq", "http://localhost:3000/add");
    cy.findByPlaceholderText(/full name/i).type(name);
    cy.findByPlaceholderText(/email/i).type(email);
    cy.findByPlaceholderText(/subject/i).type(subject);
    cy.findByRole("combobox").select("twitter");

    cy.findByRole("button", { name: /add ticket/i }).click();
    cy.url().should("eq", "http://localhost:3000/");
    //have ti add assertion on alert message
    cy.findByRole("table").contains("td", "Immanuel").should("be.visible");
  });

  it("should delete the tickets when the delete button is clicked", () => {
    cy.visit("/");
    cy.contains(/delete/i)
      .eq(0)
      .click();
    cy.contains(/delete/i)
      .last()
      .click();
    cy.contains(/delete/i)
      .last()
      .click();
    cy.findByText(/no ticket found/i).should("be.visible");
  });

  it("should edit the tickets when we edit ticket in the edit page", () => {
    // const user = buildUser();
    cy.visit("/");
    cy.contains(/edit/i).first().click();
    cy.get("input").first().clear().type("RamarajKiren");
    cy.get("input").eq(1).clear().type("RamarajKiren@gmail.com");
    cy.contains(/update ticket/i).click();
    cy.findByText(/ticket updated successfully/i);
    cy.location("pathname").should("eq", "/");
    cy.contains("RamarajKiren");
  });

  it("should navigate to correct location ", () => {
    cy.visit("/");
    cy.get("nav")
      .children()
      .contains(/customer/i)
      .click()

      .url()
      .should("include", "/customer");
    cy.get("nav")
      .children()
      .contains(/knowledge base/i)
      .click()
      .url()
      .should("include", "KnowledgeBase");
    cy.get("nav")
      .children()
      .contains(/tickets/i)
      .click()
      .url()
      .should("include", "/");
  });
});
