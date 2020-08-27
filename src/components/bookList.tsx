import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { getBooksQuery } from '../graphQueries/queries';
import BookDetails from './bookDetails';

const BookList = () => {
	const [selectedBook, setSelectedBook] = useState('');
	const { loading, error, data } = useQuery(getBooksQuery);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;
	return (
		<div className="booksContainer">
			<ol className="book-list">
				<div className="Header"> Favorite Reading List</div>
				{data.books.map((book: any) => {
					return (
						<li key={book.id} onClick={() => setSelectedBook(book.id)}>
							{book.name}
						</li>
					);
				})}
			</ol>
			{selectedBook ? (
				<BookDetails selectedBook={selectedBook} />
			) : (
				<div className="book-details"> Select a book to see details </div>
			)}
		</div>
	);
};

export default BookList;
