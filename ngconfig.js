module.exports = function ($urlRouterProvider, $stateProvider){
	$urlRouterProvider.otherwise('/')
	$stateProvider 
		.state('home', require('./components/home'))
}