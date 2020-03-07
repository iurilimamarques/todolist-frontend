var app = angular.module('todoListApp');
    app.controller('usuarioController', function($scope, $http, $window){

        $scope.usuarioCadastro = {};
        $scope.usuarioLogin = {};
        $scope.erroFormulario = '';
        
        $scope.setUsuario = function() {
            $http({ 
                method: 'POST',
                url: BASE_URL+'/api/usuario',
                headers : {
                        'Accept': 'application/json'
                },
                data: $scope.usuarioCadastro
            }).then(function(retorno) {
                if (retorno.data.id_usuario!=undefined) {
                    $window.location.href = '#/';
                }else{
                    $scope.formCadastro.$setPristine();
                    $scope.erroFormulario = retorno.data.response;
                }            
            }, function(erro) {
                console.log(erro);
            });
        }

        $scope.loginUsuario = function() {        
            $http({
                method: 'POST',
                url: BASE_URL+'/api/login',
                headers : {
                        'Accept': 'application/json'
                },
                data: $scope.usuarioLogin
            }).then(function(retorno) {                                
                if (retorno.data.response==null) {
                    $scope.formLogin.$setPristine();
                    $scope.erroLogin = 'Nenhum usuário com este e-mail!';
                }else{
                    //usuarioService.setUsuario(retorno.data.response);
                    Object.keys(retorno.data.response).map(function(key) {
                        localStorage.setItem(key, retorno.data.response[key]);
                    });
                    /*localStorage.setItem('usuario', retorno.data.response.nome);*/
                    $window.location.href = '#/atividade';
                }
                    
            }, function(erro) {
                console.log(erro);
            });
        }
        
    });
