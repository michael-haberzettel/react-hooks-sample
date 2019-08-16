# Contenu du projet

Le but de ce projet est de tester React avec certaines bibliothèques à des fins de démonstration.

## Technologies utilisées

### Azure DevOps
Permet de fournir une chaîne CI/CD très simple à mettre en oeuvre. A chaque push sur la branche master
le site est compilé et déployé sur l'URL suivante si la build en succès : https://react-sample-app.azurewebsites.net/

Status du build : [![Build Status](https://dev.azure.com/ADMHaberzetMi/ADM_HaberzetMi/_apis/build/status/ADM_HaberzetMi-CI?branchName=master)](https://dev.azure.com/ADMHaberzetMi/ADM_HaberzetMi/_build/latest?definitionId=2&branchName=master)

### react hooks
Utilisation des Hooks mis en place dans une version  récentede react afin de tester les possibilités. Cette fonctionnalité
vise à améliorer la création des composants avec une approche plus fonctionnelle et concise tout en favorisant le partage
de code.

### typescript
*Lien* : https://www.typescriptlang.org/
Langage proposé par Microsoft venant enrichir le javascript pour proposer un système de typage. L'utilisation de
typescript permet de découvrir l'utilisation des bibliothèques plus facilement et surtout de minimiser les erreurs
de programmation grâce à la vérification des types.

### styled-components
*Lien* : https://www.styled-components.com
Permet de faire de la stylisation des composants en javascript (appelé "CSS in JS"). Voici quelques avantages de cette approche :
 - Permet d'assurer l'isolation des styles des composants. Principe difficile à implémenter en CSS car les styles sont appliqués en cascade.
 - Permet de déterminer les styles morts ou inutilisées. Ce point est également difficile à maitriser en CSS.
 - Optimisation des styles de sortie.
 - Evite l'utilisation d'un preprocesseur CSS comme SASS.

### polished
*Lien* : https://polished.js.org/
Bibliothèque utilitaire pour faciliter la stylisation en javascript conjointement avec styled-components.

### redux
*Lien* : https://redux.js.org/
Bibliothèque qui permet de gérer l'état de l'application au sein d'un endroit isolé et bien contrôlé. La compréhension
de ce composant est souvent difficile car :
 - Il faut maitriser les principes de reducers, des actions et d'immuabilité.
 - Il peut être difficile de savoir quel état doit être stocké dans le magasin redux. Redux a plus vocation à stocker 
 l'état de données métiers et n'est pas adapté pour des composants réutilisables.

### immer
*Lien* : https://github.com/immerjs/immer
Bibliothèque qui permet de faciliter grandement l'écriture de code immuable, utile pour redux et la programmation fonctionnelle  
de manière générale.
Justification du choix :
 - Communauté importante et active.
 - Immer a été choisie car elle se marie bien avec typescript pour bénéficier d'un typage fort.
 - La syntaxe est simple d'approche même s'il y a certaines subtilités.

### axios
*Lien* : https://github.com/axios/axios
Offre un moyen simple et extensible d'effectuer des requêtes AJAX. 
Justification du choix :
 - Communauté importante et active.
 - Bibliothèque très mature.
 - La syntaxe est simple d'approche.

### my-json-server
Utilisation de my-json-server pour émuler un serveur : https://my-json-server.typicode.com/
Url des données :  https://my-json-server.typicode.com/michael-haberzettel/react-hooks-sample

# Contenu original du README.md du script create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
