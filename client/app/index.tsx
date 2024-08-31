import { Text, View, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    const timeout = setTimeout(() => router.replace("/home"), 450);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <SafeAreaView
      style={tw`flex-1 items-center justify-center gap-y-12 bg-gray-100`}
    >
      <View style={tw`gap-y-4 items-center`}>
        <Image
          source={require("../assets/images/logo.png")}
          style={tw`w-36 h-36 rounded-full`}
        />
        <Text style={tw`font-bold text-3xl`}>Translator App</Text>
      </View>
      <ActivityIndicator size={45} color={"green"} />
    </SafeAreaView>
  );
}
