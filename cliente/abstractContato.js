/**
 * Created by bruno on 01/12/15.
 */
function AbstractContato(){
    if(this.constructor == AbstractContato){
        throw new Error("Can't instantiate abstract class!");
    }
}

AbstractContato.prototype.getNome = function(){
    throw new Error("Abstract method!");
}

AbstractContato.prototype.setNome = function(novoNome){
    throw new Error("Abstract method!");
}

AbstractContato.prototype.getTelefone = function(){
    throw new Error("Abstract method!");
}

AbstractContato.prototype.setTelefone = function(novoTelefone){
    throw new Error("Abstract method!");
}

module.exports = AbstractContato;