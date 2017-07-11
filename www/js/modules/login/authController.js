angular.module('auth.controllers', [])

.controller('authCtrl', function ($scope, $ionicModal, $state, FirebaseService, $ionicLoading, $rootScope,$ionicLoading) {

    $ionicModal.fromTemplateUrl('js/modules/register/register.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

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

  $scope.signIn = function (user) {

    if (user && user.email && user.password) {

        user.email = user.email + '';
        $ionicLoading.show({
            template: 'Signing In...'
        });
        var firebaseUser ={ 
            email: user.email,
            password: user.password
        };
        FirebaseService.getServiceRef().$signInWithEmailAndPassword(firebaseUser.email,firebaseUser.password).then(function(firebaseUser) {
            $rootScope.firebaseUser = firebaseUser;
            $ionicLoading.hide();
            $state.go('app.home');
        }, function(err){
            $ionicLoading.hide();
            alert(err);
        }).catch(function(error) {
            $scope.error = error;
            $ionicLoading.hide();
        });
    } else{
        alert("Please enter email and password both");
    }
}

$scope.reSet = function (user) {
    if (user.email) {
        FirebaseService.getServiceRef().$sendPasswordResetEmail(user.email).then(function() {
            console.log("reset email sent");
            alert("reset email sent");
        }).catch(function(error) {
            alert("reset email failed:" + error.message);
        });
    } else
    alert("Please enter email");
}
});
