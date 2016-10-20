eventify.controller('CreateCtrl', ['$scope', 'Auth', '$state',
	function ($scope, Auth, $state) {

		$scope.logout = function () {
			Auth.logout().then(function () {
				$state.go('signin');
			})
		}
	}
]);
