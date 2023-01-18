//Contains the test-cases 
const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let baseUrl = 'https://api.publicapis.org';
let apiEndPoint = '/entries';

describe('/GET Data', function () {
    it('Get All Entries Should Return 200', async function () {
        let res = await chai.request(baseUrl).get(apiEndPoint);
        expect(res.status).to.equal(200);
    });

    it('Get Category Blockchain Should Return Entries With Category Blockchain', async function () {
        let res = await chai.request(baseUrl).get(apiEndPoint).query({Category: 'Blockchain'});
        expect(res.status).to.equal(200);
        res.body.entries.forEach(element => {
            expect(element.Category).to.equal('Blockchain');
        });
    });

    it('Get Description Holiday Should Return Entries With Description Contains Holiday', async function () {
        let res = await chai.request(baseUrl).get(apiEndPoint).query({Description: 'Holiday'});
        expect(res.status).to.equal(200);
        res.body.entries.forEach(element => {
            console.log(element);
            expect(element.Description.toLowerCase()).to.contains('holiday');
        });
    });

    it('Get Bolean Data Should Return Null If The Paramater is INT', async function () {
        let res = await chai.request(baseUrl).get(apiEndPoint).query({HTTPS: 5});
        expect(res.status).to.equal(200);
        expect(res.body.count).to.equal(0);
    });

    it('Get Invalid Coloumn Should Return Error 400', async function () {
        let res = await chai.request(baseUrl).get(apiEndPoint).query({HTTPSSS: 5});
        expect(res.status).to.equal(400);
    });
    
});
