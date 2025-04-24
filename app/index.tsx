import { GoogleGenAI } from "@google/genai";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Text, TextInput, View } from "react-native";

export default function Index() {
  const [res, setRes] = useState<string | undefined>("")
  const [prompt, setPrompt] = useState<string>("")
  const [pressed, setPressed] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  
  const ai = new GoogleGenAI({apiKey: "AIzaSyAurfcK_crrwAWP9uoj2HtmASLlHJOXnAg"})

  async function main() {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt || "say hello to me",
    });
    setRes(response.text);
  }

  useEffect(() => {
    setLoading(true)
    main().then(() => {
      setLoading(false)
    })
  }, [pressed])

  if (loading){
    return (
      <ActivityIndicator size="large"/>
    )
  }

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
      onPress={() => setPressed(!pressed)}
      />
    </View>
  );
}
