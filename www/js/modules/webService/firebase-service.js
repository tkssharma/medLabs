angular.module('firebase.services', ['firebase']).factory('FirebaseService', FirebaseService);

FirebaseService.$inject = ['$q', '$firebaseAuth', '$firebaseObject', '$state','LocalStorageService','$timeout'];
/**
 * @name FirebaseService
 * @desc Service for communication with webservice
 */
function FirebaseService($q, $firebaseAuth, $firebaseObject, $state,LocalStorageService,$timeout) {

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
                    LocalStorageService.setQA(obj['qa']);
                    LocalStorageService.setData('true');
                }, function() {
                    defer.reject();
                });
            } else {
                $timeout(function() {
                    $state.go('app.login'); /* (4) */
                });
                defer.reject();
            }
            return defer.promise;
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
