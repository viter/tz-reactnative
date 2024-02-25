import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function Register({ navigation }) {
  const [username, onChangeUsername] = useState('');
  const [name, onChangeName] = useState('');
  const [password, onChangePassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (submit && !Object.keys(errors).length) {
      fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ name, username, password }),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (json.message === 'ok') {
            navigation.navigate('Login');
          } else {
            setErrors((prev) => ({ ...prev, registerError: 'Something went wrong. Try later.' }));
          }
        });
    }
    setSubmit(false);
  }, [submit]);

  function handleSubmitPress() {
    setErrors({});
    if (!username) {
      setErrors((prev) => ({ ...prev, usernameError: 'Username is required' }));
    }
    if (!name) {
      setErrors((prev) => ({ ...prev, nameError: 'Name is required' }));
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, passwordError: 'Password is required' }));
    }
    if (password && password.length < 5) {
      setErrors((prev) => ({
        ...prev,
        passwordError: 'Password should contain at least 5 characters',
      }));
    }

    setSubmit(true);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <Text style={styles.label}>Username:</Text>
      <TextInput style={styles.input} onChangeText={onChangeUsername} value={username} />
      {errors.usernameError ? <Text style={styles.errorLabel}>{errors.usernameError}</Text> : null}

      <Text style={styles.label}>Name:</Text>
      <TextInput style={styles.input} onChangeText={onChangeName} value={name} />
      {errors.nameError ? <Text style={styles.errorLabel}>{errors.nameError}</Text> : null}

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        textContentType="password"
        secureTextEntry={true}
      />
      {errors.passwordError ? <Text style={styles.errorLabel}>{errors.passwordError}</Text> : null}

      <View style={{ marginTop: 30 }}>
        <Button title="Submit" color="#436850" onPress={handleSubmitPress} />
      </View>
      {errors.registerError ? <Text style={styles.errorLabel}>{errors.registerError}</Text> : null}
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
