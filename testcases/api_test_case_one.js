(async function checkZippopotamApi() {
    const api = 'http://api.zippopotam.us';
    const relativeUrl = '/de/bw/stuttgart';
    try {
        const response = await api.get(relativeUrl)
            .set('Content-Type', 'application/json');
        expect(response).to.have.status(200);
    } finally {
        await driver.quit();
    }
})();


