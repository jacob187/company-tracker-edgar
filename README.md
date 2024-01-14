# Company Tracker Edgar

This project aims to create a company tracker using the Edgar API. The goal is to provide a tool that allows users to search for and track information about companies registered with the U.S. Securities and Exchange Commission (SEC).

## Installation

### Backend Setup

#### Prerequisites

You need to have Python installed on your machine. You can download Python [here](https://www.python.org/downloads/). This project requires Python 3.10+

#### Setting Up the Environment

Before you can run the project, you need to set up a virtual environment. This will keep the dependencies required by this project separate from your global Python environment.

Here's how you can set up a virtual environment:

1. Navigate to the project server directory:

   ```bash
   cd ./server
   ```

2. Create a new virtual environment:

   ```bash
   python -m venv env
   ```

3. Activate the virtual environment:

     ```bash
     source env/bin/activate
     ```

To set your identity for the edgar rest client, create a file in the root called .env. In the file create two lines:

```txt
NAME="Your Name"
EMAIL="Your Email"
```

#### Installing

After setting up and activating the virtual environment, you can install the required dependencies:

```bash
pip install -r requirements.txt
```

### Frontend Setup

#### Prerequisites

You need to have Node.js and npm installed on your machine. You can download Node.js and npm [here](https://nodejs.org/en/download/). This project was written with the latest LTS version of Node.js as of January, 2024.

#### Setting Up the Environment

Before you can run the project, you need to install the required dependencies.

Here's how you can set up the environment:

1. Navigate to the project client directory:

   ```bash
   cd ./client
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

## Runtime

Once the dependencies are installed you can start the backend server by navigating to the server directory and starting the uvicorn server:

```bash
   cd ./server
   ```

```bash
   uvicorn company:app --reload
   ```

Start the frontend application by navigating to the client directory:

```bash
   cd ./client
   ```

```bash
   npm run dev
   ```

