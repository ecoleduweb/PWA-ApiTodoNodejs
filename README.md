# TODO API

A modern, production-ready RESTful API built with Node.js, TypeScript, Express, and MariaDB using the controller-service-repository architecture pattern.

## 🚀 Features

- **TypeScript**: Full TypeScript support for better development experience
- **Express.js**: Fast, minimalist web framework for Node.js
- **MariaDB**: Robust SQL database with Drizzle ORM
- **Architecture**: Clean controller-service-repository pattern
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Security**: Helmet.js security headers and CORS support
- **Error Handling**: Centralized error handling middleware
- **Deployment Ready**: GitHub Actions workflow and setup scripts
- **Health Checks**: Built-in health monitoring endpoint

## 📋 Requirements

- Node.js 18 or higher
- MariaDB/MySQL 10.3 or higher
- npm 8 or higher

## 🛠 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd todo-api
chmod +x setup.sh
./setup.sh
```

The setup script will:
- Install all dependencies
- Set up environment configuration
- Create and migrate the database
- Build the TypeScript code
- Install PM2 (optional)
- Create system service (Linux only)

### 2. Manual Setup (Alternative)

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update database configuration in .env
# DB_HOST=localhost
# DB_PORT=3306
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=todo_api

# Build the application
npm run build

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=todo_api

# Server Configuration
PORT=3001
NODE_ENV=development

# Security (Optional)
JWT_SECRET=your-secret-key
```

### Database Setup

Ensure MariaDB/MySQL is running and create a database:

```sql
CREATE DATABASE todo_api;
```

## 📝 API Endpoints

### Base URL
```
http://localhost:3001/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos |
| GET | `/todo/:id` | Get todo by ID |
| POST | `/todo` | Create new todo |
| PATCH | `/todo/:id` | Update todo |
| DELETE | `/todo/:id` | Delete todo |

### Request/Response Examples

**Create Todo:**
```bash
curl -X POST http://localhost:3001/api/todo \
  -H "Content-Type: application/json" \
  -d '{"text": "Learn TypeScript"}'
```

**Update Todo:**
```bash
curl -X PATCH http://localhost:3001/api/todo/123 \
  -H "Content-Type: application/json" \
  -d '{"isCompleted": true}'
```

## 📚 API Documentation

Interactive API documentation is available at:
```
http://localhost:3001/swagger
```

## 🏗 Project Structure

```
├── src/
│   ├── controllers/         # Request handlers
│   ├── services/           # Business logic
│   ├── repositories/       # Data access layer
│   ├── db/                 # Database configuration
│   ├── routes/             # Route definitions
│   ├── middleware/         # Custom middleware
│   ├── types/              # TypeScript type definitions
│   └── server.ts           # Application entry point
├── drizzle/                # Database migrations
├── .github/workflows/      # CI/CD workflows
├── dist/                   # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
├── drizzle.config.ts
├── setup.sh               # Setup script
└── README.md
```

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Building
npm run build        # Compile TypeScript to JavaScript

# Production
npm start           # Start production server

# Database
npm run db:generate # Generate database schema
npm run db:migrate  # Run database migrations
npm run db:studio   # Open Drizzle Studio

# Quality
npm run lint        # Lint code with ESLint
npm test           # Run tests with Jest

# Setup
npm run setup      # Complete project setup
```

### Development Workflow

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Make changes to TypeScript files in `src/`**

3. **Database changes:**
   ```bash
   # Modify schema in src/db/schema.ts
   npm run db:generate  # Generate migration
   npm run db:migrate   # Apply migration
   ```

4. **Test your changes:**
   ```bash
   npm test
   npm run lint
   ```

## 🚀 Deployment

### Automatic Deployment (GitHub Actions)

The project includes a GitHub Actions workflow that:
- Runs tests on every push/PR
- Deploys to production on main branch updates
- Handles database migrations
- Uses PM2 for process management

**Required GitHub Secrets:**

**Deployment Secrets:**
- `HOST`: Server IP address
- `USERNAME`: SSH username
- `SSH_KEY`: Private SSH key
- `PORT`: SSH port (usually 22)

**Database Secrets:**
- `DB_HOST`: Database host (e.g., localhost)
- `DB_PORT`: Database port (e.g., 3306)
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name
- `JWT_SECRET`: JWT secret key for authentication

### Manual Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Deploy using PM2:**
   ```bash
   pm2 start dist/server.js --name todo-api
   pm2 save
   ```

3. **Or use systemd service:**
   ```bash
   sudo systemctl start todo-api
   sudo systemctl enable todo-api
   ```

### Production Checklist

- [ ] Set `NODE_ENV=production` in `.env`
- [ ] Configure database with production credentials
- [ ] Set up reverse proxy (nginx/Apache)
- [ ] Configure SSL/TLS certificates
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy

## 🔒 Security

- **Helmet.js**: Security headers protection
- **CORS**: Cross-origin resource sharing control
- **Input Validation**: Request data validation
- **Error Handling**: No sensitive information exposure
- **Environment Variables**: Sensitive data protection

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📊 Monitoring

### Health Check

```bash
curl http://localhost:3001/health
```

Response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Database Connection

The application includes database connection monitoring and automatic retry logic.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make changes and commit: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error:**
- Check if MariaDB/MySQL is running
- Verify database credentials in `.env`
- Ensure database exists

**Port Already in Use:**
- Change PORT in `.env` file
- Kill existing process: `lsof -ti:3001 | xargs kill -9`

**TypeScript Compilation Errors:**
- Run `npm run build` to see detailed errors
- Check `tsconfig.json` configuration

**Migration Errors:**
- Ensure database user has sufficient privileges
- Check database connection settings
- Run migrations manually: `npm run db:migrate`

### Getting Help

- Check the [Issues](../../issues) page
- Review API documentation at `/swagger`
- Check application logs for detailed error messages

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the troubleshooting section

---

Made with ❤️ using TypeScript, Express.js, and Drizzle ORM