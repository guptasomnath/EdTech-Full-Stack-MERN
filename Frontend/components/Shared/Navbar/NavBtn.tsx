import Link from 'next/link';


const NavBtn = () => {
  return (
    <li>
        <Link href="/signup">
          <button
            className="bg-black text-white px-4 py-2 text-sm rounded-lg hover:bg-[#3e3d3d] sm:rounded-none"
          >
            Create Account
          </button>
        </Link>
    </li>
  )
}

export default NavBtn