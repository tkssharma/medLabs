angular.module('kit.controllers', [])

.controller('kitCtrl', function($scope, $ionicModal, $state, FirebaseService, $ionicLoading, $rootScope, $ionicLoading, LocalStorageService, MapGeolocationService) {

    MapGeolocationService.getLocation().then(function(response) {
        LocalStorageService.setUserLocation(response);
        userLocation = LocalStorageService.getUserLocation();
        return MapGeolocationService.getAddress(response.latitude, response.longitude)
    }).then(function(_address) {
        userLocation.address = _address;
    })

    $scope.createUser = function(user) {
        console.log("Create User Function called");
        if (user && user.email && user.fname && user.lname) {
            $ionicLoading.show({
                template: 'saving data...'
            });

            firebase.database().ref('locations/' + userLocation.idKey).set({
                name: user.fname,
                key: userLocation.idKey,
                email: user.email,
                address: userLocation.address,
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/blue.png',
                title: userLocation.title
            });
            $ionicLoading.hide();
            $state.go('app.map');

        } else
            alert("Please fill all details");
    }

});