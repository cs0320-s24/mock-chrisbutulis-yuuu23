/**
 * Function to take care of mode switching
 */
let curModeBrief = true;
export function isBriefMode() {
  // switch the current mode to the opposite
  curModeBrief = !curModeBrief;
  if (curModeBrief) {
    // activate brief mode
  } else {
    // activate verbose mode
  }
  return "";
}
