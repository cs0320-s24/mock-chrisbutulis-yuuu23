import { todo } from "node:test";
import { off } from "process";
import "react";
import { isBriefMode } from "./REPLCommandFunctions";

/**
 * Method to take in command, call command related functions,
 *  and produce ouput to put in history.
 *
 * input: the command in an array of string
 * output: the result to print to history when the command finishes execution
 */
export interface REPLFunction {
  (args: Array<string>): String | String[][];
}

// cmd map to store command to its function
// build relative functions
let cmdMap = new Map<string, Function>();
cmdMap.set("mode", isBriefMode);

// check if cmd exists in map and call its relative function to return output
export function cmdHandler(args: Array<string>) {
  const cmd = args[0];
  if (cmd == undefined) {
    return "command " + cmd + " not found!";
  } else {
    const cmdFunction = cmdMap.get(cmd);
    const cmdFunctionArgs = args.slice(1, args.length);
    if (cmdFunction == undefined) {
      return "command " + cmd + " does not exists";
    } else {
      return cmdFunction(cmdFunctionArgs);
    }
  }
}
