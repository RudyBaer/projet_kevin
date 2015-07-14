var app=angular.module("app", []);

app.controller("main",['$scope','$http', function ($scope,$http)
{
    $scope.kevin="Kevin";

    $scope.jokes=[];

    $scope.predicate='';
    $scope.reverse=false;

    $http.get('api/joke')
        .success(function(data) {
            $scope.jokes=data;
        }).
        error(function(data, status, headers, config) {
            console.log(data);
        });

    $scope.jokefilter={}

    $scope.jokefilter.txt="";

    $scope.addJoke=function(joke) {
        var j={};
        j.txt=joke;
        j.date=new Date();
        $http.post('api/joke',j)
            .success(function(data) {
                $scope.jokes.push(j);
                $scope.joke="";
            }).
            error(function(data, status, headers, config) {
                console.log(data);
            });
    }

    $scope.order=function(order) {
        $scope.predicate=order;
        $scope.reverse=!$scope.reverse;
    }


}]);


app.controller("jokeController",['$scope','$http', function ($scope,$http)
{
    $scope.addFavorite=function(joke) {
        joke.favorite=true;
        updateJoke(joke);
    }

    $scope.removeFavorite=function(joke) {
        joke.favorite=false;
        updateJoke(joke);
    }

    $scope.plusOne=function(joke) {
        if (joke.score == undefined) {
            joke.score=0;
        }
        joke.score+=1;
        updateJoke(joke);
    }

    var updateJoke=function(joke) {
        $http.put('api/joke',joke)
            .success(function(data) {

            }).
            error(function(data, status, headers, config) {
                console.log(data);
            });
    }
}]);
