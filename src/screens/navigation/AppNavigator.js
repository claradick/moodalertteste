import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import HomeScreen from '../screens/HomeScreen';
import AfetivogramaScreen from '../screens/AfetivogramaScreen';
import DiarioScreen from '../screens/DiarioScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: 'Criar conta' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'MoodAlert' }} />
        <Stack.Screen name="Afetivograma" component={AfetivogramaScreen} />
        <Stack.Screen name="Diario" component={DiarioScreen} options={{ title: 'Diário' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}