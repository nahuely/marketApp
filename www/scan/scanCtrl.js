(function() {
    'use strict';

    function scanCtrl(barCodeFactory, upcApi, $cordovaToast, mercadolibreApi, $state) {
        var vm = this;

        vm.getBarCode = function() {
            barCodeFactory.getBarCode()
                .then(function(data) {
                    if(data.cancelled === true) {
                        throw new Error('No se ha podido escanear el producto');
                    }
                    return upcApi.getProducts(data.text);
                })
                .then(function(data) {
                    var status = data.data.status.message;
                    var code = data.data.status.code;
                    var brand = data.data.product.attributes.brand;
                    var prod = data.data.product.attributes.product;

                    if(status === 'Product not found' || prod === '' || code == "400") {
                        throw new Error('No encontrado en upc');
                    }

                    var item = prod + ' ' + (brand || '');
                    $state.go('layout.list', {scanQuery: item})
                })
                .catch(function(err) {
                    $cordovaToast.show(err.message, 'long', 'bottom');
                })
        }
    }

    angular.module('mercadoApp.scan.controller', [])
        .controller('scanCtrl', ['barCodeFactory', 'upcApi', '$cordovaToast', 'mercadolibreApi', '$state', scanCtrl])
})();
