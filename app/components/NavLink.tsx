import Link from "next/link"

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Link href={href} className="hover:text-indigo-300 transition-colors">
      {children}
    </Link>
  )
}

export default NavLink
