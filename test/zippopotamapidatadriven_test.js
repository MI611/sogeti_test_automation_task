var expect = require('chai').expect,
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    addContext = require('mochawesome/addContext');
chai.use(chaiHttp);

let url = "http://api.zippopotam.us";
let places = [
    { 'country' : 'us', 'postal_code': '90210', 'place_name': 'Beverly Hills'},
    { 'country' : 'us', 'postal_code': '12345', 'place_name': 'Schenectady'},
    { 'country' : 'ca', 'postal_code': 'B2R', 'place_name': 'Waverley'}
];

describe('When the links are working as expected', function() {
    places.forEach(({country, postal_code, place_name }) => {
        it(`should return 200 for request http://api.zippopotam.us/${country}/${postal_code}`, function(done) {
            chai.request(url)
                .get(`/${country}/${postal_code}`)
                .end(function(err, res) {
                    expect(res,`... instead got ${ res.status}`).to.have.status(200);
                    done();
                });
        });
        it(`should have content type JSON for request http://api.zippopotam.us/${country}/${postal_code}` , function(done) {
            chai.request(url)
                .get(`/${country}/${postal_code}`)
                .end(function(err, res) {
                    expect(res,`... instead got ${ res.header['content-type']}`).to.have.header('content-type', 'application/json');
                    done();
                });
        });
        it(`should have a response time below 1s for request http://api.zippopotam.us/${country}/${postal_code}` , function(done) {
            let start = new Date();
            chai.request(url)
                .get(`/${country}/${postal_code}`)
                .end(function(err, res) {
                    let responseTime = new Date() - start;
                    expect(responseTime,`... instead took ${ responseTime }`).to.have.below(1000);
                    done();
                });
        });
        it(`should have country: ${country} and postal code: ${postal_code} for place name: ${place_name}` , function(done) {
            let start = new Date();
            chai.request(url)
                .get(`/${country}/${postal_code}`)
                .end(function(err, res) {
                    expect(res.body['country abbreviation'],`... instead having ${ res.body['country abbreviation'] }`).to.equal(country.toUpperCase());
                    expect(res.body['post code'],`... instead having ${ res.body['post code'] }`).to.equal(postal_code);
                    expect(res.body.places[0]['place name'],`... instead having ${ res.body.places[0]['place name'] }`).to.equal(place_name);
                    done();
                });
        });
    });
});
