import { AppShell, Navbar, Header, Text } from '@mantine/core';
import CustomHeader from '../components/header';
import CustomNavbar from "../components/navbar";
export default function HomePage() {
	return (
		<AppShell padding = "md" 
		navbar = {<CustomNavbar />}
		header = {<CustomHeader />}>
			<Text>text</Text>
		</AppShell>
  	);
}
