"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

const navData = {
  Home: {
    link: "/",
    name: "Home",
  },

  Blog: {
    link: "/blog",
    name: "Blog",
  },
  Proyects: {
    link: "/proyects",
    name: "Proyects",
  },
  About: {
    link: "/about",
    name: "About",
  },
  Contact: {
    link: "/contact",
    name: "Contact",
  },
};

const NavBar = () => {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <p className='font-bold text-inherit'>ACME</p>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        {Object.keys(navData).map((key) => (
          <NavbarItem key={key} href={navData[key].link}>
            <Link color='foreground' href={navData[key].link}>
              {navData[key].name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <Link href='#'>Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color='primary' href='#' variant='flat'>
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
