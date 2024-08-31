import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const Home = () => {
  return (
    <SafeAreaView style={tw`bg-gray-100 flex-1`}>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;
