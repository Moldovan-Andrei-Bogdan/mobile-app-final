import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import AppEntry from './src/app/app-main';

import store from './src/app/store';
import { Provider } from 'react-redux';


export default function App() {

  return (
    <Provider store={ store }>
      <SafeAreaView style={styles.container}>
        <StatusBar style='dark' />
        <AppEntry />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
});
