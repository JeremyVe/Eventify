eventify.controller('CreateCtrl', ['currentUser', '$scope', function (currentUser, $scope) {
	currentUser.then(
		function success(user) {
			$scope.currentUser = user;
		}
	);
}]);
