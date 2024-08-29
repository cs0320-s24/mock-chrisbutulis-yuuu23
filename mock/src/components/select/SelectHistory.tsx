import "../../styles/main.css";
import { histEntry } from "./Select";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { elements } from "chart.js/auto";

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

  /**
   * renders standard bar chart with the data provided
   *
   */
  function configureChartData(input: string[][]) {
    const labelArray = input[0];
    const bars = input[1];
    const data = {
      labels: labelArray,
      datasets: [
        {
          backgroundColor: ["red", "green", "blue", "orange", "brown"],
          data: bars.map((element) => parseInt(element)),
        },
      ],
    };
    return data;
  }

  function checkChart(input: string[][]) {
    const bars = input[1];
    if (input.length > 2) {
      return false;
    }
    for (let i = 0; i < bars.length; i++) {
      if (isNaN(parseInt(bars[i]))) {
        return false;
      }
    }
    return true;
  }

  return (
    <div className="select-history" aria-label="select history">
      {props.history.map((entry, index) => (
        <div key={index}>
          {typeof entry.data === "string" ? (
            <p>{entry.data}</p>
          ) : entry.useChartView && checkChart(entry.data) ? (
            <div className="chart-container">
              <Bar
                data={configureChartData(entry.data)}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          ) : entry.useChartView && !checkChart(entry.data) ? (
            <p>Not able to be turned into a chart</p>
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
