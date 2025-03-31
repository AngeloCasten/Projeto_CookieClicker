// Aula 2 - Adicionando upgrades para aumentar os pontos por clique

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [cookies, setCookies] = useState(0);
  const [clickPower, setClickPower] = useState(1);

  // Função para incrementar os cookies conforme o poder de clique
  const handleClick = () => {
    setCookies(cookies + clickPower);
  };

  // Função para comprar um upgrade e aumentar o poder de clique
  const buyUpgrade = () => {
    if (cookies >= 10) { // Custa 10 cookies para melhorar o clique
      setCookies(cookies - 10);
      setClickPower(clickPower + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cookies: {cookies}</Text>
      <TouchableOpacity style={styles.button} onPress={handleClick}>
        <Text style={styles.buttonText}>Clique para ganhar cookies!</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.upgradeButton} onPress={buyUpgrade}>
        <Text style={styles.buttonText}>Upgrade (+1 por clique) - Custa 10 cookies</Text>
      </TouchableOpacity>
    </View>
  );
}

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
    marginBottom: 10,
  },
  upgradeButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
