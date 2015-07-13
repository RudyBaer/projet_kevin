var app=angular.module("app", []);

app.controller("main", function ($scope)
  {
    $scope.kevin="Kevin";

    $scope.addJoke=function(joke) {
      console.log(joke);
      $scope.joke="";
    }
  });
