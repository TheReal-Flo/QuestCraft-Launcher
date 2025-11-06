# Pojlib API Reference - Functions and Properties to Implement

This document lists all functions and properties from `pojlib.API` that need to be exposed in the Expo module.

## Properties (Public Static Fields)

All properties are `public static` and should be exposed as Expo Properties with getters and setters:

1. **`msaMessage`** - `String`
   - Default: `""`
   - Description: Microsoft account login message

2. **`model`** - `String`
   - Default: `"Quest"`
   - Description: Device model identifier

3. **`ignoreInstanceName`** - `boolean`
   - Default: `false`
   - Description: Whether to ignore instance name validation

4. **`customRAMValue`** - `boolean`
   - Default: `false`
   - Description: Whether custom RAM value is set

5. **`profileImage`** - `String` (nullable)
   - Description: URL to user's profile/skin image

6. **`profileName`** - `String` (nullable)
   - Description: Username/profile name

7. **`profileUUID`** - `String` (nullable)
   - Description: User's UUID

8. **`memoryValue`** - `String`
   - Default: `"1800"`
   - Description: Memory allocation value in MB

9. **`developerMods`** - `boolean`
   - Default: `false`
   - Description: Whether to use developer mods

10. **`isDemoMode`** - `boolean`
    - Default: `false`
    - Description: Whether running in demo mode

11. **`advancedDebugger`** - `boolean`
    - Default: `false`
    - Description: Whether advanced debugging is enabled

12. **`gameReady`** - `boolean`
    - Default: `false`
    - Description: Whether the game is ready to launch

13. **`currentAcc`** - `MinecraftAccount` (nullable)
    - Description: Currently logged in account (read-only recommended)
    - Note: This is an object, needs conversion to/from Map/Record

14. **`currentInstance`** - `MinecraftInstances.Instance` (nullable)
    - Description: Currently active instance (read-only recommended)
    - Note: This is an object, needs conversion to/from Map/Record

---

## Functions (Public Static Methods)

### Instance Management

#### 1. `loadAll()`
- **Return Type:** `MinecraftInstances`
- **Throws:** `IOException`
- **Description:** Loads all instances from the filesystem
- **Parameters:** None
- **Notes:** Returns a `MinecraftInstances` object containing all instances

#### 2. `load(MinecraftInstances instances, String name)`
- **Return Type:** `MinecraftInstances.Instance` (nullable)
- **Throws:** None
- **Description:** Load a specific instance by name
- **Parameters:**
  - `instances`: `MinecraftInstances` - Acquired from `loadAll()`
  - `name`: `String` - Name of the instance
- **Notes:** Returns `null` if instance doesn't exist

#### 3. `createNewInstance(Activity activity, MinecraftInstances instances, String instanceName, boolean useDefaultMods, String minecraftVersion, String modLoader, String imageURL)`
- **Return Type:** `MinecraftInstances.Instance`
- **Throws:** `IOException`
- **Description:** Creates a new game instance with a selected mod loader
- **Parameters:**
  - `activity`: `Activity` - The active Android activity
  - `instances`: `MinecraftInstances` - Acquired from `loadAll()`
  - `instanceName`: `String` - Name of the instance (used for identification)
  - `useDefaultMods`: `boolean` - Use QC's default mods (core mods automatically included)
  - `minecraftVersion`: `String` - Minecraft version to install (e.g., "1.21.4")
  - `modLoader`: `String` - Mod loader type ("Fabric", "Quilt", "Forge", "NeoForge")
  - `imageURL`: `String` (nullable) - Modpack image URL
- **Notes:** Installs latest version of the mod loader. May take time (async recommended).

#### 4. `createNewInstance(Activity activity, MinecraftInstances instances, String instanceName, String imageURL, String modLoader, String mrpackFile)`
- **Return Type:** `MinecraftInstances.Instance`
- **Throws:** `IOException`
- **Description:** Creates a new game instance from a mrpack (Modrinth modpack) file
- **Parameters:**
  - `activity`: `Activity` - The active Android activity
  - `instances`: `MinecraftInstances` - Acquired from `loadAll()`
  - `instanceName`: `String` - Name of the instance
  - `imageURL`: `String` (nullable) - Modpack image URL
  - `modLoader`: `String` - Mod loader type
  - `mrpackFile`: `String` - Path to the .mrpack file
- **Notes:** Overloaded method. Validates instance name (no "/" or "!") unless `ignoreInstanceName` is true.

#### 5. `deleteInstance(MinecraftInstances instances, MinecraftInstances.Instance instance)`
- **Return Type:** `boolean`
- **Throws:** `IOException`
- **Description:** Delete an instance
- **Parameters:**
  - `instances`: `MinecraftInstances` - Acquired from `loadAll()`
  - `instance`: `MinecraftInstances.Instance` - Instance object to delete
