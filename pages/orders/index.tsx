import { useSession } from "next-auth/react";
import AdminOrders from "../../components/rolepages/orders/adminorders";
import CustomerOrders from "../../components/rolepages/orders/customerorders";
import Role from "../../lib/roles";

export default function Index() {

	const { data: session, status } = useSession();

	if (status == 'unauthenticated' || status == 'loading')
		return <></>

	if ([Role.admin, Role.manager, Role.seller].includes(session?.role as Role))
		return <AdminOrders />
	else 
		return <CustomerOrders />
}
