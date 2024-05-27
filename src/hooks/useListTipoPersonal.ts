"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "src/config/axios-instance";

export const useListTipoPersonal = () => {
  const { data: session } = useSession();
  const [listado, setListado] = useState<TipoPersonalDTO[]>([]);

  useEffect(() => {
    (async function () {
      if (session) {
        try {
          const { data, status } = await axiosInstance.get<
            ApiResponse<TipoPersonalDTO[]>
          >(`${process.env.API_URL}/TipoPersonal`, {
            headers: {
              Authorization: "Bearer " + session?.user.accessToken,
            },
          });

          if (status === 200) {
            setListado(data.resultado);
          }
        } catch (error) {}
      }
    })();
  }, [session]);

  return listado
}