import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import AppHeader from './components/layout/app-header';
import AppFooter from './components/layout/app-footer';
import { Route, BrowserRouter } from 'react-router-dom';
import Shopping from './components/shopping-area/shopping';
import { ToastProvider } from 'react-toast-notifications';
import Profil from './components/profil-area/profil';
import styled from 'styled-components';
import Home from './components/shopping-area/home';

const MainLayout = styled.div`
  display:flex;
  flex-direction:column;
  height:100vh;
`;

const MainContent = styled.div`
  flex-grow:1;
`;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastProvider autoDismissTimeout={6000}>
          <MainLayout>
            <AppHeader />
            <MainContent>
              <Route exact path="/" component={Home} />
              <Route exact path="/shopping" component={Shopping} />
              <Route exact path="/profil" component={Profil} />
            </MainContent>
            <AppFooter />
          </MainLayout>
        </ToastProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
