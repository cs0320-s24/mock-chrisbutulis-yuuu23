import React from "react";
import { useState } from "react";

export interface REPLCommandFunction {
  commandStr: String;
}

const [briefMode, setBriefMode] = useState(false);
/**
 * Function to take care of mode switching
 */
export function isBriefMode() {
  // switch the current mode to the opposite
  setBriefMode(!briefMode);
  if (briefMode) {
    return "Brief Mode";
  } else {
    return "Verbose Mode";
  }
  return "";
}
