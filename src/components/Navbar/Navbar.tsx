"use client"
import React from 'react'

import style from "./Navbar.module.scss";
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const {data: session} = useSession();

  return (
    <header className={style.header}>
      <nav>
        <ul className={style.menu}>
          <li>
            <Link href={"/"}>Personal</Link>
          </li>
          <li>
            <Link href={"/alumnos"}>Alumnado</Link>
          </li>
          <li>
            <Link href={"/tipoPersonal"}>Tipo Personal</Link>
          </li>
        </ul>
        <ul>
          <li><p>{session?.user.username}</p></li>
          <li><button type='button' className='btn-error xs' onClick={() => signOut()}>Cerrar Sessión</button></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar