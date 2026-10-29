import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { cores } from '../app/src/navigation/theme/cores';

export default function HomeScreen({ navigation }) {
  return (
    <View style={s.container}>
      <Text style={s.titulo}>Como você está hoje?</Text>
      <TouchableOpacity style={s.card} onPress={() => navigation.navigate('Afetivograma')}>
        <Text style={s.cardTxt}>📈 Afetivograma</Text>
      </TouchableOpacity>
      <TouchableOpacity style={s.card} onPress={() => navigation.navigate('Diario')}>
        <Text style={s.cardTxt}>📓 Diário</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace('Login')}>
        <Text style={s.sair}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: cores.fundo },
  titulo: { fontSize: 22, fontWeight: 'bold', color: cores.texto, marginBottom: 20 },
  card: { backgroundColor: cores.branco, padding: 20, borderRadius: 14, marginBottom: 12 },
  cardTxt: { fontSize: 18, color: cores.texto },
  sair: { textAlign: 'center', marginTop: 20, color: cores.primaria },
});
