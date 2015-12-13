
'use strict'

angular.module 'cwApp'
.factory 'PhotoService', ($http, $timeout, $q, $rootScope) ->

  photos = []
  requests =
    get:
      method: 'GET'
      url: '/api/image'
      cache: false
    post:
      method: 'POST'
      url: '/api/image/request-new'
  timeoutTime = 2000

  # Slå ihop denna med requestNew
  requestNew = ->
    postRaspberryConfigJSON().
    then ->
      $rootScope.$broadcast('fooCalled', 'test')

  startPolling = (maxTime) ->
    # Använd events sisället för promises
    # d = $q.defer()
    cache = photos[0]
    counter = 0
    fn = ->
      if (counter += 1) >= ((maxTime or 120) / (timeoutTime / 1000))
        err = new Error 'message'
        err.http_code = 503
        # d.reject err
        # $rootScope.$broadcast('fooCalled', 'test')
      else
        getImageJSON().then (result) ->
          # console.log counter
          # console.log cache, photos[0]
          if cache.id is photos[0].id
            $timeout fn, timeoutTime
          else d.resolve(result)
    fn()
    d.promise

  getImageJSON = ->
    $http(requests.get)
    .then (result) ->
      photos = result.data

  postRaspberryConfigJSON = ->
    $http(requests.post)

  # Public API here
  getImageJSON: getImageJSON
  requestNew: requestNew
  startPolling: startPolling
