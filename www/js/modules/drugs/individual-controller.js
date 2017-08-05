(function() {
	"use strict";

	angular.module('individual.controllers', []).controller('IndividualCtrl', IndividualCtrl);

	IndividualCtrl.$inject = ['LocalStorageService','DataService','$stateParams','FirebaseService','$ionicLoading'];

	/**
	 * @name EventsCtrl
	 * @desc Application Controller for Events-day screen. Shows events data for specific day on screen
	 */
	function IndividualCtrl(LocalStorageService,DataService,$stateParams,FirebaseService,$ionicLoading) {
		
		var profileData = FirebaseService.setUserProfile();
		var mobile, email, address;
		if (profileData != null) {
			mobile = profileData.mobile;
			address = profileData.address;
			email = profileData.email;
		}
		this.sendhelp = function(_item){
			$ionicLoading.show({template: 'sending request...'});
			if(_item.email === email) {
				$ionicLoading.hide();
				return ;
			}
			firebase.database().ref('requests/' + _item.id).set({
				from: email,
				to: _item.email,
				fromaddress : address,
				toaddress : _item.address,
				frommobile: mobile,
				tomobile :_item.mobile
			});
			$ionicLoading.hide();
		}
		this.kitOwners=LocalStorageService.getMapMarkers();
	}
})();



