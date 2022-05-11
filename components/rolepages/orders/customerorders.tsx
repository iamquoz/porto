import { Table, Group, Title, Button, Space, Badge, Menu } from '@mantine/core'
import { useListState } from '@mantine/hooks';
import { Order, Sku } from '@prisma/client';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { useRouter } from 'next/router'
import { useState } from 'react';

export default function CustomerOrders() {

	const router = useRouter();

	const [orders, ordersHandler] = useListState<Order>();
	const [skus, setSkus] = useState<Sku>();
	
	return (
		<div>
			<Group position = 'apart'>
				<Title>Ваши заказы</Title>
				<Button variant="gradient" gradient={{ from: 'grape', to: 'pink', deg: 35 }} onClick = {() => router.push('/orders/0')} size = "lg">Добавить</Button>
			</Group>
			<Space h = "xl"/>
			<Table highlightOnHover>
				<thead>
					<tr>
						<th>Товары</th>
						<th>Стоимость</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{orders.map(e => 
						<tr key = {e.OrderId}>
							<td>{e.SkuIds.join('')}</td>
							<td>{e.totalPrice}</td>
							<td>
								<Menu trigger='hover'>
									<Menu.Item icon = {<Pencil1Icon />} onClick = {() => router.push(`/orders/${e.OrderId}`)}>Редактировать</Menu.Item>
								</Menu>
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	)
}
