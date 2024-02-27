import "../styles/main.css";
import { histEntry } from "./REPL";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  // CHANGED
  history: Array<histEntry>;
}
export function REPLHistory(props: REPLHistoryProps) {
  function configureTable(output: string[][]) {
    let result = (
      <tbody>
        {output.map((row, index) => (
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
    <div className="repl-history" aria-label="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {/* CHANGED */}
      {props.history.map((entry, index) => (
        <div key={index}>
          {!entry.isBrief && <p>{"command: " + entry.cmd}</p>}
          {typeof entry.data === "string" ? (
            <p>{entry.data}</p>
          ) : (
            <table className="csv-data-table">
              {configureTable(entry.data)}
            </table>
          )}
        </div>
      ))}
    </div>
  );
}
