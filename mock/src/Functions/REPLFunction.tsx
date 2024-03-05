import "react";
import { Dispatch, SetStateAction } from "react";
import { getMockedFiles, getSearchResult } from "../data/MockedData";

let loadedFile: string | null = null;

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
export const loadFile: REPLFunction = (args: Array<string>): string => {
  loadedFile = "";
  let result: string;
  let fileArgumets = args.slice(1);
  if (fileArgumets.length > 1 || fileArgumets.length <= 0) {
    result =
      "Incorrect amount of arguments provided to load_file: " +
      fileArgumets.length +
      " arguments; please provide load_file <file name>";
  } else {
    let fileKey = getMockedFiles().get(fileArgumets[0]);
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
  args: Array<string>
): string | string[][] => {
  let result: string[][] | string;
  if (args.length > 1 || args.length <= 0) {
    result =
      "Incorrect amount of arguments provided to view: " +
      args.length +
      " arguments; please use view (1 argument)";
  } else {
    if (loadedFile) {
      let resultArray = getMockedFiles().get(loadedFile);
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
  args: Array<string>
): string | string[][] => {
  let result: string[][] | string;
  if (args.length <= 2) {
    console.log(args.length);
    result =
      "Incorrect amount of arguments provided to search: " +
      args.length +
      " arguments; please use search <column number or name><item to search for>  (2 or more argument)";
  } else {
    let fileResults: Map<string | number, Map<string, string[][]>> | undefined;
    // get the file -> all its search results
    if (loadedFile && (fileResults = getSearchResult().get(loadedFile))) {
      // map of all searches under that column identifier
      let outerMap: Map<string, string[][]> | undefined;
      let resultArray: string[][] | undefined;

      // build search for arguments into one string
      let inputArr: string[] | undefined = args.slice(2);
      let searchFor;
      if (inputArr.length > 1) {
        searchFor = inputArr.reduce(function (pre, next) {
          return pre + " " + next;
        });
      } else {
        searchFor = inputArr[0];
      }

      // check if column identifier is number
      if (!isNaN(parseInt(args[1]))) {
        outerMap = fileResults?.get(parseInt(args[1]));
      } else {
        outerMap = fileResults?.get(args[1]);
      }

      if (outerMap) {
        resultArray = outerMap?.get(searchFor);
      }

      // produce output
      if (resultArray != undefined && resultArray.length > 0) {
        result = resultArray;
      } else {
        result =
          "No search results for " +
          "coloumn identifier: " +
          args[1] +
          " value: " +
          searchFor;
      }
    } else {
      result =
        "No file is loaded; please use load_file <file_name> command first";
    }
  }
  return result;
};
