import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from './prisma';

/**
 * Check if user has any of the roles requested by 'roles'
 * @param req request
 * @param res responce
 * @param roles list of roles: 1 - admin, 2 - manager, 3 - seller, 4 - support, 5 - copywriter, 6 - customer
 * @returns true if user has the role, false otherwise
 */
export async function checkForRole(req: NextApiRequest, res: NextApiResponse<any>, roles: Number[]) {
	let token = req.cookies['next-auth.session-token'];
	if (token == null) return false;

	let tokenCheck = await prisma.session.findUnique({
		where: { sessionToken: token },
		include: { user: true },
	});

	console.log(tokenCheck);

	return roles.includes(tokenCheck?.user.roleRoleId ?? 0);
}

