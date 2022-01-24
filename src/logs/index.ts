// import logSymbols from "log-symbols";
import * as chalk from "chalk";

export const logger = {
  log: (...str) => {
    console.log(...str);
  },
  info: (...str) => {
    console.log("🔃 ", chalk.blue(...str));
  },
  succes: (...str) => {
    console.log("✅ ", chalk.green(...str));
  },
  warn: (...str) => {
    console.log("🚧 ", chalk.yellow(...str));
  },
  error: (...str) => {
    console.log("❌ ", chalk.red(...str), "\n");
  },
};
