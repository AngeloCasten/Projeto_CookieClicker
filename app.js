// Aula 1 - Configuração inicial e botão de clique

// 1. Criamos um novo projeto Expo com:
//    npx create-expo-app my-cookie-clicker
// 2. Navegamos até a pasta do projeto:
//    cd my-cookie-clicker
// 3. Rodamos o projeto com:
//    npx expo start

// Agora, editamos o arquivo App.js para criar o botão de clique

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  // Criamos um estado para armazenar a quantidade de cookies
  const [cookies, setCookies] = useState(0);

  // Função que será chamada quando o botão for pressionado
  const handleClick = () => {
    setCookies(cookies + 1); // Incrementa a contagem de cookies
  };

  return (
    <View style={styles.container}>
      {/* Exibe a quantidade de cookies na tela */}
      <Text style={styles.text}>Cookies: {cookies}</Text>
      
      {/* Botão para clicar e aumentar os cookies */}
      <TouchableOpacity style={styles.button} onPress={handleClick}>
        <Text style={styles.buttonText}>Clique para ganhar cookies!</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos para os componentes da interface
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff9800',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
