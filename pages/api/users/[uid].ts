
import type { NextApiRequest, NextApiResponse } from 'next'
import { checkForRole } from '../../../lib/authcheck';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	console.log(req.method);
}
