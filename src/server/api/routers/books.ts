import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const bookRouter = createTRPCRouter({
	getByAuthor: publicProcedure
		.input(z.string().nullish()).query(({ ctx, input }) => {
			return ctx.prisma.book.findMany({
				where: {
					author: input ?? '',
				}
			});
		}),
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.book.findMany();
	}),
});
