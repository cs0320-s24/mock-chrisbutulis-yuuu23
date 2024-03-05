import { Dispatch, SetStateAction, useState } from "react";
import "../../styles/main.css";
import { ControlledInput } from "../ControlledInput";
import { REPLFunction } from "../../Functions/REPLFunction";
import { histEntry } from "./REPL";

/**
 * A interface for REPLInput.
 *
 * @params
 * history: the array storing all previous history entries
 * setHistory: function to add new history entry to history array
 * commandMap: map that maps string commands to its associating function
 */
interface REPLInputProps {
  history: Array<histEntry>;
  setHistory: Dispatch<SetStateAction<Array<histEntry>>>;
  commandMap: Map<string, REPLFunction>;
}

/**
 * Builds a REPLInput component to take care of managing
 *  reading-in of command input for REPL.
 *
 * @param props all input needed to call commands and manage ouput history
 *  (see REPLInputProps interface for more details)
 * @returns A JSX element that prompts and manages commandString
 */
export function REPLInput(props: REPLInputProps) {
  /**
   * To keep state of commandString and function to update this String
   */
  const [commandString, setCommandString] = useState<string>("");

  /**
   * To keep state of the current mode (whether it's brief or not) and
   *  function to update this boolean
   */
  const [briefMode, setBriefMode] = useState<boolean>(true);

  /**
   * Function that is called when a user click the submit button to enter a new command.
   *  Calls and execute the appropriate function stored in the map
   *  and add function output to map.
   *
   * @param commandString the comamnd entered by the user
   */
  function handleSubmit(commandString: string) {
    let output: string | string[][];
    let args = commandString.split(" ");
    let useFunction = props.commandMap.get(args[0]);
    if (useFunction == undefined) {
      output = "Command " + args[0] + " not found";
    } else {
      output = useFunction(args, briefMode, setBriefMode);
    }

    // create new entry to be added to a list of output history
    let newEntry: histEntry = {
      isBrief: briefMode,
      data: output,
      cmd: commandString,
    };

    props.setHistory([...props.history, newEntry]);
    setCommandString("");
  }

  return (
    <div className="repl-input">
      <fieldset
        aria-label="Input Box"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(commandString);
          }
        }}
      >
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel="Command input"
        />
      </fieldset>
      <button aria-lable="Submit" onClick={() => handleSubmit(commandString)}>
        Submit
      </button>
    </div>
  );
}
