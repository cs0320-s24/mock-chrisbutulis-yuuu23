import "react";
import { Dispatch, SetStateAction } from "react";

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
    briefMode: boolean,
    setBriefMode: Dispatch<SetStateAction<boolean>>
  ): string | string[][];
}

export const changeMode: REPLFunction = (
  args: Array<string>,
  briefMode: boolean,
  setBriefMode: Dispatch<SetStateAction<boolean>>
): string => {
  let result: string;
  if (args.length > 1 || args.length <= 0) {
    result =
      "Incorrect amount of arguments provided to mode: " +
      args.length +
      " arguments; please use mode (1 argument)";
  } else {
    setBriefMode(!briefMode);
    // I'm not sure why it has a lag as to changing the state,
    // so I had to make it the opposite so that when it changes mode it
    // doesn't return based on the previous mode
    result = briefMode ? "mode changed to verbose " : "mode changed to brief";
  }
  return result;
};

export const loadFile: REPLFunction = (
  args: Array<string>,
  briefMode: boolean,
  setBriefMode: Dispatch<SetStateAction<boolean>>
): string => {
  let result: string;
  let fileArgumets = args.slice(1);
  if (fileArgumets.length > 1 || fileArgumets.length <= 0) {
    result =
      "Incorrect amount of arguments provided to load_file: " +
      fileArgumets.length +
      " arguments; please provide load_file <file name>";
  } else {
    let fileKey = mockedFileMap.get(fileArgumets[0]);
    if (fileKey) {
      loadedFile = fileArgumets[0];
      result = "File with file name " + loadedFile + " loaded";
    } else {
      result = "File with file name " + args[1] + " cannot be found";
    }
  }
  return result;
};

export const viewFile: REPLFunction = (
  args: Array<string>,
  briefMode: boolean,
  setBriefMode: Dispatch<SetStateAction<boolean>>
): string | string[][] => {
  let result: string[][] | string;
  if (args.length > 1 || args.length <= 0) {
    result =
      "Incorrect amount of arguments provided to view: " +
      args.length +
      " arguments; please use view (1 argument)";
  } else {
    if (loadedFile) {
      let resultArray = mockedFileMap.get(loadedFile);
      if (resultArray == undefined) {
        result = "File with file name " + loadFile + " not found in file map";
      } else {
        result = resultArray;
      }
    } else {
      result =
        "No file is loaded; please use load_file <file_name> command first";
    }
  }
  return result;
};
