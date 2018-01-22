import React from 'react'
import { StyleSheet, View, FlatList, Text, TextInput, Button, ActivityIndicator } from 'react-native'
import { API_KEY } from '../constants'
import axios from 'axios'

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
        api_key: API_KEY
      }
    }).then(response => {
      const {data} = response

      console.log(data)

      this.setState({
        results: data.similartracks.track,
        loading: false
      })
    }).catch(() => {
      this.setState({
        results: [],
        loading: false
      })
    })
  }

  _keyExtractor(item, index) {
    return index
  }

  _renderItem({item}) {
    return (
      <Text>{item.name} - {item.artist.name}</Text>
    )
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