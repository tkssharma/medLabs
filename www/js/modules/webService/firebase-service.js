angular.module('firebase.services', ['firebase']).factory('FirebaseService', FirebaseService);

FirebaseService.$inject = ['$q', '$firebaseAuth', '$firebaseObject','$state'];
/**
 * @name FirebaseService
 * @desc Service for communication with webservice
 */
 function FirebaseService($q, $firebaseAuth, $firebaseObject,$state) {

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
		 _skipIfAuthenticated : function() {
		 	var defer = $q.defer();
		 	if($firebaseAuth().$getAuth()) {
		 		defer.reject(); /* (1) */
		 	} else {
		 		defer.resolve(); /* (2) */
		 	}
		 	return defer.promise;
		 },
		 _redirectIfNotAuthenticated : function() {
		 	var defer = $q.defer();
		 	if($firebaseAuth().$getAuth()) {
		 		defer.resolve(); /* (3) */
		 	} else {
		 		$timeout(function () {
		 			$state.go('app.login'); /* (4) */
		 		});
		 		defer.reject();
		 	}
		 	return defer.promise;
		 }
	   };
	}