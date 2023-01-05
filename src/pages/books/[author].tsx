import { useRouter } from "next/router";
import { api } from "../../utils/api";

const AuthorPage = () => {
	const author = useRouter().query.author as string;
	const { data } = api.books.getByAuthor.useQuery(author);

	return (
		<div>
			{data?.map(book => {
				return <div key={book.id}>{book.title}</div>;
			})}
		</div>
	);

};

export default AuthorPage;
