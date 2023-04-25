// máscara jQuery para o campo valor
$('#valor').mask("#.##0,00", { reverse: true });

// máscara jQuery para o campo dia
$('#dia').mask("00", { reverse: true });

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
            "5": "Transporte",
            "6": "Outro"
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

            // adicionando um novo atributo para identificar a key de cada despesa
            despesa.id = i

            // inserindo as despesas em um array
            despesas.push(despesa);
        }

        return despesas;
    }

    pesquisar(despesa) {

        let despesasFiltradas = Array();

        despesasFiltradas = this.recuperarTodosRegistros();

        // aplicando filtro de ano
        if (despesa.ano != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano);
            document.getElementById("listaDespesas").className = "table-success";
        }

        // aplicando filtro de mês
        if (despesa.mes != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes);
            document.getElementById("listaDespesas").className = "table-success";
        }

        // aplicando filtro de dia
        if (despesa.dia != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia);
            document.getElementById("listaDespesas").className = "table-success";
        }

        // aplicando filtro de tipo
        if (despesa.tipo != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo);
            document.getElementById("listaDespesas").className = "table-success";
        }

        // aplicando filtro de descrição
        if (despesa.descricao != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao);
            document.getElementById("listaDespesas").className = "table-success";
        }

        // aplicando filtro de valor
        if (despesa.valor != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor);
            document.getElementById("listaDespesas").className = "table-success";
        }

        return despesasFiltradas;

    }

    remover(id) {
        document.getElementById("modal_titulo_div").className = "modal-header text-danger";
        document.getElementById("modal_titulo").innerHTML = "Você está prestes a excluir uma despesa!";
        document.getElementById("modal_conteudo").innerHTML = "Se tem certeza, clique em Excluir";
        document.getElementById("modal_btn").className = "btn btn-primary";


        let btnExcluir = document.getElementById("modal_btn1");
        btnExcluir.className = "btn btn-danger";
        btnExcluir.innerHTML = "Excluir"

        btnExcluir.onclick = function () {
            localStorage.removeItem(id);
            btnExcluir.setAttribute("data-bs-dismiss", "modal");
            // pesquisarDespesa();
            window.location.reload();
        }

        document.getElementById("modal_btn").innerHTML = "Cancelar";
        modal.show();
        pesquisarDespesa();

    }
}

let bd = new Bd();

let modal = new bootstrap.Modal("#modalInfo");

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
function carregaListaDespesas(despesas = Array(), filtro = false) {

    if (despesas.length == 0 && filtro == false) {
        // recebe o array criado no método recuperarTodosRegistros
        despesas = bd.recuperarTodosRegistros();
    }

    // seleciona o elemento tbody da página consulta.html
    let listaDespesas = document.getElementById("listaDespesas");
    listaDespesas.innerHTML = "";

    let valorTotal = 0;

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

        valorTotal += parseFloat(d.valor.replace(",", "."));
        document.getElementById("valorTotal").innerHTML = valorTotal.toFixed(2);

        // criando o botão que deleta cada despesa
        let btn = document.createElement("button");
        btn.className = "btn btn-danger";
        btn.innerHTML = "<i class='fas fa-times'></i>";
        btn.id = d.id;
        linha.insertCell(4).append(btn);

        btn.onclick = function () {
            bd.remover(this.id);
        }
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

    let despesas = bd.pesquisar(despesa);

    carregaListaDespesas(despesas, true);

}
