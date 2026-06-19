import { redirect } from "next/navigation";

export default async function Layout({children}: {children: React.ReactNode} ) {
    const user = '' // here we need to create a validateRequest function to prevent those who are not logged get inside the coso

    if(user) redirect("/");

    return <>{children}</>
}