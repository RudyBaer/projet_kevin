describe('Projet kevin', function () {
    it('should add joke', function () {

        browser.get('http://localhost:3000');

        expect(browser.getTitle()).toEqual('Projet Kevin');

        var jokeCount;
        element.all(by.repeater('joke in jokes')).count().then(function (data) {
            jokeCount = data;

            //console.log(jokeCount);

            // Find the element with ng-model="user" and type "jacksparrow" into it
            element(by.model('joke')).sendKeys('jacksparrow');

            // Find the first (and only) button on the page and click it
            element(by.id('addJokeButton')).click();

            // Verify that there are 10 tasks
            expect(element.all(by.repeater('joke in jokes')).count()).toEqual(jokeCount + 1);

        });
    });
});