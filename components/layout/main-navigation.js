import Link from 'next/link';
import Logo from './logo';
import classes from './main-navigation.module.css';
import { signOut } from 'next-auth/react';

function MainNavigation() {

    const handleLogout = async (e) => {
        await signOut({
            callbackUrl: "/auth/signin", // Redirect the user to the home page after logout
        });
    };


    return (
        <header className={classes.header}>
            <Link href='/'>
                <Logo />
            </Link>
            <nav>
                <ul>
                    <li>
                        <Link href='/posts'>Posts</Link>
                    </li>
                    <li>
                        <Link href='/contact'>Contact</Link>
                    </li>
                    <li>
                        <Link onClick={handleLogout} href='/#'>Log out</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
