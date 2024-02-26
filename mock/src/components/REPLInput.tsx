import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
import { ControlledInput } from "./ControlledInput";
import { loadFile, REPLFunction } from "./REPLFunction";
import { getCommandMap } from "./REPLCmdMap";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  // CHANGED
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
  commandMap: Map<string, REPLFunction>;
}

// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  props.commandMap = getCommandMap();
  const [commandString, setCommandString] = useState<string>("");
  // TODO WITH TA : add a count state
  const [count, setCount] = useState<number>(0);
  const [briefMode, setBriefMode] = useState(false);

  // const [verboseMode, setVerboseMode] = useState(false);

  // This function is triggered when the button is clicked.
  function handleSubmit(commandString: string) {
    setCount(count + 1);

    let output: string;

    if (commandString == "mode") {
      setBriefMode(!briefMode);
      output = "mode updated";
    } else {
      let args = commandString.split(" ");
      let useFunction = props.commandMap.get(args[0]);
      if (useFunction == undefined) {
        output = "ERROR";
      } else {
        output = useFunction(args.slice(1), briefMode, setBriefMode);
      }
    }

    if (briefMode) {
      // CHANGED

      props.setHistory([
        ...props.history,
        "Command: " + commandString + "\n" + output,
      ]);
    } else {
      props.setHistory([...props.history, output]);
    }
    setCommandString("");
  }

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
