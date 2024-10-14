import { Image, Text, StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { useRoute } from "@react-navigation/native";
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Markdown from 'react-native-markdown-display';

const InfoScreen = () => {
  const route = useRoute();
  const data = route.params.data;
  const [resultName, setResultName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState("No Food Detected");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const predict = async (data) => {
      try {
        const response = await axios.post("https://detect.roboflow.com/k-street-food-scanner/11", data, {
          params: { api_key: "Xk1dBd1GnSB7NsJsI2fF" },
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });
        const name = response.data.predictions[0].class;
        setResultName(name);
        const geminiResponse = await gemini(name);
        setDescription(geminiResponse);
      } catch (error) {
        console.log(error.message);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    predict(data);
  }, [data]);

  const gemini = async (name) => {
    const genAI = new GoogleGenerativeAI("AIzaSyCh_rsJNWhFdPeK7ef7nNEBEVHxfSqwOdM");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const res = await model.generateContent(name);
    return res.response.text();
  };

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={styles.text}>An error occurred while I'm thinking{"\n"}Please try again</Text>
        <Text style={{ textAlign: "center", color: "#f72900" }}>(Maybe you should check your internet connection)</Text>
      </View>
    );
  } 

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#108de6" style={styles.loading} />
        <Text style={styles.text}>I'm thinking...... Please wait</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{ uri: 'your_image_url' }} style={styles.image} />
        <Text style={styles.title}>{resultName || "NO FOOD DETECTED"}</Text>
        <Markdown>{description}</Markdown>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    textTransform: 'uppercase'
  },
  loading: {
    flex: 5,
    transform: [{ scaleX: 2.3 }, { scaleY: 2.3 }]
  },
  text: {
    flex: 3,
    fontSize: 20,
    textAlign: 'center',
  }
});

export default InfoScreen;
