"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { axiosInstance } from "src/config/axios-instance";
import Link from "next/link";
import { pipeMoney } from "src/lib/pipes/pipeMoney";
import style from "./home.module.scss";

const Home = () => {
  const history = useRouter();

  const { data: session } = useSession();
  const [listaPersonal, setListaPersonal] = useState<VwPersonal[]>([]);
  const [numeroPagina, setNumeroPagina] = useState(1);

  useEffect(() => {
    (async function () {
      if (session) {
        try {
          const { data, status } = await axiosInstance.get<
            ApiResponse<VwPersonal[]>
          >(
            `${process.env.API_URL}/Personal/paginar-personal?NumeroPagina=${numeroPagina}`,
            {
              headers: {
                Authorization: "Bearer " + session?.user.accessToken,
              },
            }
          );

          if (status === 200) {
            setListaPersonal(data.resultado);
          }
        } catch (error) {}
      }
    })();
  }, [session]);

  const handleNext = async () => {
    const siguientePagina = numeroPagina + 1;
    console.log(siguientePagina);

    try {
      try {
        const { data, status } = await axiosInstance.get<
          ApiResponse<VwPersonal[]>
        >(
          `${process.env.API_URL}/Personal/paginar-personal?NumeroPagina=${siguientePagina}`,
          {
            headers: {
              Authorization: "Bearer " + session?.user.accessToken,
            },
          }
        );

        if (status === 200 && data.resultado.length != 0) {
          setListaPersonal(data.resultado);
          setNumeroPagina(siguientePagina);
        }
      } catch (error) {}
    } catch (error) {}
  };

  const handleBack = async () => {
    const anteriorPagina = numeroPagina - 1;

    if (anteriorPagina <= 0) {
      return;
    }

    console.log(anteriorPagina);

    try {
      try {
        const { data, status } = await axiosInstance.get<
          ApiResponse<VwPersonal[]>
        >(
          `${process.env.API_URL}/Personal/paginar-personal?NumeroPagina=${anteriorPagina}`,
          {
            headers: {
              Authorization: "Bearer " + session?.user.accessToken,
            },
          }
        );

        if (status === 200 && data.resultado.length != 0) {
          setListaPersonal(data.resultado);
          setNumeroPagina(anteriorPagina);
        }
      } catch (error) {}
    } catch (error) {}
  };

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const { data, status } = await axiosInstance.get<
        ApiResponse<VwPersonal[]>
      >(`${process.env.API_URL}/Personal/paginar-personal`, {
        params: {
          NumeroControl: e.target.value,
        },
        headers: {
          Authorization: "Bearer " + session?.user.accessToken,
        },
      });

      if (status === 200) {
        setListaPersonal(data.resultado);
      }
    } catch (error) {}
  };

  const handleElimarPersonal = async (numeroControl: string) => {
    try {
      const { data, status } = await axiosInstance.delete<ApiResponse<string>>(
        `${process.env.API_URL}/Personal/${numeroControl}`,
        {
          headers: {
            Authorization: "Bearer " + session?.user.accessToken,
          },
        }
      );

      if (status === 200) {
        alert(data.resultado);
      }
    } catch (error) {}
  };

  return (
    <section className={style["home"]}>
      <div className={style["heading-actions"]}>
        <div>
          <input
            type="text"
            name="busqueda"
            className="form__input"
            placeholder="Buscar No. control"
            onChange={handleSearch}
          />
        </div>
        <div>
          <button
            type="button"
            className="btn-primary xs"
            onClick={() => history.push("/personal/agregar")}
          >
            Agregar Personal
          </button>
        </div>
      </div>

      <div className={style["cards-container"]}>
        <div className={style["list-container"]}>
          {listaPersonal &&
            listaPersonal.map((lst) => (
              <aside key={lst.numeroControl} className={style["card-personal"]}>
                <div>
                  <div className={style["card-title"]}>
                    <p>{lst.nombreCompleto}</p>
                    <p>{lst.correo}</p>
                  </div>

                  <div className={style["card-content"]}>
                    <p>{lst.numeroControl}</p>
                    <p>{lst.tipoPersonal}</p>
                    <p>{pipeMoney(lst.sueldo)}</p>
                  </div>
                </div>
                <div className={style["card-actions"]}>
                  <Link href={`/personal/actualizar/${lst.numeroControl}`}>
                    <button type="button" className="btn-text-primary">
                      Actualizar
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn-text-error"
                    onClick={() => handleElimarPersonal(lst.numeroControl)}
                  >
                    Eliminar
                  </button>
                </div>
              </aside>
            ))}
        </div>
        <div className={style["pagination-actions"]}>
          <button type="button" onClick={handleBack} className="btn-text-secondary xs">
            Anterior
          </button>
          <button type="button" onClick={handleNext} className="btn-text-secondary xs">
            Siguiente
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
