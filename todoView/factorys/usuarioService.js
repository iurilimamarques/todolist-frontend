var app = angular.module('todoListApp');

app.service('usuarioService', function() {
    var usuarioLogado = {};
    var service = {}

    service.setUsuario = function(newObj) {
        usuarioLogado = newObj;
    };

    service.getUsuarioLogado = function() {
        return usuarioLogado;
    }

    return service;
});