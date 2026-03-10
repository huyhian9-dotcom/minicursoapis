# Guia do Mini Curso: Domine APIs em 20 Minutos 🚀

Este guia foi criado para ajudar você a conduzir um mini curso prático e rápido sobre APIs, Python (FastAPI) e Integração com Frontend.

## Estrutura do Curso (Sugestão de Tempo)

### 1. Introdução aos Métodos HTTP (4 Minutos)
Explique os 4 pilares das APIs REST:
- **GET**: "Busque isso para mim". Usado para ler dados.
- **POST**: "Crie isso para mim". Usado para enviar novos dados.
- **PUT**: "Atualize isso para mim". Usado para modificar dados existentes.
- **DELETE**: "Remova isso para mim". Usado para apagar dados.

### 2. O Backend com Python e FastAPI (8 Minutos)
Mostre o arquivo `backend/main.py`.
- **Destaque**: A facilidade de criar rotas com `@app.get` ou `@app.post`.
- **Destaque**: O uso de Pydantic para validar os dados (`class Task`).
- **Execução**:
  ```bash
  pip install fastapi uvicorn
  python backend/main.py
  ```
- **Dica**: Abra `http://localhost:8000/docs` para mostrar o Swagger (documentação automática).

### 3. O Frontend e a Integração (8 Minutos)
Mostre como o JavaScript se comunica com o Python.
- **Destaque**: O `fetch()` no `script.js`. Mostre como passamos o `method: 'POST'` ou `'DELETE'`.
- **Destaque**: Como o CSS (moderno com glassmophism) torna a API amigável ao usuário.
- **Ação**: Abra o `index.html` no navegador e adicione/remova tarefas ao vivo.

---

## Como Rodar o Projeto agora?

1. **Instale as dependências**:
   ```bash
   pip install fastapi uvicorn
   ```

2. **Inicie o Servidor**:
   ```bash
   python backend/main.py
   ```

3. **Abra o Frontend**:
   Basta abrir o arquivo `index.html` no seu navegador favorito.

---

## Dicas para Impressionar
- Mostre o console do navegador (F12 -> Network) enquanto clica nos botões para mostrar as requisições HTTP acontecendo em tempo real.
- Explique que o "Banco de Dados" aqui é uma lista na memória, mas em um sistema real seria um SQL ou NoSQL.

Boa aula! 🎓
