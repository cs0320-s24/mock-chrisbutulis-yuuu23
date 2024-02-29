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

test("changeMode Function with error handling", () => {
  // test too much arguments
  expect(cmdFunc.changeMode(["mode", "Hi", "fhh"], true, () => 3)).toBe(
    "Incorrect amount of arguments provided to mode: " +
      "3" +
      " arguments; please use mode (1 argument)"
  );
});

test("changeMode Function with error handling", () => {
  // test too much arguments
  expect(cmdFunc.changeMode(["mode", "Hi", "fhh"], true, () => 3)).toBe(
    "Incorrect amount of arguments provided to mode: " +
      "3" +
      " arguments; please use mode (1 argument)"
  );
});
