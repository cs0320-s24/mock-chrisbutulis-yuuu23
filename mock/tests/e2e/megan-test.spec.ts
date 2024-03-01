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

test("i cannot see repl history box or do anything before i click login", async ({
  page,
}) => {
  await expect(page.getByLabel("Login")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeHidden();
  await expect(page.getByLabel("Repl history")).toBeHidden();
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

test("load in files that don't exitst consequtively with files that exists with changing mode and calling", async ({
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

test("load, view, search with arguments that are not correct number", async ({
  page,
}) => {
  // load too much arguemnts, then change mode
  await page.getByLabel("Login").click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file hi bye ");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toContainText(
    "Incorrect amount of arguments provided to load_file: 3 arguments; please provide load_file <file name>"
  );

  // view with too much arguments after a valid file is loaded
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("load_file empty");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toContainText(
    "File with file name empty loaded"
  );
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view too much args");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toContainText(
    "Incorrect amount of arguments provided to view: 4 arguments; please use view (1 argument)"
  );

  // change mode, search with too little arguments after a valid file is loaded in
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search 3");
  await page.getByPlaceholder("Enter command here!").press("Enter");
  await expect(page.getByLabel("Repl history")).toContainText(
    "command: search 3Incorrect amount of arguments provided to search: 2 arguments; please use search <column number or name><item to search for> (2 or more argument)"
  );
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
