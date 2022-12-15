import Link from 'next/link'

const NavLink = ({ active = false, children, ...props }) => (
    <Link {...props}>
        <a
            className={`flex items-center px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline ${
                active
                    ? 'bg-gray-200'
                    : 'bg-transparent'
            }`}>
            {children}
        </a>
    </Link>
)

export default NavLink
