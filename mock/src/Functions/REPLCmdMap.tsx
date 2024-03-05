import { REPLFunction } from "./REPLFunction";
let cmdMap = new Map<string, REPLFunction>();

/**
 * Allows developers to add new custom commands to the map holding
 *  all commands to function
 *
 * @param cmd the command in string
 * @param func what should happen when the command is entered
 */
export function addCommand(cmd: string, func: REPLFunction) {
  cmdMap.set(cmd, func);
  if (cmdMap.has(cmd)) {
    return "command " + cmd + " successfully added";
  } else {
    return "command " + cmd + " not added; try again";
  }
}

/**
 * Allows developers to delete any commands from the map holding
 *  all commands to function
 *
 * @param cmd the command to delete
 */
export function deleteCommand(cmd: string) {
  if (cmdMap.delete(cmd)) {
    return "command " + cmd + " deleted";
  } else {
    return "command " + cmd + " not found";
  }
}

/**
 * Getter to get the command map and return a new copy of the current command map
 *
 * @returns a copy of the current command map
 */
export function getCommandMap() {
  return new Map(cmdMap);
}
