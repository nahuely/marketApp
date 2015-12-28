(function() {
	'use strict';

	function explanationCtrl($localStorage, $state, $cordovaOauth) {
		var vm = this;

		vm.cambioSlide = function(index) {
			console.log(index)
		}

		vm.explanationDone = function() {
			$localStorage.explanationDone = true;
			$state.go('layout.list');
		}

		vm.login = function() {
      $cordovaOauth.facebook("532869700222215", ["email", "public_profile", "user_friends"])
				.then(function(result) {
          console.log(result)
        }, function(error) {
        	console.log(error)
        });
		}
	}

	angular.module('mercadoApp.explanation.controller', [])
		.controller('explanationCtrl', ['$localStorage', '$state', explanationCtrl])
})();
