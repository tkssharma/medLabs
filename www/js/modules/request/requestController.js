angular.module('request.controllers', [])

.controller('requestController', function($scope,LocalStorageService,$rootScope) {

        this.requests=LocalStorageService.getRequests();

        this.requests =	 Object.values(this.requests).filter(function(_user){
        		return _user.to === $rootScope.firebaseUser.email;
         });
});




