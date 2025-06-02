
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Animated, Image } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [cookies, setCookies] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [sound, setSound] = useState();
  const scale = useRef(new Animated.Value(1)).current;
  // Metas diárias
  const [dailyGoal, setDailyGoal] = useState(100);
  const [dailyProgress, setDailyProgress] = useState(0);
  const [lastLogin, setLastLogin] = useState(new Date().toDateString());
  const achievementsList = [
    { id: 1, name: 'Primeiros 10 Cookies!', goal: 10 },
    { id: 2, name: 'Chegou a 100 Cookies!', goal: 100 },
    { id: 3, name: '1.000 Cookies? Impressionante!', goal: 1000 },
    { id: 4, name: '5 Auto-Clickers!', goal: 5, type: 'autoClicker' },
    { id: 5, name: 'Clique Poderoso 10+', goal: 10, type: 'clickPower' },
  ];
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/click.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  const pulseAnimation = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleClick = () => {
    setCookies(cookies + clickPower);
    pulseAnimation();
    playSound();
  const handleClick = () => {
    setCookies(cookies + clickPower);
    setDailyProgress(prev => prev + clickPower);
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
      setCookies(prev => prev + autoClickers);
    }, 1000);

    return () => clearInterval(interval);
  }, [autoClickers]);
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

  // Checa diariamente se é um novo dia e reinicia a meta
  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date().toDateString();
      if (lastLogin !== today) {
        resetDailyGoal();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [lastLogin]);

  const resetDailyGoal = () => {
    setDailyGoal(100);
    setDailyProgress(0);
    setLastLogin(new Date().toDateString());
  };

  // Alerta ao atingir a meta diária
  useEffect(() => {
    if (dailyProgress >= dailyGoal) {
      Alert.alert("Meta Diária Concluída!", "Você ganhou 100 cookies hoje!");
    }
  }, [dailyProgress]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cookies: {cookies}</Text>
      <Text style={styles.text}>Poder de Clique: {clickPower}</Text>
      <Text style={styles.text}>Auto-Clickers: {autoClickers}</Text>
      <Text style={styles.text}>Meta Diária: {dailyGoal} cookies</Text>
      <Text style={styles.text}>Progresso Diário: {dailyProgress}</Text>

      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity onPress={handleClick}>
          <Image source={require('./assets/cookie.png')} style={styles.cookieImage} />
        </TouchableOpacity>
      </Animated.View>

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
  cookieImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
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
