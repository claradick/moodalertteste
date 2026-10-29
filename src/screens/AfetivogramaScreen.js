import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { API_URL } from '../config/api';
import { cores } from '../theme/cores';

const USUARIO_ID = 1; // provisório: na Entrega 3 vem do token

export default function AfetivogramaScreen() {
  const [humor, setHumor] = useState(0);
  const [energia, setEnergia] = useState('');
  const [sono, setSono] = useState('');
  const [ansiedade, setAnsiedade] = useState('');
  const [irritabilidade, setIrritabilidade] = useState('');
  const [observacao, setObservacao] = useState('');
  const [registros, setRegistros] = useState([]);

  async function carregar() {
    try {
      const resp = await fetch(`${API_URL}/registros?usuario_id=${USUARIO_ID}`);
      const dados = await resp.json();
      setRegistros(dados);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível conectar à API.');
    }
  }

  useEffect(() => { carregar(); }, []);

  async function salvar() {
    if (energia === '' || sono === '' || ansiedade === '' || irritabilidade === '') {
      return Alert.alert('Atenção', 'Preencha todos os campos.');
    }
    try {
      const resp = await fetch(`${API_URL}/registros`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: USUARIO_ID,
          humor,
          energia: Number(energia),
          sono_horas: Number(sono.replace(',', '.')),
          ansiedade: Number(ansiedade),
          irritabilidade: Number(irritabilidade),
          observacao,
        }),
      });
      const dados = await resp.json();
      if (!resp.ok) return Alert.alert('Erro', dados.erro);
      setEnergia(''); setSono(''); setAnsiedade(''); setIrritabilidade(''); setObservacao(''); setHumor(0);
      carregar();
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível conectar à API.');
    }
  }

  return (
    <ScrollView style={s.container} keyboardShouldPersistTaps="handled">
      <Text style={s.label}>Humor (-3 depressão · 0 estável · +3 mania)</Text>
      <View style={s.linha}>
        {[-3, -2, -1, 0, 1, 2, 3].map((n) => (
          <TouchableOpacity key={n} style={[s.chip, humor === n && s.chipAtivo]} onPress={() => setHumor(n)}>
            <Text style={humor === n ? s.chipTxtAtivo : s.chipTxt}>{n > 0 ? `+${n}` : n}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput style={s.input} placeholder="Energia (0 a 10)" keyboardType="numeric" value={energia} onChangeText={setEnergia} />
      <TextInput style={s.input} placeholder="Horas de sono (ex: 7.5)" keyboardType="numeric" value={sono} onChangeText={setSono} />
      <TextInput style={s.input} placeholder="Ansiedade (0 a 10)" keyboardType="numeric" value={ansiedade} onChangeText={setAnsiedade} />
      <TextInput style={s.input} placeholder="Irritabilidade (0 a 10)" keyboardType="numeric" value={irritabilidade} onChangeText={setIrritabilidade} />
      <TextInput style={[s.input, { height: 80 }]} placeholder="Observações" multiline value={observacao} onChangeText={setObservacao} />

      <TouchableOpacity style={s.botao} onPress={salvar}>
        <Text style={s.botaoTxt}>Salvar registro</Text>
      </TouchableOpacity>

      <Text style={s.titulo}>Meus registros</Text>
      {registros.length === 0 && <Text style={s.vazio}>Nenhum registro ainda.</Text>}
      {registros.map((r) => (
        <View key={r.id} style={s.card}>
          <Text style={s.cardData}>{r.data}</Text>
          <Text style={s.cardTxt}>Humor {r.humor > 0 ? `+${r.humor}` : r.humor} · Energia {r.energia} · Sono {r.sono_horas}h</Text>
          <Text style={s.cardTxt}>Ansiedade {r.ansiedade} · Irritabilidade {r.irritabilidade}</Text>
          {!!r.observacao && <Text style={s.cardObs}>{r.observacao}</Text>}
        </View>
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: cores.fundo },
  label: { color: cores.texto, marginBottom: 8, fontWeight: '600' },
  linha: { flexDirection: 'row', gap: 6, marginBottom: 16 },
  chip: { flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: cores.branco, alignItems: 'center' },
  chipAtivo: { backgroundColor: cores.primaria },
  chipTxt: { color: cores.texto },
  chipTxtAtivo: { color: cores.branco, fontWeight: 'bold' },
  input: { backgroundColor: cores.branco, borderRadius: 10, padding: 12, marginBottom: 10 },
  botao: { backgroundColor: cores.primaria, padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 4 },
  botaoTxt: { color: cores.branco, fontWeight: 'bold' },
  titulo: { fontSize: 18, fontWeight: 'bold', color: cores.texto, marginTop: 24, marginBottom: 10 },
  vazio: { color: cores.texto, opacity: 0.6 },
  card: { backgroundColor: cores.branco, padding: 14, borderRadius: 12, marginBottom: 10 },
  cardData: { fontWeight: 'bold', color: cores.primaria, marginBottom: 4 },
  cardTxt: { color: cores.texto },
  cardObs: { color: cores.texto, marginTop: 6, fontStyle: 'italic' },
});