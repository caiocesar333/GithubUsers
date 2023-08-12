const supertest = require('supertest');
const chai = require('chai');
const app = require('./app'); 
const AxiosMockAdapter = require('axios-mock-adapter');
const axios = require('axios');

const expect = chai.expect;
const request = supertest(app);
const mock = new AxiosMockAdapter(axios);

describe('Server Endpoints', () => {
    after(() => {
        mock.reset();
    });

    it('Should fetch GitHub users successfully', async () => {
        mock.onGet('https://api.github.com/users?since=0').reply(200, []);

        const res = await request.get('/api/users?since=0');
        console.log(res.body)
        expect(res.status).to.equal(200);
        expect(res.body.users).to.be.an('array');
    });

    it('Should fetch GitHub user details successfully', async () => {
        mock.onGet('https://api.github.com/users/testuser').reply(200, {});

        const res = await request.get('/api/users/testuser/details');
        expect(res.status).to.equal(200);
    });

    it('Should fetch GitHub user repositories successfully', async () => {
        mock.onGet('https://api.github.com/users/testuser/repos').reply(200, []);

        const res = await request.get('/api/users/testuser/repos');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

});
