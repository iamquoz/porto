import { User } from '.prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from './prisma';

/**
 * extract user from the request header
 * @param req request
 * @param res responce
 * @returns user or null
 */
export async function extractUser(req: NextApiRequest, res: NextApiResponse<any>) : Promise<User | null> {
	let token = req.cookies['next-auth.session-token'];
	if (token == null) return null;

	let account = await prisma.session.findUnique({
		where: { sessionToken: token },
		include: { user: true },
	});

	if (account == null) return null;

	return account.user;
}

