import { useSession } from "next-auth/react"
import Link from "next/link";
import { ActionIcon, Anchor, Avatar, Group, Skeleton, Text, UnstyledButton } from '@mantine/core'
import { ExitIcon } from "@radix-ui/react-icons";
import { EnterIcon } from "@radix-ui/react-icons";

import styles from '../styles/UserNavbar.module.css'

export default function User() {

  	const { data: session, status } = useSession()

	switch (status) {
		case 'authenticated':
			return (
				<UnstyledButton className = {styles.userDiv}>
					<Group position="apart" className = {styles.user}>
							<Group>
								<Avatar radius = "xl" src = {session?.user?.image ?? ""}></Avatar>	
								<div>
									<Text>{session?.user?.name}</Text>
									<Text size="xs" color="gray">{session?.user?.email}</Text>
								</div>
							</Group>
						<ActionIcon component = {Link} href = "/api/auth/signout">
							<ExitIcon />
						</ActionIcon>
					</Group>
				</UnstyledButton>
			)
		case 'loading': 
			return (
				<UnstyledButton className = {styles.userDiv}>
					<Group position="apart" className = {styles.user}>
							<Group>
								<Skeleton height = {50} circle></Skeleton>	
								<div>
									<Skeleton height = {16} width = {150}></Skeleton>
									<Skeleton height = {12} width = {150} mt = {2}>Test</Skeleton>
								</div>
							</Group>
						<Skeleton height = {16} width = {16}>
							<ExitIcon />
						</Skeleton>
					</Group>
				</UnstyledButton>
			)
		case 'unauthenticated':
			return (
				<UnstyledButton className = {styles.userDiv} >
					<Group position="apart" className = {styles.user}>
							<Group>
								<Avatar radius = "xl"></Avatar>	
								<Text>Log in!</Text>
							</Group>
						<ActionIcon component = {Link} href = "/api/auth/signin">
							<EnterIcon />
						</ActionIcon>
					</Group>
				</UnstyledButton>	
			)
	}

    return <></>
}
