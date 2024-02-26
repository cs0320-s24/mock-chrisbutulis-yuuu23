import { todo } from "node:test";
import { off } from "process";
import "react";
import { Dispatch, SetStateAction, useState } from "react";

/**
 * Method to take in command, call command related functions,
 *  and produce ouput to put in history.
 *
 * input: the command in an array of string
 * output: the result to print to history when the command finishes execution
 */
export interface REPLFunction {
  (
    args: Array<string>,
    mode: boolean,
    setBriefMode: Dispatch<SetStateAction<boolean>>
  ): string;
}

export function loadFile(
  args: Array<string>,
  mode: boolean,
  setBriefMode: Dispatch<SetStateAction<boolean>>
) {
  if (args[0] == "f") return "success";
  return "failure";
}
