import { TodoRepository } from '../repositories/todo.repository';
import { Todo, CreateTodoRequest } from '../types/todo.types';
import { v4 as uuidv4 } from 'uuid';

const todoRepository = new TodoRepository();

export class TodoService {

  async getAllTodos(): Promise<Todo[]> {
    return await todoRepository.findAll();
  }

  async getTodoById(id: string): Promise<Todo | null> {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid todo ID');
    }
    return await todoRepository.findById(id);
  }

  async createTodo(data: CreateTodoRequest)/* UNCOMMENT ME: Promise<Todo>*/ {

    // Dans le service, on crée un bel objet tout propre à partir des données reçues.
    // On génère un ID unique pour le todo.
    const id = uuidv4();
    const now = new Date();
    // quand on crée un todo, qu'est-ce qui est requis ?
    // qu'est-ce qui est optionnel (qu'on peut définir par défaut) ?
    
    // const todo = {
    //   text: ,
    //   isCompleted: , 
    //   date: , 
    //   createdAt: , // Date de création
    //   updatedAt
    // };
    // On appel le repo pour créer le todo.
    // Ensuite, on retourne le todo créé au contrôleur.
  }

  // Les autres actions du service (update, delete, etc.) peuvent être ajoutées ici
  
}

