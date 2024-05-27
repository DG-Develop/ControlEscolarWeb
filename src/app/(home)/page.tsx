"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { axiosInstance } from "src/config/axios-instance";
import Link from "next/link";
import { pipeMoney } from "src/lib/pipes/pipeMoney";

const Home = () => {
  const history = useRouter();

  const { data: session } = useSession();
  const [listaPersonal, setListaPersonal] = useState<VwPersonal[]>([]);

  useEffect(() => {
    (async function () {
      if (session) {
        try {
          const { data, status } = await axiosInstance.get<
            ApiResponse<VwPersonal[]>
          >(`${process.env.API_URL}/Personal/paginar-personal`, {
            headers: {
              Authorization: "Bearer " + session?.user.accessToken,
            },
          });

          if (status === 200) {
            setListaPersonal(data.resultado);
          }
        } catch (error) {}
      }
    })();
  }, [session]);

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {

    try {
      const { data, status } = await axiosInstance.get<
        ApiResponse<VwPersonal[]>
      >(`${process.env.API_URL}/Personal/paginar-personal`, {
        params: {
          NumeroControl: e.target.value
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
        alert(data.resultado)
      }
    } catch (error) {}
  };

  return (
    <section>
      <div>
        <input
          type="text"
          name="busqueda"
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

      <div>
        {listaPersonal &&
          listaPersonal.map((lst) => (
            <aside key={lst.numeroControl}>
              <div>
                <p>{lst.nombreCompleto}</p>
                <p>{lst.correo}</p>
                <p>{lst.numeroControl}</p>
                <p>{lst.tipoPersonal}</p>
                <p>{pipeMoney(lst.sueldo)}</p>
              </div>
              <div>
                <Link href={`/personal/actualizar/${lst.numeroControl}`}>
                  <button type="button"> Actualizar</button>
                </Link>
                <button type="button" onClick={() => handleElimarPersonal(lst.numeroControl)}> Eliminar</button>
              </div>
            </aside>
          ))}
      </div>
    </section>
  );
};

export default Home;
