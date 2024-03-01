import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

test("mode change basic from brief to verbose after first mode command", async ({
  page,
}) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("mode changed to verbose")).toBeVisible();
  await expect(page.getByLabel("Repl history")).toHaveText(
    "mode changed to verbose"
  );
});

test("mode change back and forth changing", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("mode changed to verbose")).toBeVisible();
  await expect(page.getByLabel("Repl history")).toHaveText(
    "mode changed to verbose"
  );

  // use enter to submit cmd
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  // check that previous mode switch is still there
  await expect(page.getByText("mode changed to verbose")).toBeVisible();
  await expect(page.getByText("command: mode")).toBeVisible();
  await expect(page.getByText("mode changed to brief")).toBeVisible();
  await expect(page.getByLabel("Repl history")).toHaveText(
    "mode changed to verbose command: modemode changed to brief"
  );

  // click button
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("mode changed to verbose").first()).toBeVisible();
  await expect(page.getByText("command: mode").first()).toBeVisible();
  await expect(page.getByText("mode changed to brief").first()).toBeVisible();
  // another "mode changed to brief is entered"
  await expect(page.getByText("mode changed to verbose").nth(1)).toBeVisible();
  await expect(page.getByLabel("Repl history")).toHaveText(
    "mode changed to verbose command: modemode changed to briefmode changed to verbose "
  );

  // use enter to submit cmd
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByText("mode changed to verbose").first()).toBeVisible();
  await expect(page.getByText("command: mode").first()).toBeVisible();
  await expect(page.getByText("mode changed to brief").first()).toBeVisible();
  await expect(page.getByText("mode changed to verbose").nth(1)).toBeVisible();
  // another "mode changed to verbose is entered"
  await expect(page.getByText("command: mode").nth(1)).toBeVisible();
  await expect(page.getByText("mode changed to brief").nth(1)).toBeVisible();
  await expect(page.getByLabel("Repl history")).toHaveText(
    "mode changed to verbose command: modemode changed to briefmode changed to verbose command: modemode changed to brief"
  );

  // use button
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByText("mode changed to verbose").first()).toBeVisible();
  await expect(page.getByText("command: mode").first()).toBeVisible();
  await expect(page.getByText("mode changed to brief").first()).toBeVisible();
  await expect(page.getByText("mode changed to verbose").nth(1)).toBeVisible();
  // another "mode changed to verbose is entered"
  await expect(page.getByText("command: mode").nth(1)).toBeVisible();
  await expect(page.getByText("mode changed to brief").nth(1)).toBeVisible();
  await expect(page.getByText("mode changed to verbose").nth(2)).toBeVisible();
  await expect(page.getByLabel("Repl history")).toHaveText(
    "mode changed to verbose command: modemode changed to briefmode changed to verbose command: modemode changed to briefmode changed to verbose "
  );

  // after we click the sign out button, nothing should show
  await page.getByLabel("Sign Out").click();
  await expect(page.getByLabel("Login")).toBeVisible();
  await expect(page.getByText("mode changed to verbose")).toBeHidden();
  await expect(page.getByText("command: mode")).toBeHidden();
  await expect(page.getByText("mode changed to brief")).toBeHidden();
  // no text in repl history
  await expect(page.getByLabel("Repl history")).toBeHidden();
});
