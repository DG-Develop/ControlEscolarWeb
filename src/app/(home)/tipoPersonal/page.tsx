"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { axiosInstance } from "src/config/axios-instance";
import { useListTipoPersonal } from "src/hooks/useListTipoPersonal";
import style from './tipoPersonal.module.scss';
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

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

  const submit = (idTipoPersonal: number) => {
    confirmAlert({
      title: 'Confirmar',
      message: '¿Estás seguro de querer eliminar el registro?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleElimarTipoPersonal(idTipoPersonal)
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
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
                  onClick={() => submit(lst.idTipoPersonal)}
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
