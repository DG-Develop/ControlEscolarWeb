"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { axiosInstance } from "src/config/axios-instance";
import { useListTipoPersonal } from "src/hooks/useListTipoPersonal";
import style from './tipoPersonal.module.scss';

const tipoPersonal = () => {
  const history = useRouter();
  const {data: session} = useSession()

  let listado = useListTipoPersonal();

  const handleElimarTipoPersonal = async (idTipoPersonal: number) => {
    try {
      const { data, status } = await axiosInstance.delete<ApiResponse<string>>(
        `${process.env.API_URL}/TipoPersonal/${idTipoPersonal}`,
        {
          headers: {
            Authorization: "Bearer " + session?.user.accessToken,
          },
        }
      );

      if (status === 200) {
        alert(data.resultado)
      }
    } catch (error) {}
  };

  return (
    <section className={style["tipoPersonal"]}>
      <div className={style["heading-actions"]}>
        <button
          type="button"
          className="btn-primary xs"
          onClick={() => history.push("/tipoPersonal/agregar")}
        >
          Agregar Tipo Personal
        </button>
      </div>

      <div className={style["lst-container"]}>
        {listado &&
          listado.map((lst) => (
            <aside key={lst.idTipoPersonal} className={style["card-tipoPersonal"]}>
              <div >
                <p>{lst.descripcion}</p>
              </div>
              <div className={style["card-actions"]}>
                <Link href={`/tipoPersonal/actualizar/${lst.idTipoPersonal}`}>
                  <button type="button" className="btn-text-primary"> Editar</button>
                </Link>
                <button
                  type="button"
                  className="btn-text-error"
                  onClick={() => handleElimarTipoPersonal(lst.idTipoPersonal)}
                >
                  Eliminar
                </button>
              </div>
            </aside>
          ))}
      </div>
    </section>
  );
};

export default tipoPersonal;
