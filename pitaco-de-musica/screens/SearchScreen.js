import React from 'react'
import { StyleSheet, View, FlatList, Text, TextInput, Button, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native'
import { API_KEY } from '../constants'
import axios from 'axios'

class ResultItem  extends React.PureComponent {
  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5
      }}>
        <Image source={{uri: this.props.imageUrl}} style={{height: 64, width: 64}} resizeMode="contain" />
        <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center', marginLeft: 10}}>
          <Text style={{fontSize: 18}}>{this.props.name}</Text>
          <Text style={{color: '#777'}}>{this.props.artistName}</Text>
        </View>
      </View>
    )
  }
}

class SearchScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      track: '',
      artist: '',
      results: [],
      loading: false
    }
  }

  _search() {
    if (this.state.artist === '' || this.state.track === '' || this.loading) return

    this.setState({loading: true})
    axios.get('http://ws.audioscrobbler.com/2.0/', {
      params: {
        method: 'track.getsimilar',
        format: 'json',
        artist: this.state.artist,
        track: this.state.track,
        api_key: API_KEY,
        limit: 10
      }
    }).then(response => {
      const {data} = response

      console.log(data)

      this.setState({
        results: data.similartracks.track.map((track, i) => {

          return {
            key: i,
            imageUrl: track.image.find(img => img.size === 'medium')['#text'],
            name: track.name,
            artistName: track.artist.name
          }
        }),
        loading: false
      })
    }).catch((err) => {
      console.log(err)
      Alert.alert('Oooops', 'Ocorreu um erro com a solicitação, tente novamente')
      this.setState({
        results: [],
        loading: false
      })
    })
  }

  _renderItem({item}) {
    return <ResultItem {...item} />
  }

  render() {
    return (
      <View>
        <View style={styles.form}>
          <Text style={styles.label}>Artista</Text>
          <TextInput 
            onBlur={() => this._search()}
            onChangeText={(text) => this.setState({artist: text})}
            style={styles.searchInput} />
          <Text style={styles.label}>Música</Text>
          <TextInput 
            onBlur={() => this._search()}
            onChangeText={(text) => this.setState({track: text})}
            style={styles.searchInput} />
        </View>
        { this.state.loading 
          ? <ActivityIndicator />
          : <FlatList 
              data={this.state.results}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
              style={{paddingLeft: 10, paddingRight: 10}}
            />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    padding: 10
  },
  label: {
    fontWeight: 'bold'
  },
  searchInput: {
    height: 40,
  }
})

export default SearchScreen