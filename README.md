# AI Query Agent Frontend

This is the frontend application for the AI Query Agent, built with React. It provides an intuitive interface for interacting with an AI agent that can query and analyze databases.

## 🚀 Features

- **Interactive Chat Interface**: Chat with the AI agent to ask questions about your data.
- **Database Viewer**: Visualize the connected database schema and content.
- **Markdown Support**: AI responses are rendered with full Markdown support, including tables and code blocks.
- **Persistent History**: View and manage your conversation history.
- **Responsive Design**: Optimized for various screen sizes.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Markdown Rendering**: [react-markdown](https://github.com/remarkjs/react-markdown) with [remark-gfm](https://github.com/remarkjs/remark-gfm)
- **Styling**: CSS3
- **API Communication**: Fetch API

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## ⚙️ Getting Started

1. **Clone the repository** (if applicable) or navigate to the project directory.

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure the API URL** (Optional):
   By default, the app connects to `http://localhost:8000`. You can change this by creating a `.env` file in the root directory:
   ```env
   REACT_APP_API_BASE_URL=https://your-api-url.com
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## 🧪 Available Scripts

- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm test`: Launches the test runner.
- `npm run eject`: Ejects from Create React App (use with caution).

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details (if applicable).
