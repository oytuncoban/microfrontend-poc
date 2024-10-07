import type { FederationRuntimePlugin } from "@module-federation/enhanced/runtime";

const sharedStrategy: () => FederationRuntimePlugin = () => ({
  name: "shared-strategy-plugin",
  beforeInit(args) {
    args.userOptions.shareStrategy = "loaded-first";
    return args;
  },
});

export default sharedStrategy;
