import Link from "next/link";
import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import getCategories from "@/actions/get-categories";
import SearchBar from "./search-bar";

import Image from "next/image";

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b fixed top-0 left-0 z-50 bg-white w-full">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2 items-center">
            <Image
              width={40}
              height={40}
              src="/indiekart_logo.png"
              alt="logo"
              className="h-10"
            />
            <p className="font-bold text-xl">Eistore</p>
          </Link>
          <MainNav data={categories} />
          <SearchBar />
          <div className="flex items-center gap-x-4">
            <NavbarActions />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
