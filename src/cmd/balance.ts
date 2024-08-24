import { formatEther, AddressLike, isAddressable } from "ethers";
import { Command } from ".";

export class Balance extends Command {
  public async exec(): Promise<string> {
    const validationResult: string | null = this.validate();
    if (validationResult) {
      return validationResult;
    }
    return formatEther(await this.provider.getBalance("ethers.eth"));
  }

  private address: AddressLike;
  public constructor(address?: AddressLike) {
    super("balance");
    this.address = address ? address! : process.env.SIGNER_PRIVATE_KEY!;
  }

  public validate(): string | null {
    if (!isAddressable(this.address)) {
      return `Provided argument is not addressable: ${this.address}`;
    }

    this.isValidArgs = true;
    return null;
  }

  public help(): string {
    return "Display Wallet's token currency balance";
  }
}

