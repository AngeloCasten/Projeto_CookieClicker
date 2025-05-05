// Aula 5 - Sistema de Prestígio (reinício com bônus permanente)

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [cookies, setCookies] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);
  const [prestigeMultiplier, setPrestigeMultiplier] = useState(1);

  // Carrega dados salvos
  useEffect(() => {
    const loadData = async () => {
      const savedCookies = await AsyncStorage.getItem('cookies');
      const savedClickPower = await AsyncStorage.getItem('clickPower');
      const savedAutoClickers = await AsyncStorage.getItem('autoClickers');
      const savedPrestige = await AsyncStorage.getItem('prestigeMultiplier');

      if (savedCookies !== null) setCookies(parseInt(savedCookies));
      if (savedClickPower !== null) setClickPower(parseInt(savedClickPower));
      if (savedAutoClickers !== null) setAutoClickers(parseInt(savedAutoClickers));
      if (savedPrestige !== null) setPrestigeMultiplier(parseInt(savedPrestige));
    };
    loadData();
  }, []);

  // Salva dados
  useEffect(() => {
    AsyncStorage.setItem('cookies', cookies.toString());
    AsyncStorage.setItem('clickPower', clickPower.toString());
    AsyncStorage.setItem('autoClickers', autoClickers.toString());
    AsyncStorage.setItem('prestigeMultiplier', prestigeMultiplier.toString());
  }, [cookies, clickPower, autoClickers, prestigeMultiplier]);

  const handleClick = () => {
    setCookies(cookies + clickPower * prestigeMultiplier);
  };

  const buyUpgrade = () => {
    if (cookies >= 10) {
      setCookies(cookies - 10);
      setClickPower(clickPower + 1);
    }
  };

  const buyAutoClicker = () => {
    if (cookies >= 50) {
      setCookies(cookies - 50);
      setAutoClickers(autoClickers + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCookies(prev => prev + autoClickers * prestigeMultiplier);
    }, 1000);
    return () => clearInterval(interval);
  }, [autoClickers, prestigeMultiplier]);

  const handlePrestige = () => {
    if (cookies >= 1000) {
      setCookies(0);
      setClickPower(1);
      setAutoClickers(0);
      setPrestigeMultiplier(prestigeMultiplier + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cookies: {cookies}</Text>
      <Text style={styles.text}>Poder de Clique: {clickPower} x{prestigeMultiplier}</Text>
      <Text style={styles.text}>Auto-Clickers: {autoClickers}</Text>
      <Text style={styles.text}>Prestígio: x{prestigeMultiplier}</Text>

      <TouchableOpacity style={styles.button} onPress={handleClick}>
        <Text style={styles.buttonText}>Clique para ganhar cookies!</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.upgradeButton} onPress={buyUpgrade}>
        <Text style={styles.buttonText}>Upgrade (+1 por clique) - 10 cookies</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.autoClickerButton} onPress={buyAutoClicker}>
        <Text style={styles.buttonText}>Comprar Auto-Clicker - 50 cookies</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.prestigeButton} onPress={handlePrestige}>
        <Text style={styles.buttonText}>Prestígio (recomeçar +1x) - Requer 1000 cookies</Text>
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
    marginBottom: 10,
  },
  prestigeButton: {
    backgroundColor: '#9c27b0',
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
