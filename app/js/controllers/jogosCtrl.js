angular.module('proplus').controller('jogosCtrl', function($scope,httpAPI){
	let palavrasSelecionadas = []; //Palavras definidas pelo critétio que é a origem
	let words = [];
	let textos = [];
	let arrayPalavras = [];
	let origem = "";
	$scope.corSpan = "form-span-cor1";

	/*Carrega as palavras do banco de dados */
	let carregarPalavras = function(){
		httpAPI.getWords().then(function(result){
			words = result.data;
			$scope.wordsScope = result.data;
		},function(error){
			console.log(error);
		});
	};

	$scope.cadastrarNovaPalavra = function(dados){
		if(dados && origem){
			dados.tipo = "Palavra";
			dados.origem = origem;
			httpAPI.saveWord(dados).then(function(result){
				alert("Salvo com sucesso!");
				deletarDados();
				carregarPalavras();
			},function(error){
				console.log(error);
			});
		};
	};

	let deletarDados = function(){
		console.log('apagar');
		delete $scope.dados;
	};

	$scope.selecionarTexto = function(tituloDefinido){
		if(tituloDefinido){
			let texto = textos.filter(function(item){
				return item.titulo === tituloDefinido.titulo;
			});

			origem = texto[0].titulo;

			let apenasTexto = texto[0].conteudo;

			apenasTexto = apenasTexto.replace(/\n/g,' ')
									.replace(/\(/g,'')
									.replace(/\)/g,'')
									.replace(/\,/g,'')
									.replace(/\.\.\./g,' ')
									.replace(/\./g,' ')
									.replace(/\—/g,'')
									.replace(/[0-9]/g,'')
									.replace(/\[/g,'')
									.replace(/\]/g,'')
									.replace(/\;/g,'')
									.replace(/\?/g,'')
									.replace(/\!/g,'')
									.replace(/\:/g,'')
									.toLowerCase();;

			arrayPalavras = apenasTexto.split(' ');

			$scope.arrayPalavrasNaoRepetidas = arrayPalavras.filter(function(item,i){
				return arrayPalavras.indexOf(item) == i;
			});

		};
	};

	let carregarTextos = function(){
		httpAPI.getContents().then(function(result){
			textos = result.data.map(function(elemento){
				return {
					titulo: elemento.titulo,
					conteudo: elemento.texto
				}
			});

			$scope.tituloDosTextos = textos.map(function(elemento){
				return { 
					titulo: elemento.titulo
				}
			});

		},function(error){
			console.log(error);
		});
	};

	$scope.checarPalavra = function(dados){
		let elemento = words.filter(function(item){
			return item.nome.toLowerCase() === dados.toLowerCase();
		});

		$scope.palavraSelecionada = dados;

		if(elemento[0]){
			$scope.traducaoPalavra = elemento[0].traducao.toUpperCase();
			$scope.corSpan = "form-span-cor1";
		}else{
			$scope.corSpan = "form-span-cor2";
			$scope.traducaoPalavra = "Não cadastrada".toUpperCase()+" ::  \n"+dados;
		};
	};

	$scope.apagarDados = function(){
		delete $scope.dados
	}

	carregarTextos();
	carregarPalavras();
	
});