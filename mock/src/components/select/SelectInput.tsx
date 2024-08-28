import { Dispatch, SetStateAction, useState } from "react";
import "../../styles/main.css";
import { getMockedFiles } from "../../data/MockedData";
import { histEntry } from "./Select";

/**
 * A interface for SelectInput.
 *
 * @params
 * history: the array storing all previous history entries
 * setHistory: function to add new history entry to history array
 */
interface SelectInputProps {
  history: Array<histEntry>;
  setHistory: Dispatch<SetStateAction<Array<histEntry>>>;
}

/**
 * Builds a SelectInput component to take care of managing
 *  reading-in of file input for dropdown.
 *
 * @param props all input needed to manage ouput history
 *  (see REPLInputProps interface for more details)
 * @returns A JSX element that prompts and manages commandString
 */
export function SelectInput(props: SelectInputProps) {
  /**
   * Function that is called when a user click the submit button to display a new file
   *
   * @param file the file selected by the user
   */
  function handleSubmit(file: string) {
    let output: string | string[][];
    if (file) {
      let resultArray = getMockedFiles().get(file);
      if (resultArray == undefined) {
        output = "File with file name " + file + " not found in file map";
      } else {
        output = resultArray;
      }
    } else {
      output =
        "No file is loaded; please use load_file <file_name> command first";
    }
    // create new entry to be added to a list of output history
    let newEntry: histEntry = {
      data: output,
    };

    props.setHistory([...props.history, newEntry]);
  }

  return (
    <div className="dropdown-container">
      <select className="dropdown" name="dropdown" id="dropdown">
        {Array.from(getMockedFiles().keys()).map((item, key) => (
          <option key={key}>{item}</option>
        ))}
      </select>
      <button
        aria-lable="Submit"
        onClick={() => {
          const selectElement = document.getElementById(
            "dropdown"
          ) as HTMLSelectElement | null;
          const selectText =
            selectElement?.options[selectElement.selectedIndex]?.text;
          if (selectText != null) {
            handleSubmit(selectText);
          }
        }}
      >
        Submit
      </button>
    </div>
  );
}
