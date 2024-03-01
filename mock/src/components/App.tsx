import { useState } from "react";
import "../styles/App.css";
import { LoginButton } from "./LoginButton";
import { REPL } from "./repl/REPL";
import { addCommand, deleteCommand } from "../Functions/REPLCmdMap";
import {
  changeMode,
  loadFile,
  viewFile,
  searchFile,
} from "../Functions/REPLFunction";

/**
 * This is the highest level of Mock which builds the component APP;
 * here, developers can use the addCommand function to add/remove custom command and
 * function pair to the map encompassing all commands and function.
 *
 * @return JSX of the entire mock
 *  Note: if the user is loggedIn, the REPL screen will show,
 *  else it will stay at the screen prompting for log in
 */
function App() {
  /**
   * A state tracker for if the user is logged in and
   *  a function to update the logged-in state
   */
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // add or delete comamnds and function to map here
  addCommand("mode", changeMode);
  addCommand("load_file", loadFile);
  addCommand("view", viewFile);
  addCommand("search", searchFile);

  return (
    <div className="App">
      <div className="App-header">
        <h1 aria-label="Mock Header">Mock</h1>
        <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
      {isLoggedIn && <REPL />}
    </div>
  );
}

export default App;
