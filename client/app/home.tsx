import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ToastAndroid,
  Platform,
  Alert,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { FontAwesome6, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import * as SecureStore from "expo-secure-store";
import * as Clipboard from "expo-clipboard";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { languages } from "@/constants/languages";

const Home = () => {
  const [fromLanguage, setFromLanguage] = useState(
    SecureStore.getItem("from-language") ?? "English"
  );
  const [toLanguage, setToLanguage] = useState(
    SecureStore.getItem("to-language") ?? "Hindi"
  );
  const [actualText, setActualText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const switchLanguages = useCallback(() => {
    const tempLanguage = toLanguage;
    SecureStore.setItem("to-language", fromLanguage);
    SecureStore.setItem("from-language", tempLanguage);
    setToLanguage(fromLanguage);
    setFromLanguage(tempLanguage);
    setTranslatedText("");
    setActualText("");
  }, [fromLanguage, toLanguage, actualText, translatedText]);

  const handleChangeText = useCallback(
    (value: string) => setActualText(value),
    []
  );

  const handleLanguageChange = useCallback(
    (type: "from" | "to", value: string) => {
      if (type === "from") {
        SecureStore.setItem("from-language", value);
        setFromLanguage(value);
      } else if (type === "to") {
        SecureStore.setItem("to-language", value);
        setToLanguage(value);
      }

      setActualText("");
      setTranslatedText("");
    },
    []
  );

  const handleCopyToClipboard = useCallback(async () => {
    if (translatedText === "") {
      await Clipboard.setStringAsync(translatedText);
      if (Platform.OS === "android") {
        ToastAndroid.show("Copied to clipboard", ToastAndroid.SHORT);
      } else {
        Alert.alert("Copied to clipboard");
      }
    }
  }, [translatedText]);

  const clearInput = useCallback(() => setActualText(""), []);
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
          <Dropdown
            style={tw`w-full`}
            selectedTextStyle={tw`text-lg font-medium`}
            data={languages}
            labelField={"label"}
            valueField={"value"}
            iconStyle={tw`hidden`}
            value={fromLanguage}
            onChange={(item) => handleLanguageChange("from", item.value)}
          />
        </View>
        <Pressable onPress={switchLanguages}>
          <FontAwesome6 name="arrow-right-arrow-left" size={22} color="black" />
        </Pressable>
        <View style={tw`w-[130px] items-end`}>
          <Dropdown
            style={tw`w-full`}
            selectedTextStyle={tw`text-lg font-medium absolute right-0`}
            iconStyle={tw`hidden`}
            data={languages}
            labelField={"label"}
            valueField={"value"}
            value={toLanguage}
            onChange={(item) => handleLanguageChange("to", item.value)}
          />
        </View>
      </View>

      <View
        style={tw`mt-8 mx-5 bg-purple-200 p-5 rounded-xl shadow-lg shadow-gray-700 gap-y-4`}
      >
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-lg font-medium`}>{fromLanguage}</Text>
          <Pressable onPress={clearInput}>
            <Entypo name="cross" size={22} color="black" />
          </Pressable>
        </View>

        <View style={tw`h-24`}>
          <TextInput
            style={tw`max-h-24 text-base`}
            placeholder="Type here..."
            multiline
            value={actualText}
            onChangeText={handleChangeText}
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
          <Pressable onPress={handleCopyToClipboard}>
            <FontAwesome5 name="copy" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
