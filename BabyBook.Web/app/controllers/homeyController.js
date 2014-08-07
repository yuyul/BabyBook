app.controller('homeyController', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.roleName = $routeParams.role;
}]);