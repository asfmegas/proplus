let db = require('../config/configDB');
let val = require('validator');

exports.getWords = (callback) => {
	db.Words.find({},function(err,data){
		if(err) callback(err);;
		callback(data);
	});
};

exports.getSelectWords = (wordsSelect,callback) => {
	db.Words.find(wordsSelect,function(err,data){
		if(err) callback(err);
		callback(data);
	});
};

exports.saveWord = (dados,callback) => {
	dados.createAt = new Date();
	dados.nome = val.trim(dados.nome);
	dados.traducao = val.trim(dados.traducao);
	dados.origem = val.trim(dados.origem);

	new db.Words(dados).save(function(error,result){
		if(error) callback(error);
		callback(result);
	});
};

exports.deleteWord = (id,callback) => {
	db.Words.findById(id,function(error,word){
		if(error) callback(error);
		word.remove(function(error,result){
			if(error) callback(error);
			callback(result);
		});
	});
};

exports.updateWord = (dados,callback) => {
	db.Words.findById(dados._id,function(error,word){
		if(error){
			callback({error:'Palavra não encontrada!'});
		}else{
			if(word.nome) word.nome = dados.nome;
			if(word.traducao) word.traducao = dados.traducao;
			if(word.tipo) word.tipo = dados.tipo;
			word.origem = dados.origem;
			word.modifiedAt = new Date();
			word.save(function(error,result){
				if(error){
					callback({error:'Não foi possível atualizar dados.'});
				}else{
					callback(result);
				};
			});
		};
	});
};

/*
	Verbs
*/
exports.getVerbs = function(callback){
	db.Verbs.find({},function(err,result){
		if(err) callback(err);
		callback(result);
	});
};

exports.saveVerb = function(dados,callback){
	db.Verbs(dados).save(function(err,result){
		if(err) callback(err);
		callback(result);
	});
};

exports.updateVerb = function(dados,callback){
	console.log(dados);
	db.Verbs.findById(dados._id,function(err,verb){
		if(err) callback(err);
		if(dados.base) verb.base = dados.base;
		if(dados.tense) verb.tense = dados.tense;
		if(dados.participle) verb.participle = dados.participle;
		if(dados.translation) verb.translation = dados.translation;
		if(dados.phrase) verb.phrase = dados.phrase;
		if(dados.hit) verb.hit = dados.hit;
		if(dados.point) verb.point = dados.point;
		verb.save(function(err,result){
			if(err) callback(err);
			callback(result);
		});
	});
};