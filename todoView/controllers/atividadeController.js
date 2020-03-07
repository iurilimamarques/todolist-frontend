var app = angular.module('todoListApp');
    app.controller('atividadeController', function($scope, $http){
        
        $scope.atividadesTD = [];
        $scope.atividadesDG = [];
        $scope.atividadesDN = [];

        $scope.getAtividades = function() {
            $http({
                method: 'GET',
                url: BASE_URL+'/api/atividadesUsuario/'+localStorage.getItem('id')
            }).then(function(retorno) {
                $scope.atividadesTD = retorno.data.response['TD'];
                $scope.atividadesDG = retorno.data.response['DG'];
                $scope.atividadesDN = retorno.data.response['DN'];
            }, function(erro) {

            });
        }

        $scope.apagaAtividade = function(id_atividade) {
            swal({
                title: "Tem certeza?",
                text: "",
                icon: "warning",
                buttons: true,
                dangerMode: true
            })
            .then((willDelete) => {
                if (willDelete) {
                    $http({
                        method: 'DELETE',
                        url: BASE_URL+'/api/deletaAtividade/'+id_atividade
                    }).then(function(retorno) {
                        $scope.getAtividades();
                    }, function(erro) {
                        console.log(erro);
                    });
                }
            });
        }

        $scope.setAtividade = function() {
            $http({
                method: 'POST',
                url: BASE_URL+'/api/atividade',
                headers : {
                        'Accept': 'application/json'
                },
                data: { status: $scope.statusAtividade, 
                        nome: $scope.adicionaAtividade.titulo, 
                        descricao: $scope.adicionaAtividade.descricao, 
                        dt_prazo: $scope.adicionaAtividade.dt_prazo, 
                        id_usuario: localStorage.getItem('id'),
                        dt_sistema: moment().format('DD/MM/YYYY') }
            }).then(function(retorno) {
                if (retorno.data.id_atividade!=undefined) {
                    swal("Salvo com sucesso!", "", "success");
                    $scope.getAtividades();
                    $scope.adicionaAtividade = {};
                    $('#modal_nova_atividade').modal('hide');
                }else{
                    swal("Não foi possivel salvar!", "", "error");
                }
            }, function(erro) {

            });
        }

        $scope.editAtividade = function() {
            $http({
                method: 'PUT',
                url: BASE_URL+'/api/editaAtividade/'+$scope.editaAtividade.idAtividade,
                headers : {
                        'Accept': 'application/json'
                },    
                data: { nome: $scope.editaAtividade.nome,
                        status: $scope.editaAtividade.status, 
                        descricao: $scope.editaAtividade.descricao, 
                        dt_prazo: $scope.editaAtividade.dtPrazo, 
                        dt_sistema: moment().format('DD/MM/YYYY'),
                        id_usuario: localStorage.getItem('id') 
                    }
                        
            }).then(function(retorno) {
                if (retorno.data.id_atividade!=undefined) {
                    $scope.fecharModalEditaAtividade();
                    $scope.getAtividades();
                    swal("Editado com sucesso!", "", "success");
                }else{
                    swal("Não foi possivel editar!", "", "error");
                }
            }, function(erro) {
                console.log(erro);
            });
        }

        $scope.updateStatusAtividade = function(novoStatus, id_atividade, primeiroStatus, indexAntigo) {
           
            $http({
                method: 'PUT',
                url: BASE_URL+'/api/updtStatusAtividade/'+id_atividade,
                headers : {
                        'Accept': 'application/json'
                },  
                data: {
                    status: novoStatus
                }
            }).then(function(retorno) {
                if (primeiroStatus=='TD') {
                    $scope.atividadesTD[indexAntigo].status = novoStatus;
                }else if(primeiroStatus=='DG') {
                    $scope.atividadesDG[indexAntigo].status = novoStatus;
                }else if(primeiroStatus=='DN') {
                    $scope.atividadesDN[indexAntigo].status = novoStatus;
                }
            }, function(erro) {
                console.log(erro);
            });
        }

        $scope.abreModalEditarAtividade = function(atividade) {
            $scope.editaAtividade = angular.copy(atividade);

            $('#dt_prazo_edita_atividade').datepicker({
                dateFormat:'dd/mm/yy'
            });

            $('#modal_edita_atividade').modal('show');
        }

        $scope.fecharModalEditaAtividade = function() {
            $scope.editaAtividade = {};
            $scope.formEditaAtividade.$setPristine();
            $('#modal_edita_atividade').modal('hide');
        }

        $scope.abreModalNovaAtividade = function(status) {               
            $scope.statusAtividade = status;
            $('#dt_prazo').datepicker({
                dateFormat:'dd/mm/yy'
            });
            $('#modal_nova_atividade').modal('show');
        }

        $scope.fecharModalNovaAtividade = function() {
            $scope.adicionaAtividade = {};
            $('#modal_nova_atividade').modal('hide');
        }

        $scope.getAtividades();
    });
    