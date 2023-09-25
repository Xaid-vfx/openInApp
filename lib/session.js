import { signOut, useSession } from 'next-auth/react';
const { data: session } = useSession();
console.log(session);