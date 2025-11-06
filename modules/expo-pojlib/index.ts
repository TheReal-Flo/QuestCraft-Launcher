import { requireNativeModule } from 'expo-modules-core';
import { PojlibModule } from './src/Pojlib.types';

// Export the module
// requireNativeModule throws if the module isn't available, so we catch and provide a helpful proxy
let PojlibModuleProxy: PojlibModule;
try {
  PojlibModuleProxy = requireNativeModule('PojlibModule') as PojlibModule;
} catch (error) {
  // Return a proxy object that throws when methods are called
  PojlibModuleProxy = new Proxy({} as PojlibModule, {
    get(_target, prop) {
      throw new Error(
        `PojlibModule is not available. Cannot access '${String(prop)}'. ` +
        'Make sure the native module is properly linked and the app has been rebuilt. ' +
        `Original error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  });
}

export default PojlibModuleProxy;

// Export types
export type {
  MinecraftAccount, MinecraftInstance,
  MinecraftInstances, PojlibModule, ProjectInfo
} from './src/Pojlib.types';

