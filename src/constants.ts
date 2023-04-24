export const CustomRPCMethods = {
  eth_validateUserOperation: "eth_validateUserOperation",
};

export const BundlerRPCMethods = {
  eth_chainId: "eth_chainId",
  eth_supportedEntryPoints: "eth_supportedEntryPoints",
  eth_sendUserOperation: "eth_sendUserOperation",
  eth_estimateUserOperationGas: "eth_estimateUserOperationGas",
  eth_getUserOperationReceipt: "eth_getUserOperationReceipt",
  eth_getUserOperationByHash: "eth_getUserOperationByHash",
  debug_bundler_clearState: "debug_bundler_clearState",
  debug_bundler_dumpMempool: "debug_bundler_dumpMempool",
  debug_bundler_setReputation: "debug_bundler_setReputation",
  debug_bundler_dumpReputation: "debug_bundler_dumpReputation",
  debug_bundler_setBundlingMode: "debug_bundler_setBundlingMode",
  debug_bundler_setBundleInterval: "debug_bundler_setBundleInterval",
  debug_bundler_sendBundleNow: "debug_bundler_sendBundleNow",
};