- **Notes:** Only deletes the instance, not correlated mods. Returns `true` if successful.

---

### Mod/Project Management

#### 6. `addExtraProject(MinecraftInstances instances, MinecraftInstances.Instance instance, String name, String fileName, String version, String url, String type)`
- **Return Type:** `void`
- **Throws:** None
- **Description:** Add a mod/resourcepack to an instance
- **Parameters:**
  - `instances`: `MinecraftInstances` - Acquired from `loadAll()`
  - `instance`: `MinecraftInstances.Instance` - Instance to add mod to
  - `name`: `String` - Project name/slug
  - `fileName`: `String` - File name (can be null for legacy mods)
  - `version`: `String` - Project version
  - `url`: `String` - Download URL
  - `type`: `String` - Project type ("mod" or "resourcepack")

#### 7. `hasExtraProject(MinecraftInstances.Instance instance, String name)`
- **Return Type:** `boolean`
- **Throws:** None
- **Description:** Check if an instance has a mod/resourcepack
- **Parameters:**
  - `instance`: `MinecraftInstances.Instance` - Instance to check
  - `name`: `String` - Project name/slug
- **Notes:** Returns `true` if project exists in instance

#### 8. `removeExtraProject(MinecraftInstances instances, MinecraftInstances.Instance instance, String name)`
- **Return Type:** `boolean`
- **Throws:** None
- **Description:** Remove a mod/resourcepack from an instance
- **Parameters:**
  - `instances`: `MinecraftInstances` - Acquired from `loadAll()`
  - `instance`: `MinecraftInstances.Instance` - Instance to remove mod from
  - `name`: `String` - Project name/slug
- **Notes:** Returns `true` if project was deleted. Cannot remove core mods.

---

### Download Management

#### 9. `isDownloadsCompleted()`
- **Return Type:** `boolean`
- **Throws:** None
- **Description:** Check if all downloads are completed
- **Parameters:** None
- **Notes:** Used to track download progress

#### 10. `getDownloadPercentage()`
- **Return Type:** `float`
- **Throws:** None
- **Description:** Get download progress percentage
- **Parameters:** None
- **Notes:** Returns value between 0.0 and 100.0

---

### Launch Functions

#### 11. `prelaunch(Activity activity, MinecraftInstances instances, MinecraftInstances.Instance instance)`
- **Return Type:** `void`
- **Throws:** None
- **Description:** Update mods for the selected instance and prepare for launch
- **Parameters:**
  - `activity`: `Activity` - Android activity
  - `instances`: `MinecraftInstances` - Acquired from `loadAll()`
  - `instance`: `MinecraftInstances.Instance` - Instance to prepare
- **Notes:** 
  - Sets `gameReady = false`
  - Updates mods
  - Performs prelaunch checks if connection available
  - Resets download manager
  - Modifies Vivecraft config if present

#### 12. `launchInstance(Activity activity, MinecraftAccount account, MinecraftInstances.Instance instance)`
- **Return Type:** `void`
- **Throws:** None
- **Description:** Launch a Minecraft instance
- **Parameters:**
  - `activity`: `Activity` - Android activity
  - `account`: `MinecraftAccount` - Account to launch with
  - `instance`: `MinecraftInstances.Instance` - Instance to launch
- **Notes:** Actually starts the game. Should be called after `prelaunch()`.

#### 13. `restartLauncher(Activity activity)`
- **Return Type:** `void`
- **Throws:** None
- **Description:** Kill the current instance and restart the launcher
- **Parameters:**
  - `activity`: `Activity` - Android activity
- **Notes:** Restarts Unity session (QuestCraft specific)

---

### Account Management

#### 14. `login(Activity activity, String accountUUID)`
- **Return Type:** `void`
- **Throws:** None
- **Description:** Start the login process or load existing account
- **Parameters:**
  - `activity`: `Activity` - Android activity
  - `accountUUID`: `String` (nullable) - UUID of account to load, or `null` for new login
- **Notes:** 
  - If `accountUUID` is `null`, starts new login flow
  - If account exists and is valid, loads it
  - If account expired, attempts refresh
  - Updates `profileImage`, `profileName`, `profileUUID`, `isDemoMode`, and `currentAcc`

#### 15. `removeAccount(Activity activity, String uuid)`
- **Return Type:** `boolean`
- **Throws:** None
- **Description:** Remove a user account
- **Parameters:**
  - `activity`: `Activity` - Android activity
  - `uuid`: `String` - UUID of the profile to remove
- **Notes:** 
  - Clears `currentAcc` if it matches
  - Returns `true` if removal was successful

---

### Utility Functions

#### 16. `hasConnection(Context activity)`
- **Return Type:** `boolean`
- **Throws:** None
- **Description:** Check if device has valid WiFi connection
- **Parameters:**
  - `activity`: `Context` - Android context (Activity extends Context)
