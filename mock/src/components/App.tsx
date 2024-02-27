import { useState } from "react";
import "../styles/App.css";
import { LoginButton } from "./LoginButton";
import { REPL } from "./REPL";
import { addCommand, getCommandMap } from "./REPLCmdMap";
import { changeMode, loadFile, viewFile } from "./REPLFunction";

/**
 * This is the highest level component!
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  addCommand("mode", changeMode);
  addCommand("load_file", loadFile);
  addCommand("view", viewFile);

  return (
    <div className="App">
      <div className="App-header">
        <h1>Mock</h1>
        <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
      {isLoggedIn && <REPL />}
    </div>
  );
}

export default App;
