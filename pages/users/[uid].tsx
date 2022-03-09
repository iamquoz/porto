import { useRouter } from "next/router";
import { useNotifications } from "@mantine/notifications";

import { useSetState } from "@mantine/hooks"; 
import { useEffect } from "react";
import { User } from "@prisma/client";
import Role from "../../lib/roles";
import axios from "axios";

export default function IndivUser() {

	const router = useRouter()
	const notifications = useNotifications();

	const { uid } = router.query;

	const [user, setUser] = useSetState<User>({id: '', name: null, active: true, roleRoleId: Role.customer, email: '', emailVerified: null, image: ''});

	useEffect(() => {
		axios.get(`/api/users/${uid}`)
			.then(res => setUser(res.data))
			.catch(err => console.log(err));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [uid]);

	return (
		<div>
			{user.name}
		</div>
	)
}
