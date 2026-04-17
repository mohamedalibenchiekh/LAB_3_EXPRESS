# Event Manager API - Lab 3

A RESTful API for managing events built with Express.js following MVC architecture. This lab demonstrates the fundamentals of building web servers, routing, middleware, and data management in Node.js.

## 🚀 Features

- **MVC Architecture**: Organized code structure with Models, Views (Controllers), and Routes
- **RESTful API**: Complete CRUD operations for events
- **Middleware**: Logging, validation, and performance monitoring
- **Error Handling**: Comprehensive error responses and 404 handling
- **Health Check**: API status monitoring endpoint
- **In-Memory Storage**: Simple data persistence for demonstration

## 📁 Project Structure

```
lab-3/
├── package.json          # Project dependencies and scripts
├── server.js            # Main application entry point
├── test-api.js          # API testing script
├── src/
│   ├── middleware.js    # Custom middleware functions
│   ├── controllers/
│   │   └── eventController.js  # Business logic for events
│   ├── models/
│   │   └── Event.js     # Data model and operations
│   └── routes/
│       └── eventRoutes.js     # API route definitions
└── README.md            # This file
```

## 🛠 Installation

1. **Clone the repository** (if applicable) or navigate to the project directory
2. **Install dependencies**:
   ```bash
   npm install
   ```

## 🛠 Development Scripts

```bash
# Install all dependencies (including dev dependencies)
npm install

# Start development server with auto-restart
npm run dev

# Start production server
npm start

# Run automated tests (CI-friendly)
npm test

# Run manual tests (requires server running)
npm run test:manual

# Format code with Prettier
npm run format

# Check code formatting
npm run format:check
```

## 🔧 Code Quality

This project uses:
- **Prettier** for code formatting
- **ESLint** for linting (optional)
- **npm audit** for security checks

### Prettier Configuration
- Semi-colons: Yes
- Single quotes: Yes
- Tab width: 2 spaces
- Print width: 80 characters

Run `npm run format` to format your code automatically.

## 📡 API Endpoints

### Base URL
```
http://localhost:3000
```

### Events Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information and available endpoints |
| GET | `/api/events` | Get all events |
| GET | `/api/events/:id` | Get a specific event by ID |
| POST | `/api/events` | Create a new event |
| PUT | `/api/events/:id` | Update an existing event |
| DELETE | `/api/events/:id` | Delete an event |
| GET | `/health` | Health check endpoint |

### Event Data Structure

```json
{
  "id": 1,
  "title": "JavaScript Workshop",
  "date": "2026-02-15",
  "location": "Sfax",
  "capacity": 30,
  "createdAt": "2026-04-17T10:00:00.000Z",
  "updatedAt": "2026-04-17T10:00:00.000Z"
}
```

### Request/Response Examples

#### Get All Events
```bash
GET /api/events
```

Response:
```json
{
  "success": true,
  "count": 2,
  "data": [...]
}
```

#### Create Event
```bash
POST /api/events
Content-Type: application/json

{
  "title": "Docker Masterclass",
  "date": "2026-06-01",
  "location": "Sfax",
  "capacity": 35
}
```

Response:
```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {...}
}
```

#### Update Event
```bash
PUT /api/events/1
Content-Type: application/json

{
  "title": "Advanced JavaScript Workshop"
}
```

#### Delete Event
```bash
DELETE /api/events/1
```

## 🧪 Testing

Run the included test script to verify all API endpoints:

```bash
# CI-friendly automated tests (starts server automatically)
npm test

# Manual tests (requires server to be running separately)
npm run test:manual
```

The test script will:
- Start the server automatically
- Test all CRUD operations
- Verify error handling
- Check data validation
- Confirm proper HTTP status codes

## 🚀 CI/CD

This project includes GitHub Actions workflows for automated testing and deployment:

### Workflows

1. **CI Pipeline** (`.github/workflows/ci.yml`)
   - Runs on every push and pull request to `main` branch
   - Tests against Node.js 18.x and 20.x
   - Installs dependencies and runs automated tests
   - Checks code formatting (if configured)

2. **Code Quality** (`.github/workflows/quality.yml`)
   - Runs security audits with `npm audit`
   - Checks code formatting consistency
   - Runs ESLint if configured
   - Scans for TODO comments

3. **Deploy** (`.github/workflows/deploy.yml`)
   - Triggers on push to `main` branch
   - Can be manually triggered
   - Includes placeholder for deployment steps
   - Add your deployment commands (Docker, PM2, cloud platforms, etc.)

### Running Tests Locally

```bash
# Run CI tests (recommended)
npm test

# Run manual tests (start server first with npm run dev)
npm run test:manual
```

## 🔧 Middleware

The application includes several custom middleware functions:

- **Logger**: Logs all incoming requests
- **Measure Time**: Tracks response time for performance monitoring
- **Validation**: Ensures required fields are present for POST/PUT operations

## 📊 Architecture

### MVC Pattern
- **Models**: Handle data operations and business logic
- **Controllers**: Process requests and responses
- **Routes**: Define API endpoints and map to controllers

### Data Flow
1. Request → Routes → Controller → Model
2. Model → Controller → Response

## 🚨 Error Handling

The API provides comprehensive error handling:

- **400 Bad Request**: Invalid input data
- **404 Not Found**: Resource or endpoint not found
- **500 Internal Server Error**: Server-side errors

Error responses follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

## 📋 Requirements

- Node.js (ES Modules support, version 18+ recommended)
- npm

### Development Dependencies
- Prettier ^3.0.0 (for code formatting)

## 👨‍💻 Author

Mohamed Ali Ben Chiekh

## 📄 License

MIT License

---

**Lab Objective**: This lab demonstrates building a complete REST API with proper architecture, middleware usage, and testing practices using Express.js.