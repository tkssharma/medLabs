(function() {
    "use strict";

    angular.module('hospital.controllers', []).controller('HospitalCtrl', HospitalCtrl);

    HospitalCtrl.$inject = ['LocalStorageService','DataService','$stateParams'];

    /**
     * @name EventsCtrl
     * @desc Application Controller for Events-day screen. Shows events data for specific day on screen
     */
    function HospitalCtrl(LocalStorageService,DataService,$stateParams) {
        this.day=$stateParams.day;
        this.HospitalData= LocalStorageService.getEvents().day01;
    }
})();



