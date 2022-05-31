import { Table, Group, Title, Button, Space, Badge, Menu, Avatar } from '@mantine/core'
import { useListState } from '@mantine/hooks';
import { Prisma, Sku } from '@prisma/client';
import { Pencil1Icon } from '@radix-ui/react-icons';
import axios from 'axios';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

type OrderWithUser = Prisma.OrderGetPayload<{include: {user: true}}>


export default function AdminOrders() {

	const router = useRouter();

	const [orders, ordersHandler] = useListState<OrderWithUser>();
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
				<Title>Заказы агентства</Title>
			</Group>
			<Space h = "xl"/>
			<Table highlightOnHover>
				<thead>
					<tr>
						<th>Пользователь</th>
						<th>Товары</th>
						<th>Стоимость</th>
					</tr>
				</thead>
				<tbody>
					{orders.map(e => 
						<tr key = {e.OrderId}>
							<td>
								<Group>
									<Avatar src = {e.user.image ?? ""} alt = "" radius = "xl"/>
									{e.user.name}
								</Group>
							</td>
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
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	)
}
