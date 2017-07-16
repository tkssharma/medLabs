angular.module('mapGeolocation.services', [])

/**
 * @name MapGeolocationService
 * @desc Service for user geolocation
 */
.factory('MapGeolocationService', ['$q', '$http',
    function($q, $http) {

        return {
            /**
             * @name getLocation
             * @desc method returns user geolocation
             * @returns {object} user geolocation coordinates
             */
            getLocation: function() {
                var q = $q.defer();
                navigator.geolocation.getCurrentPosition(function(position) {
                    var key = Math.floor((Math.random() * 10000) + 1);
                    var userLocation = {
                        idKey: key,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/blue.png',
                        title: 'Your location'
                    };
                    q.resolve(userLocation);
                }, function(error) {
                    q.reject(error);
                }, { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true });
                return q.promise;
            },
            getAddress: function(lat, lng) {
                var q = $q.defer();
                $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng).success(function(_response) {
                    var _data = _response.results[0].formatted_address
                    q.resolve(_data);
                }, function(error) {
                    q.reject(error);
                }, { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true });
                return q.promise;
            }
        }
    }
]);