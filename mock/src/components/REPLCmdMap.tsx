import { REPLFunction } from "./REPLFunction";
let cmdMap = new Map<string, REPLFunction>();

export function addCommand(cmd: string, func: REPLFunction) {
  cmdMap.set(cmd, func);
}
