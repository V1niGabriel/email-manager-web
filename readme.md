# Interface Vmail 
<img src="docs/assets/img/V-logo.png" width=80px><br>
📜 **Sobre o Projeto**

Este projeto consiste em uma página web funcional baseado na interface do Gmail,  desenvolvido como um exercício prático de front-end e projeto de conclusão de semestre da matéria de IHC. 

O **objetivo** foi replicar não apenas o visual limpo e conhecido do Gmail, mas também suas funcionalidades essenciais de gerenciamento de e-mails, utilizando tecnologias web modernas e aplicando princípios de Design e Interação Humano-Computador (IHC).

A aplicação permite criar, ler, editar e excluir e-mails, que são salvos localmente no navegador através da ```localStorage```. O design é totalmente responsivo, adaptando-se a desktops, tablets e celulares.

---

# ✨ Funcionalidades
- CRUD Completo de E-mails: Crie, leia, edite e exclua e-mails.

- Persistência de Dados: Os e-mails são salvos no localStorage, mantendo os dados entre as sessões.

- Sistema de Pastas: E-mails podem ser movidos para a Lixeira ou marcados como Spam, com visualizações separadas para cada pasta.

- Lixeira Inteligente: E-mails excluídos vão para a lixeira, de onde podem ser restaurados ou excluídos permanentemente.

- Interface Responsiva: O layout se adapta a diferentes tamanhos de tela, com um menu lateral retrátil em telas menores e um botão de ação flutuante (FAB) para celulares.

- Modal Interativo: Um único modal é reutilizado para criar e editar e-mails, com campos desabilitados de forma inteligente durante a edição.

- Feedback Visual: Notificações e contadores dinâmicos informam o usuário sobre o status das suas ações e a quantidade de e-mails na caixa de entrada.

# 🛠️ Tecnologias e Bibliotecas

<div align="center">
<p>Tecnologias Principais<p><br>
<img src="https://pandaprogrammer.com/wp-content/uploads/2021/11/watermark-1024x388.png" width=500px; align-iten="center"></img>
</div>

 ### HTML5: 
  * Estruturação semântica do conteúdo, utilizando tags como ```<header>, <main>, <aside> e <nav>``` para melhorar a acessibilidade e a organização.

 ### CSS3:
  Estilização completa da interface, com uso de:
   * Flexbox: Para criar layouts flexíveis e alinhados.
   * CSS Variables: Para um sistema de cores consistente e de fácil manutenção.
   * Media Queries: Para garantir a responsividade em múltiplos dispositivos.

 ### JavaScript:
  O cérebro da aplicação, responsável por:
   * Manipulação do DOM para criar, atualizar e remover elementos dinamicamente.
   * Gerenciamento de eventos (clicks, submit) com técnicas como a Delegação de Eventos para melhor performance.
   * Interação com a API localStorage para persistência dos dados.

 #### Biblioteca:
 Google Material Symbols: Biblioteca de ícones da Google, utilizada como uma "fonte de ícones" e importada via CDN. Isso garante ícones vetoriais (escaláveis e personalizáveis via CSS) e de carregamento rápido, sem a necessidade de hospedar arquivos de imagem localmente.

## 🎨 Design e Interação Humano-Computador (IHC)

Brainstorm da página
![BrainStorm](/docs/assets/img/Brainstorm%20-%20(analise,%20sintese,%20avaliacao).png)

Filosofia de Design:<br>
O design seguiu a abordagem minimalista e funcional do Google Material Design. O foco é a clareza e a eficiência, com um layout limpo, hierarquia visual bem definida e uso estratégico de espaços em branco para evitar a sobrecarga cognitiva do usuário.

#### Práticas de IHC Aplicadas
**Visibilidade do Status do Sistema:** O usuário é sempre informado sobre sua localização (item de menu ativo) e o status dos e-mails (contador, e-mails não lidos em negrito).

**Prevenção de Erros:** Ações destrutivas, como excluir um e-mail permanentemente, exigem uma confirmação (confirm()), dando ao usuário controle e liberdade para evitar erros.

**Consistência e Padrões:** A interface utiliza ícones e padrões reconhecíveis (menu hambúrguer, FAB), e a reutilização do modal para criar e editar e-mails mantém a consistência funcional.

#### Princípios de Gestalt:

**Proximidade:** Ações relacionadas (editar, excluir, spam) são agrupadas visualmente.

**Similaridade:** Todos os itens da lista de e-mails possuem o mesmo estilo, indicando que têm a mesma natureza e função.

# ⚙️ Implementação Técnica (CRUD)
O CRUD é gerenciado inteiramente no front-end com *JavaScript* e *localStorage.*

**Create:** Um novo objeto de e-mail é criado e adicionado ao array de e-mails no localStorage através do método push().

**Read:** Os e-mails são lidos do localStorage com JSON.parse() e renderizados na tela. A visualização é filtrada com base no status do e-mail (inbox, trash, spam).

**Update:** A edição é feita com o método .map(). Ele cria um novo array, substituindo apenas o objeto do e-mail editado, mantendo a imutabilidade dos dados.

