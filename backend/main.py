from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# 1. Inicializamos o FastAPI
app = FastAPI(title="Mini Curso API - Task Manager")

# 2. Configuramos o CORS (Cross-Origin Resource Sharing)
# Isso permite que o seu navegador (frontend) converse com o seu servidor (backend)
# mesmo que eles estejam em "endereços" diferentes.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Permite qualquer origem
    allow_credentials=True,
    allow_methods=["*"], # Permite todos os métodos (GET, POST, etc)
    allow_headers=["*"], # Permite todos os headers
)

# 3. Definimos como é uma "Tarefa" (o nosso contrato de dados)
class Task(BaseModel):
    id: Optional[int] = None # O ID é opcional na criação, a API vai gerar
    title: str               # O título é obrigatório (texto)
    completed: bool = False  # Por padrão, começa como não concluída

# 4. Banco de dados temporário (Lista na memória do computador)
# IMPORTANTE: Se você reiniciar o servidor, esses dados somem!
db: List[Task] = [
    Task(id=1, title="Entender o que é uma API", completed=True),
    Task(id=2, title="Aprender sobre Métodos HTTP", completed=False),
]

# --- NOSSAS ROTAS (ENDPOINTS) ---

@app.get("/tasks", response_model=List[Task])
def get_tasks():
    """MÉTODO GET: Usado para BUSCAR ou LER informações."""
    return db

@app.post("/tasks", response_model=Task)
def create_task(task: Task):
    """MÉTODO POST: Usado para CRIAR novas informações."""
    # Geramos um novo ID simples baseado no maior ID existente
    new_id = max((t.id or 0 for t in db), default=0) + 1
    task.id = new_id
    db.append(task)
    return task

@app.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, updated_task: Task):
    """MÉTODO PUT: Usado para ATUALIZAR informações existentes."""
    for index, task in enumerate(db):
        if task.id == task_id:
            updated_task.id = task_id # Mantemos o mesmo ID
            db[index] = updated_task
            return updated_task
    raise HTTPException(status_code=404, detail="Tarefa não encontrada")

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    """MÉTODO DELETE: Usado para REMOVER informações."""
    for index, task in enumerate(db):
        if task.id == task_id:
            db.pop(index)
            return {"message": "Tarefa deletada com sucesso"}
    raise HTTPException(status_code=404, detail="Tarefa não encontrada")

# Comando para rodar o servidor se este arquivo for executado diretamente
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
