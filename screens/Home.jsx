import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context';
import Header from '../components/Header';
import AuthButton from '../components/AuthButton';
import jwt from 'expo-jwt';

export default function Home({ navigation }) {
  const { token } = useContext(AuthContext);
  let name;
  if (token) {
    name = jwt.decode(token, 'coolsecret').name;
  }

  function handleLoginPress() {
    navigation.navigate('Login');
  }

  function handleRegisterPress() {
    navigation.navigate('Register');
  }
  return (
    <View style={styles.container}>
      <Header />
      {token ? (
        <View style={styles.main}>
          <Text style={styles.label}>Hi {name}. You're logged in.</Text>
        </View>
      ) : (
        <View style={styles.main}>
          <Text style={styles.label}>Please</Text>
          <AuthButton title="Log In" action={handleLoginPress} />
          <Text style={styles.label}>or</Text>
          <AuthButton title="Register" action={handleRegisterPress} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 4,
    backgroundColor: '#12372A',
    paddingVertical: 50,
    paddingHorizontal: 20,
    borderTopColor: '#FBFADA',
    borderTopWidth: 1,
  },
  label: {
    color: '#FBFADA',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
});
