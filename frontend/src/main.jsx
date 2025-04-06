import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './App.css';
import App from './App.jsx';
import { AuthProvider } from "./context/AuthContext";
import './index.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <ApolloProvider client={client}>
                    <App />
                </ApolloProvider>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);
