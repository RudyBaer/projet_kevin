var app=angular.module("app", []);

app.controller("main",['$scope','$http', function ($scope,$http)
{
    $scope.kevin="Kevin";

    $scope.jokes=[];

    $scope.predicate='';
    $scope.reverse=false;

    $scope.jokefilter={};

    $scope.jokefilter.txt="";

    $scope.gens = ['kevin', 'youen', 'jonathan', 'rudy', 'aurélien'];

    $http.get('api/joke')
        .success(function(data) {
            $scope.jokes=data;
        }).
        error(function(data, status, headers, config) {
            console.log(data);
        });



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

    $scope.addComment=function(joke,comment) {
        if (joke.comments==undefined) {
            joke.comments=[];
        }
        comment.date= new Date();
        joke.comments.push(comment);
        $http.put('api/joke',joke)
            .success(function(data) {
            }).
            error(function(data, status, headers, config) {
                console.log(data);
            });
    }

    $scope.order=function(order) {
        $scope.predicate=order;
        $scope.reverse=!$scope.reverse;
    }

    $scope.validate=function(comment) {
        if (comment!=undefined && comment.txt!=undefined && comment.txt!="" && comment.name!=undefined && comment.name!="") {
            return false;
        } else {
            return true;
        }
    }


}]);


app.controller("jokeController",['$scope','$http','$rootScope', function ($scope,$http,$rootScope)
{
    $scope.addFavorite=function(joke) {
        joke.favorite=true;
        updateJoke(joke);
        $rootScope.$broadcast('favorite',joke);
    }

    $scope.removeFavorite=function(joke) {
        joke.favorite=false;
        updateJoke(joke);
        $rootScope.$broadcast('unfavorite',joke);
    }

    $scope.plusOne=function(joke) {
        if (joke.score == undefined) {
            joke.score=0;
        }
        joke.score+=1;
        updateJoke(joke);
        $rootScope.$broadcast('plusOne',joke);
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

app.controller("notificationController",['$scope','$rootScope', function ($scope,$rootScope) {

    $scope.$on('plusOne', function(event,joke) {
        if (joke!=undefined) {
            $scope.notification = "+1 sur blague \"" + joke.txt + "\"";
        }
    });
    $scope.$on('favorite', function(event,joke) {
        if (joke!=undefined) {
            $scope.notification = "\"" + joke.txt + "\" ajouté aux favoris.";
        }
    });
    $scope.$on('unfavorite', function(event,joke) {
        if (joke!=undefined) {
            $scope.notification = "\"" + joke.txt + "\" retiré des favoris.";
        }
    });

}]);


app.filter('score', function () {

    var STARS = {
        1: '\u2605',
        2: '\u2605\u2605',
        3: '\u2605\u2605\u2605',
        4: '\u2605\u2605\u2605\u2605',
        5: '\u2605\u2605\u2605\u2605\u2605'
    };

    return function(startCount) {
        return STARS[startCount];
    };
});
