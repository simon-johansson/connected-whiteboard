'use strict'

angular.module 'cwApp'
.controller 'NavbarCtrl', ($scope, $location) ->
  $scope.menu = [
    title: 'About'
    link: '/about'
  ]
  $scope.isCollapsed = true

  $scope.isActive = (route) ->
    route is $location.path()
