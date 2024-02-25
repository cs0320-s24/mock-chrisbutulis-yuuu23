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
  (args: Array<string>): string;
}

// check if cmd exists in map and call its relative function to return output
export function cmdHandler(useFunction: REPLFunction) {
  return useFunction([""]);
}

export function isBriefMode(args: Array<string>) {
  // switch the current mode to the opposite
  setBriefMode(!briefMode);
  if (briefMode) {
    return "Brief Mode";
  } else {
    return "Verbose Mode";
  }
  return "";
}
