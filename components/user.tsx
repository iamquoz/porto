import { useSession } from "next-auth/react"
import Link from "next/link";
import { ActionIcon, Avatar, Button, Group, Skeleton, Text, UnstyledButton, createStyles } from '@mantine/core'
import { ExitIcon } from "@radix-ui/react-icons";
import { EnterIcon } from "@radix-ui/react-icons";

const useStyles = createStyles((theme) => ({
	user: {
	  display: 'block',
	  width: '100%',
	  padding: theme.spacing.md,
	  color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
  
	  '&:hover': {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
	  },
	},
  }));

export default function User() {

	const { classes } = useStyles();
  	const { data: session, status } = useSession()

	switch (status) {
		case 'authenticated':
			return (
				<Link href = "/self" passHref>
					<UnstyledButton className={classes.user}>
						<Group>
							<Avatar radius = "xl" src = {session?.user?.image ?? ""}></Avatar>	
							<div style = {{flex: 1}}>
								<Text>{session?.user?.name}</Text>
								<Text size="xs" color="dimmed">{session?.user?.email}</Text>
							</div>
							<ActionIcon component = {Link} href = "/api/auth/signout">
								<ExitIcon />
							</ActionIcon>
						</Group>
					</UnstyledButton>
				</Link>
			)
		case 'loading': 
			return (
				<UnstyledButton className={classes.user}>
					<Group>
						<Skeleton height = {50} circle></Skeleton>
						<div style = {{flex: 1}}>
							<Skeleton height = {16} width = {150}></Skeleton>
							<Skeleton height = {12} width = {150} mt = {2}>Test</Skeleton>
						</div>
						<Skeleton height = {16} width = {16}>
							<ExitIcon />
						</Skeleton>
					</Group>
				</UnstyledButton>
			)
		case 'unauthenticated':
			return (
				<Link href = "/api/auth/signin" passHref>
					<UnstyledButton className={classes.user}>
						<Group>
							<Avatar radius = "xl"></Avatar>	
							<div style={{flex: 1}}>
								<Text>Войти</Text>
							</div>
							<ActionIcon>
								<EnterIcon />
							</ActionIcon>
						</Group>
					</UnstyledButton>
				</Link>
			)
	}

    return <></>
}
