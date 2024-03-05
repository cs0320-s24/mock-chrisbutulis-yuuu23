import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

test("after i enter a command that doesn't exist, the command with error message should show", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Command hi not found")).toBeHidden();
  // see that input box is cleared
  await expect(page.getByLabel("Command input")).toHaveValue("");
  // check that it is signed out
  await page.getByLabel("Sign Out").click();
  await expect(page.getByRole("button", { name: "Submit" })).toBeHidden();
});

test("alternate between entering commands that exists and doesn't exists", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("hi");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("Repl history")).toHaveText(
    "Command hi not found"
  );
  // check that input box is cleared
  await expect(page.getByLabel("Command input")).toHaveValue("");

  // change mode to verbose
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toHaveText(
    "Command hi not foundmode changed to verbose"
  );

  // enter another non existing command
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("bread");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toHaveText(
    "Command hi not foundmode changed to verbose command: breadCommand bread not found"
  );

  // change mode to brief
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toHaveText(
    "Command hi not foundmode changed to verbose command: breadCommand bread not foundcommand: modemode changed to brief"
  );

  // enter another not existsing command, blank command (click submit button)
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("Repl history")).toHaveText(
    "Command hi not foundmode changed to verbose command: breadCommand bread not foundcommand: modemode changed to briefCommand  not foundCommand  not found"
  );

  // sign out / i should not see reply history any more
  await page.getByLabel("Sign Out").click();
  await expect(page.getByLabel("Login")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeHidden();
  await expect(page.getByLabel("Repl history")).toBeHidden();
});

test("empty commands", async ({ page }) => {
  // brief mode
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toContainText(
    "Command  not found"
  );

  // change mode
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("Repl history")).toContainText(
    "mode changed to verbose"
  );
  await expect(page.getByLabel("Repl history")).toContainText(
    "command: Command not found"
  );
});

test("load stars file", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file stars");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("File with file name stars loaded")
  ).toBeVisible();
});

test("view stars file", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
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
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
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

test("search no results", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file stars");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 0 qwerty");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("No search results for coloumn identifier: 0 value: qwerty")
  ).toBeVisible();
});

test("search empty file", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file empty");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 0 qwerty");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("No search results for coloumn identifier: 0 value: qwerty")
  ).toBeVisible();
});
