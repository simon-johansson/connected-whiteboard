'use strict'

angular.module 'cwApp'
.controller 'MainCtrlOriginal', ($scope, $http, $document, $stateParams, $log, $interval, $timeout) ->
  $scope.data =
    imageArray: []
  $scope.states = {}
  $scope.currentImg = {}

  $scope.status =
    isopen: false
  $scope.toggled = (open) ->
    $log.log('Dropdown is now: ', open)
  # $scope.toggleDropdown = (ev) ->
  #   ev.preventDefault()
  #   ev.stopPropagation()
  #   $scope.status.isopen = !$scope.status.isopen

  # Vad göra med params?
  console.log($stateParams)
  # Flytta ut
  FastClick.attach document.body

  $scope.setIndexTo = (index) ->
    $scope.states.index = index
  $scope.setIndexToOlder = () ->
    if $scope.states.index isnt $scope.data.imageArray.length - 1
      $scope.states.index += 1
  $scope.setIndexToNewer = () ->
    if  $scope.states.index isnt 0
      $scope.states.index -= 1
  $scope.setIndexToLatest = () ->
    console.log 'latest'
    $scope.states.index = 0

  $scope.$watch 'states.index', (newIndex) ->
    $scope.currentImg = $scope.data.imageArray[newIndex]

  $scope.isLatestShowing = () -> $scope.states.index is 0
  $scope.isOldestShowing = () ->
    $scope.states.index is $scope.data.imageArray.length - 1

  $scope.requestPicture = () ->
    $scope.states.requestingNewPhoto = yes
    $http.post('/api/image/request-new', {}).success (data) ->
      $scope.setIndexToLatest()
      # console.log data
      $scope.data.imageArray.splice(0, 0, {
        info: 'Photo is beeing taken'
        filename: 'assets/images/empty.png'
        time: 0
      })
      $scope.currentImg = $scope.data.imageArray[0]
      interval = $interval ->
        if $scope.currentImg.time is 60 then $interval.cancel(interval)
        else
          $scope.currentImg.time += 1
          $http.get('/api/image').success (images) ->
            images = images.reverse()
            if images[0].ISOString isnt $scope.data.imageArray[1].ISOString
              $interval.cancel(interval)
              console.log 'new image!'
              $scope.data.imageArray = images
              $scope.currentImg = $scope.data.imageArray[0]
              $scope.states.requestingNewPhoto = no
      , 1000

  # Gör till en facotory som också håller datan
  $timeout ->
    $http.get('/api/image').success (images) ->
      images = images.reverse()
      $scope.data.imageArray = images
      $scope.items = images
      $scope.setIndexToLatest()
  , 0



