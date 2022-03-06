import { useSession } from "next-auth/react"
import Link from "next/link";
import { ActionIcon, Avatar, Button, Group, Skeleton, Text, UnstyledButton } from '@mantine/core'
import { ExitIcon } from "@radix-ui/react-icons";
import { EnterIcon } from "@radix-ui/react-icons";

export default function User() {

  	const { data: session, status } = useSession()
	console.log(session);
	switch (status) {
		case 'authenticated':
			return (
				<Link href = "/self" passHref>
					<Button component = 'div' variant = "subtle" fullWidth style = {{height: "50px"}}>
						<Group position="apart">
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
					</Button>
				</Link>
			)
		case 'loading': 
			return (
				<Button component = 'div' variant = "subtle" fullWidth style = {{height: "50px"}}>
					<Group position="apart">
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
				</Button>
			)
		case 'unauthenticated':
			return (
				<Button component = 'div' variant = "subtle" fullWidth style = {{height: "50px"}}>
					<Group position="apart">
							<Group>
								<Avatar radius = "xl"></Avatar>	
								<Text>Log in!</Text>
							</Group>
						<ActionIcon component = {Link} href = "/api/auth/signin">
							<EnterIcon />
						</ActionIcon>
					</Group>
				</Button>	
			)
	}

    return <></>
}
