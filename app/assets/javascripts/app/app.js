var eventify = angular.module('eventify', ['ui.router', 'restangular', 'Devise']);


eventify.config(
	['$urlRouterProvider', '$stateProvider',
		function ($urlRouterProvider, $stateProvider) {

			$urlRouterProvider.otherwise('/');

			$stateProvider
				.state('signin', {
					url: '/signin',
					template: 'sign in'

				})

			.state('signup', {
					url: '/signup',
					template: 'sign up'

				})
				.state('create', {
					url: '/',
					templateUrl: 'templates/create.html',
					controller: 'CreateCtrl',
					resolve: {
						currentUser: ['$state', 'Auth', '$timeout',
							function ($state, Auth, $timeout) {
								if (!Auth.isAuthenticated()) {
									$timeout(function () {
										$state.go('signin');
									})
								}
							}
						]
					}
				})


			.state('events', {
				abstract: true
			})

		}
	])
