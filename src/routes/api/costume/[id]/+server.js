import { json } from '@sveltejs/kit';
import Costume from 'base/models/Costume';

/**
 * @type {import('./$types').RequestHandler}
 */
export async function GET({ request, params }) {
	const costume = await Costume.findOne({ _id: params.id }).lean();

	if (!costume) return json({ status: 400, err: 'Không tồn tại trang phục' });
	return json({ status: 200, costume });
}
