import { expect, test } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

test("on page load, i see a login button and mock header", async ({ page }) => {
  await expect(page.getByLabel("Login")).toBeVisible();
  await expect(page.getByLabel("Mock Header")).toBeVisible();
});

test("on page load, i dont see the input box or history until login", async ({
  page,
}) => {
  await expect(page.getByLabel("Mock Header")).toBeVisible();
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();
  await expect(page.getByLabel("Repl history")).not.toBeVisible();

  // click the login button and we should see the history, command box, and sign out
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
  await expect(page.getByLabel("Repl history")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("after I type into the input box and hit return, command input is cleared", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("Command input")).toHaveValue("");
});

test("on page load, i see a button", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
});

// test("after I click the button, its label increments", async ({ page }) => {
//   // CHANGED
//   await page.goto("http://localhost:8000/");
//   await page.getByLabel("Login").click();
//   await expect(
//     page.getByRole("button", { name: "Submit" })
//   ).toBeVisible();
//   await page.getByRole("button", { name: "Submit" }).click();
//   await expect(
//     page.getByRole("button", { name: "Submitted 1 times" })
//   ).toBeVisible();
// });

// test("after I click the button, my command gets pushed", async ({ page }) => {
//   // CHANGED
//   await page.goto("http://localhost:8000/");
//   await page.getByLabel("Login").click();
//   await page.getByLabel("Command input").fill("Awesome command");
//   await page.getByRole("button", { name: "Submit" }).click();

//   // you can use page.evaulate to grab variable content from the page for more complex assertions
//   const firstChild = await page.evaluate(() => {
//     const history = document.querySelector(".repl-history");
//     return history?.children[0]?.textContent;
//   });
//   expect(firstChild).toEqual("Awesome command");
// });
