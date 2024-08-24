import { ethers } from "ethers";
import { Balance } from "./balance";
import { Transfer } from "./transfer";
import { NFTs } from "./nfts";
import { TokenABI } from "../abi-parser";

export abstract class Command {
  public name: string;
  protected isValidArgs: boolean;
  protected provider: ethers.Provider;

  constructor(name: string) {
    this.name = name;
    this.isValidArgs = false;
    this.provider = new ethers.InfuraProvider(
      process.env.ETHEREUM_NETWORK,
      process.env.INFURA_API_KEY,
    );
  }

  abstract validate(): string | null;
  abstract help(): string;
  abstract exec(): Promise<string>;
}

export function parseCommandLine(cmds: string[]): Command {
  if (cmds[0] === "balance") {
    if (cmds.length > 1) {
      return new Balance(cmds[1]);
    }
    return new Balance();
  } else if (cmds[0] === "transfer") {
    if (cmds.length > 2) {
      return new Transfer(cmds[1], cmds[2]);
    }
    throw new Error(`Missing arguments for command: ${cmds[0]}`);
  } else if (cmds[0] === "nfts") {
    return new NFTs(cmds[1], TokenABI.ERC721);
  }

  throw new Error(`Unknown command provided: ${cmds[0]}`);
}

