# app-orçamento-pessoal

## :dart: Objetivo do projeto:

Criar uma página/app para o cadastro de despesas pessoais, utilizando o LocalStorage para persistir os dados no própio navegador.

## :receipt: Descrição do projeto:

O projeto envolve uma página para o registro das despesas e outra página para consultar as despesas cadastradas.

Na página de cadastro, o usuário informa o ano, mês, dia e tipo de despesa (alimentação, lazer, transporte, etc), a também os campos para descrição e valor da despesa.

Depois de clicar no botão para salvar a despesa, a mesma fica armazenada no LocalStorage do navegador.

É possível salvar quantas despesas forem necessárias.

Se o usuário tente salvar uma despesa sem inserir todas as informções, uma notificação (modal) de erro é apresentada, caso contrário, um modal com a informação de despesa salva com sucesso é apresentada.

Ao acessar a página de consulta de despesas, uma lista com todas as despesas cadastradas já estará disponível na tela, mas também será possível aplicar filtros para consultar uma despesa específica, além do botão de excluir despesa.

Projeto responsivo para mobile.

## :heavy_check_mark: Técnologias utilizadas:

- `HTML`
- `Bootstrap`
- `JavaScript`