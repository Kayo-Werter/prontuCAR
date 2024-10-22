# ProntuCAR 🚗💻

**Prontuário Eletrônico para Automóveis**

O ProntuCAR é um sistema projetado para facilitar o gerenciamento de informações sobre automóveis. Ele permite aos proprietários de veículos controlar abastecimentos, manutenções, trocas de peças e despesas, trazendo mais organização e eficiência para o dia a dia.

## 📋 Funcionalidades

- **Gerenciamento de abastecimentos, manutenções e despesas**: Controle detalhado dos gastos e atividades relacionadas ao veículo.
- **Integração com APIs externas**:
  - *ViaCep*: Preenchimento automático de endereços com base no CEP.
  - *OpenWeatherMap*: Relatório climático com base no endereço do veículo.
- **Autenticação de usuários**: Sistema de login com controle de acesso seguro e gerenciamento de dados por usuário.
- **Soft Delete, Hard Delete e Recuperação de Dados**: Flexibilidade na gestão de registros, permitindo a exclusão e recuperação de informações.
- **Expansão planejada para plataformas mobile**: Arquitetura pronta para suportar versões futuras em dispositivos móveis.

## 🚀 Tecnologias Utilizadas

- **Backend**: Django Rest Framework (DRF) para construção da API
- **Frontend**: Desenvolvido em NextJS por colegas da equipe
- **Banco de Dados**: PostgreSQL
- **APIs Externas**:
  - ViaCep (para preenchimento automático de endereços)
  - OpenWeatherMap (para dados de clima)
- **Outras ferramentas**: 
  - Figma (para prototipagem)
  - Trello (para gestão de tarefas)
  - Scrum (metodologia ágil para o gerenciamento do projeto)

## 🎨 Protótipos

As telas foram prototipadas no [Figma](https://figma.com) para planejar a interface de usuário e facilitar a visualização das funcionalidades antes do desenvolvimento.

## 📦 Instalação para uso da API

### Pré-requisitos 
- Python 3.8+
- Django 5.1+
- PostgreSQL
- NextJS (para rodar o frontend, se disponível)


### Passo a Passo

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/prontucar.git
    ```

2. Instale as dependências:
    ```bash
    pip install -r requirements.txt
    ```

3. Realize as migrações no banco de dados:
    ```bash
    python manage.py migrate
    ```

4. Execute o servidor de desenvolvimento:
    ```bash
    python manage.py runserver
    ```

5. Acesse o sistema em `http://localhost:8000`.

## 🛠️ Uso

A API oferece endpoints para gerenciar informações sobre veículos, manutenções e despesas. Exemplos de endpoints principais:

- **GET /api/v1/vehicle/**: Retorna a lista de veículos do usuário.
- **POST /api/v1/vehicle/**: Cria um novo veículo.
- **GET /api/v1/expenses/**: Lista todas as despesas cadastradas.

## 📫 Contato

Se tiver dúvidas ou sugestões, sinta-se à vontade para me contatar:
- **Email**: kayo.werter1@gmail.com
- **LinkedIn**: [Kayo Werter](https://www.linkedin.com/in/kayo-werter-1b2365231/)

---

Projeto desenvolvido como parte do Trabalho de Conclusão de Curso de Análise e Desenvolvimento de Sistemas.
