import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import Pusher from 'pusher-js/react-native'; // 4.2.1
import { Constants } from 'expo';

// constants - set these to your own pusher parameters
const PUSHER_KEY = 'your key here';
const PUSHER_CLUSTER = 'your cluster here';
const CHANNEL_NAME = 'your channel here';
const EVENT_NAME = 'your event here';

export default class App extends Component {
  
  _pusherSocket = null;
  
  componentDidMount() {
    this._pusherSocket = new Pusher(PUSHER_KEY, {
      encrypted: true,
      cluster: PUSHER_CLUSTER,
    });
    
    const pusherChannel = this._pusherSocket.subscribe(CHANNEL_NAME);
    
    this._pusherSocket.connection.bind('error', err => {
      Alert.alert('Connection error (probably WebSocket error)!', JSON.stringify(err));
      console.log('connection error (probably WebSocket error)!');
      console.log(err);
    });
    
    pusherChannel.bind(EVENT_NAME, payload => {
      Alert.alert('New message from your event subscription!', JSON.stringify(payload));
      console.log('new message on your channel');
      console.log(payload);
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          You'll get alerts if pusher gets a message or if it gets a connection error. Lock your phone for 5-or-so minutes and then return and you'll maybe/ probably get the WebSocket error.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});