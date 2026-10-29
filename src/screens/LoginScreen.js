import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { cores } from '../app/src/navigation/theme/cores';

export default function LoginScreen({ navigation }) {
  return (
    <View style={s.container}>
      <Text style={s.titulo}>MoodAlert</Text>
      <Text style={s.sub}>Monitoramento de bipolaridade</Text>
      <TextInput style={s.input} placeholder="E-mail" autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={s.input} placeholder="Senha" secureTextEntry />
      <TouchableOpacity style={s.botao} onPress={() => navigation.replace('Home')}>
        <Text style={s.botaoTxt}>Acessar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={s.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: cores.fundo },
  titulo: { fontSize: 32, fontWeight: 'bold', color: cores.primaria, textAlign: 'center' },
  sub: { textAlign: 'center', color: cores.texto, marginBottom: 32 },
  input: { backgroundColor: cores.branco, borderRadius: 10, padding: 14, marginBottom: 12 },
  botao: { backgroundColor: cores.primaria, padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  botaoTxt: { color: cores.branco, fontWeight: 'bold' },
  link: { textAlign: 'center', marginTop: 16, color: cores.primaria },
});