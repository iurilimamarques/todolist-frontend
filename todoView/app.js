'use strict';

var app = angular.module('todoListApp', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                controller: "usuarioController",
                templateUrl:"./loginUsuario.html"
            })

            .when("/cadastro", {
                controller: "usuarioController",
                templateUrl:"./cadastroUsuario.html"
            })

            .when("/atividade", {
                controller: "atividadeController",
                templateUrl:"./atividades.html"
            })
            
            .otherwise({redirectTo: '/'});

        $locationProvider.hashPrefix('');
});
