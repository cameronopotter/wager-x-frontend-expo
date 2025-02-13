import { Home } from 'components/Home';
import { StatusBar } from 'expo-status-bar';

import './global.css';

export default function App() {
  return (
    <>
      <Home title="Home" path="App.tsx" />
      <StatusBar style="auto" />
    </>
  );
}
