import { api } from "../../utils/api";

const BooksPage = () => {
	const { data } = api.books.getAll.useQuery();

	return (
		<div>
			{data?.map(book => {
				return <div key={book.id}>{book.title}</div>;
			})}
		</div>
	);

};

export default BooksPage;
