import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const HomeContainer = styled.div`
    margin:10px;
    color:gray;
    border:1px solid #CCC;
    padding:5px;
`;

const Home: React.FC = () => {
    return <HomeContainer>
        <h1>Site de démonstration</h1>

        <p>Code source : <a href="https://github.com/michael-haberzettel/react-hooks-sample">https://github.com/michael-haberzettel/react-hooks-sample</a> </p>
        <p>Redux est utilisé pour synchroniser les articles sur le panier en haut, le prix affiché en bas ainsi que pour conserver les articles sélectionnés dans les différents écrans.</p>
        <br />
        <br />
        <Link to="/shopping">Accès au magasin</Link>
    </HomeContainer>
}

export default Home;


