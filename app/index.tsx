import { GoogleGenAI } from "@google/genai";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function Index() {
  const [res, setRes] = useState<string | undefined>("")
  const [prompt, setPrompt] = useState<string>("")
  const [pressed, setPressed] = useState<boolean>(false)
  
  const ai = new GoogleGenAI({})

  async function main() {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt || "say hello to me",
    });
    setRes(response.text);
  }

  useEffect(() => {
    main()
  }, [pressed])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{res}</Text>
      <TextInput
      onChangeText={setPrompt}
      value={prompt}
      placeholder="Ask me a question"
      />
      <Button
      title="Enter"
      onPress={() => setPressed}
      />
    </View>
  );
}
