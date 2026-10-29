import { View, Text, StyleSheet } from 'react-native';
import { cores } from '../app/src/navigation/theme/cores';

export default function DiarioScreen() {
  return (
    <View style={s.c}>
      <Text style={s.t}>Diario(em construção)</Text>
    </View>
  );
}
const s = StyleSheet.create({
  c: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: cores.fundo },
  t: { color: cores.texto, fontSize: 18 },
});