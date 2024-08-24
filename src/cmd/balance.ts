import { formatEther, AddressLike, isAddressable } from "ethers";
import { Command } from ".";

export class Balance extends Command {
  private address: AddressLike;
  public constructor(address?: AddressLike) {
    super("balance");
    this.address = address ? address! : process.env.SIGNER_PRIVATE_KEY!;
  }

  public async exec(): Promise<string> {
    console.log("Starting execution of balance command");

    const validationResult: string | null = this.validate();
    if (validationResult) {
      console.log("Validation failed: " + validationResult);
      return validationResult;
    }
    console.log("Validation passed");

    const balance = await this.provider.getBalance("ethers.eth");
    console.log("Retrieved balance:", balance);

    const formattedBalance = formatEther(balance);
    console.log("Formatted balance:", formattedBalance);

    return formattedBalance;
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

