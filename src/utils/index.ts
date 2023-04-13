import {
  BytesLike,
  defaultAbiCoder,
  hexlify,
  keccak256,
} from "ethers/lib/utils";
import { EntryPoint__factory } from "../types/executor/contracts/factories/EntryPoint__factory";
import { UserOperationStruct } from "../types/executor/contracts/EntryPoint";

const UserOpType = (
  EntryPoint__factory.abi.find(
    (entry: any) => entry.name === "simulateValidation"
  ) as any
).inputs?.[0];

function encode(
  typevalues: Array<{ type: string; val: any }>,
  forSignature: boolean
): string {
  const types = typevalues.map((typevalue) =>
    typevalue.type === "bytes" && forSignature ? "bytes32" : typevalue.type
  );
  const values = typevalues.map((typevalue: any) =>
    typevalue.type === "bytes" && forSignature
      ? keccak256(typevalue.val)
      : typevalue.val
  );
  return defaultAbiCoder.encode(types, values);
}

export function packUserOp(
  op: UserOperationStruct,
  forSignature = true
): string {
  if (forSignature) {
    // lighter signature scheme (must match UserOperation#pack): do encode a zero-length signature, but strip afterwards the appended zero-length value
    const userOpType = {
      components: [
        {
          type: "address",
          name: "sender",
        },
        {
          type: "uint256",
          name: "nonce",
        },
        {
          type: "bytes",
          name: "initCode",
        },
        {
          type: "bytes",
          name: "callData",
        },
        {
          type: "uint256",
          name: "callGasLimit",
        },
        {
          type: "uint256",
          name: "verificationGasLimit",
        },
        {
          type: "uint256",
          name: "preVerificationGas",
        },
        {
          type: "uint256",
          name: "maxFeePerGas",
        },
        {
          type: "uint256",
          name: "maxPriorityFeePerGas",
        },
        {
          type: "bytes",
          name: "paymasterAndData",
        },
        {
          type: "bytes",
          name: "signature",
        },
      ],
      name: "userOp",
      type: "tuple",
    };

    let encoded = defaultAbiCoder.encode(
      [userOpType as any],
      [
        {
          ...op,
          signature: "0x",
        },
      ]
    );

    encoded = "0x" + encoded.slice(66, encoded.length - 64);
    return encoded;
  }

  const typevalues = (UserOpType as any).components.map(
    (c: { name: keyof typeof op; type: string }) => ({
      type: c.type,
      val: op[c.name],
    })
  );

  return encode(typevalues, forSignature);
}

/**
 * hexlify all members of object, recursively
 * @param obj
 */
export function deepHexlify(obj: any): any {
  if (typeof obj === "function") {
    return undefined;
  }
  if (obj == null || typeof obj === "string" || typeof obj === "boolean") {
    return obj;
    // eslint-disable-next-line no-underscore-dangle
  } else if (obj._isBigNumber != null || typeof obj !== "object") {
    return hexlify(obj).replace(/^0x0/, "0x");
  }
  if (Array.isArray(obj)) {
    return obj.map((member) => deepHexlify(member));
  }
  return Object.keys(obj).reduce(
    (set, key) => ({
      ...set,
      [key]: deepHexlify(obj[key]),
    }),
    {}
  );
}

export function extractAddrFromInitCode(data?: BytesLike): string | undefined {
  if (data == null) {
    return undefined;
  }
  const str = hexlify(data);
  if (str.length >= 42) {
    return str.slice(0, 42);
  }
  return undefined;
}

export function now(): number {
  return new Date().getTime();
}

export function getAddr(data?: BytesLike): string | undefined {
  if (data == null) {
    return undefined;
  }
  const str = hexlify(data);
  if (str.length >= 42) {
    return str.slice(0, 42);
  }
  return undefined;
}
