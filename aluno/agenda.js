/**
 * Created by bruno on 01/12/15.
 */
 var Contato = require('../aluno/contato.js');
 var AbstractAgenda = require('../cliente/abstractAgenda.js');

 function Agenda(){
 	var tamanhoAgenda = 0;
 	var contatos = [];
 	var telefonesEncontrados = [];
 	var posicao = 0;

 	Agenda.prototype = Object.create(AbstractAgenda.prototype);

 	Agenda.prototype.resetar = function (numeroContatos) {
 		tamanhoAgenda = numeroContatos;
 	}

 	Agenda.prototype.getEspacoRestante = function () {
 		return tamanhoAgenda - contatos.length;
 	}
 	
 	Agenda.prototype.getContatos = function () {
 		return contatos;
 	}

 	Agenda.prototype.adicionarContato = function (telefone, nome) {
 		if (contatos.length == tamanhoAgenda) {
 			return false;
 		} else {
 			if(verificaNome(nome) && verificaTelefone(telefone) && !verificaTelefoneExistente(telefone)){	
 				contatos.push(new Contato(telefone, nome));
 				return true;
 			}else{
 				return false;
 			}
 		} 		
 	}

 	function verificaNome (nome) {
 		return (nome === undefined || nome == null || nome.length <= 0) ? false : true;
 	}

 	function verificaTelefone (telefone) {
 		//how to check string contains only digits
 		//stackoverflow.com/questions/1779013/check-if-string-contains-only-digits
 		return /^\d+$/.test(telefone);
 	}
 	
 	function verificaTelefoneExistente (telefone) {
 		var existe = null;
 		for (var i = 0; i < contatos.length; i++) {
 			if(contatos[i].telefone == telefone){
 				existe = true;
 			}
 		}
 		return existe == null ? false : true;
 	}

 	Agenda.prototype.getTelefones = function (nome) {
 		telefonesEncontrados = [];
 		for (var i = 0; i < contatos.length; i++) {
 			if(contatos[i].nome == nome){
 				telefonesEncontrados.push(contatos[i].telefone);
 			}
 		}
 		return telefonesEncontrados.length == 0 ? null : telefonesEncontrados;
 	}

 	Agenda.prototype.getContatoByTel = function (telefone) {
 		if (contatos.length == 0 ) { 
 			return null;
 		} else {
 			for (var i = 0; i < contatos.length; i++) {
 				if (contatos[i].telefone == telefone) {
 					posicao = i;
 					return contatos[i];
 				}
 			}
 			return null;
 		}
 	}

 	Agenda.prototype.atualizarContato = function (telefone, nome) {
 		if (contatoExiste(telefone,nome)) {
 			if (verificaNome(nome)){
 				Agenda.prototype.getContatoByTel(telefone);
 				contatos[posicao].setNome(nome);
 				return true;
 			}else{
 				return false;
 			}
 		} else{
 			return false;
 		}
 	}

 	function contatoExiste (telefone, nome) {
 		// console.log("CONTATO A SER PESQUISADO");
 		// console.log("Telefone: " + telefone);
 		// console.log("Nome: " + nome);

 		for (var i = 0; i < contatos.length; i++) { 			
 			if (contatos[i].telefone == telefone) {
 				// console.log("ACHOU CONTATO");
 				// console.log("Telefone: " + contatos[i].nome);
 				// console.log("Nome: " + contatos[i].telefone);
 				return true;
 			}
 		}
 		return false;
 	}

 	Agenda.prototype.removerContato = function (telefone) {
 		if (verificaNome(telefone)) {
 			if (verificaTelefoneExistente(telefone)) {
 				Agenda.prototype.getContatoByTel(telefone);
 				contatos.splice(posicao,1);
 				return true;
 			} else{
 				return false;
 			};
 		}else{
 			return false;
 		}
 	}
 }

 module.exports = Agenda;