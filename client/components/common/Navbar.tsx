import { getCookie } from "cookies-next";
import Link from "next/link";
import UserNav from "../auth/UserNav";
import MaxWidthContainer from "../layouts/MaxWidthContainer";
import { Button } from "../ui/button";
import { cookies } from "next/headers";

type Props = {};

export default async function Navbar({}: Props) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  return (
    <main className="bg-gray-900 py-4 border-b-2 border-gray-800">
      <MaxWidthContainer>
        <nav className="flex flex-row items-center justify-between">
          <Link href="/">
            <h2 className="text-xl font-black text-white">VCD</h2>
          </Link>

          <div className="flex items-center justify-center space-x-2">
            {!token ? (
              <Button size={"lg"} asChild>
                <Link href={"/auth/login"}>Login</Link>
              </Button>
            ) : (
              <UserNav />
            )}
          </div>
        </nav>
      </MaxWidthContainer>
    </main>
  );
}
