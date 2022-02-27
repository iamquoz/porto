import { useState, useEffect } from "react";
import { Navbar, ScrollArea, useMantineColorScheme, Switch } from '@mantine/core';
import User from "./user";
import axios from "axios";

export default function CustomNavbar() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	useEffect(() => {
		axios.get('/api/hello')
			.then(res => console.log(res))
			.catch(err => console.log(err));
	}, [])
	
	return (
		<Navbar width={{base: 300}} padding = "xs" height = "calc(100vh - 60px)">
			<Navbar.Section mt = "xs">
				text
			</Navbar.Section>
			<Navbar.Section grow component={ScrollArea}>
				help
			</Navbar.Section>
			<Navbar.Section><User /></Navbar.Section>
		</Navbar>
  	)
}
