import Link from "next/link";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Our Application</h1>
      <p>
        <Link href="/auth/register">Register</Link>
      </p>
      <p>
        <Link href="/auth/login">Login</Link>
      </p>
      <p>
        <Link href="/weather">Weather</Link>
      </p>

      <p>
        <Link href="/news"> News </Link>
      </p>
    </div>
  );
};

export default Home;
