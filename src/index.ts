import { Network, ethers, formatEther } from "ethers";
import { verify_env_vars } from "./config";
import { Command, parseCommandLine } from "./cmd";

async function main() {
  verify_env_vars();

  const cmd: string[] = process.argv.slice(2);
  const command: Command = parseCommandLine(cmd);
  const result: string = await command.exec();

  console.log(result);
}

main().then(() => {});

