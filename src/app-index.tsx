import React from 'react';
import {SafeAreaView} from 'react-native';

import {Provider} from 'react-redux';
import {store} from './store';
import {Home} from './scenes';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <Home />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
