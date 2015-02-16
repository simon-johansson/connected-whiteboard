'use strict'

describe 'Directive: imgLoader', ->

  # load the directive's module
  beforeEach module 'cwApp'
  element = undefined
  scope = undefined
  beforeEach inject ($rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<img-loader></img-loader>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the imgLoader directive'
