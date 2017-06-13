angular.module('proplus').controller('testesCtrl',function($scope,testesService){
	let count = 0;
	let verbSelect = {};
	let verbs = [];
	$scope.isVisibleTense = false;
	$scope.isVisibleParticiple = false;
	$scope.isVisibleTranslation = false;
	$scope.startBtn = true;
	$scope.pointer = 0;
	// Buscar dados
	let obterVerbos = function(){
		testesService.getListVerbs(function(result){
			// console.log(result.length);
			// $scope.listaVerbos = result;
			verbs = result;
		});
	};

	$scope.chooseVerb = function(){
		let num = Math.floor(Math.random() * verbs.length);
		$scope.startBtn = false;
		// console.log("Número escolhido: "+num);
		// console.log("QTD.: "+verbs.length);
		$scope.verbComplete = verbs;
		confDados();
		verbSelect = verbs.splice(num,1);
	};

	let confDados = function(){
		$scope.isVisibleTense = false;
		$scope.isVisibleParticiple = false;
		delete $scope.dado;
		if(count == 1){
			count = 0;
		}else if(count == 2){
			$scope.pointer++;
			console.log(count);
			count=0;
			saveGame(verbSelect);
		};
	};

	$scope.checkTense = function(valueINF,valueBD){
		if(valueINF === valueBD){
			$scope.isVisibleTense = true;
			count++;
		};
	};

	$scope.checkParticiple = function(valueINF,valueBD){
		if(valueINF === valueBD){
			$scope.isVisibleParticiple = true;
			count++;
		};
	};

	let saveGame = function(dados){
		// dados[0].hit = 1;
		// dados[0].point = 10;
		// testesService.updateVerb(dados,function(result){
		// 	console.log(result);
		// });
	};

	// chooseVerb();

	obterVerbos();

	// Salvar dados
	$scope.salvarVerbo = function(dados){
		dados.hit = 0;
		dados.point = 0;
		testesService.saveVerb(dados,function(result){
			delete $scope.dados;
			obterVerbos();
		});
	};

	$scope.alterarVerbo = function(dados){
		let newData = angular.copy(dados);
		testesService.updateVerb(newData,function(result){
			obterVerbos();
			delete $scope.dados;
		});
	};

	$scope.pegarDados = function(dados){
		$scope.dados = dados;
	};

	$scope.limparDados = function(){
		delete $scope.dados;
	};

});