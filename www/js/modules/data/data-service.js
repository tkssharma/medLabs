angular.module('data.services', []).factory('DataService', DataService);

DataService.$inject = [];
/**
 * @name DataService
 * @desc Service for data organization
 */
function DataService() {
    return {
        /**
         * @name getData
         * @desc Organizes data and push to list
         * @param {string} retrievedData - data from local storage
         * @returns {string|list}
         */
        getData: function(retrievedData) {
            var data = [];
            angular.forEach(retrievedData, function(value, key) {
                data.push(value);
            });
            return data;
        },
        /**
         * @name getEventsData
         * @desc Organizes events data for some date and push to list
         * @param {string} retrievedData - data about events from local storage
         * @param {string} day - specific day of events
         * @returns {string|list}
         */
        getEventsData: function(retrievedData, day) {
            var eventsData;
            switch (day) {
                case "day01":
                    eventsData = retrievedData.day01;
                    break;
                case "day02":
                    eventsData = retrievedData.day02;
                    break;
                case "day03":
                    eventsData = retrievedData.day03;
                    break;
            }
            return eventsData;
        }
    };
}