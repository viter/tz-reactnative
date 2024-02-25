import { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { AuthContext } from '../context';

export default function Login({ navigation }) {
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginPressed, setLoginPressed] = useState(false);

  const { setToken } = useContext(AuthContext);

  useEffect(() => {
    if (loginPressed && !Object.keys(errors).length) {
      fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.token) {
            setToken(json.token);
            navigation.navigate('Home');
          } else if (json.message) {
            setErrors({ loginError: json.message });
          }
        });
    }
    setLoginPressed(false);
  }, [loginPressed]);

  function handleLoginPress() {
    setErrors({});
    if (!username) {
      setErrors((prev) => ({ ...prev, usernameError: 'Username is required' }));
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, passwordError: 'Password is required' }));
    }

    setLoginPressed(true);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <Text style={styles.label}>Username:</Text>
      <TextInput style={styles.input} onChangeText={onChangeUsername} value={username} />
      {errors.usernameError ? <Text style={styles.errorLabel}>{errors.usernameError}</Text> : null}

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        textContentType="password"
        secureTextEntry={true}
      />
      {errors.passwordError ? <Text style={styles.errorLabel}>{errors.passwordError}</Text> : null}
      {errors.loginError ? <Text style={styles.errorLabel}>{errors.loginError}</Text> : null}
      <View style={{ marginTop: 30 }}>
        <Button title="Login" color="#436850" onPress={handleLoginPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12372A',
    padding: 40,
  },
  label: {
    color: '#FBFADA',
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 10,
    marginTop: 10,
  },
  errorLabel: {
    color: '#F08C29',
    fontSize: 15,
    textAlign: 'left',
  },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#FBFADA',
    color: '#FBFADA',
    padding: 5,
    fontSize: 15,
    marginBottom: 10,
  },
  title: {
    color: '#FBFADA',
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 30,
    fontWeight: 'bold',
  },
});
