import { todo } from "node:test";
import "react";

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

todo;
/**
 * When read in command line ->
 *  1. Find matching function in command map; if not found, output directly
 *  2. If found, call associating functions to that command (value of key in map?)
 *  3. Return result to be put in history
 *
 * Build associating command line to components map in here directly or in REPL?
 * How to incorporate strategy pattern here?
 * What is command-name prefix?
 * Should map be from string (command) to components? (something like <command />),
 *  if so how should we take care of that type?
 * When using this component, take in commandline and function parameter as props to this component?
 */
