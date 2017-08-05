angular.module('auth.controllers', [])

.controller('authCtrl', function ($scope, $ionicModal, $state, FirebaseService, $ionicLoading, $rootScope,$ionicLoading,LocalStorageService,MapGeolocationService,$ionicHistory) {


	if(FirebaseService.getAuth()){
		$state.go('app.home');
	}
    $ionicHistory.clearCache();

	$scope.$on("$ionicView.enter", function () {
		   $ionicHistory.clearCache();
		   $ionicHistory.clearHistory();
	});

	var userLocation;
	if(! LocalStorageService.getUserLocation()){
			MapGeolocationService.getLocation().then(function(response) {
				LocalStorageService.setUserLocation(response);
				userLocation = LocalStorageService.getUserLocation();
				return MapGeolocationService.getAddress(response.latitude, response.longitude)
		}).then(function(_address) {
				userLocation.address = _address;
	});
	}else{
		userLocation = LocalStorageService.getUserLocation();
		MapGeolocationService.getAddress(userLocation.latitude, userLocation.longitude).then(function(_address) {
		userLocation.address = _address;
	  });
	}
		$scope.createUser = function (user) {
				console.log("Create User Function called");
				if (user && user.email && user.password && user.mobile) {
						$ionicLoading.show({
								template: 'Signing Up...'
						});

						FirebaseService.getServiceRef().$createUserWithEmailAndPassword(user.email, user.password)
						.then(function(firebaseUser) {
							$scope.message = "User created with uid: " + firebaseUser.uid;
							// add data to user collection in firebase 
						$ionicLoading.show({
								template: 'adding data...'
						});
						firebase.database().ref('users/' + userLocation.idKey).set({
								email: user.email,
								idKey: userLocation.idKey,
								id : userLocation.idKey,
								mobile : user.mobile,
								address: userLocation.address,
								latitude: userLocation.latitude,
								longitude: userLocation.longitude
						});
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
