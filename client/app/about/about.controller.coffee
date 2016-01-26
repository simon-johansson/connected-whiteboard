
angular.module 'cwApp'
.controller 'AboutCtrl',
($scope) ->

  new class AboutCtrl
    constructor: ->
      angular.element(document).find('body').css('overflow', 'auto')
