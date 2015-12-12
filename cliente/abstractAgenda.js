/**
 * Created by bruno on 01/12/15.
 */
function AbstractAgenda(){
    if(this.constructor == AbstractAgenda){
        throw new Error("Can't instantiate abstract class!");
    }
}

AbstractAgenda.prototype.resetar = function(maxContatos){
    throw new Error("Abstract method!");
}

AbstractAgenda.prototype.adicionarContato = function(telefone, nome){
    throw new Error("Abstract method!");
}

AbstractAgenda.prototype.getContatoByTel = function(telefone){
    throw new Error("Abstract method!");
}

AbstractAgenda.prototype.getTelefones = function(telefone){
    throw new Error("Abstract method!");
}

AbstractAgenda.prototype.atualizarContato = function(telefone, nome){
    throw new Error("Abstract method!");
}

AbstractAgenda.prototype.removerContato = function(telefone){
    throw new Error("Abstract method!");
}

AbstractAgenda.prototype.getContatos = function(){
    throw new Error("Abstract method!");
}

AbstractAgenda.prototype.getEspacoRestante = function(){
    throw new Error("Abstract method!");
}

module.exports = AbstractAgenda;