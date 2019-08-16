import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import AppHeader from './components/layout/app-header';
import { Route, MemoryRouter } from 'react-router-dom';
import Shopping from './components/shopping-area/shopping';
import { ToastProvider } from 'react-toast-notifications';
import Profil from './components/profil-area/profil';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MemoryRouter>
        <ToastProvider autoDismissTimeout={6000}>
          <AppHeader />
          <Route exact path="/" component={Shopping} />
          <Route exact path="/profil" component={Profil} />
        </ToastProvider>
      </MemoryRouter>
    </Provider>
  );
}

export default App;
