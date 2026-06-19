import {redirect} from "next/navigation"


export default async function LayoutLogg({
    children,
}: {
    children: React.ReactNode;
}) { 
    const session = ''

    // if (!session.user) redirect('/login');
    // crear esto dpe 

    return <>{children}</>
}