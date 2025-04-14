// Aula 3 - Adicionando Auto-Clicker (ganha cookies automaticamente a cada segundo)

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [cookies, setCookies] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);

  // Clique manual
  const handleClick = () => {
    setCookies(cookies + clickPower);
  };

  // Upgrade de clique manual
  const buyUpgrade = () => {
    if (cookies >= 10) {
      setCookies(cookies - 10);
      setClickPower(clickPower + 1);
    }
  };

  // Compra de auto-clicker
  const buyAutoClicker = () => {
    if (cookies >= 50) { // Auto-clicker custa 50 cookies
      setCookies(cookies - 50);
      setAutoClickers(autoClickers + 1);
    }
  };

  // Efeito colateral para auto-clickers: a cada segundo, adiciona cookies
  useEffect(() => {
    const interval = setInterval(() => {
      setCookies(prev => prev + autoClickers);
    }, 1000); // a cada 1 segundo

    return () => clearInterval(interval); // limpa o intervalo se algo mudar
  }, [autoClickers]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cookies: {cookies}</Text>
      <Text style={styles.text}>Poder de Clique: {clickPower}</Text>
      <Text style={styles.text}>Auto-Clickers: {autoClickers}</Text>

      <TouchableOpacity style={styles.button} onPress={handleClick}>
        <Text style={styles.buttonText}>Clique para ganhar cookies!</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.upgradeButton} onPress={buyUpgrade}>
        <Text style={styles.buttonText}>Upgrade (+1 por clique) - 10 cookies</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.autoClickerButton} onPress={buyAutoClicker}>
        <Text style={styles.buttonText}>Comprar Auto-Clicker - 50 cookies</Text>
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
    fontSize: 20,
    marginBottom: 10,
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
    marginBottom: 10,
  },
  autoClickerButton: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
