import { todo } from "node:test";
import { off } from "process";
import "react";
import { Dispatch, SetStateAction, useState } from "react";
import { useState } from "react";

/**
 * Method to take in command, call command related functions,
 *  and produce ouput to put in history.
 *
 * input: the command in an array of string
 * output: the result to print to history when the command finishes execution
 */

let loadedFile: string | null = null;
let mockedFileMap = new Map<string, string[][]>();

let starsArray = [
  ["name", "location", "x-coord"],
  ["sun", "milky way", "192"],
];
mockedFileMap.set("stars", starsArray);

export interface REPLFunction {

  (
    args: Array<string>,
    mode: boolean,
    setBriefMode: Dispatch<SetStateAction<boolean>>
  ): string;
}


export function loadFile(args: Array<string>) {
  if (args.length > 1) return "Too many arguments provided";

  let fileKey = mockedFileMap.get(args[0]);
  if (fileKey) {
    loadedFile = args[0];
    return "File loaded";
  }
  return "File couldn't be found";
}

export function viewFile() {
  if (loadedFile) {
    let resultArray = mockedFileMap.get(loadedFile);
    if (resultArray) return resultArray;
  }
  return "No file is loaded";
}
