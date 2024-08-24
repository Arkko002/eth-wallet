import { ethers, AddressLike, isAddressable, TransactionReceipt } from "ethers";
import { Command } from ".";

export class Transfer extends Command {
  private to: AddressLike;
  private amount: string;
  private ownerAddress: string = process.env.SIGNER_PRIVATE_KEY!;

  public constructor(to: AddressLike, amount: string) {
    super("transfer");
    this.to = to;
    this.amount = amount;
  }

  public validate(): string | null {
    if (!isAddressable(this.to)) {
      return `Provided argument is not addressable: ${this.to}`;
    }

    if (isNaN(Number(this.amount)) || Number(this.amount) === 0) {
      return `Provided amount is invalid: ${this.amount}`;
    }

    this.isValidArgs = true;
    return null;
  }

  public async exec(): Promise<string> {
    console.log("Starting execution");

    const validationResult: string | null = this.validate();
    if (validationResult) {
      console.log("Validation failed: " + validationResult);
      return validationResult;
    }
    console.log("Validation passed");

    const wallet = new ethers.Wallet(this.ownerAddress);
    console.log("Created wallet for owner address");

    const txData = {
      to: this.to,
      value: ethers.parseEther(this.amount.toString()),
    };

    console.log("Transaction data created:", txData);

    const tx = await wallet.sendTransaction(txData);
    console.log("Transaction sent:", tx);

    const finishedTx: TransactionReceipt | null = await tx.wait();
    if (!finishedTx) {
      throw new Error("Transaction failed");
    }

    console.log("Transaction successful. Tx hash:", finishedTx.hash);
    return `Tx hash: ${finishedTx.hash}`;
  }

  public help(): string {
    return "Transfers specified amount to provided address";
  }
}

