import dynamic from "next/dynamic";

export default dynamic(() => import('./OrderMap'), {
	ssr: false,
	loading: () => <></>
});
