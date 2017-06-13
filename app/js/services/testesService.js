angular.module('proplus').factory('testesService',function(httpAPI){
	
	let _getListVerbs = function(callback){
		httpAPI.getListVerbs().then(function(result){
			callback(result.data);
		},function(error){
			console.log(error);
		});
	};

	let _saveVerb = function(dados, callback){
		httpAPI.saveVerb(dados).then(function(result){
			callback(result);
		},function(error){
			console.log(error);
		});
	};

	let _updateVerb = function(dados,callback){
		httpAPI.updateVerb(dados).then(function(result){
			callback(result);
		},function(error){
			console.log(error);
		});
	};

	return {
		getListVerbs: _getListVerbs,
		saveVerb: _saveVerb,
		updateVerb: _updateVerb
	}
});