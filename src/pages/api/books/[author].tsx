import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import type { NextApiRequest, NextApiResponse } from "next";
import { appRouter } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";

const bookByAuthorHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	const ctx = await createTRPCContext({ req, res });
	const caller = appRouter.createCaller(ctx);

	try {
		// const { author } = req.query --> results in tsserver error
		const author = req.query.author as string;
		const books = await caller.books.getByAuthor(author);
		res.status(200).json(books);
	} catch (cause) {
		if (cause instanceof TRPCError) {
			const httpCode = getHTTPStatusCodeFromError(cause);
			return res.status(httpCode).json(cause);
		}
		console.error(cause);
		res.status(500).json({ message: "Internal servery errory!" });
	}
};

export default bookByAuthorHandler;
