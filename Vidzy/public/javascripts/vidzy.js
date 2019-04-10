var app = angular.module('Vidzy', ['ngResource', 'ngRoute']);

app.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-video', {
            templateUrl: 'partials/video-form.html',
            controller: 'AddVideoCtrl'
        })
        .when('/video/:id', {
            templateUrl: 'partials/video-form.html',
            controller: 'EditVideoCtrl'
        })
        .when('/video/delete/:id', {
            templateUrl: 'partials/video-delete.html',
            controller: 'DeleteVideoCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

    // $location object, it must be in HTML5 mode.
    $locationProvider.html5Mode(true);
}]);

app.controller('HomeCtrl', ['$scope', '$resource', '$location',
    function ($scope, $resource, $location) {
        var keyword = $location.search().keyword;
        var Videos = $resource('/api/videos', {
            search: keyword
        });
        Videos.query(function (videos) {
            $scope.videos = videos;
        });
    }
]);

app.controller('AddVideoCtrl', ['$scope', '$resource', '$location',
    function ($scope, $resource, $location) {
        $scope.save = function () {
            var Videos = $resource('/api/videos');
            Videos.save($scope.video, function () {
                $location.path('/');
            });
        };
    }
]);

app.controller('EditVideoCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function ($scope, $resource, $location, $routeParams) {
        var Videos = $resource('/api/videos/:id', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });

        Videos.get({
            id: $routeParams.id
        }, function (video) {
            $scope.video = video;
        });

        $scope.save = function () {
            Videos.update($scope.video, function () {
                $location.path('/');
            });
        }
    }
]);

app.controller('DeleteVideoCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function ($scope, $resource, $location, $routeParams) {
        var Videos = $resource('/api/videos/:id');

        Videos.get({
            id: $routeParams.id
        }, function (video) {
            $scope.video = video;
        })

        $scope.delete = function () {
            Videos.delete({
                id: $routeParams.id
            }, function (video) {
                $location.path('/');
            });
        }
    }
]);