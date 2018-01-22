import React from 'react'
import { StyleSheet, View, FlatList, Text, TextInput, Button, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native'
import { API_KEY } from '../constants'
import axios from 'axios'

class ResultItem  extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.artistName, this.props.name)
  }

  render = () => (
    <TouchableOpacity style={{
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5
      }}
      onPress={this._onPress}
    >
      <Image source={{uri: this.props.imageUrl}} style={{height: 64, width: 64}} resizeMode="contain" />
      <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center', marginLeft: 10}}>
        <Text style={{fontSize: 18}}>{this.props.name}</Text>
        <Text style={{color: '#777'}}>{this.props.artistName}</Text>
      </View>
    </TouchableOpacity>
  )
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

  componentDidMount = () => {
    if (this.state.artist === '' && this.state.track === '') {
      if (this.props.navigation.state.params && this.props.navigation.state.params.artist && this.props.navigation.state.params.track) {
        this.setState(state => ({
          artist: this.props.navigation.state.params.artist,
          track: this.props.navigation.state.params.track
        }), () => {
          this._search()
        })
      }
    }
  }

  _search = () => {
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

  _onPressItem = (artist, track) => {
    this.props.navigation.navigate('Search', {
      artist, track
    })
  }

  _renderItem = ({item}) => (
    <ResultItem 
      onPressItem={this._onPressItem}
      artistName={item.artistName}
      name={item.name}
      imageUrl={item.imageUrl}
    />
  )

  render = () => (
    <View>
      <View style={styles.form}>
        <Text style={styles.label}>Artista</Text>
        <TextInput 
          onBlur={() => this._search()}
          value={this.state.artist}
          onChangeText={(text) => this.setState({artist: text})}
          style={styles.searchInput} />
        <Text style={styles.label}>Música</Text>
        <TextInput 
          onBlur={() => this._search()}
          value={this.state.track}
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