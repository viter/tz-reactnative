import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Test Task App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12372A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#FBFADA',
    fontSize: 35,
    fontWeight: 'bold',
  },
});
