
# User Management System

## Overview

This project consists of two microservices:
1. **User Service**: Handles user creation, updates, and retrieval.
2. **History Service**: Records and retrieves user actions (create and update events) from Kafka.

## Technologies Used

- **Node.js** and **Express** for the backend.
- **Sequelize** as the ORM.
- **PostgreSQL** as the database.
- **Kafka** for messaging between services.
- **TypeScript** for the History Service.

## Services

### User Service

Handles user-related operations such as creation, updating, and retrieval.

#### Endpoints

1. **Create User**

   - **URL**: `/users`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     {
       "firstName": "Alice",
       "lastName": "Johnson",
       "age": 28,
       "gender": "female",
       "problems": true
     }
     ```
   - **Response**: The created user object.

2. **Update User**

   - **URL**: `/users/:id`
   - **Method**: `PUT`
   - **Request Body**:
     ```json
     {
       "firstName": "Bob",
       "lastName": "Williams",
       "age": 35,
       "gender": "male",
       "problems": false
     }
     ```
   - **Response**: The updated user object.

3. **Get Users**

   - **URL**: `/users`
   - **Method**: `GET`
   - **Response**: An array of user objects.

### History Service

Records and retrieves user actions (create and update events) from Kafka.

#### Endpoints

1. **Get History**

   - **URL**: `/history`
   - **Method**: `GET`
   - **Query Parameters**:
     - `userId` (optional): Filter history by user ID.
     - `page` (optional, default: 1): Page number for pagination.
     - `limit` (optional, default: 10): Number of records per page.
   - **Response**: An array of history objects.

## Setup and Installation

### Prerequisites

- Node.js
- npm
- PostgreSQL
- Kafka and Zookeeper

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/penguingl/User-Management-System.git
   cd User-Management-System
   ```

## Install and setup Zookeeper

1. **Update package list and install Java**:
   ```bash
   sudo apt update
   sudo apt install default-jre -y
   ```

2. **Download and extract Zookeeper**:
   ```bash
   wget https://downloads.apache.org/zookeeper/zookeeper-3.9.2/apache-zookeeper-3.9.2-bin.tar.gz
   tar -xvzf apache-zookeeper-3.9.2-bin.tar.gz
   mv apache-zookeeper-3.9.2-bin zookeeper
   ```

3. **Create configuration file**:
   ```bash
   cd zookeeper/conf
   cp zoo_sample.cfg zoo.cfg
   ```

4. **Start Zookeeper**:
   ```bash
   cd ..
   ./bin/zkServer.sh start
   ```

## Install and setup Kafka

1. **Download and extract Kafka**:
   ```bash
   wget https://downloads.apache.org/kafka/3.7.0/kafka_2.13-3.7.0.tgz
   tar -xvzf kafka_2.13-3.7.0.tgz
   mv kafka_2.13-3.7.0 kafka
   ```

2. **Start Kafka**:
   ```bash
   cd kafka
   ./bin/kafka-server-start.sh config/server.properties
   ```

## Install and setup PostgreSQL

1. **Update package list and install PostgreSQL**:
   ```bash
   sudo apt update
   sudo apt install postgresql postgresql-contrib -y
   ```

2. **Start PostgreSQL**:
   ```bash
   sudo service postgresql start
   ```

3. **Create database and user**:
   ```bash
   sudo -u postgres psql
   ```

   In the PostgreSQL console:
   ```sql
   CREATE DATABASE user_management;
   CREATE USER user_manager WITH ENCRYPTED PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE user_management TO user_manager;
   \q
   ```

## User Service Setup

1. **Navigate to the user service directory**:
   ```bash
   cd user-service
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the service**:
   ```bash
   DATABASE=user_management DB_USERNAME=user_manager DB_PASS=your_password node app.js
   ```

## History Service Setup

1. **Navigate to the history service directory**:
   ```bash
   cd history-service
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the service**:
   ```bash
   DATABASE=user_management DB_USERNAME=user_manager DB_PASS=your_password npx ts-node app.ts
   ```

## Testing the API

You can test the API endpoints using tools like Postman or curl.

### Create a User

**curl**:
```bash
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{
  "firstName": "Alice",
  "lastName": "Johnson",
  "age": 28,
  "gender": "female",
  "problems": true
}'
```

### Update a User

**curl**:
```bash
curl -X PUT http://localhost:3000/users/<user_id> -H "Content-Type: application/json" -d '{
  "firstName": "Bob",
  "lastName": "Williams",
  "age": 35,
  "gender": "male",
  "problems": false
}'
```

### Get Users

**curl**:
```bash
curl -X GET http://localhost:3000/users
```

### Get User History

**curl**:
```bash
curl -X GET "http://localhost:3001/history?userId=<user_id>&page=1&limit=10"
```

## Conclusion

This setup should help you get started with the User Management System project. Ensure all services are running and configured correctly to test the API endpoints. If you encounter any issues, refer to the logs for debugging.
