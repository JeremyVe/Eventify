var eventify = angular.module('eventify', ['ui.router', 'restangular', 'Devise']);


eventify.config(
	['$urlRouterProvider', '$stateProvider',
		function ($urlRouterProvider, $stateProvider) {

			$urlRouterProvider.otherwise('/');

			$stateProvider
				.state('signin', {
					url: '/signin',
					templateUrl: 'templates/auth/sign_in.html',
					controller: ['Auth', '$scope', '$state', function (Auth, $scope, $state) {
						var config = {
							headers: {
								'X-HTTP-Method-Override': 'POST'
							}
						};
						$scope.signin = function (params) {
							Auth.login(params, config).then(
								function success(user) {
									$scope.signinParams = {};
									$state.go('create');
								}
							)
						};
					}]
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
						currentUser: ['$state', 'Auth',
							function ($state, Auth) {

								Auth.currentUser().then(
									function success(user) {
										return user;

									}, function(error) {
										$state.go('signin');
									}
								);

							}
						]
					}
				})


			.state('events', {
				abstract: true
			})

		}
	])

