var app=angular.module("app", []);

app.controller("main", function ($scope)
  {
    $scope.kevin="Kevin";

    $scope.jokes=[];

    $scope.jokefilter={}

    $scope.jokefilter.txt="";

    $scope.addJoke=function(joke) {
      var j={};
      j.txt=joke;
      j.date=new Date();
      $scope.jokes.push(j);
      $scope.joke="";
    }


  });


  app.controller("jokeController", function ($scope)
    {
      $scope.addFavorite=function(joke) {
        joke.favorite=true;
      }

      $scope.removeFavorite=function(joke) {
        joke.favorite=false;
      }
    });
