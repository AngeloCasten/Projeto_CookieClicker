// Aula 11 - Sistema de Missões e Conquistas

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';

export default function App() {
  const [cookies, setCookies] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);
  const [achievements, setAchievements] = useState([]);

  // Lista de conquistas baseadas em metas de cookies
  const achievementsList = [
    { id: 1, name: 'Primeiros 10 Cookies!', goal: 10 },
    { id: 2, name: 'Chegou a 100 Cookies!', goal: 100 },
    { id: 3, name: '1.000 Cookies? Impressionante!', goal: 1000 },
    { id: 4, name: '5 Auto-Clickers!', goal: 5, type: 'autoClicker' },
    { id: 5, name: 'Clique Poderoso 10+', goal: 10, type: 'clickPower' },
  ];

  const handleClick = () => {
    setCookies(cookies + clickPower);
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

  // Gera cookies automaticamente
  useEffect(() => {
    const interval = setInterval(() => {
      setCookies(prev => prev + autoClickers);
    }, 1000);

    return () => clearInterval(interval);
  }, [autoClickers]);

  // Checagem de conquistas
  useEffect(() => {
    achievementsList.forEach(achievement => {
      if (!achievements.includes(achievement.id)) {
        if (
          (achievement.type === 'autoClicker' && autoClickers >= achievement.goal) ||
          (achievement.type === 'clickPower' && clickPower >= achievement.goal) ||
          (!achievement.type && cookies >= achievement.goal)
        ) {
          setAchievements(prev => [...prev, achievement.id]);
          Alert.alert('Conquista desbloqueada!', achievement.name);
        }
      }
    });
  }, [cookies, autoClickers, clickPower]);

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

      <Text style={styles.achievementsTitle}>Conquistas desbloqueadas:</Text>
      <FlatList
        data={achievementsList.filter(a => achievements.includes(a.id))}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.achievementItem}>- {item.name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingTop: 40,
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
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  achievementsTitle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
  achievementItem: {
    fontSize: 16,
    marginVertical: 2,
  },
});
