import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import axios from "axios";

export default function App() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {

    if (message.trim() === "") return;

    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: "user"
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");

    try {

      const res = await axios.post(
        "http://localhost:3000/chat",
        { prompt: message }
      );

      const botMessage = {
        id: Date.now().toString(),
        text: res.data.reply,
        sender: "bot"
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {

      const errorMessage = {
        id: Date.now().toString(),
        text: "Error connecting to server",
        sender: "bot"
      };

      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>AI Chatbot</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={item.sender === "user" ? styles.user : styles.bot}>
            <Text>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputArea}>

        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />

        <Button title="Send" onPress={sendMessage} />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    marginTop: 40
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10
  },

  user: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5
  },

  bot: {
    alignSelf: "flex-start",
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5
  },

  inputArea: {
    flexDirection: "row",
    marginTop: 10
  },

  input: {
    flex: 1,
    borderWidth: 1,
    padding: 8,
    marginRight: 10,
    borderRadius: 8
  }

});