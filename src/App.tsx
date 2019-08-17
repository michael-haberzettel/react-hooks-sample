import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import AppHeader from './components/layout/app-header';
import AppFooter from './components/layout/app-footer';
import { Route, BrowserRouter } from 'react-router-dom';
import Shopping from './components/shopping-area/shopping';
import { ToastProvider } from 'react-toast-notifications';
import styled from 'styled-components';
import Home from './home';
import BasketHome from './components/profil-area/basket-home';

const MainLayout = styled.div`
  display:flex;
  flex-direction:column;
  height:100%;
`;

const HeaderContent = styled.header`
  flex:0 0 auto;
`;

const MainContent = styled.main`
  flex:1 1 auto;
  position:relative;
  overflow-y:auto;
  padding:4px;
`;

const FooterContent = styled.footer`
  flex:0 0 auto;
`;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastProvider autoDismissTimeout={6000}>
          <MainLayout>
            <HeaderContent>
              <AppHeader />
            </HeaderContent>
            <MainContent>
              <Route exact path="/" component={Home} />
              <Route exact path="/basket" component={BasketHome} />
              <Route exact path="/shopping" component={Shopping} />
            </MainContent>
            <FooterContent>
              <AppFooter />
            </FooterContent>
          </MainLayout>
        </ToastProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
