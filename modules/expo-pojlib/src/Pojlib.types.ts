export interface ProjectInfo {
    slug: string;
    fileName?: string;
    version: string;
    type: string;
    download_link: string;
  }
  
  export interface MinecraftInstance {
    instanceName: string;
    instanceImageURL?: string;
    versionName: string;
    versionType?: string;
    classpath?: string;
    gameDir: string;
    assetIndex?: string;
    assetsDir?: string;
    mainClass?: string;
    extProjects: ProjectInfo[];
    defaultMods: boolean;
  }
  
  export interface MinecraftInstances {
    instances: MinecraftInstance[];
  }
  
  export interface MinecraftAccount {
    accessToken: string;
    uuid: string;
    username: string;
    isDemoMode: boolean;
    expiresOn: number;
    userType: string;
  }
  
  export interface PojlibModule {
    /**
     * Loads all instances from the filesystem.
     * @returns A minecraft instances object containing all instances
     * @throws {Error} If loading fails
     */
    loadAll(): Promise<MinecraftInstances>;
  
    /**
     * Load a specific instance by name
     * @param instances - Acquired from loadAll()
     * @param name - Name of the instance
     * @returns The instance, or null if an instance with name does not exist
     */
    load(instances: MinecraftInstances, name: string): Promise<MinecraftInstance | null>;
  
    /**
     * Creates a new game instance with a selected mod loader. The latest version of the mod loader will be installed
     * @param instances - Acquired from loadAll()
     * @param instanceName - The name of the instance being created - can be anything, used for identification
     * @param useDefaultMods - Use QC's default mods for the version (Core mods are automatically included)
     * @param minecraftVersion - The version of minecraft to install
     * @param modLoader - The mod loader to use (e.g., "Fabric", "Quilt", "Forge", "NeoForge")
     * @param imageURL - Modpack image url, nullable
     * @returns A minecraft instance object
     * @throws {Error} If download of library or asset fails
     */
    createNewInstance(
      instances: MinecraftInstances,
      instanceName: string,
      useDefaultMods: boolean,
      minecraftVersion: string,
      modLoader: string,
      imageURL?: string
    ): Promise<MinecraftInstance>;
  
    /**
     * Creates a new game instance from a mrpack file.
     * @param instances - Acquired from loadAll()
     * @param instanceName - The name of the instance being created - can be anything, used for identification
     * @param imageURL - Modpack image url, nullable
     * @param modLoader - The mod loader to use
     * @param mrpackFile - Path to the mrpack file
     * @returns A minecraft instance object
     * @throws {Error} If download of library or asset fails
     */
    createNewInstanceFromModpack(
      instances: MinecraftInstances,
      instanceName: string,
      imageURL: string | null,
      modLoader: string,
      mrpackFile: string
    ): Promise<MinecraftInstance>;
  
    /**
     * Delete an instance
     * NOTE: Only deletes the instance, not the correlated mods for said instance
     * @param instances - Acquired from loadAll()
     * @param instance - Instance object
     * @returns True if it deletes successfully, false otherwise.
     * @throws {Error} If deletion fails
     */
    deleteInstance(instances: MinecraftInstances, instance: MinecraftInstance): Promise<boolean>;
  
    /**
     * Add a mod to an instance
     * @param instances - Acquired from loadAll()
     * @param instance - Acquired from createNewInstance() or load()
     * @param name - Project name
     * @param fileName - File name
     * @param version - Project version
     * @param url - Mod download URL
     * @param type - Project type (e.g., "mod", "resourcepack")
     */
    addExtraProject(
      instances: MinecraftInstances,
      instance: MinecraftInstance,
      name: string,
      fileName: string,
      version: string,
      url: string,
      type: string
    ): Promise<void>;
  
    /**
     * Check if an instance has a mod
     * @param instance - Acquired from createNewInstance() or load()
     * @param name - Project name
     * @returns True if the project is already in the instance
     */
    hasExtraProject(instance: MinecraftInstance, name: string): Promise<boolean>;
  
    /**
     * Remove a mod from an instance
     * @param instances - Acquired from loadAll()
     * @param instance - Acquired from createNewInstance() or load()
     * @param name - Project name
     * @returns True if the project was deleted
     */
    removeExtraProject(
      instances: MinecraftInstances,
      instance: MinecraftInstance,
      name: string
    ): Promise<boolean>;
  
    /**
     * Check if downloads are completed
     * @returns True if all downloads are completed
     */
    isDownloadsCompleted(): Promise<boolean>;
  
    /**
     * Get download progress percentage
     * @returns Download percentage (0.0 to 100.0)
     */
    getDownloadPercentage(): Promise<number>;
  
    /**
     * Update the mods for the selected instance and prepare for launch
     * @param instances - Acquired from loadAll()
     * @param instance - The instance to update
     */
    prelaunch(instances: MinecraftInstances, instance: MinecraftInstance): Promise<void>;
  
    /**
     * Launch an instance
     * @param account - Account object
     * @param instance - Instance object from createNewInstance() or load()
     */
    launchInstance(account: MinecraftAccount, instance: MinecraftInstance): Promise<void>;
  
    /**
     * Kill the current instance and restart the launcher
     */
    restartLauncher(): Promise<void>;
  
    /**
     * Start the login process
     * @param accountUUID - Optional UUID of account to load. If null, starts new login flow.
     */
    login(accountUUID?: string | null): Promise<void>;
  
    /**
     * Removes the user account
     * @param uuid - The uuid of the profile to remove
     * @returns True if removal was successful
     */
    removeAccount(uuid: string): Promise<boolean>;
  
    /**
     * Check if the device has a valid wifi connection
     * @returns True if the device has a valid wifi connection
     */
    hasConnection(): Promise<boolean>;
  
    /**
     * Get supported Minecraft versions
     * @returns Array of supported version strings
     */
    getQCSupportedVersions(): Promise<string[]>;
  
    // Properties
    msaMessage: string;
    model: string;
    ignoreInstanceName: boolean;
    customRAMValue: boolean;
    profileImage?: string;
    profileName?: string;
    profileUUID?: string;
    memoryValue: string;
    developerMods: boolean;
    isDemoMode: boolean;
    advancedDebugger: boolean;
    gameReady: boolean;
    currentAccount?: MinecraftAccount;
    currentInstance?: MinecraftInstance;
  }
  
  