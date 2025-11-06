import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Pojlib from "../../modules/expo-pojlib";

export default function HomeScreen() {
  const [supportedVersions, setSupportedVersions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      Pojlib.getQCSupportedVersions()
        .then((versions) => {
          setSupportedVersions(versions);
          setError(null);
        })
        .catch((err) => {
          setError(err?.message || "Failed to load supported versions");
          console.error("Error loading supported versions:", err);
        });
    } catch (err: any) {
      setError(err?.message || "Pojlib module is not available");
      console.error("Error accessing Pojlib module:", err);
    }
  }, []);
  
  return (
    <View>
      {error ? (
        <Text style={{ color: "white" }}>Error: {error}</Text>
      ) : (
        <Text style={{ color: "white" }}>{supportedVersions.length > 0 ? supportedVersions.join(", ") : "Loading..."}</Text>
      )}
    </View>
  );
}