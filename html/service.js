app.factory("jokeService", ['$http', '$q', function ($http, $q) {
        var jokeService = {};
        jokeService.getJokes = function () {
            var defer = $q.defer();
            $http.get('api/joke')
                .success(function (data) {

                    defer.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    console.log(data);
                });
            return defer.promise;
        };

        jokeService.addComment = function (joke, comment) {
            if (joke.comments == undefined) {
                joke.comments = [];
            }
            comment.date = new Date();
            joke.comments.push(comment);
            $http.put('api/joke', joke)
                .success(function (data) {
                }).
                error(function (data, status, headers, config) {
                    console.log(data);
                });
        };

        jokeService.addJoke = function (joke) {
            var defer = $q.defer();
            console.log(joke);

            var j = {};
            j.txt = joke;
            j.date = new Date();
            $http.post('api/joke', j)
                .success(function (data) {
                    defer.resolve();
                }).
                error(function (data, status, headers, config) {
                    defer.reject()
                    console.log(data);
                });
            return defer.promise;
        }

        return jokeService;
    }]
)