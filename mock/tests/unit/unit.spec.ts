import { expect, test } from "vitest";
import * as cmdMap from "../../src/Functions/REPLCmdMap";
import * as cmdFunc from "../../src/Functions/REPLFunction";

test("add/delete to map with getCommandMap and function return str", () => {
  // delete something that's not there and expect empty map at the start
  expect(cmdMap.getCommandMap().size).toBe(0);
  expect(cmdMap.deleteCommand("mode")).toBe("command " + "mode" + " not found");

  // add basic
  cmdMap.addCommand("mode", cmdFunc.changeMode);
  expect(cmdMap.getCommandMap().has("mode")).toBeTruthy();
  expect(cmdMap.getCommandMap().get("mode")).toBe(cmdFunc.changeMode);

  // add another cmd
  expect(cmdMap.addCommand("view", cmdFunc.viewFile)).toBe(
    "command " + "view" + " successfully added"
  );
  expect(cmdMap.getCommandMap().has("mode")).toBeTruthy();
  expect(cmdMap.getCommandMap().get("view")).toBe(cmdFunc.viewFile);

  // delete something found
  expect(cmdMap.deleteCommand("mode")).toBe("command " + "mode" + " deleted");
  expect(cmdMap.getCommandMap().has("mode")).toBeFalsy();
  expect(cmdMap.getCommandMap().has("view")).toBeTruthy();
  expect(cmdMap.getCommandMap().get("view")).toBe(cmdFunc.viewFile);

  expect(cmdMap.addCommand("load", cmdFunc.loadFile)).toBe(
    "command " + "load" + " successfully added"
  );
  // test adding arrow functions
  expect(cmdMap.addCommand("nothing", () => "3")).toBe(
    "command " + "nothing" + " successfully added"
  );
  expect(cmdMap.deleteCommand("cabbage")).toBe("command cabbage not found"); // this command is not found for delete
  expect(cmdMap.getCommandMap().has("load")).toBeTruthy();
  expect(cmdMap.getCommandMap().has("nothing")).toBeTruthy();
  expect(cmdMap.getCommandMap().get("view")).toBe(cmdFunc.viewFile);
  expect(cmdMap.getCommandMap().get("cabbage"));

  // update things already in map, should overwrite previous function
  expect(cmdMap.addCommand("load", cmdFunc.viewFile)).toBe(
    "command " + "load" + " successfully added"
  );
  expect(cmdMap.addCommand("load", cmdFunc.changeMode)).toBe(
    "command " + "load" + " successfully added"
  );
  expect(cmdMap.getCommandMap().has("load")).toBeTruthy();
  expect(cmdMap.getCommandMap().get("load")).toBe(cmdFunc.changeMode);

  // add empty command and empty command function
  expect(cmdMap.addCommand("", cmdFunc.changeMode)).toBe(
    "command " + "" + " successfully added"
  );
  expect(cmdMap.getCommandMap().get("")).toBe(cmdFunc.changeMode);
  expect(cmdMap.deleteCommand("")).toBe("command " + "" + " deleted");
  expect(cmdMap.deleteCommand("")).toBe("command " + "" + " not found"); // consequtively delete the same cmd

  // finally delete everything and we should have empty map
  expect(cmdMap.deleteCommand("load"));
  expect(cmdMap.deleteCommand("view"));
  expect(cmdMap.deleteCommand("")).toBe("command " + "" + " not found"); // we should not find this empty command
  expect(cmdMap.deleteCommand("nothing"));
  expect(cmdMap.getCommandMap().size).toBe(0);
});

/* Due to the difficulty to instantiate state object, more testing are done with e2e on the exact functionality*/
test("changeMode Function with error handling", () => {
  // test too much arguments
  expect(cmdFunc.changeMode(["mode", "Hi", "fhh"], true, () => 3)).toBe(
    "Incorrect amount of arguments provided to mode: " +
      "3" +
      " arguments; please use mode (1 argument)"
  );
});

