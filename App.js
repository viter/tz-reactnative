import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import { AuthContext } from './context';

/************** Mocking server code start ************* */
import { createServer, Model } from 'miragejs';
import jwt from 'expo-jwt';

if (window.server) {
  server.shutdown();
}

window.server = createServer({
  models: {
    users: Model,
  },
  routes() {
    this.post('/api/register', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      try {
        schema.users.create(data);
        return { message: 'ok' };
      } catch (err) {
        return { message: 'err' };
      }
    });
    this.post('/api/login', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      try {
        const user = schema.users.findBy({ username: data.username });
        if (!user) {
          return { message: `User ${data.username} is not registered!` };
        }
        if (user.password !== data.password) {
          return { message: 'Wrong username or password!' };
        }

        return { token: jwt.encode({ username: user.username, name: user.name }, 'coolsecret') };
      } catch (err) {
        return { message: 'Something went wrong. Try later.' };
      }
    });
  },
});
/************** Mocking server code end ************** */

const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = React.useState(undefined);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
