import parse from "parse-json";
import fs from "node:fs/promises";

export enum TokenABI {
  ERC20,
  ERC721,
  ERC1155,
}

export async function parseABI(abi: TokenABI) {
  let path: string;
  switch (abi) {
    case TokenABI.ERC20:
      path = "../abi/erc20-abi.json";
      break;
    case TokenABI.ERC721:
      path = "../abi/erc721-abi.json";
      break;
    case TokenABI.ERC1155:
      path = "../abi/erc1155-abi.json";
      break;
  }

  return await fs.readFile(path).then((data: Buffer) => data.toString("ascii"));
}

