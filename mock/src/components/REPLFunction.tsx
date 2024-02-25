import { todo } from "node:test";
import { off } from "process";
import "react";

/**
 * Method to take in command, call command related functions,
 *  and produce ouput to put in history.
 *
 * input: the command in an array of string
 * output: the result to print to history when the command finishes execution
 */
export interface REPLFunction {
  (args: Array<string>): string;
}

// arg0 -> cmd
// arg1 -> briefMode

// check if cmd exists in map and call its relative function to return output
export function cmdHandler(useFunction: REPLFunction, args: string[]) {
  return useFunction(args);
}

export function loadFile(args: Array<string>) {
  if (args[0] == "f") return "success";
  return "failure";
}
