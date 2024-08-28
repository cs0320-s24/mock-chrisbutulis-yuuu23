import { useState } from "react";
import "../../styles/main.css";
import { SelectHistory } from "./SelectHistory";
import { SelectInput } from "./SelectInput";

/**
 * A histEntry interface for sharing command function results to be turned into
 *  JSX and outputted in the REPL display.
 *
 * @params
 * data: the result of running the command; can be string or 2D array holding string
 * isTableView: if the data should be displayed in table view
 */
export interface histEntry {
  data: string | string[][];
  useChartView: boolean;
}

/**
 * Builds a Select component object that provides a dropdown to view current datasets available
 *
 * @returns A JSX element that includes a dropdown, after selection, display the dataset in tabular form
 *
 */
export function Select() {
  /**
   * Array holding each command, output, and mode as a histEntry.
   * Include setHistory function to add an entry and maintain this state.
   */
  const [history, setHistory] = useState<Array<histEntry>>([]);

  return (
    <div className="select">
      <div className="select-container" aria-lable="Select container">
        <pre>
          <SelectHistory history={history} />
        </pre>
      </div>
      <hr></hr>
      <SelectInput history={history} setHistory={setHistory} />
    </div>
  );
}
