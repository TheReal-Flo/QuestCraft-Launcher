import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Pojlib from "../../modules/expo-pojlib";

export default function HomeScreen() {
  const [supportedVersions, setSupportedVersions] = useState<string[]>([]);

  useEffect(() => {
    Pojlib.getQCSupportedVersions().then((versions) => {
      setSupportedVersions(versions);
    });
  }, []);
  
  return (
    <View>
        <Text>{supportedVersions.join(", ")}</Text>
    </View>
  );
}