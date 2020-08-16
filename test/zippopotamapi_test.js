var chakram = require('chakram'),
    expect = require('chakram').expect;

describe('Zippopotam API test', function() {
    it('should return a response with HTTP code 200', function() {
        let response = chakram.get("http://api.zippopotam.us/de/bw/stuttgart");
        expect(response).to.have.status(200);
        return chakram.wait();
    });

    it('should have a response time below 1s', function() {
        let request = chakram.get("http://api.zippopotam.us/de/bw/stuttgart");
        return expect(request).to.have.responsetime(999);
    });

    it('should return country Germany and state Baden-Württemberg', function() {
        let response = chakram.get("http://api.zippopotam.us/de/bw/stuttgart").then((resp) => {
            expect(resp.body.country).to.equal('Germany');
            expect(resp.body.country).to.equal('Baden-Württemberg');
            return chakram.wait();
        });
    });

    it('should have place name Stuttgart Degerloch for post code 70597', function() {
        let response = chakram.get("http://api.zippopotam.us/de/bw/stuttgart").then((resp) => {
            for (let place in resp.body.places) {
                if (place['post code'] == 70597) {
                    expect(place['place name']).to.equal('Stuttgart Degerloch');
                }
            }
            return chakram.wait();
        });
    });
});

