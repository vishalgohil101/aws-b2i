AWS Training Repo

📌 Overview

This project is a web application built using AWS services. It allows to manage categories (add, view, delete) through a simple frontend UI.

The architecture follows best practices for security, scalability, and cost-efficiency, using a serverless backend and private networking.

🏗️ Architecture
User (Browser)
   ↓
EC2 (Frontend)
   ↓
API Gateway
   ↓
Lambda (Backend Logic)
   ↓
RDS PostgreSQL (Database - Private)


⚙️ AWS Services Used
Amazon EC2 – Hosts frontend
Amazon API Gateway – Exposes APIs
AWS Lambda – Backend logic
Amazon RDS – PostgreSQL database
Amazon VPC – Network isolation

✨ Features
Add new category
Fetch all categories
Delete category
Secure backend with private database

🔐 Security Design
RDS is placed in a private subnet (not publicly accessible)
Lambda runs inside VPC to access RDS securely
Security Groups restrict access (only Lambda → RDS)
API Gateway acts as controlled public entry point
CORS configured for frontend access

🔗 API Endpoints
Method	Endpoint	Description
GET	/categories	Fetch all categories
POST	/categories	Add new category
DELETE	/categories	Delete category

🖥️ Frontend
Hosted on EC2
Static HTML + JavaScript
Calls API Gateway endpoints using Fetch API

🗄️ Database
PostgreSQL on RDS
Table: categories

🚀 How It Works
User interacts with frontend (EC2)
Frontend calls API Gateway
API Gateway triggers Lambda
Lambda processes request and interacts with RDS
Response is returned to frontend


📌 Conclusion

This project demonstrates a secure and scalable AWS architecture using a mix of EC2, serverless backend, and private database design following best practices.