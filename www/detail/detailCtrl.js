(function() {
	'use strict';

	function detailCtrl($stateParams, mercadolibreApi, favorites, $cordovaToast) {
		var vm = this;

		vm.changeImage = function(index) {
			vm.selectedImage = vm.productDetail.pictures[index].url;
			console.log(vm.selectedImage)
		}

		vm.addFavorites = function(data) {
			if(favorites.addItem(data)) {
				$cordovaToast.show('Agregado a favoritos', 'long', 'bottom');
			} else {
				$cordovaToast.show('No se pudo agregar a favoritos', 'long', 'bottom');
			}
		}

		vm.productDetail = {};

		mercadolibreApi.queryById($stateParams.id)
			.then(function(data) {
				vm.productDetail = data.data;
				vm.selectedImage = vm.productDetail.pictures[0].url;

			})
			.catch(function(err) {
				console.log(err)
			})
	}

	angular.module('mercadoApp.detail.controller', [])
		.controller('detailCtrl', ['$stateParams', 'mercadolibreApi', 'favorites', '$cordovaToast',detailCtrl])
})();