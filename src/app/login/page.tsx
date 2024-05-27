"use client"
import React, { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

import style from "./login.module.scss";
import EyeCloseIcon from "src/components/svg/EyeCloseIcon";
import EyeIcon from "src/components/svg/EyeIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";


const Login = () => {
  const [watchPass, setWatchPass] = useState(false);
  const [data, setData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if(!res.ok){
      console.log(res.error)
    }else{
      router.push('/')
    }
  };

  return (
    <main className={style["login-section"]}>
      <article className={style.container}>
        <section className={style.presentation}>
          <Image src="/assets/admin.png" alt="image presentation" width={350} height={350} />
        </section>
        <section className={style["login-form"]}>
          <form onSubmit={handleSubmit}>
            <div>
              <h2>Control Escolar</h2>
              <h4>Inicio de sesión</h4>
            </div>
            <div>
              <div>
                <label htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    className="form__input"
                    type="email"
                    placeholder="Ingresa tu correo"
                    onChange={(e) =>  setData({ ...data, email: e.target.value })}
                  />
                </label>
              </div>

              <div>
                <label htmlFor="password" className={style["input-password"]}> 
                  <input
                    id="password"
                    name="password"
                    className="form__input"
                    type={watchPass ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    onChange={(e) =>  setData({ ...data, password: e.target.value })}
                  />
                  {watchPass ? (
                    <EyeCloseIcon
                      width="20px"
                      height="16px"
                      color={style.neutral30}
                      onClick={() => setWatchPass(false)}
                    />
                  ) : (
                    <EyeIcon
                      width="20px"
                      height="14px"
                      color={style.neutral30}
                      onClick={() => setWatchPass(true)}
                    />
                  )}
                </label>
              </div>
            </div>

            <div>
              <button type="submit" className="btn-primary">
                Iniciar sesión
              </button>
            </div>
          </form>
        </section>
      </article>
    </main>
  );
};

export default Login;
