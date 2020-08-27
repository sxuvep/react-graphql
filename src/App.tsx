import React from 'react';
import BookList from './components/bookList';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AddBook from './components/addBook';

//apollo client setup
const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="Overview">
				<BookList />
				<AddBook />
			</div>
		</ApolloProvider>
	);
}

export default App;
