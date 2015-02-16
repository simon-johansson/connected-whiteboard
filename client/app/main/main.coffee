'use strict'

angular.module 'cwApp'
.config ($stateProvider) ->
  $stateProvider
  .state 'main',
    url: '/:date'
    templateUrl: 'app/main/main.html'
    controller: 'MainCtrl as main'
    resolve:
      photos: (PhotoService) ->
        PhotoService.getImageJSON()
