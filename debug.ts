export var debugLog: string[] = [];
export var debugIndex = 0;

export function debug(msg: string, data: any): void {
  debugLog.push(`${debugIndex} ${msg}`);
  debugLog.push(JSON.stringify(data));
  debugIndex++;
}

export function resetDebug(): void {
  debugLog = [];
  debugIndex = 0;
}
