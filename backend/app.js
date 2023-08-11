const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 3000;  // You can change this to your preferred port
const GITHUB_API_BASE_URL = 'https://api.github.com';

app.get('/api/users', async (req, res) => {
    try {
        const since = req.query.since;

        // Getting the "Since" from github
        const githubResponse = await axios.get(`${GITHUB_API_BASE_URL}/users?since=${since}`);

        // Extracting the "Link" header to provide the link for the next page
        const linkHeader = githubResponse.headers.link;
        const nextLink = linkHeader.split(',').find(link => link.includes('rel="next"'));
        
        // Extracting the actual URL for the next page from the "Link" header
        const nextURL = nextLink ? nextLink.match(/<([^>]+)>/)[1] : null;

        res.json({
            users: githubResponse.data,
            nextPage: nextURL
        });
    } catch (error) {
        console.error('Error fetching GitHub users:', error.message);
        res.status(500).json({ error: 'Failed to fetch GitHub users' });
    }
});

app.get('/api/users/:username/details', async (req, res) => {
    try {
        const { username } = req.params;

        const githubResponse = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}`);

        res.json(githubResponse.data);

    } catch (error) {
        console.error('Error fetching GitHub user details:', error.message);
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(500).json({ error: 'Failed to fetch GitHub user details' });
        }
    }
});

app.get('/api/users/:username/repos', async (req, res) => {
    try {
        const { username } = req.params;

        // Fetching repositories for the given username
        const githubResponse = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}/repos`);

        res.json(githubResponse.data);
    } catch (error) {
        console.error('Error fetching GitHub user repositories:', error.message);
        if (error.response && error.response.status === 404) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(500).json({ error: 'Failed to fetch GitHub user repositories' });
        }
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
