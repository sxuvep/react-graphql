import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Row, Col, FormGroup, Form, FormLabel, FormControl } from 'react-bootstrap';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../graphQueries/queries';

const AddBook = () => {
	const { loading, error, data } = useQuery(getAuthorsQuery);
	const [bookName, setBookName] = useState('');
	const [genre, setGenre] = useState('');
	const [selectedAuthror, setSelectedAuthror] = useState('');

	const [addBook] = useMutation(addBookMutation);

	const onAuthorSubmit = (e: any) => {
		e.preventDefault();
		addBook({
			variables: {
				name: bookName,
				genre: genre,
				authorId: selectedAuthror,
			},
			refetchQueries: [{ query: getBooksQuery }],
		});
	};
	return (
		<Form className="form" onSubmit={onAuthorSubmit}>
			<Row>
				<Col>
					<FormGroup>
						<FormLabel htmlFor="bookName">Book name:</FormLabel>
						<FormControl
							id="bookName"
							name="bookName"
							type="text"
							value={bookName}
							onChange={(e) => setBookName(e.target.value)}
						/>
					</FormGroup>
				</Col>
				<Col>
					<FormGroup>
						<FormLabel htmlFor="genre">Genre:</FormLabel>
						<FormControl
							id="genre"
							name="genre"
							type="text"
							value={genre}
							onChange={(e) => setGenre(e.target.value)}
						/>
					</FormGroup>
				</Col>
				<Col>
					<FormGroup>
						<FormLabel htmlFor="AuthorList">Select author: </FormLabel>
						<select
							id="AuthorList"
							className="form-control"
							value={selectedAuthror}
							onChange={(e) => setSelectedAuthror(e.target.value)}
						>
							<option>Select author</option>
							{loading && <option>Loading...</option>}
							{error && <option>Error...</option>}
							{data &&
								data.authors.map((author: any) => {
									return (
										<option key={author.id} value={author.id}>
											{author.name}
										</option>
									);
								})}
						</select>
					</FormGroup>
				</Col>
				<Col className="d-flex align-self-center">
					<button className="btn btn-primary">Add Book</button>
				</Col>
			</Row>
		</Form>
	);
};

export default AddBook;
