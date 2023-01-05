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
	create: publicProcedure
		.input(z.object({
			title: z.string(),
			author: z.string(),
			year: z.number(),
			publisher: z.string().optional(),
			description: z.string().optional(),
		}))
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.book.create({ data: input });
	}),
});
