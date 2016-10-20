var eventify = angular.module('eventify', ['ui.router', 'restangular', 'Devise']);


eventify.config(
	['$urlRouterProvider', '$stateProvider',
	function($urlRouterProvider, $stateProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('create', {
			url: '/',
			templateUrl: 'templates/create.html',
			resolve: {
				currentUser: ['$state', 'Auth',
					function($state, Auth) {
						if (!Auth.isAuthenticated()) {
							$state.go('signin');
						} 
					}]
			}
		})

		.state('signin', {
			url: '/signin',
			template: 'sign in'

		})

		.state('signup', {
			url: 'signup',
			template: 'sign up'

		})

		.state('events', {
			abstract: true
		})

	}])