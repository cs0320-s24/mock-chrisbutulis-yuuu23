import "react";
import { Dispatch, SetStateAction } from "react";

/**
 * Method to take in command, call command related functions,
 *  and produce ouput to put in history.
 *
 * input: the command in an array of string
 * output: the result to print to history when the command finishes execution
 */

let loadedFile: String | null = null;
let mockedFileMap = new Map<String, String[][]>();

let starsArray = [
  ["name", "location", "x-coord"],
  ["sun", "milky way", "192"],
];
mockedFileMap.set("stars", starsArray);

export interface REPLFunction {
  (
    args: Array<string>,
    briefMode: boolean,
    setBriefMode: Dispatch<SetStateAction<boolean>>
  ): String | String[][];
}

export function changeMode(
  args: Array<String>,
  briefMode: boolean,
  setBriefMode: Dispatch<SetStateAction<boolean>>
): String {
  setBriefMode(!briefMode);
  // I'm not sure why it has a lag as to changing the state,
  // so I had to make it the opposite so that when it changes mode it
  // doesn't return based on the previous mode
  return briefMode
    ? "mode changed to verbose "
    : "Command: " + args[0] + "\n" + "mode changed to brief";
}

export function loadFile(
  args: Array<String>,
  briefMode: boolean,
  setBriefMode: Dispatch<SetStateAction<boolean>>
): String {
  let result: String;
  let fileArgumets = args.slice(1);
  if (fileArgumets.length > 1) {
    result = "Too many arguments provided";
  } else {
    let fileKey = mockedFileMap.get(fileArgumets[0]);
    if (fileKey) {
      loadedFile = fileArgumets[0];
      result = "File " + loadedFile + " loaded";
    } else {
      result = "File " + loadedFile + " cannot be found";
    }
  }
  return briefMode ? result : "Command: " + args[0] + args[1] + "\n" + result;
}

export function viewFile(
  args: Array<String>,
  briefMode: boolean,
  setBriefMode: Dispatch<SetStateAction<boolean>>
) {
  let result: String[][] | String;
  if (loadedFile) {
    let resultArray = mockedFileMap.get(loadedFile);
    if (resultArray == undefined) {
      result = "File " + loadFile + " not found in file map";
    } else {
      result = resultArray;
    }
  } else {
    result = "No file is loaded; please use load_file command";
  }
  return briefMode ? result : "Command: " + args[0] + "\n" + result;
}
