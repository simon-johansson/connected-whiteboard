'use strict'

angular.module 'cwApp'
.directive 'imgLoader', ->
  restrict: 'A'
  link: (scope, element, attrs, $window, $timeout) ->
    fakeLoad = 0
    overlay = $(element.siblings('div')[1])
    canvas = $(element.siblings('canvas')[0])
    loadImage = ->
      # console.log(overlay);
      # console.log(canvas);
      element.addClass 'loading-img'
      # overlay.addClass 'show'
      overlay.fadeIn()
      img = new Image()
      setTimeout ->
        img.src = attrs.customSrc
      , fakeLoad
      img.onload = ->
        element[0].src = attrs.customSrc
        resizeInit(attrs.customSrc, element[0].width, element[0].height)
        # overlay.removeClass 'show'
        overlay.fadeOut()
        element.removeClass 'loading-img'

        initMagnify(attrs.customSrc)

    onResize = ->
      width = $(element).width()
      $(element).css( "height", 'auto')
      $(element).css( "height", width * 1.2)

    resizeInit = (src, w, h) ->
      width = $(element).width()
      $(element).css( "height", 'auto')
      $(element).css( "height", width * 1.2)
      canvas[0].width = width
      canvas[0].height = $(element).height()

    $(window).resize ->
      onResize()

    scope.$watch ->
      attrs.customSrc
    , (newVal, oldVal) ->
      if oldVal isnt newVal
        loadImage()

    loadImage(attrs.customSrc)
