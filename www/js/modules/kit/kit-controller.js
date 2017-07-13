angular.module('kit.controllers', [])

.controller('kitCtrl', function ($scope, $ionicModal, $state, FirebaseService, $ionicLoading, $rootScope,$ionicLoading) {


    $scope.createUser = function (user) {
        console.log("Create User Function called");
        if (user && user.email && user.password && user.displayname) {
            $ionicLoading.show({
                template: 'Signing Up...'
            });

            FirebaseService.getServiceRef().$createUserWithEmailAndPassword(user.email, user.password)
            .then(function(firebaseUser) {
              $scope.message = "User created with uid: " + firebaseUser.uid;
              $ionicLoading.hide();

              $state.go('app.login');
          }).catch(function(error) {
              $scope.error = error;

              alert("Error: " + error);
              $ionicLoading.hide();
          });
      } else
      alert("Please fill all details");
  }

});
