# Database Setup

In this Node.js project, we have set up two primary tables in our database: categories and transactions. Below are the SQL queries to create these tables:

# Categories Table

The categories table stores information about various transaction categories. Here is the SQL query to create this table:

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

# Transactions Table

The transactions table records individual transactions. Each transaction is linked to a category from the categories table. Here is the SQL query to create the transactions table:


CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    transaction_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

# Running the Project

To run the project in a development environment, use the following command:

### `npm run dev`

This will start the app in development mode. You can view it in your browser by navigating to http://localhost:3000.

