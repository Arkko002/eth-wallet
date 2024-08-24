import { ethers, AddressLike, isAddressable, resolveAddress } from "ethers";
import { Command } from ".";
import { TokenABI, parseABI } from "../abi-parser";

export type NFTToken = TokenABI.ERC721 | TokenABI.ERC1155;

export class NFTs extends Command {
  private address: AddressLike;
  private tokenAbi: NFTToken;
  private ownerAddress: AddressLike = process.env.SIGNER_PRIVATE_KEY!;

  public constructor(address: AddressLike, tokenAbi: NFTToken) {
    super("nfts");
    this.address = address;
    this.tokenAbi = tokenAbi;
  }

  public async exec(): Promise<string> {
    console.log("Starting execution of NFTs command");

    const validationResult: string | null = this.validate();
    if (validationResult) {
      console.log("Validation failed: " + validationResult);
      return validationResult;
    }
    console.log("Validation passed");

    const abi = await parseABI(this.tokenAbi);
    console.log("ABI parsed:", abi);

    const contractAddress = await resolveAddress(this.address);
    console.log("Contract address resolved:", contractAddress);

    const contract = new ethers.Contract(contractAddress, abi, this.provider);

    if (this.tokenAbi === TokenABI.ERC721) {
      const balance = await contract.balanceOf(this.ownerAddress);
      console.log("ERC721 balance retrieved:", balance);
      return balance;
    } else {
      const tokenIds = [1, 2, 3]; // TODO: Replace with the desired token IDs

      const balance = await contract.balanceOfBatch(
        [this.ownerAddress],
        tokenIds,
      );
      console.log("ERC1155 balance retrieved:", balance);
      return balance;
    }
  }

  public validate(): string | null {
    if (!isAddressable(this.address)) {
      return `Provided argument is not addressable: ${this.address}`;
    }

    return null;
  }

  public help(): string {
    return "Display wallets NFT tokens";
  }
}

