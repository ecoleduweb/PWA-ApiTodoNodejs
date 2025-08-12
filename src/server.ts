import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import dotenv from 'dotenv';
import path from 'path';

import { db } from './db/connection';
import { TodoRepository } from './repositories/todo.repository';
import { TodoService } from './services/todo.service';
import { TodoController } from './controllers/todo.controller';
import { createTodoRoutes } from './routes/todo.routes';
import { errorHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(express.json());

const todoRepository = new TodoRepository(db);
const todoService = new TodoService(todoRepository);
const todoController = new TodoController(todoService);

app.use('/api', createTodoRoutes(todoController));

const swaggerDocument = yaml.load(path.join(__dirname, '../swagger.yml'));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
  console.log(`📚 API Documentation available at http://localhost:${port}/swagger`);
  console.log(`❤️  Health check available at http://localhost:${port}/health`);
});