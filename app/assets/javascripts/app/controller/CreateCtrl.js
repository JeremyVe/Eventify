eventify.controller('CreateCtrl', 
	['currentUser', '$scope', 'Auth', '$state',
	function (currentUser, $scope, Auth, $state) {

	$scope.currentUser = currentUser;


	$scope.logout = function() {
		Auth.logout().then(function() {
			$state.go('signin');
		})
	}
}]);