- **Notes:** 
  - Checks for WiFi transport
  - Tests connection to Mojang servers
  - Returns `true` if both conditions met

#### 17. `getQCSupportedVersions(Activity ctx)`
- **Return Type:** `String[]`
- **Throws:** None
- **Description:** Get supported Minecraft versions for QuestCraft
- **Parameters:**
  - `ctx`: `Activity` - Android activity/context
- **Notes:** 
  - Downloads supported versions list if online
  - Returns cached list if offline
  - Defaults to `["1.21.4"]` if file doesn't exist

---

## Data Types to Convert

### `MinecraftInstances`
```java
public class MinecraftInstances {
    public Instance[] instances;
    
    public Instance load(String name);
    public Instance[] toArray();
}
```

### `MinecraftInstances.Instance`
```java
public static class Instance {
    public String instanceName;
    public String instanceImageURL;
    public String versionName;
    public String versionType;
    public String classpath;
    public String gameDir;
    public String assetIndex;
    public String assetsDir;
    public String mainClass;
    public ProjectInfo[] extProjects;
    public boolean defaultMods;
}
```

### `MinecraftAccount`
```java
public class MinecraftAccount {
    public String accessToken;
    public String uuid;
    public String username;
    public boolean isDemoMode;
    public long expiresOn;
    public final String userType = "msa";
}
```

### `ProjectInfo`
```java
public class ProjectInfo {
    public String slug;
    public String fileName;
    public String version;
    public String type = "mod";
    public String download_link;
}
```

---

## Implementation Notes

1. **Activity/Context Access**: Functions requiring `Activity` should use Expo's `appContext.currentActivity` instead of requiring it as a parameter.

2. **Async Operations**: Many functions (especially `createNewInstance`, `loadAll`, `prelaunch`) perform I/O operations and should be async.

3. **Error Handling**: Functions that throw `IOException` should be wrapped in try-catch and converted to Expo exceptions.

4. **Type Conversion**: All Java objects (`MinecraftInstances`, `MinecraftAccount`, etc.) need to be converted to/from Maps or Records for Expo bridge.

5. **Nullable Types**: Many `String` parameters and return values can be `null` - handle accordingly.

6. **Thread Safety**: Consider using `Dispatchers.IO` for file operations and `Queues.MAIN` for Activity interactions.

---

## Function Summary Table

| # | Function Name | Return Type | Needs Activity | Throws Exception | Async Recommended |
|---|---------------|-------------|----------------|------------------|-------------------|
| 1 | `loadAll` | `MinecraftInstances` | No | `IOException` | Yes |
| 2 | `load` | `MinecraftInstances.Instance?` | No | No | No |
| 3 | `createNewInstance` (version) | `MinecraftInstances.Instance` | Yes | `IOException` | Yes |
| 4 | `createNewInstance` (modpack) | `MinecraftInstances.Instance` | Yes | `IOException` | Yes |
| 5 | `deleteInstance` | `boolean` | No | `IOException` | Yes |
| 6 | `addExtraProject` | `void` | No | No | Yes |
| 7 | `hasExtraProject` | `boolean` | No | No | No |
| 8 | `removeExtraProject` | `boolean` | No | No | Yes |
| 9 | `isDownloadsCompleted` | `boolean` | No | No | No |
| 10 | `getDownloadPercentage` | `float` | No | No | No |
| 11 | `prelaunch` | `void` | Yes | No | Yes |
| 12 | `launchInstance` | `void` | Yes | No | Yes |
| 13 | `restartLauncher` | `void` | Yes | No | Yes |
| 14 | `login` | `void` | Yes | No | Yes |
| 15 | `removeAccount` | `boolean` | Yes | No | Yes |
| 16 | `hasConnection` | `boolean` | Yes | No | No |
| 17 | `getQCSupportedVersions` | `String[]` | Yes | No | Yes |

---

## Properties Summary Table

| Property Name | Type | Default | Read/Write | Notes |
|--------------|------|---------|------------|-------|
| `msaMessage` | `String` | `""` | R/W | |
| `model` | `String` | `"Quest"` | R/W | |
| `ignoreInstanceName` | `boolean` | `false` | R/W | |
| `customRAMValue` | `boolean` | `false` | R/W | |
| `profileImage` | `String?` | `null` | R/W | |
| `profileName` | `String?` | `null` | R/W | |
| `profileUUID` | `String?` | `null` | R/W | |
| `memoryValue` | `String` | `"1800"` | R/W | |
| `developerMods` | `boolean` | `false` | R/W | |
| `isDemoMode` | `boolean` | `false` | R/W | |
| `advancedDebugger` | `boolean` | `false` | R/W | |
| `gameReady` | `boolean` | `false` | R/W | |
| `currentAcc` | `MinecraftAccount?` | `null` | Read-only | Object type |
| `currentInstance` | `Instance?` | `null` | Read-only | Object type |

