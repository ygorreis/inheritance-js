/**
 * Created by bruno on 01/12/15.
 */
var Agenda = require('../aluno/agenda.js');
var AbstractAgenda = require('../cliente/abstractAgenda.js');

var Contato = require('../aluno/contato.js');
var AbstractContato = require('../cliente/abstractContato.js');

var assert = require('assert');
var expect = require('expect.js');

describe('Verificando herancas', function () {

    it('Toda Agenda deve ser uma AbstractAgenda', function () {
        expect(Agenda.prototype instanceof  AbstractAgenda).to.be.ok();
    });

    it('Todo Contato deve ser um AbstractContato', function () {
        expect(Contato.prototype instanceof  AbstractContato).to.be.ok();
    })
});

describe('Dado uma agenda', function () {

    var agenda = null;

    beforeEach(function(){
       agenda = new Agenda();
       agenda.resetar(4);
    });


    it('A agenda deve ser resetada antes de ser utilizada', function () {
        var agenda = new Agenda();
        expect(agenda.getContatos().length).to.be(0);
        expect(agenda.getEspacoRestante()).to.be(0);
        expect(agenda.adicionarContato("1111", "ze")).to.be(false);
        agenda.resetar(10);
        expect(agenda.getEspacoRestante()).to.be(10);
    });

    describe('Ao tentar adicionar um contato', function () {

        it('o nome do contato deve ser informado', function () {
            expect(agenda.adicionarContato("1111", "")).to.be(false);
            expect(agenda.adicionarContato("1111", null)).to.be(false);
        });

        it('o telefone do contato deve conter numeros', function () {
            expect(agenda.adicionarContato("a0", "Zezin")).to.be(false);
            expect(agenda.adicionarContato("88-0000", "Joao")).to.be(false);
            expect(agenda.adicionarContato("", "Joao")).to.be(false);
            expect(agenda.adicionarContato(null, "Joao")).to.be(false);
        });

        it('o telefone e nome devem ser validos', function () {
            expect(agenda.adicionarContato("11110000","Pedro Alvares")).to.be(true);
            expect(agenda.adicionarContato("11110010", "Dom Pedro")).to.be(true);
            expect(agenda.getContatos().length).to.be(2);
        })

        it('nao deve ser permitido cadastrar telefones duplicados', function () {
            expect(agenda.adicionarContato("2345678", "Gabriel Pensador")).to.be(true);
            expect(agenda.adicionarContato("2345678", "Mark")).to.be(false);
            expect(agenda.getContatos().length).to.be(1);
        });

        it('deve ser possivel cadastrar telefones diferente para uma mesma pessoa', function () {
            expect(agenda.adicionarContato("123456", "Tiziu")).to.be(true);
            expect(agenda.adicionarContato("654321", "Tiziu")).to.be(true);
            expect(agenda.getContatos().length).to.be(2);
        });

        it('a capacidade da agenda deve ser respeitada', function () {
            agenda.resetar(1);
            expect(agenda.adicionarContato("123456", "Tiziu")).to.be(true);
            expect(agenda.adicionarContato("654321", "Tiziu")).to.be(false);
            expect(agenda.getEspacoRestante()).to.be(0);
        });
    });


    describe('Ao buscar um numero', function () {

        it('se o numero nao existe a agenda deve retornar null', function () {
            expect(agenda.getEspacoRestante()).to.be(4);
            expect(agenda.getContatoByTel("0000")).to.be(null);
        });

        it('se o numero existe, a agenda deve retorar o contato', function () {
            agenda.adicionarContato("1111", "marcos");
            expect(agenda.getContatoByTel("1111").getNome()).to.be("marcos");
            agenda.adicionarContato("2222", "maria");
            agenda.adicionarContato("3333", "maria");
            expect(agenda.getContatoByTel("2222").getNome()).to.be("maria");
            expect(agenda.getContatoByTel("3333").getNome()).to.be("maria");
        });
    });

    describe('Ao buscar por nome', function () {

        it('se no nome nao constar na agenda, null deve ser retornado', function () {
            expect(agenda.getTelefones("Tiziu")).to.be(null);
        })

        it('se o nome constar na agenda, todos os telefones registrados nesse nome devem ser retornados', function () {
            agenda.adicionarContato("1111", "marcos");
            expect(agenda.getTelefones("marcos").length).to.be(1);
            expect(agenda.getTelefones("marcos")[0]).to.be("1111");
            agenda.adicionarContato("2222", "maria");
            agenda.adicionarContato("3333", "maria");
            expect(agenda.getEspacoRestante()).to.be(1);
            expect(agenda.getTelefones("maria").length).to.be(2);
            expect(agenda.getTelefones("maria")[0]).to.be("2222");
            expect(agenda.getTelefones("maria")[1]).to.be("3333");
        });
    });

    it('Deve ser possivel recuperar todos os contatos', function () {
        var nomes = ["joao", "zezao", "maria"];
        var telefones = ["1111", "2222", "3333"];
        telefones.forEach(
            function (elemento, indice) {
                expect( agenda.adicionarContato(telefones[indice], nomes[indice]) ).to.be(true);
            }
        );

        expect(agenda.getContatos().every(function (contato) {
            return nomes.indexOf(contato.nome) != -1 && telefones.indexOf(contato.telefone) != -1
        })).to.be(true);
    });
    
    describe('Ao tentar atualizar um contato', function () {
       
        it('apenas contatos existente podem ser atualizados', function () {
            expect(agenda.atualizarContato("1111", "Ze")).to.be(false);
        });
        
        it('se o contato existe, o novo nome deve ser valido', function () {
            agenda.adicionarContato("1111", "Joao");
            expect(agenda.atualizarContato("1111", "")).to.be(false);
            expect(agenda.getContatoByTel("1111").getNome()).to.be("Joao");

            expect(agenda.atualizarContato("1111", null)).to.be(false);
            expect(agenda.getContatoByTel("1111").getNome()).to.be("Joao");
            
            expect(agenda.atualizarContato("1111", "Ze")).to.be(true);
            expect(agenda.getContatoByTel("1111").getNome()).to.be("Ze");
        })
    });

    describe('Ao tentar remover um contato', function () {

        it('apenas contatos existentes podem ser removidos', function () {
            expect(agenda.getEspacoRestante()).to.be(4);
            agenda.adicionarContato("0000", "ze");
            expect(agenda.getEspacoRestante()).to.be(3);
            expect(agenda.removerContato("0000")).to.be(true);
            expect(agenda.removerContato("1111")).to.be(false);
            expect(agenda.removerContato("")).to.be(false);
            expect(agenda.removerContato(null)).to.be(false);
            expect(agenda.removerContato("0000")).to.be(false);
            expect(agenda.getEspacoRestante()).to.be(4);
        });
    });
});