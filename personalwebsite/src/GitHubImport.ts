import { Octokit } from "@octokit/rest";
//const key = import.meta.env.VITE_API_KEY; // Ensure that the API key is available at build time

export const octokit = new Octokit({  });

/* const {
    data: { login },
} = await octokit.rest.users.getAuthenticated();
console.log("Hello, %s", login); */