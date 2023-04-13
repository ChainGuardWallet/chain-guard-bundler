import { BigNumberish, providers } from "ethers";
import { UserOperationStruct } from "../executor/contracts/EntryPoint";

export type EstimatedUserOperationGas = {
  preVerificationGas: BigNumberish;
  callGasLimit: BigNumberish;
  verificationGas: BigNumberish;
  deadline?: BigNumberish;
};

export type UserOperationByHashResponse = {
  userOperation: UserOperationStruct;
  entryPoint: string;
  blockNumber: number;
  blockHash: string;
  transactionHash: string;
};

export type UserOperationReceipt = {
  userOpHash: string;
  sender: string;
  nonce: BigNumberish;
  paymaster?: string;
  actualGasCost: BigNumberish;
  actualGasUsed: BigNumberish;
  success: boolean;
  reason?: string;
  logs: any[];
  receipt: providers.TransactionReceipt;
};

export type SupportedEntryPoint = string[];

export type EthChainIdResponse = { chainId: number };

export type BundlingMode = "auto" | "manual";

export interface ServerConfig {
  enableRequestLogging: boolean;
  port: number;
  host: string;
}
