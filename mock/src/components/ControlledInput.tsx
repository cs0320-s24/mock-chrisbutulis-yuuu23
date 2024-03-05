import "../styles/main.css";
import { Dispatch, SetStateAction } from "react";

/**
 * An interface for controlling and managing input commands by user through interactions
 *  with the REPL command box.
 *
 * @params
 * value: for HTML input value attribute and the input command string
 * setValue: to update the state of the input command string
 * ariaLabel: for testing
 */
interface ControlledInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}

/**
 * Builds component that takes care of reading in command input by the end-user.
 *
 * @param param0 the set of parameter required by ControlledInputProps
 *  (see the ControlledInputProps) for more details
 * @returns JSX such that the input box and interaction with it for taking
 *  in user command is displayed on the front-end
 */
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
}: ControlledInputProps) {
  return (
    <input
      type="text"
      className="repl-command-box"
      value={value}
      placeholder="Enter command here!"
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
    ></input>
  );
}
