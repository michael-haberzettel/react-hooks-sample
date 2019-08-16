import Axios from 'axios';
const serverUrl = 'https://my-json-server.typicode.com/michael-haberzettel/react-hooks-sample';
export interface IArticle {
    id: string;
    name: string;
    price: number;
}

export function getArticles(): Promise<IArticle[]> {
    return Axios(`${serverUrl}/articles`).then(res => res.data);
}