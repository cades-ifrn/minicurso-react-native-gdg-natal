import React from 'react'
import { StyleSheet, View, Text, Image, Button, ScrollView } from 'react-native'

import MusicPlayerIcon from '../assets/music-player.png'

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.container}>
          <Image source={MusicPlayerIcon} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Pitaco de Música</Text>
          <Text style={styles.subtitle}>Encontre sugestões para{'\n'}suas músicas favoritas</Text>
        </ScrollView>
        <Button onPress={() => console.log('Pressed')} title="Começar" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 200,
    alignSelf: 'center',
  },
  title: {
    fontSize: 36
  },
  subtitle: {
    fontSize: 20,
    color: '#777',
    textAlign: 'center'
  }
})

export default HomeScreen