package expo.modules.pojlib

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.app.Activity

import pojlib.API

class PojlibModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("PojlibModule")

    Function("getQCSupportedVersions") {
      val activity = appContext.currentActivity
      if (activity == null) {
        throw Exception("Activity is not available")
      }
      val versions = API.getQCSupportedVersions(activity)
      return@Function versions.toList()
    }
  }
}