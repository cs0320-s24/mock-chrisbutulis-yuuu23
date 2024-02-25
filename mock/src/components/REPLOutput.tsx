import "../styles/main.css";

interface REPLOutputProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  // CHANGED
  output: string[];
}
export function REPLOutput(props: REPLOutputProps) {
  return (
    <div className="repl-output" aria-label="repl-output">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {/* CHANGED */}
      {props.output.map((command, index) => (
        <p>{command}</p>
      ))}
    </div>
  );
}
