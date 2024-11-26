import Link from "next/link";

export default function Header() {
  return (
    <header>
      <h1>GoRide</h1>
      <nav>
        <Link href="/signin">
          <button>Sign In</button>
        </Link>
        <Link href="/signup">
          <button>Sign Up</button>
        </Link>
      </nav>
    </header>
  );
}
