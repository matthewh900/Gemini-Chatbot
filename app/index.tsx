import { GoogleGenAI } from "@google/genai";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Index() {
  const [res, setRes] = useState<string | undefined>(""); //change this to array of responses
  const [prompt, setPrompt] = useState<string>("");
  const [pressed, setPressed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const ai = new GoogleGenAI({
  });

  async function main() {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt || "say hello to me",
    });
    setRes(response.text); // make this append response to the end of array
  }

  useEffect(() => {
    setLoading(true);
    main().then(() => {
      setLoading(false);
    });
  }, [pressed]);

  return (
   
      <KeyboardAwareScrollView contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 30,
        paddingBottom: 40,
      }}>
        {/* make this use flatlist using chatbubble to renders item */}
        {loading ? <ActivityIndicator size="large" /> : <Text>{res}</Text>} 
        <TextInput
          onChangeText={setPrompt}
          value={prompt}
          placeholder="Ask me a question"
        />
        <Button title="Enter" onPress={() => setPressed(!pressed)} />
      </KeyboardAwareScrollView>
  );
}
