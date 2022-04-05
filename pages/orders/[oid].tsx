import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AdminOrder from "../../components/rolepages/orders/idviews/adminorder";
import CustomerOrder from "../../components/rolepages/orders/idviews/customerorder";
import Role from "../../lib/roles";

export default function IndividualOrder() {
	const router = useRouter();

	const { data: session, status } = useSession();
	const { oid } = router.query;

	if (status == 'unauthenticated' || status == 'loading')
		return <></>

	if ([Role.admin, Role.manager, Role.seller].includes(session?.role as Role))
		return <AdminOrder id = {oid as string}/>
	else 
		return <CustomerOrder id = {oid as string}/>
}
