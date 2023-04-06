import { json } from '@sveltejs/kit';
import Costume from 'base/models/Costume';

/**
 * @type {import('./$types').RequestHandler}
 */
export async function GET() {
	const costumes = await Costume.find().lean();
	return json({ costumes });
}
