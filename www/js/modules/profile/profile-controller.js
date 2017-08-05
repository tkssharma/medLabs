(function() {
    "use strict";
    angular.module('profile.controllers', []).controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['LocalStorageService', '$ionicModal', '$scope', 'FirebaseService'];

    /**
     * @name SponsorsCtrl
     * @desc Application Controller for sponsors screen. Shows sponsors data on screen
     *       and sponsors details on modal screen
     */
    function ProfileCtrl(LocalStorageService, $ionicModal, $scope, FirebaseService) {
        var that = this;
        this._$scope = $scope;

        this.profileData = FirebaseService.setUserProfile();
        var name, email, photoUrl, uid, emailVerified;

        if (this.profileData != null) {
            this.mobile = this.profileData.mobile;
            this.address = this.profileData.address;
            this.email = this.profileData.email;
            this.photoUrl = this.profileData.photoURL;
            this.emailVerified = this.profileData.emailVerified;
            this.uid = this.profileData.uid; // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
        }

    }

    /**
     * @name openModal
     * @desc It's opening modal
     */
    ProfileCtrl.prototype.openModal = function(decription, img) {
        this.details = {
            description: decription,
            img: img
        };
        this._$scope.modal.show();
    };

    /**
     * @name closeModal
     * @desc It's closing modal
     */
    ProfileCtrl.prototype.closeModal = function() {
        this._$scope.modal.hide();
    };

})();