import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { cores } from '../app/src/navigation/theme/cores';

export default function CadastroScreen({ navigation }) {
  const [perfil, setPerfil] = useState('paciente');
  return (
    <View style={s.container}>
      <TextInput style={s.input} placeholder="Nome completo" />
      <TextInput style={s.input} placeholder="E-mail" autoCapitalize="none" />
      <TextInput style={s.input} placeholder="Senha" secureTextEntry />
      <TextInput style={s.input} placeholder="Confirmar senha" secureTextEntry />
      <View style={s.linha}>
        {['paciente', 'medico'].map((p) => (
          <TouchableOpacity key={p} style={[s.opcao, perfil === p && s.opcaoAtiva]} onPress={() => setPerfil(p)}>
            <Text style={perfil === p ? s.txtAtivo : s.txt}>{p === 'paciente' ? 'Paciente' : 'Médico'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={s.botao} onPress={() => navigation.navigate('Login')}>
        <Text style={s.botaoTxt}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: cores.fundo },
  input: { backgroundColor: cores.branco, borderRadius: 10, padding: 14, marginBottom: 12 },
  linha: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  opcao: { flex: 1, padding: 12, borderRadius: 10, backgroundColor: cores.branco, alignItems: 'center' },
  opcaoAtiva: { backgroundColor: cores.primaria },
  txt: { color: cores.texto },
  txtAtivo: { color: cores.branco, fontWeight: 'bold' },
  botao: { backgroundColor: cores.primaria, padding: 14, borderRadius: 10, alignItems: 'center' },
  botaoTxt: { color: cores.branco, fontWeight: 'bold' },
});