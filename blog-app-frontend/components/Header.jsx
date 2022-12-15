import React from 'react';
import { useContext, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/auth';

const Header = () => {
    const {user, logout} = useAuth({middleware: "guest"});

    return (
        <div className="container mx-auto px-10 mb-8">
			<div className="border-b w-full inline-block border-blue-400 py-8">
				<div className="md:float-left block">
					<Link href="/">
						<span className="cursor-pointer font-bold text-4xl text-white">Blog CMS</span>
					</Link>
				</div>
				<div className="hidden md:float-left md:contents">
					{user ?
						<>
							{/* <button onClick={logout} className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">Logout</button> */}
							<Link href="/dashboard">
								<a className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
									Dashboard
								</a>
							</Link>
						</>
                        :
                        <>
                            {/* <Link href="/login">
                                <a className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">Login</a>
                            </Link> */}

                            <Link href="/login">
                                <a className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                                    Write an Article
                                </a>
                            </Link>
                        </>
                    }
				</div>
			</div>
    	</div>
    )
}

export default Header