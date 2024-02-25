import { Button } from 'react-native';

export default function AuthButton({ title, action, color }) {
  return <Button title={title} color="#436850" onPress={action} />;
}
