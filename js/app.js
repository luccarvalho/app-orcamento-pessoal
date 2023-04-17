class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {

                return false;
            }
        }

        return true;
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id');

        if (id === null) {
            localStorage.setItem('id', 0);
        }

        // objeto literal, convertendo o tipo pela devida descrição
        this.despesaTipos = {
            "1": "Alimentação",
            "2": "Educação",
            "3": "Lazer",
            "4": "Saúde",
            "5": "Transporte"
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1;
    }

    gravar(d) {
        let novoId = this.getProximoId();
        localStorage.setItem(novoId, JSON.stringify(d));
        localStorage.setItem('id', novoId);
    }

    recuperarTodosRegistros() {

        // array de todas as despesas cadastradas
        let despesas = Array();

        // recebendo o id dos dados cadastrados em localStorage
        let id = localStorage.getItem('id');

        // recuperando todas as despesas cadastradas em localStorage
        for (let i = 1; i <= id; i++) {

            // atribuindo as despesas em uma variável 
            let despesa = JSON.parse(localStorage.getItem(i));

            if (despesa === null) {
                continue;
            }

            // inserindo as despesas em um array
            despesas.push(despesa);
        }

        return despesas;
    }

    pesquisar(despesa) {

        let despesasFiltradas = Array();

        despesasFiltradas = this.recuperarTodosRegistros();

        console.log(despesa);
        console.log(despesasFiltradas);

        // aplicando filtro de ano
        if (despesa.ano != "") {
            console.log("Filtro ano");
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano);
        }

        // aplicando filtro de mês
        if (despesa.mes != "") {
            console.log("Filtro mês");
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes);
        }

        // aplicando filtro de dia
        if (despesa.dia != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia);
        }

        // aplicando filtro de tipo
        if (despesa.tipo != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo);
        }

        // aplicando filtro de descrição
        if (despesa.descricao != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao);
        }

        // aplicando filtro de valor
        if (despesa.valor != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor);
        }

        console.log(despesasFiltradas);
    }
}

let bd = new Bd()

let modal = new bootstrap.Modal(document.getElementById("modalRegistra"));

function cadastrarDespesa() {
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value);

    if (despesa.validarDados()) {
        bd.gravar(despesa);
        document.getElementById("modal_titulo_div").className = "modal-header text-success";
        document.getElementById("modal_titulo").innerHTML = "Sucesso na gravação dos dados";
        document.getElementById("modal_conteudo").innerHTML = "Despesa cadastrada com sucesso.";
        document.getElementById("modal_btn").className = "btn btn-success";
        document.getElementById("modal_btn").innerHTML = "Voltar";

        // variável para recuperar o id do formulário
        let formulario = document.querySelector("#form");

        // chama o modal de sucesso nos dados salvos
        modal.show();

        // apaga os campos do formulário após salvar
        formulario.reset();


    } else {
        document.getElementById("modal_titulo_div").className = "modal-header text-danger";
        document.getElementById("modal_titulo").innerHTML = "Erro na gravação dos dados"
        document.getElementById("modal_conteudo").innerHTML = "Existem campos que não foram preenchidos.";
        document.getElementById("modal_btn").className = "btn btn-danger";
        document.getElementById("modal_btn").innerHTML = "Voltar e corrigir";

        // Chama o modal de erro ao tentar salvar os dados
        modal.show();
    }
}

// Função chamada automaticamente ao abrir a página consulta.html
function carregaListaDespesas() {

    // armazena as dispesas
    let despesas = Array();

    // recebe o array criado no método recuperarTodosRegistros
    despesas = bd.recuperarTodosRegistros();

    // seleciona o elemento tbody da página index.html
    let listaDespesas = document.getElementById("listaDespesas");

    // percorrendo o array despesas com uma função de callback através de um parâmetro.
    // listando cada despesa de forma dinâmica
    despesas.forEach(function (d) {

        // criando a linha da tabela (tr)
        let linha = listaDespesas.insertRow();

        // criando as colunas da tabela (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;
        linha.insertCell(1).innerHTML = bd.despesaTipos[d.tipo];
        linha.insertCell(2).innerHTML = d.descricao;
        linha.insertCell(3).innerHTML = d.valor;
    })
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value);

    bd.pesquisar(despesa);

}
