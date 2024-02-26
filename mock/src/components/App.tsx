import { useState } from "react";
import "../styles/App.css";
import { LoginButton } from "./LoginButton";
import REPL from "./REPL";
import { addCommand, getCommandMap } from "./REPLCmdMap";
import { loadFile, viewFile } from "./REPLFunction";

/**
 * This is the highest level component!
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  addCommand("load_file", loadFile);
  addCommand("view", viewFile);

  return (
    <div className="App">
      <p className="App-header">
        <h1>Mock</h1>
        <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </p>

      {isLoggedIn && <REPL />}
    </div>
  );
}

export default App;
