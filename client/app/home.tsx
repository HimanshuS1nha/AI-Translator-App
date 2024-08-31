import { View, Text, Image, TextInput, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { FontAwesome6, Entypo, FontAwesome5 } from "@expo/vector-icons";

const Home = () => {
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View style={tw`flex-row justify-center items-center gap-x-3 pt-2 pb-4`}>
        <Image
          source={require("../assets/images/logo.png")}
          style={tw`w-12 h-12 rounded-full`}
        />
        <Text style={tw`text-2xl font-semibold`}>Translator App</Text>
      </View>

      <View
        style={tw`mt-3 mx-5 bg-purple-200 px-6 py-3 rounded-full flex-row justify-between items-center shadow-lg shadow-gray-700`}
      >
        <Text style={tw`text-lg font-medium`}>English</Text>
        <FontAwesome6 name="arrow-right-arrow-left" size={22} color="black" />
        <Text style={tw`text-lg font-medium`}>Hindi</Text>
      </View>

      <View
        style={tw`mt-8 mx-5 bg-purple-200 p-5 rounded-xl shadow-lg shadow-gray-700 gap-y-4`}
      >
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-lg font-medium`}>English</Text>
          <Entypo name="cross" size={22} color="black" />
        </View>

        <View style={tw`h-24`}>
          <TextInput
            style={tw`max-h-24 text-base`}
            placeholder="Type here..."
            multiline
          />
        </View>

        <View style={tw`items-end`}>
          <Pressable style={tw`bg-orange-600 px-6 py-2.5 rounded-full`}>
            <Text style={tw`text-white text-base`}>Translate</Text>
          </Pressable>
        </View>
      </View>
      <View
        style={tw`mt-8 mx-5 bg-purple-200 p-5 rounded-xl shadow-lg shadow-gray-700 gap-y-4`}
      >
        <Text style={tw`text-lg font-medium`}>Hindi</Text>

        <View style={tw`h-24`}>
          <TextInput
            style={tw`max-h-24 text-base text-black`}
            multiline
            readOnly={true}
          />
        </View>

        <View style={tw`items-end`}>
          <Pressable>
            <FontAwesome5 name="copy" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
