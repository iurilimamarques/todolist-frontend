var app = angular.module('todoListApp');
    app.controller('usuarioController', function($scope, $http, $window){

        $scope.usuarioCadastro = {};
        $scope.usuarioLogin = {};
        $scope.erroFormulario = '';
        $scope.loading = false;
        
        $scope.setUsuario = function() {
            $scope.loading = true;
            $http({ 
                method: 'POST',
                url: BASE_URL+'/api/usuario',
                headers : {
                        'Accept': 'application/json'
                },
                data: $scope.usuarioCadastro
            }).then(function(retorno) {
                $scope.loading = false;
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
            $scope.loading = true;
            $http({
                method: 'POST',
                url: BASE_URL+'/api/login',
                headers : {
                        'Accept': 'application/json'
                },
                data: $scope.usuarioLogin
            }).then(function(retorno) {         
                $scope.loading = false;
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
