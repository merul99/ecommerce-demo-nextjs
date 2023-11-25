'use client'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


function Navbar() {
    const router = useRouter()
    const { data, status } = useSession()
    const activeUser = data?.user;


    const capitalizeName = (str) => {
        if (!str) {
            return "";
        }
        const firstLetter = str.charAt(0).toUpperCase()
        const restWord = str.slice(1).toLowerCase()
        return firstLetter + restWord
    }


    return (
        <div className='mb-5'>
            <nav className='header'>
                <h2 className='logo'>
                    <Link href='/'>E-COMMERCE</Link>
                </h2>
                <ul className='main-nav'>
                    {activeUser && <li>
                        <Link href='/'>
                            Welcome, <b>{capitalizeName(activeUser?.name)}</b>
                        </Link>
                    </li>}
                    <li>
                        <Link href='/cart'>
                            Cart
                        </Link>
                    </li>

                    <li>
                        <Link href='/'>
                            Products
                        </Link>
                    </li>

                    {activeUser?.role && ['admin'].includes(activeUser.role) &&
                        <li >
                            <Link href='/create'>
                                Create
                            </Link>
                        </li>
                    }

                    {status !== 'authenticated' ?
                        <li>
                            <Link href='/signIn'>
                                Sign In
                            </Link>
                        </li> :
                        <li>
                            <span onClick={() => {
                                signOut({ redirect: false }).then(() => {
                                    toast.warn("Logged out successfully.")
                                    router.push("/signIn");
                                });
                            }}>
                                Sign out
                            </span>
                        </li>
                    }

                </ul>
            </nav>
        </div >
    )
}


export default Navbar