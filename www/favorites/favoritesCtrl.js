(function() {
    'use strict';

    function favoritesCtrl(favorites, $cordovaSocialSharing) {
        var vm = this;
        vm.favorites = favorites.getFavorites();

        vm.delete = function(index) {
            favorites.deleteItem(index);
        }

        vm.share = function(index) {
            $cordovaSocialSharing
                .share("te mando este link por que me parece muy copado", "oportunidad mercado libre", null, vm.favorites[index].permalink)
                .then(function(result) {
                	console.log(result);
                }, function(err) {
                	console.log(err);
                });
        }
    }

    angular.module('mercadoApp.favorites.controller', [])
        .controller('favoritesCtrl', ['favorites', '$cordovaSocialSharing', favoritesCtrl])
})();
