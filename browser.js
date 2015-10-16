var h = require('hyperscript')
var fs = require('fs')
var insertCss = require('insert-css');
var css = fs.readFileSync(__dirname + '/css/styles.css');
insertCss(css);

//include bootstrap 
document.head.appendChild(
	h('link', {
		rel: 'stylesheet', 
		href: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'
	})
)

document.body.appendChild(		//when router loads it will load all of its contents in here
	h('div', {'data-ui-view': ''})
)

var angular = require('angular')

//initialize angular app 
var app = angular.module('app', [
	require('angular-ui-router')
 ])
.config([
	'$urlRouterProvider',
	'$stateProvider', 
	require('./ngconfig')
])
.factory('board', 
  require('./factories/board'))
.factory('game', 
  require('./factories/game'))


angular.element(document).ready(function(){
	angular.bootstrap(document, ['app'])
})
