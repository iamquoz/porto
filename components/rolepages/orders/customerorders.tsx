import { Table, Group, Title, Button, Space, Badge, Menu } from '@mantine/core'
import { useListState } from '@mantine/hooks';
import { Order, Sku } from '@prisma/client';
import { Pencil1Icon } from '@radix-ui/react-icons';
import axios from 'axios';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

export default function CustomerOrders() {

	const router = useRouter();

	const [orders, ordersHandler] = useListState<Order>();
	const [skus, setSkus] = useState<Sku[]>();
	
	useEffect(() => {
		axios.get('/api/skus')
			.then(res => setSkus(res.data))
			.catch(err => console.log(err));
		axios.get('/api/orders')
			.then(res => ordersHandler.setState(res.data))
			.catch(err => console.log(err));
	}, []);


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
							<td>
								{
									e.SkuIds.map((id, i) => 
									<p key = {id} style = {e.active[i] ? {} : {textDecoration: 'line-through'}}>
										{skus?.find(x => x.SkuId == id)?.name} с {new Date((e.startDate[i] as unknown as string).replace(' ', 'T')).toDateString()} в количестве {e.count[i]} шт.
									</p>
									)
								}
							</td>
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
