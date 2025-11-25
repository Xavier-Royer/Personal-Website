import React from "react";
import style from "./navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    // replace everything in between the <header> & <header /> tags
    // with your navbar code from your earlier milestones
    // NOTE: we use "class" in HTML but React is quirky so we have to
    // change all the "class" to "className"
    <header>
      <nav className={style.navbar}>
        <h1 className="logo">
          <Link href="/">Home</Link>
        </h1>
        <ul className={style.navlist}>
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/resume">Resume</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact Me</Link>
        </ul>
      </nav>
    </header>
  );
}