**Delete:** A exclusão é feita de duas formas:

* Mover para a lixeira: O status do e-mail é alterado para trash.

* Excluir permanentemente: O método .filter() cria um novo array, removendo o e-mail com o ID correspondente.

# 📊 Análise Comparativa e Teórica

## 1. Usabilidade, Acessibilidade e Comunicabilidade (Website de Referência: Gmail)

**Usabilidade:** A usabilidade do Gmail é altíssima . Seus fluxos de trabalho são otimizados, e os elementos possuem affordances claras (botões parecem clicáveis, inputs parecem editáveis). O projeto buscou replicar essa eficiência, especialmente na reutilização do modal e na implementação da lógica de navegação simples e otimizada.

**Acessibilidade:** O Gmail real investe pesadamente em acessibilidade com atributos aria-*, navegação por teclado e alto contraste. No projeto implementamos a base com HTML semântico, mas uma análise completa exigiria a adição de mais atributos aria para ser totalmente acessível.

**Comunicabilidade:** O Gmail se comunica com o usuário de forma exemplar através de ícones universais, microinterações e feedback imediato (ex: "Conversa movida para a lixeira"). Replicamos isso com os alertas visuais e a atualização instantânea da interface.

## 2. Análise Qualitativa: Leis de Hick-Hyman e Fitts
**Lei de Hick-Hyman (Tempo de Decisão): Esta lei afirma que o tempo para tomar uma decisão aumenta com o número de escolhas.**

* Gmail: Gerencia isso agrupando ações complexas em menus suspensos ("Mais") e categorizar e-mails em abas (Principal, Promoções), reduzindo a carga cognitiva inicial.

* No Projeto: Aplicamos este princípio ao criar o menu "Mais" para "Spam" e "Lixeira" e ao revelar as ações de um e-mail (editar/excluir) apenas no :hover, limpando a interface principal.

**Lei de Fitts (Alcance do Alvo): O tempo para alcançar um alvo é uma função da distância e do tamanho do alvo.**

* Gmail: Posiciona os alvos mais importantes (botão "Escrever", abas principais) em áreas de fácil acesso e com tamanho generoso.

* No Projeto: O botão "Escrever" é grande e destacado. No modo responsivo, ele se torna um FAB no canto inferior esquerdo, uma área de fácil alcance para o polegar em dispositivos móveis, uma aplicação direta da Lei de Fitts.

## 3. Análise Qualitativa: Organização das Cores
* Gmail: Utiliza um esquema de cores predominantemente monocromático (branco, vários tons de cinza), o que acalma a interface e foca no conteúdo. A cor de destaque (azul) é usada com propósito para guiar o usuário, indicar seleção e para ações primárias. Cores como vermelho e amarelo são reservadas para alertas e avisos.

* No Projeto: A paleta de cores foi definida pensando em simplicidade, modernida e clareza. Alocadas por meio das variáveis CSS. ```var(--primary-blue)``` é usado para o botão ativo e a aba selecionada. As cores de texto primária (preto) e secundária (cinza) criam uma hierarquia de leitura clara. Isso garante que a cor não seja meramente decorativa, mas uma ferramenta funcional de comunicação.

## 🔄 Processo de Design: Análise-Síntese-Avaliação
O desenvolvimento seguiu um ciclo iterativo de **Análise, Síntese e Avaliação.**

![Análise-Síntese-Avaliação](/docs/assets/img/IHC.png)

**Análise:** O processo começou com a análise da interface do Gmail e do problema a ser resolvido. Foram feitas análises dos componentes visuais, as funcionalidades necessárias (CRUD, pastas) e os requisitos do usuário (uma interface familiar e funcional).

**Síntese:** Nesta fase, as ideias foram transformadas em uma solução concreta. Estruturação do HTML, estilizados com CSS e, o mais importante, a lógica de negócios sintetizada em código JavaScript funcional. Cada funcionalidade (o CRUD, a responsividade, o contador) foi uma etapa de síntese.

**Avaliação:** Após cada implementação (síntese), uma avaliação era feita. O CRUD funciona como esperado? O design quebra em alguma tela? O feedback do usuário (neste caso, as novas solicitações) servia como uma avaliação que alimentava um novo ciclo. Por exemplo, após criar o CRUD, avaliamos que faltava um feedback numérico, o que levou a um novo ciclo de Análise-Síntese-Avaliação para implementar o contador de e-mails.


# 🚀 Como Executar o Projeto
Este é um projeto puramente front-end e não requer um servidor ou processo de build.

Clone este repositório:

```
git clone https://github.com/V1niGabriel/email-manager-web.git

```
Navegue até a pasta do projeto.

Abra o arquivo index.html diretamente no seu navegador de preferência (Google Chrome, Firefox, etc.).

# 📂 Organização das Pastas
📁 docs/<br>
├── 📁 icons/<br>
├── 📁 img/<br>
index.html<br>
script.js<br>
stylesheet.css<br>
readme.md<br>