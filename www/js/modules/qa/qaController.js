angular.module('qa.controllers', [])

.controller('qaController', function($scope,LocalStorageService) {
$scope.groups = LocalStorageService.getQA();

/*
 * if given group is the selected group, deselect it
 * else, select the given group
 */
$scope.toggleGroup = function(group) {
  if ($scope.isGroupShown(group)) {
    $scope.shownGroup = null;
  } else {
    $scope.shownGroup = group;
  }
};
$scope.isGroupShown = function(group) {
  return $scope.shownGroup === group;
};

});
