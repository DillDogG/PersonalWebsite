import unimportables from './assets/PortfolioUnimportables.json' assert { type: 'json' };
import { Octokit } from "@octokit/rest";
//import './GitHubImport.ts';

export interface PortItem {
    name: string;
    importance: string;
    description: string;
    image_url: string | null;
    url: string | null;
}
const octokit = new Octokit({});
export const GetPortfolio = async () => {
    console.log(unimportables);
    const data = new Array<PortItem>();
    //const response = await fetch('https://api.github.com/users/DillDogG/repos');
    //console.log("test", gitHubData);


    const gitData = await octokit.paginate("GET /users/DillDogG/repos");

    for (const item of unimportables.items) {
        data.push({
            name: item.name,
            importance: item.importance,
            description: item.description,
            image_url: item.image_url || null,
            url: item.url || null
        });
    }
    for (const item of gitData) {
        data.push({
            name: item.name,
            importance: item.description,
            description: item.description,
            image_url: item.image_url || null,
            url: item.html_url || null
        });
    }
    console.log("data", data);
    for (let i = 0; i < data.length; i++) {
        if (data[i].importance && data[i].importance[0] == '(') {
            data[i].importance = data[i].importance.substring(1, data[i].importance.indexOf(')'));
            data[i].description = data[i].description.substring(data[i].description.indexOf(')') + 1).trim();
        }
        if (data[i].importance == "hidden") {
            data.splice(i, 1);
            i--;
        }
    }
    return data;
};