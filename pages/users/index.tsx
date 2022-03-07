import { Prisma, User } from '.prisma/client';
import { Space, Table, Title, Avatar, Menu, ActionIcon, Skeleton } from '@mantine/core'
import { useId, useListState } from '@mantine/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react'
import Roles, { RolesStrings } from "../../lib/roles"
import { TrashIcon, EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons"

type UserWithProvider = Prisma.UserGetPayload<{include: {accounts: true}}>

export default function Users() {

	const [viewEmail, setviewEmail] = useState(false);
	const [users, userHandler] = useListState<UserWithProvider>();

	useEffect(() => {
		axios.get('/api/users')
			.then(res => userHandler.setState(res.data))
			.catch(err => console.log(err));
	// infinite loop, asks for userHandler
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<Title>Все пользователи рекламного агентства</Title>
			<Space h = "xl"/>
			<Table highlightOnHover>
				<thead>
					<tr>
						<th>{/*image*/}</th>
						<th>Имя</th>
						<th>
							<span style = {{display: 'inline-flex'}}>
								Почта 
								<ActionIcon component = 'span' onClick = {() => setviewEmail(!viewEmail)}>
									{viewEmail ? <EyeClosedIcon /> : <EyeOpenIcon />}
								</ActionIcon>
							</span>
						</th>
						<th>Провайдер</th>
						<th>Роль</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{users.map(e => (
						<tr key = {e.id}>
							<td><Avatar src = {e.image ?? ""} alt = "" radius = "xl"/></td>
							<td>{e.name}</td>
							<td><Skeleton visible = {!viewEmail} animate = {false}>{e.email}</Skeleton></td>
							<td>{e.accounts.map(acc => acc.provider).join(', ')}</td>
							<td>{RolesStrings[e.roleRoleId - 1]}</td>
							<td>
								<Menu>
									<Menu.Item disabled = {e.roleRoleId === Roles.admin}>
										<Menu trigger = "hover" position = 'left' control = {<span>Роли</span>} withinPortal = {false} delay = {500}>
											{RolesStrings.map((role, index) => <Menu.Item key = {index}>{role}</Menu.Item>)}
										</Menu>
									</Menu.Item>
									<Menu.Item color="red" icon={<TrashIcon />} disabled = {e.roleRoleId === Roles.admin}>Деактивировать аккаунт</Menu.Item>
								</Menu>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
  )
}
