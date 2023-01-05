import { type NextPage } from "next";
import type { IBook } from "../types/Book";

import { api } from "../utils/api";

const Home: NextPage = () => {
	const utils = api.useContext();
	const { data } = api.books.getAll.useQuery();

	const addBook = api.books.create.useMutation({
		async onSuccess() {
			await utils.books.getAll.invalidate();
		}
	});

	return (
		<div>
			{data?.map(book => {
				return <div key={book.id}>{book.title}</div>;
			})}
			<p />
			<div>
				<h1>Add/remove books</h1>
				<button onClick={async e => {
					e.preventDefault();
					const data: IBook = {
						title: 'Oathbringer',
						author: 'Brandon Sanderson',
						year: 2017,
						publisher: 'Tor books',
						description: 'You CANNOT have my pain!'
					};

					try {
						await addBook.mutateAsync(data);
					} catch (cause) {
						console.error(`Failed to add book: ${cause}`);
					}
				}}>Add book</button>
			</div>
		</div>
	);
};

export default Home;
