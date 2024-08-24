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
    const validationResult: string | null = this.validate();
    if (validationResult) {
      return validationResult;
    }
    const abi = await parseABI(this.tokenAbi);
    const contractAddress = await resolveAddress(this.address);

    const contract = new ethers.Contract(contractAddress, abi, this.provider);

    if (this.tokenAbi === TokenABI.ERC721) {
      return await contract.balanceOf(this.ownerAddress);
    } else {
      const tokenIds = [1, 2, 3]; // TODO: Replace with the desired token IDs

      return await contract.balanceOfBatch([this.ownerAddress], tokenIds);
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

