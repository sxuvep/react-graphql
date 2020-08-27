import React from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../graphQueries/queries';

const BookDetails = ({ selectedBook }: any) => {
	const { loading, error, data } = useQuery(getBookQuery, {
		variables: { id: selectedBook },
	});
	if (loading) return <div className="book-details">Loading Details...</div>;
	if (error) return <div className="book-details">Something Went Wrong</div>;
	if (!data) return <div className="book-details">No Data Found</div>;
	const { book } = data;
	return (
		<div className="book-details">
			{book && (
				<div>
					<h2 className="Header">Selected book: {book.name}</h2>
					<h3 className="Genre"> Genre: {book.genre}</h3>
					<h4 className="Author-Name"> By: {book.author.name}</h4>
					<h2>All book by this author:</h2>
					<ol>
						{book.author.books.map((bookByAuthor: any) => {
							return <li key={bookByAuthor.id}>{bookByAuthor.name}</li>;
						})}
					</ol>
				</div>
			)}
		</div>
	);
};

export default BookDetails;
