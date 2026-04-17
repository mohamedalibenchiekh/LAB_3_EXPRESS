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

## ▶️ Running the Application

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

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
node test-api.js
```

The test script will:
- Test all CRUD operations
- Verify error handling
- Check data validation
- Confirm proper HTTP status codes

**Note**: Make sure the server is running before executing tests.

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

- Node.js (ES Modules support)
- Express.js 5.0.0+

## 👨‍💻 Author

Mohamed Ali Ben Chiekh

## 📄 License

MIT License

---

**Lab Objective**: This lab demonstrates building a complete REST API with proper architecture, middleware usage, and testing practices using Express.js.