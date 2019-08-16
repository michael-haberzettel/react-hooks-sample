export interface IArticle {
    id: string;
    name: string;
    price: number;
}

export function getArticles(): Promise<IArticle[]> {
    return new Promise((resolve, error) => {
        setTimeout(() => resolve([
            { id: "1", name: 'Pommes', price: 1.2 },
            { id: "2", name: 'Courgette', price: 1.5 },
            { id: "3", name: 'Banane', price: 1.1 },
        ]), 1500);
    });
}