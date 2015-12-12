/**
 * Created by bruno on 02/12/15.
 */
var Agenda = require('../aluno/agenda.js');
var Backup = require('../aluno/backup.js');

var assert = require('assert');
var expect = require('expect.js');

describe('E possivel realizar o backup da agenda', function () {

    var agenda = new Agenda();

    beforeEach(function () {

        var contatos = [["Ana", "2545451"], ["Bruno", "2545452"], ["Caio", "2545453"],
            ["Davi", "2545454"], ["Erica", "2545455"], ["Fabio", "2545456"],
            ["Gabi", "2545457"], ["Helio", "2545458"], ["Igor", "2545459"]
        ];

        agenda.resetar(contatos.length);

        contatos.forEach(function (contato, indice) {
            agenda.adicionarContato(contato[1], contato[0]);
        });
    });

    it('E possivel importar os contatos de uma agenda em outra', function () {
        var novaAgenda = new Agenda();
        novaAgenda.resetar(14);
        novaAgenda.adicionarContato("46546465", "Zezin");

        novaAgenda = Backup.importar(agenda, novaAgenda);

        var contatosNovaAgenda = novaAgenda.getContatos();

        expect(novaAgenda.getEspacoRestante()).to.be(4);
        expect(agenda.getContatos().every(function (contato) {
            return contatosNovaAgenda.indexOf(contato) != -1;
        }));
    });

    it('E possivel realizar o backup no formato csv', function () {
        agenda.removerContato("2545459");
        agenda.removerContato("2545458");
        agenda.removerContato("2545457");
        agenda.removerContato("2545456");
        agenda.removerContato("2545455");
        agenda.removerContato("2545454");
        var resultadoEsperado = "Ana,2545451\n" + "Bruno,2545452\n" + "Caio,2545453\n";
        expect(Backup.emCSV(agenda)).to.be(resultadoEsperado);
    });
    
});