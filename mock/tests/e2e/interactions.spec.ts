import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:8000/");
});

test("interaction between load and view, repeatedly load in and view switching", async ({
  page,
}) => {
  // login and load/view empty file -- Repl history should have the empty string since it's empty file
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file empty");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toBeVisible();
  await expect(page.getByLabel("Repl history")).toHaveText(
    "File with file name empty loaded"
  );

  // change the mode on the empty file (expect the command only after view)
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByText("command: view")).toBeVisible();
  await expect(page.getByLabel("Repl history")).toContainText("command: view");

  // load in a new file with one row
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file starsOne");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByText("command: view")).toBeVisible();
  await expect(page.getByLabel("Repl history")).toContainText(
    "command: load_file starsOneFile with file name starsOne loaded"
  );
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByRole("cell", { name: "sun" })).toBeVisible();
  await expect(page.getByText("command: viewsunmilky")).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();
  // change mode to verbose
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toContainText(
    "command: viewsunmilky way192brightyellow color"
  );
  await expect(
    page
      .locator("div")
      .filter({ hasText: /^sunmilky way192brightyellow color$/ })
  ).toBeVisible();
  await page.getByPlaceholder("Enter command here!").click();

  // change mode to brief (first time)
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await expect(page.getByLabel("Repl history")).toContainText(
    "mode changed to brief"
  );
});

test("load in files that don't exitst consequtively with files that exist with changing mode and calling", async ({
  page,
}) => {
  // first load file that exist
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file stars");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByRole("rowgroup")).toContainText("192.3");
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toContainText(
    "mode changed to verbose"
  );
  await page.getByPlaceholder("Enter command here!").press("Enter");

  // load file that doesn't exist (previous file should be overwritten)
  await page.getByPlaceholder("Enter command here!").fill("load_file fh");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toContainText(
    "command: load_file fhFile with file name fh cannot be found"
  );
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toContainText(
    "command: viewNo file is loaded; please use load_file <file_name> command first"
  );

  // load another file that exist (previous file should be overwritten), changed to brief mode
  await page.getByPlaceholder("Enter command here!").fill("load_file stars");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toContainText(
    "File with file name stars loaded"
  );
  await expect(page.getByLabel("Repl history")).toContainText(
    "sunmilky way19296 G. Pscmilky way1032.2"
  );
});

test("load, view, search consecutively with different files and modes", async ({
  page,
}) => {
  //search in file starsCol, a file with only one col (load in file and view it)
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file starsCol");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toContainText(
    "File with file name starsCol loadedsunmilky way192brightyellow color"
  );
  // change mode
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  // search for something that exists with column index
  await page.getByPlaceholder("Enter command here!").fill("search 0 bright");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toContainText(
    "command: search 0 brightbright"
  );
  await page
    .locator("tbody")
    .filter({ hasText: /^bright$/ })
    .getByRole("cell")
    .click();
  await page.getByPlaceholder("Enter command here!").click();
  // search for something that doesn't exist in the file at all
  await page
    .getByPlaceholder("Enter command here!")
    .fill("search wheat bright");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toContainText(
    "command: search wheat brightNo search results for coloumn identifier: wheat value: bright"
  );
  // load another new file in, this file is one with only one row
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file starsOne");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toContainText(
    "command: load_file starsOneFile with file name starsOne loaded"
  );
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toContainText(
    "command: modemode changed to brief"
  );
  // search for something that exist in the file but not the column (search without viewing first)
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("search 0 yellow color");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByLabel("Repl history")).toContainText(
    "No search results for coloumn identifier: 0 value: yellow color"
  );
  // search for something under column index
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("search 4 yellow color");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toContainText(
    "sunmilky way192brightyellow color"
  );

  // change mode again (to verbose) and use view again
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toContainText(
    "command: viewsunmilky way192brightyellow color"
  );

  // search again for something that doesn't exist in this file, but another file
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("search 4 another milky way");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toContainText(
    "No search results for coloumn identifier: 4 value: another milky way"
  );

  // log out
  await page.getByLabel("Sign Out").click();
  await expect(page.getByLabel("Repl history")).toBeHidden();
});

test("view without load", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText(
      "No file is loaded; please use load_file <file_name> command first"
    )
  ).toBeVisible();
});

test("search without loading", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 0 qwerty");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText(
      "No file is loaded; please use load_file <file_name> command first"
    )
  ).toBeVisible();
});

test("load file then sign out then attempt to view", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file stars");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await page.getByLabel("Sign Out").click();
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view");
  await page.getByPlaceholder("Enter command here!").press("Enter");

  await expect(page.getByText("name")).toHaveCount(1);
});
