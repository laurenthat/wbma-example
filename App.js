import {StatusBar} from 'expo-status-bar';
import Navigator from './navigators/Navigator';

const App = () => {
  return (
    <>
      <Navigator />
      <StatusBar backgroundColor="#F35653" style="light-content" />
    </>
  );
};

export default App;
