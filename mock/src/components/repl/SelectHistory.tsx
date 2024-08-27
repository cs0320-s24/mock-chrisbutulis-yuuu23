import "../../styles/main.css";
import { histEntry } from "./Select";

/**
 * A interface for the props that are passed into SelectHistory.
 *
 * @params
 * history: an array holding the history entries that are to be
 *  outputted to the end-user
 */
interface SelectHistoryProps {
  history: Array<histEntry>;
}

/**
 * Builds a SelectHistory component that displays the ouput area according
 *  to any commands inputted by the user.
 *
 * @param props the history entries (see SelectHistoryProps for more details)
 * @returns JSX that will print a tabular view of the passed in data
 */
export function SelectHistory(props: SelectHistoryProps) {
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
