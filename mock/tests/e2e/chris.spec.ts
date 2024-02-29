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
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
});

test("load stars file", async ({ page }) => {
  await page.getByPlaceholder("Enter command here!").fill("load_file stars");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("File with file name stars loaded")
  ).toBeVisible();
});

test("view without load", async ({ page }) => {
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText(
      "No file is loaded; please use load_file <file_name> command first"
    )
  ).toBeVisible();
});

test("view stars file", async ({ page }) => {
  await page.getByPlaceholder("Enter command here!").fill("load_file stars");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("File with file name stars loaded")
  ).toBeVisible();

  await page.getByPlaceholder("Enter command here!").fill("view");

  const table = page.locator(".csv-data-table");

  //headers
  await expect(table).toContainText("namelocationx-coord");

  //first body row
  await expect(table).toContainText("sunmilky way192");

  //second body row
  await expect(table).toContainText("96 G. Pscmilky way1032.2");

  //third body row
  await expect(table).toContainText("sunanother milky way192.3");

  //fourth body row
  await expect(table).toContainText("Rigel Kentaurus AAndromeda3.20");
});

test("search", async ({ page }) => {
  await page.getByPlaceholder("Enter command here!").fill("load_file stars");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 0 sun");
  await page.getByRole("button", { name: "Submit" }).click();

  const table = page.locator(".csv-data-table");

  //headers
  await expect(table.nth(1)).toContainText("sunmilky way192");
  await expect(table.nth(1)).toContainText("sunanother milky way192.3");
});

test("search without loading", async ({ page }) => {
  await page.getByPlaceholder("Enter command here!").fill("search");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText(
      "Incorrect amount of arguments provided to search: 1 arguments; please use search <column number or name><item to search for> (2 or more argument)"
    )
  ).toBeVisible();
});

//Loading in different files
