import { Image, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { useRoute } from "@react-navigation/native"
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";

const InfoScreen = () => {
  const route = useRoute();
  const data = route.params.data;
  const [resultName, setResultName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState(null);
  const [isError, setIsError] = useState(false);
  
  function predict(data) {
    axios({
      method: "POST",
      url: "https://detect.roboflow.com/k-street-food-scanner/11",
      params: {
        api_key: "Xk1dBd1GnSB7NsJsI2fF"
      },
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(async function(response) {
      let name = JSON.stringify(response.data.predictions[0].class);
      setIsLoading(false);
      setResultName(name);
      const genAI = new GoogleGenerativeAI("AIzaSyCh_rsJNWhFdPeK7ef7nNEBEVHxfSqwOdM");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const res = await model.generateContent(name);
      setDescription(res.response.text());
    })
    .catch(function(error) {
      let errorMsg = error.message;
      console.log(errorMsg);
      setIsError(true);
    });
  };

  predict(data);

  if (isError || (isError==true && isLoading==true)) {
    return (
      <>
        <View style={{flex: 3}}></View>
        <Text style={styles.text}>An Error occured while I'm thinking{"\n"}Please try again</Text>
        <Text style={{textAlign: "center", flex: 3, color: "#f72900"}}>(Maybe you should check internet connection)</Text>
      </>
    );
  } else if (isLoading && isError==false){
      return (
      <>
        <ActivityIndicator size="large" animating={true} color="#108de6" style={styles.loading} />
        <Text style={styles.text}>
          I'm thinking......
          Please wait
        </Text>
      </>
    );
    
  }
  else if (isError==false && isLoading==false) {
    return (
      <>
        <Image/>
        <View style={styles.container}>
          <Text style={styles.title}>{resultName==null ? "NO FOOD DETECTED" :  resultName.replace(/\"/gi, "")}</Text>
        </View>
        <Text>{description}</Text>
      </>
    );
  }
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
