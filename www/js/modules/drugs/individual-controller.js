(function() {
    "use strict";

    angular.module('individual.controllers', []).controller('IndividualCtrl', IndividualCtrl);

    IndividualCtrl.$inject = ['LocalStorageService','DataService','$stateParams'];

    /**
     * @name EventsCtrl
     * @desc Application Controller for Events-day screen. Shows events data for specific day on screen
     */
    function IndividualCtrl(LocalStorageService,DataService,$stateParams) {
        this.kitOwners=LocalStorageService.getMapMarkers();
    }
})();



