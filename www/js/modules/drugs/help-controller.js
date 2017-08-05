(function() {
    "use strict";

    angular.module('help.ctrl', []).controller('HelpCtrl', HelpCtrl);

    HelpCtrl.$inject = ['LocalStorageService','DataService','$stateParams'];

    /**
     * @name EventsCtrl
     * @desc Application Controller for Events-day screen. Shows events data for specific day on screen
     */
    function HelpCtrl(LocalStorageService,DataService,$stateParams) {
        this.day=$stateParams.day;
        this.events=DataService.getEventsData(LocalStorageService.getEvents(),'day01')
    }
})();