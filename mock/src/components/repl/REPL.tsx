import { useState } from "react";
import "../../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { getCommandMap } from "../../Functions/REPLCmdMap";

/**
 * A histEntry interface for sharing command function results to be turned into
 *  JSX and outputted in the REPL display.
 *
 * @params
 * isBrief: if mock is in brief mode or not (then in verbose mode)
 * data: the result of running the command; can be string or 2D array holding string
 * cmd: the command that activated the function
 */
export interface histEntry {
  isBrief: boolean;
  data: string | string[][];
  cmd: string;
}

/**
 * Builds a REPL component object that runs all main component of Mock input
 *  and output control.
 *
 * @returns A JSX element that displays the REPL history output for command result
 *  and the REPLInput for command read-in
 */
export function REPL() {
  /**
   * Array holding each command, output, and mode as a histEntry.
   * Include setHistory function to add an entry and maintain this state.
   */
  const [history, setHistory] = useState<Array<histEntry>>([]);

  return (
    <div className="repl">
      <div className="history-container" aria-lable="History container">
        <pre>
          <REPLHistory history={history} />
        </pre>
      </div>
      <hr></hr>
      <REPLInput
        history={history}
        setHistory={setHistory}
        commandMap={getCommandMap()}
      />
    </div>
  );
}
