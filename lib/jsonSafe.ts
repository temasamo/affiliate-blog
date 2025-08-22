export const jsonSafe = <T,>(v: T): T =>
  JSON.parse(JSON.stringify(v, (_k, x) => (x === undefined ? null : x))); 