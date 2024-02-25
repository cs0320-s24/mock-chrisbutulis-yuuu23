import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
import { ControlledInput } from "./ControlledInput";
import { cmdHandler, isBriefMode, REPLFunction } from "./REPLFunction";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  // CHANGED
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // TODO WITH TA : add a count state
  const [count, setCount] = useState<number>(0);

  const [briefMode, setBriefMode] = useState(false);

  let cmdMap = new Map<string, REPLFunction>();
  cmdMap.set("mode", isBriefMode);

  // const [verboseMode, setVerboseMode] = useState(false);

  // This function is triggered when the button is clicked.
  function handleSubmit(commandString: string) {
    setCount(count + 1);

    // if (verboseMode) {
    //   // CHANGED
    //   props.setHistory([...props.history, "Command: " + commandString]);
    // }
    // call REPLFunction directly and pass through there
    let output: string;
    let useFunction = cmdMap.get(commandString);
    if (useFunction == undefined) {
      return null;
    } else {
      output = cmdHandler(useFunction);
    }

    props.setHistory([...props.history, output]);
    // handleCommand(commandString);
    // setCommandString("");
  }

  // function handleCommand(commandString: string) {
  //   if (commandString == "mode") {
  //     setVerboseMode(!verboseMode);
  //   }
  //   props.setHistory([...props.history, "Output goes here"]);
  // }

  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button onClick={() => handleSubmit(commandString)}>
        Submitted {count} times
      </button>
    </div>
  );
}
