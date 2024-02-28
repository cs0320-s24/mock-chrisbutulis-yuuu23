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
let searchResultsLabels: Map<string, Map<string, string[][]>> = new Map();

let starsArray = [
  ["name", "location", "x-coord"],
  ["sun", "milky way", "192"],
  ["96 G. Psc", "milky way", "1032.2"],
  ["sun", "another milky way", "192.3"],
  ["Rigel Kentaurus A", "Andromeda", "3.20"],
];
mockedFileMap.set("stars", starsArray);
searchResultsLabels.set("name", new Map());
searchResultsLabels.get("name")!.set("sun", [
  ["sun", "milky way", "192"],
  ["sun", "another milky way", "192.3"],
]);

/**
 * A interface for all REPLFunctions;
 *  developers should build their function according to this interface
 *
 * @params
 * args: the command string parsed into an argument array
 * briefMode: whether the current mode is brief mode or not
 *  (the developer may choose to customize their output accordingly)
 * setBriefMode: function to change the mode state
 *  (the developer may wish to change the mode as part of their customized command)
 */
export interface REPLFunction {
  (
    args: Array<string>,
    briefMode: boolean,
    setBriefMode: Dispatch<SetStateAction<boolean>>
  ): string | string[][];
}

/**
 * Default function to change the mode of Mock to brief if in verbose
 *  and verbose if in brief.
 * For the "mode" command.
 *
 * @param args the command for valid number of command checking
 * @param briefMode current mode
 * @param setBriefMode function to update the mode state
 * @returns string of success or error depending on if the mode switched / what mode it switched to
 */
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
    result = briefMode ? "mode changed to verbose " : "mode changed to brief";
  }
  return result;
};

/**
 * A function to load files in and update global variable for loaded in file.
 * For the "load_file" command
 *
 * @param args for argument checking and file to load in
 * @param briefMode (unused - for interface )
 * @param setBriefMode (unused - for interface)
 * @returns depending on success or failure if the file is loaded in successifully
 */
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

/**
 * Function to view the current loaded in file if any was loaded.
 * For the command "view"
 *
 * @param args for number of argument checking
 * @param briefMode (unused - for interface )
 * @param setBriefMode (unused - for interface )
 * @returns if failure return string for failure message;
 *  if success return the string 2D array holding CSV data in rows
 */
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

/**
 * Function to search the current loaded-in file given column identifier
 *  (as column name or column index) and a value to search for.
 * For the command "search"
 *
 * @param args for number of argument checking and query parameters
 * @param briefMode (unused - for interface )
 * @param setBriefMode (unused - for interface )
 * @returns if failure return string for failure message;
 *  if success return the string 2D array holding the found rows
 */
export const searchFile: REPLFunction = (
  args: Array<string>,
  briefMode: boolean,
  setBriefMode: Dispatch<SetStateAction<boolean>>
): string | string[][] => {
  let result: string[][] | string;
  if (args.length != 3) {
    console.log(args.length);
    result =
      "Incorrect amount of arguments provided to search: " +
      args.length +
      " arguments; please use search <column number or name><item to search for>  (1 argument)";
  } else {
    if (loadedFile) {
      let resultArray: string[][] | undefined;
      let outerMap: Map<string, string[][]> | undefined;
      if (!isNaN(parseInt(args[1]))) {
        let column = mockedFileMap.get(loadedFile)![0][parseInt(args[1])];
        outerMap = searchResultsLabels.get(column);
      } else {
        outerMap = searchResultsLabels.get(args[1]);
      }
      if (outerMap) {
        resultArray = outerMap.get(args[2]);
      }
      if (resultArray != undefined) {
        result = resultArray;
      } else {

        result =
          "No search results for " +
          "coloumn identifier: " +
          args[1] +
          " value: " +
          args[2];

        result = "No search results";

      }
    } else {
      result =
        "No file is loaded; please use load_file <file_name> command first";
    }
  }
  return result;
};
