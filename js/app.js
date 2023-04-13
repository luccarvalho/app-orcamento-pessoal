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

        // Chama o modal de sucesso nos dados salvos
        modal.show();

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

    console.log(despesas);
}