test("load with error and some basic cases", () => {
  // test too much arguments
  expect(cmdFunc.loadFile(["load", "Hi", "fhh"], true, () => 3)).toBe(
    "Incorrect amount of arguments provided to load_file: 2 arguments; please provide load_file <file name>"
  );

  // test loading not found
  let file = "";
  expect(cmdFunc.loadFile(["load", file], true, () => 3)).toBe(
    "File with file name " + file + " cannot be found"
  );

  // test loading found
  file = "stars";
  expect(cmdFunc.loadFile(["load", file], true, () => 3)).toBe(
    "File with file name " + file + " loaded"
  );

  // test another load found (load file should change)
  file = "starsOne";
  expect(cmdFunc.loadFile(["load", file], true, () => 3)).toBe(
    "File with file name " + file + " loaded"
  );

  // test another load where file not found
  file = "empty3";
  expect(cmdFunc.loadFile(["load", file], true, () => 3)).toBe(
    "File with file name " + file + " cannot be found"
  );
});

test("view errors and some basic cases", () => {
  expect(cmdFunc.viewFile(["view", "Hi"], true, () => 3)).toBe(
    "Incorrect amount of arguments provided to view: 2 arguments; please use view (1 argument)"
  );

  // view can not be activated without file loaded in
  expect(cmdFunc.viewFile(["view"], true, () => 3)).toBe(
    "No file is loaded; please use load_file <file_name> command first"
  );

  // load with mistake file and cannot activate view
  let file = "empty3";
  expect(cmdFunc.loadFile(["load", file], true, () => 3)).toBe(
    "File with file name " + file + " cannot be found"
  );
  expect(cmdFunc.viewFile(["view"], true, () => 3)).toBe(
    "No file is loaded; please use load_file <file_name> command first"
  );

  // load with success file and view with that file
  file = "stars";
  expect(cmdFunc.loadFile(["load", file], true, () => 3)).toBe(
    "File with file name " + file + " loaded"
  );
  expect(cmdFunc.viewFile(["view"], true, () => 3).length).toBe(5);
});

test("search erros and some basic cases with interaction of load and view", () => {
  // must have a search value
  expect(cmdFunc.searchFile(["search", "2"], true, () => 3)).toBe(
    "Incorrect amount of arguments provided to search: " +
      "2" +
      " arguments; please use search <column number or name><item to search for>  (2 or more argument)"
  );

  // search without file loaded in
  expect(cmdFunc.searchFile(["search", "2", "hi"], true, () => 3)).toBe(
    "No search results for coloumn identifier: 2 value: hi"
  );

  // load with success file and view with that file
  let file = "stars";
  expect(cmdFunc.loadFile(["load", file], true, () => 3)).toBe(
    "File with file name " + file + " loaded"
  );
  expect(cmdFunc.viewFile(["view"], true, () => 3).length).toBe(5);
  expect(
    cmdFunc.searchFile(["search", "name", "sun"], true, () => 3).length
  ).toBe(2);
  expect(cmdFunc.searchFile(["search", "10", "sun"], true, () => 3)).toBe(
    "No search results for " +
      "coloumn identifier: " +
      "10" +
      " value: " +
      "sun"
  );
  file = "empty";
  expect(cmdFunc.loadFile(["load", file], true, () => 3)).toBe(
    "File with file name " + file + " loaded"
  );
  expect(cmdFunc.viewFile(["view"], true, () => 3).length).toBe(1);
  expect(cmdFunc.searchFile(["search", "0", "bread"], true, () => 3)).toBe(
    "No search results for " +
      "coloumn identifier: " +
      "0" +
      " value: " +
      "bread"
  );

  file = "stars";
  expect(cmdFunc.loadFile(["load", file], true, () => 3)).toBe(
    "File with file name " + file + " loaded"
  );
  file = "starsOne";
  expect(cmdFunc.loadFile(["load", file], true, () => 3)).toBe(
    "File with file name " + file + " loaded"
  );
  expect(cmdFunc.viewFile(["view"], true, () => 3).length).toBe(1);
  expect(cmdFunc.viewFile(["view"], true, () => 3).length).toBe(1);
  expect(
    cmdFunc.searchFile(["search", "4", "yellow color"], true, () => 3).length
  ).toBe(1);

  file = "";
  expect(cmdFunc.loadFile(["load", file], true, () => 3)).toBe(
    "File with file name " + file + " cannot be found"
  );
  expect(cmdFunc.viewFile(["view"], true, () => 3)).toBe(
    "No file is loaded; please use load_file <file_name> command first"
  );
});
