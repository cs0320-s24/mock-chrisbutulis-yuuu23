import "../../styles/main.css";
import { histEntry } from "./REPL";

/**
 * A interface for the props that are passed into REPLHistory.
 *
 * @params
 * history: an array holding the history entries that are to be
 *  outputted to the end-user
 */
interface REPLHistoryProps {
  history: Array<histEntry>;
}

/**
 * Builds a REPLHistory component that displays the ouput area according
 *  to any commands inputted by the user.
 *
 * @param props the history entries (see REPLHistoryProps for more details)
 * @returns JSX that depending on the mode, will print command with output (verbose)
 *  or just output (brief)
 *  A table if the result to the command function outpus string 2D array
 *   or paragraph HTML element if the command function outputs string
 */
export function REPLHistory(props: REPLHistoryProps) {
  /**
   * To build 2D string arrays into data for a table.
   *
   * @param input the 2D string array to be transformed into table body
   * @returns a JSX to go insdie table tags as the data to a table
   */
  function configureTableData(input: string[][]) {
    let result = (
      <tbody>
        {input.map((row, index) => (
          <tr key={index}>
            {row.map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
    return result;
  }

  return (
    <div className="repl-history" aria-label="Repl history">
      {props.history.map((entry, index) => (
        <div key={index}>
          {!entry.isBrief && <p>{"command: " + entry.cmd}</p>}
          {typeof entry.data === "string" ? (
            <p>{entry.data}</p>
          ) : (
            <table className="csv-data-table" aria-label="CSV Tables">
              {configureTableData(entry.data)}
            </table>
          )}
        </div>
      ))}
    </div>
  );
}
