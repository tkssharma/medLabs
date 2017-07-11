angular.module('firebase.services', ['firebase']).factory('FirebaseService', FirebaseService);

FirebaseService.$inject = ['$q','$firebaseAuth','$firebaseObject'];
/**
* @name FirebaseService
* @desc Service for communication with webservice
*/
function FirebaseService($q,$firebaseAuth,$firebaseObject) {

    return {
        /**
        * @name getData
        * @desc Fetch and synchronize data from web service
        * @param {string} lang- language (hr,en..)
        * @returns {Object[]|json}
        */
        getServiceRef : function(){
            return $firebaseAuth();
        },
        getAuth : function(){
            var firebaseUser = $firebaseAuth().$getAuth();
            if (firebaseUser) {
              return true;
          } else {
              return false;
          }
      }
  };
}
