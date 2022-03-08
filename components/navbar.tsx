import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
import { Navbar, ScrollArea, useMantineColorScheme, ActionIcon, Group, Divider, Text, Space, UnstyledButton, ThemeIcon } from '@mantine/core';
import { MantineColor } from "@mantine/styles";
import clsx from "clsx";
import User from "./user";
import axios from "axios";
import styles from '../styles/Navbar.module.css'

import Logo from './img/logo.svg'
import { DashboardIcon, HeartFilledIcon, MixIcon, MoonIcon, PersonIcon, ReaderIcon, SunIcon } from "@radix-ui/react-icons";
import Role from "../lib/roles";

export default function CustomNavbar() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	
	const {logo, logoInvert} = styles;
	const style = clsx({
		[logo]: true,
		[logoInvert]: colorScheme === 'dark'
	})

	const { data: session, status } = useSession();

	return (
		<Navbar width={{base: 300}} padding = "xs" style = {{position: "sticky"}}>
			<Navbar.Section mt = "xs">
				<Group position = "apart">
					<Link href = "/" passHref>
						<ActionIcon size = "xl" variant = "transparent">
							<Image src = {Logo.src} className = {style} alt = "Logo" height = "50px" width = "50px"/>
						</ActionIcon>
					</Link>
					<ActionIcon onClick = {() => toggleColorScheme()} variant = {colorScheme === 'dark' ? 'hover' : 'outline' }>
						{colorScheme === 'dark' ? <SunIcon /> : <MoonIcon />}
					</ActionIcon>
				</Group>
				<HSpaceDivider />
			</Navbar.Section>
			<Navbar.Section grow component={ScrollArea}>

				<Group direction = "column" spacing = "xl">
					{[Role.admin, Role.manager].includes(session?.role as Role) 
						&& <SidebarButton flavorText = "Аккаунты" link = "/users" color = "blue" icon = {<PersonIcon />}/>}
					<SidebarButton flavorText = "Новости" link = "/news" color = "cyan" icon = {<ReaderIcon />} />
					<SidebarButton flavorText = "Поддержка" link = "/support" color = "pink" icon = {<HeartFilledIcon />} />
					<SidebarButton flavorText = "Заказы" link = "/orders" color = "teal" icon = {<DashboardIcon />} />
					<SidebarButton flavorText = "Предприятие" link = "/workings" color = "orange" icon = {<MixIcon />} />
				</Group>
				

			</Navbar.Section>
			<Navbar.Section>
				<HSpaceDivider />

				<User />
			</Navbar.Section>
		</Navbar>
  	)
}

function SidebarButton({flavorText, link, icon, color} : {flavorText: string, link: string, icon: React.ReactElement, color: MantineColor }) {
	return (
		<Link href={link} passHref>
			<UnstyledButton>
				<Group>
					<ThemeIcon color={color} variant="filled">{icon}</ThemeIcon>
					<Text>{flavorText}</Text>
				</Group>
			</UnstyledButton>
		</Link>
	);
}


function HSpaceDivider() {
	return (
		<>
			<Space h = "lg"/>
			<Divider />
			<Space h = "lg"/>
		</>
	)
}
