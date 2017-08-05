angular.module('firebase.services', ['firebase']).factory('FirebaseService', FirebaseService);

FirebaseService.$inject = ['$q', '$firebaseAuth', '$firebaseObject', '$state','LocalStorageService','$timeout','$ionicLoading'];
/**
 * @name FirebaseService
 * @desc Service for communication with webservice
 */
function FirebaseService($q, $firebaseAuth, $firebaseObject, $state,LocalStorageService,$timeout,$ionicLoading) {

    return {
        /**
         * @name getData
         * @desc Fetch and synchronize data from web service
         * @param {string} lang- language (hr,en..)
         * @returns {Object[]|json}
         */
        getServiceRef: function() {
            return $firebaseAuth();
        },
        getApplicationData: function() {
            var defer = $q.defer();

            $ionicLoading.show({
                template: 'Loading Data...'
            });

            if ($firebaseAuth().$getAuth()) {
                var ref = firebase.database().ref();
                var obj = $firebaseObject(ref);
                // to take an action after the data loads, use the $loaded() promise
                obj.$loaded().then(function() {
                    defer.resolve();
                    console.log("loaded record:", obj.$id, obj.someOtherKeyInData);

                    // To iterate the key/value pairs of the object, use angular.forEach()
                    LocalStorageService.setEvents(obj['events']);
                    //LocalStorageService.setRenaissance(data.$getRecord('renaissance'));
                    LocalStorageService.setContacts(obj['contacts']);
                    // LocalStorageService.setSponsors(data.$getRecord('sponsors'));
                    LocalStorageService.setMapMarkers(obj['locations']);
                    LocalStorageService.setUsers(obj['users']);
                    LocalStorageService.setRequests(obj['requests']);

                    LocalStorageService.setQA(obj['qa']);
                    LocalStorageService.setData('true');
                    $ionicLoading.hide();
                }, function() {
                    defer.reject();
                    $ionicLoading.hide();
                });
            } else {
                $timeout(function() {
                    $state.go('app.login'); /* (4) */
                });
                defer.reject();
                $ionicLoading.hide();
            }
            return defer.promise;
        },
        setUserProfile : function(){
         var firebaseUser = $firebaseAuth().$getAuth();
         var _users = LocalStorageService.getUsers();
            if (firebaseUser) {
              angular.forEach(_users , function(_user){
                if(_user.email === firebaseUser.email){
                    firebaseUser.mobile = _user.mobile;
                    firebaseUser.address = _user.address;
                    firebaseUser.email = _user.email;
                }
              });
            }
            return firebaseUser ? firebaseUser : null; 
        },
        getAuth: function() {
            var firebaseUser = $firebaseAuth().$getAuth();
            if (firebaseUser) {
                return true;
            } else {
                return false;
            }
        },
        getCurrentUser: function() {
            return firebase.auth().currentUser;
        },
        _skipIfAuthenticated: function() {
            var defer = $q.defer();
            if ($firebaseAuth().$getAuth()) {
                defer.reject(); /* (1) */
            } else {
                defer.resolve(); /* (2) */
            }
            return defer.promise;
        },
        _redirectIfNotAuthenticated: function() {
            var defer = $q.defer();
            if ($firebaseAuth().$getAuth()) {
                defer.resolve(); /* (3) */
            } else {
                $timeout(function() {
                    $state.go('app.login'); /* (4) */
                });
                defer.reject();
            }
            return defer.promise;
        }
    };
}
