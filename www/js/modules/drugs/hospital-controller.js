

(function() {
    "use strict";

    angular.module('hospital.controllers', []).controller('HospitalCtrl', HospitalCtrl);

    HospitalCtrl.$inject = ['LocalStorageService','DataService','$stateParams','$ionicLoading'];

    /**
     * @name EventsCtrl
     * @desc Application Controller for Events-day screen. Shows events data for specific day on screen
     */
    function HospitalCtrl(LocalStorageService,DataService,$stateParams,$ionicLoading) {

         $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
        });

        this.day=$stateParams.day;
        this.HospitalData= LocalStorageService.getEvents().day01;
        $ionicLoading.hide();

    }
})();



