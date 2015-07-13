var app=angular.module("app", []);

app.controller("main", function ($scope)
  {
    $scope.kevin="Kevin";

    $scope.jokes=[];

    $scope.addJoke=function(joke) {
      var j={};
      j.txt=joke;
      j.date=new Date();
      $scope.jokes.push(j);
      $scope.joke="";
    }
  });
