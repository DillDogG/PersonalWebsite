import unimportables from './assets/PortfolioUnimportables.json' assert { type: 'json' };

export interface PortItem {
    name: string;
    importance: string;
    description: string;
    image_url: string | null;
    url: string | null;
}

export const GetPortfolio = async () => {
    console.log(unimportables);
    const data = new Array<PortItem>();
    for (const item of unimportables.items) {
        data.push({
            name: item.name,
            importance: item.importance,
            description: item.description,
            image_url: item.image_url || null,
            url: item.url || null
        });
    }
    return data;
};