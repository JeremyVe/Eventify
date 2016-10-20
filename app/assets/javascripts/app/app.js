var eventify = angular.module('eventify', ['ui.router', 'restangular', 'Devise']);


eventify.config(
	['$urlRouterProvider', '$stateProvider',
		function ($urlRouterProvider, $stateProvider) {

			$urlRouterProvider.otherwise('/create');

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
									$state.go('home.create');
								}
							)
						};
					}]
				})

			.state('signup', {
					url: '/signup',
					templateUrl: 'templates/auth/sign_up.html',
					controller: ['Auth', '$scope', '$state', function (Auth, $scope, $state) {
						var config = {
							headers: {
								'X-HTTP-Method-Override': 'POST'
							}
						};
						$scope.signup = function (params) {
							Auth.register(params, config).then(
								function success(user) {
									$scope.signupParams = {};
									$state.go('home.create');
								}
							)
						}
					}]
				})
				.state('home', {
					url: '/',
					abstract: true,
					template: "<ui-view></ui-view>",
					resolve: {
						currentUser: ['$state', 'Auth',
							function ($state, Auth) {

								return Auth.currentUser().then(
									function success(user) {
										console.log(user);
										return user;
									},
									function (error) {
										$state.go('signin');
									}
								);

							}
						]
					},
					controller: ['$scope', 'currentUser', function ($scope, currentUser) {
						$scope.currentUser = currentUser;
					}]
				})
				.state('home.create', {
					url: 'create',
					templateUrl: 'templates/create.html',
					controller: 'CreateCtrl'
				})


			.state('events', {
				abstract: true
			})

		}
	])
