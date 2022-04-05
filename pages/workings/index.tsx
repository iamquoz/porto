import { Anchor, Group } from '@mantine/core'
import Link from 'next/link'

export default function Users() {

	return (
		<Group>
			<Anchor component = {Link} href='/workings/skus'>Товары</Anchor>
			<Anchor component = {Link} href='/workings/reports'>Заказы</Anchor>
		</Group>
	)
}
