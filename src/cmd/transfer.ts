import { ethers, AddressLike, isAddressable } from "ethers";
import { Command } from ".";

export class Transfer extends Command {
  private to: AddressLike;
  private amount: number;

  public constructor(to: AddressLike, amount: number) {
    super("transfer");
    this.to = to;
    this.amount = amount;
  }

  public validate(): string | null {
    if (!isAddressable(this.to)) {
      return `Provided argument is not addressable: ${this.to}`;
    }

    if (isNaN(this.amount) || this.amount === 0) {
      return `Provided amount is invalid: ${this.amount}`;
    }

    this.isValidArgs = true;
    return null;
  }

  public async exec(): Promise<string> {
    const validationResult: string | null = this.validate();
    if (validationResult) {
      return validationResult;
    }
    // const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY).connect(
    //   provider,
    // );
    // signer.sendTransaction({});

    //     const impersonatedSigner = await ethers.getImpersonatedSigner("0x1234567890123456789012345678901234567890");
    // await impersonatedSigner.sendTransaction(...);
    throw new Error("Not implemented");
  }

  public help(): string {
    return "Transfers specified amount to provided address";
  }
}

