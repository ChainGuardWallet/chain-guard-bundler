import { BytesLike, BigNumberish } from "ethers";
import { UserOperationStruct } from "../types/executor/contracts/EntryPoint";

export interface IMempoolEntry {
  chainId: number;
  userOp: UserOperationStruct;
  entryPoint: string;
  prefund: BigNumberish;
  aggregator?: string;
  hash?: string;
}

export interface MempoolEntrySerialized {
  chainId: number;
  userOp: {
    sender: string;
    nonce: string;
    initCode: BytesLike;
    callData: BytesLike;
    callGasLimit: string;
    verificationGasLimit: string;
    preVerificationGas: string;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
    paymasterAndData: BytesLike;
    signature: BytesLike;
  };
  prefund: string;
  aggregator: string | undefined;
  hash: string | undefined;
}

export interface IReputationEntry {
  chainId: number;
  address: string;
  lastUpdateTime: number;
  opsSeen: number;
  opsIncluded: number;
}

export type ReputationEntryDump = Omit<
  IReputationEntry,
  "chainId" | "lastUpdateTime"
> & { status: string };

export type ReputationEntrySerialized = Omit<
  IReputationEntry,
  "address" | "chainId"
>;

export enum ReputationStatus {
  OK = "ok",
  THROTTLED = "throttled",
  BANNED = "banned",
}
