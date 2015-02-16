'use strict'

angular.module 'cwApp'
.config ($stateProvider) ->
  $stateProvider
  .state 'about',
    url: '/about',
    templateUrl: 'app/about/about.html'
    # controller: 'AboutCtrl as about'
