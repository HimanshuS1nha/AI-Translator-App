import { View, Text, Image, TextInput, Pressable } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { FontAwesome6, Entypo, FontAwesome5 } from "@expo/vector-icons";

const Home = () => {
  const [fromLanguage, setFromLanguage] = useState("English");
  const [toLanguage, setToLanguage] = useState("Hindi");
  const [actualText, setActualText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const switchLanguages = useCallback(() => {
    const tempLanguage = toLanguage;
    const tempText = translatedText;
    setToLanguage(fromLanguage);
    setFromLanguage(tempLanguage);
    setTranslatedText(actualText);
    setActualText(tempText);
  }, [fromLanguage, toLanguage, actualText, translatedText]);
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
        <View style={tw`w-[130px] items-start`}>
          <Text style={tw`text-lg font-medium`}>{fromLanguage}</Text>
        </View>
        <Pressable onPress={switchLanguages}>
          <FontAwesome6 name="arrow-right-arrow-left" size={22} color="black" />
        </Pressable>
        <View style={tw`w-[130px] items-end`}>
          <Text style={tw`text-lg font-medium`}>{toLanguage}</Text>
        </View>
      </View>

      <View
        style={tw`mt-8 mx-5 bg-purple-200 p-5 rounded-xl shadow-lg shadow-gray-700 gap-y-4`}
      >
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-lg font-medium`}>{fromLanguage}</Text>
          <Entypo name="cross" size={22} color="black" />
        </View>

        <View style={tw`h-24`}>
          <TextInput
            style={tw`max-h-24 text-base`}
            placeholder="Type here..."
            multiline
            value={actualText}
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
        <Text style={tw`text-lg font-medium`}>{toLanguage}</Text>

        <View style={tw`h-24`}>
          <TextInput
            style={tw`max-h-24 text-base text-black`}
            multiline
            readOnly={true}
            value={translatedText}
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
