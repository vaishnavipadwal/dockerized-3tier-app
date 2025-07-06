Got it! Here’s your README.md text exactly in your style and format, personalized for your 3-tier app on Windows with VS Code terminal:

---

# 3-Tier Architecture

I set up a 3-tier application using:

Frontend: Nginx (HTML)
Backend: Node.js (Express)
Database: MySQL

Steps:
I created the project folder on my Windows desktop named `3tier-app`, which includes frontend, backend, and db folders.
All work was done using **Visual Studio Code terminal** on Windows with Docker Desktop installed.

Then inside the backend folder, I created a Dockerfile for Node.js backend:

```
FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY index.js .
EXPOSE 5000
CMD ["node", "index.js"]
```

Then in the frontend folder, I created a Dockerfile for Nginx frontend:

```
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80
```

For the database, I used the official MySQL image with this configuration in docker-compose:

```
db:
  image: mysql:8
  environment:
    MYSQL_ROOT_PASSWORD: rootpassword
    MYSQL_DATABASE: testdb
  ports:
    - "3307:3306"
  volumes:
    - dbdata:/var/lib/mysql
```

Then I created the docker-compose.yml file in the main project folder to run all three services together:

```
services:
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: testdb
    ports:
      - "3307:3306"
    volumes:
      - dbdata:/var/lib/mysql

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  dbdata:
```

Then from the **VS Code terminal on Windows**, I ran:

```
docker-compose up --build
```

This built and started all containers. I checked running containers with:

```
docker ps
```

Testing the setup:

* Frontend accessed on `http://localhost` showing the static page
![3-Tier Architecture](architecture.png)

* Backend API accessed on `http://localhost:5000/api/users` returning JSON data
  ![3-Tier Architecture](architecture.png)

* MySQL database running on port 3307
![3-Tier Architecture](architecture.png)

---

This is how I successfully set up the 3-tier app using Docker on Windows with VS Code terminal.

---

