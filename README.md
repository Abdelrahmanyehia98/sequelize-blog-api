# Sequelize Blog API

This project is a RESTful API built using Node.js, Express.js, and Sequelize ORM. It allows users to create accounts, publish posts, and comment on posts.

## 📚 Features

### ✅ User APIs
- `POST /users/signup`: Register new users with validations.
- `PUT /users/:id`: Update or create user by ID (skip validation).
- `GET /users/by-email`: Find user by email.
- `GET /users/:id`: Retrieve user by ID (excluding role).

### 📝 Post APIs
- `POST /posts`: Create new post.
- `DELETE /posts/:postId`: Delete post (owner only).
- `GET /posts/details`: Get posts with user and comment details.
- `GET /posts/comment-count`: Get posts with comment counts.

### 💬 Comment APIs
- `POST /comments`: Bulk create comments.
- `PATCH /comments/:commentId`: Update comment (owner only).
- `POST /comments/find-or-create`: Find or create comment.
- `GET /comments/search?word=the`: Search comments by word.
- `GET /comments/newest/:postId`: Get 3 most recent comments for post.
- `GET /comments/details/:id`: Get comment by ID with user and post.

## 🛠️ Technologies
- Node.js
- Express.js
- Sequelize ORM
- MySQL

## ✅ Validations
- Email format validation (built-in).
- Custom password length check (>6).
- Name length validation using `beforeCreate` hook (>2).
- Soft delete (paranoid mode) for posts.

## 🚀 Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/sequelize-blog-api.git
   cd sequelize-blog-api
