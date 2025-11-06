import { NativeModulesProxy } from 'expo-modules-core';
import { PojlibModule } from './src/Pojlib.types';

// Export the module
export default NativeModulesProxy.PojlibModule as PojlibModule;

// Export types
export type {
  MinecraftAccount, MinecraftInstance,
  MinecraftInstances, PojlibModule, ProjectInfo
} from './src/Pojlib.types';

