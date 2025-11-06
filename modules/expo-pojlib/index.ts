import { requireNativeModule } from 'expo-modules-core';
import { PojlibModule } from './src/Pojlib.types';

// Export the module
const PojlibModuleProxy = requireNativeModule('PojlibModule');

// Create a proxy that throws helpful errors if the module isn't available
const createModuleProxy = (): PojlibModule => {
  if (!PojlibModuleProxy) {
    // Return a proxy object that throws when methods are called
    return new Proxy({} as PojlibModule, {
      get(_target, prop) {
        throw new Error(
          `PojlibModule is not available. Cannot access '${String(prop)}'. ` +
          'Make sure the native module is properly linked and the app has been rebuilt.'
        );
      }
    });
  }
  return PojlibModuleProxy as PojlibModule;
};

export default createModuleProxy();

// Export types
export type {
  MinecraftAccount, MinecraftInstance,
  MinecraftInstances, PojlibModule, ProjectInfo
} from './src/Pojlib.types';

