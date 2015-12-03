
'use strict'

class Photo
  constructor: (properties = {}) ->
    unless angular.isObject properties
      throw "'#{@.constructor?.name}' properties must be contructed with an object '{}'"
    {@filename, @ISOString, @timeAgo, @timestamp} = properties

class InfoOverlay extends Photo
  constructor: (properties = {}) ->
    super {filename: 'assets/images/empty.png'}
    @type = 'overlay'
    @maxTime = properties.maxTime or 120
    @heading = 'Photo is beeing taken'
    @description = "Can take up to #{@maxTime / 60} min"
    @elapsedTime = 0
    @$interval = properties.$interval
    @startcounter()

  startcounter: ->
    @interval = @$interval =>
      if @elapsedTime <= @maxTime then @elapsedTime += 1
      else @stopCounter()
    , 1000

  stopCounter: ->
    @$interval.cancel(@interval)


angular.module 'cwApp'
.controller 'MainCtrl',
($scope, $stateParams, $log, PhotoService, photos, $interval) ->

  new class MainCtrl
    constructor: ->
      console.log photos
      @data =
        photos: angular.copy(photos)
        current: photos[0]
      @states =
        index: 0
        requestingPhoto: no
        drawing: no
        # Vad göra med params?
        params: $stateParams

      @bindEvents()


    bindEvents: ->
      $scope.$on 'fooCalled', (data) -> console.log(data)
      # $scope.$on 'watingForNewPhoto', (data) -> show InfoOverlay
      # $scope.$on 'newPhoto', (data) -> show newPhoto or/and notification

      @bindWatch ->
        @states.index
      , (newIndex) =>
        @setCurrentPhoto(newIndex)

      @bindWatch ->
        @data.photos[0]
      , (newIndex) =>
        @setCurrentPhoto(0)

    bindWatch: (val, cb) ->
      $scope.$watch angular.bind(@, val), cb

    setCurrentPhoto: (index) ->
      @data.current = @data.photos[index]
      @setIndexTo(index) unless @states.index is index

    requestNewPhoto: ->
      @states.requestingPhoto = yes
      PhotoService.requestNew()
      .then =>
        # Flytta ut som global value
        maxTime = 120
        @data.photos.unshift new InfoOverlay {$interval: $interval, maxTime: maxTime}
        PhotoService.startPolling {maxTime: maxTime}
      .then (data) =>
        console.log(data)
        @data.photos = data
        @states.requestingPhoto = no
      .catch (err) =>
        console.log(err)
        @states.requestingPhoto = no

    # requestNewPhoto: ->
    #   @states.requestingPhoto = yes
    #   PhotoService.requestNew()
    #   .then =>
    #     maxTime = 120
    #     @data.photos.unshift new InfoOverlay {$interval: $interval, maxTime: maxTime}
    #     PhotoService.startPolling {maxTime: maxTime}
    #   .then (data) =>
    #     console.log(data)
    #     @data.photos = data
    #     @states.requestingPhoto = no
    #   .catch (err) =>
    #     console.log(err)
    #     @states.requestingPhoto = no

    setIndexTo: (index) ->
      @states.index = index if index? and @data.photos[index]?
    setIndexToOlder: ->  @setIndexTo(@states.index + 1)
    setIndexToNewer: ->  @setIndexTo(@states.index - 1)
    setIndexToLatest: -> @setIndexTo(0)

    isLatestShowing: -> @states.index is 0
    isOldestShowing: -> @states.index is @data.photos.length - 1

    startStopDrawing: ->
      if @states.drawing
        @data.sketcher.destroy()
        window.hideMagnifyer = no
        console.log(window.hideMagnifyer)
      else
        brush = new Image()
        brush.src = 'assets/images/brush2.png'
        brush.onload = =>
          @data.sketcher = new Sketcher( "sketch", brush )
        window.hideMagnifyer = yes
      @states.drawing = !@states.drawing


