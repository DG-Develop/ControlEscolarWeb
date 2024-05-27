"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { axiosInstance } from "src/config/axios-instance";
import { useSession } from "next-auth/react";
import BackIcon from "src/components/svg/BackIcon";
import style from "./actualizaid.module.scss";

const ActualizaTipoPersonal = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [form, setForm] = useState<ActualizaTipoPersonalCommand>({
    idTipoPersonal: 0,
    descripcion: "",
    tieneSueldo: false,
    identificadorDeControl: "",
    sueldoMaximo: 0,
    sueldoMinimo: 0,
  });

  useEffect(() => {
    if (params["id"] && session) {
      (async function () {
        try {
          const { data, status } = await axiosInstance.get<
            ApiResponse<UpdateTipoPersonalDTO>
          >(`${process.env.API_URL}/TipoPersonal/${params["id"]}`, {
            headers: {
              Authorization: "Bearer " + session?.user.accessToken,
            },
          });
          if (status === 200) {
            setForm(data.resultado);
          }
        } catch (error) {}
      })();
    }
  }, [params, session]);

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeTieneSueldo = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setForm({
        ...form,
        [e.target.name]: e.target.checked,
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.checked,
        sueldoMaximo: 0,
        sueldoMinimo: 0,
        identificadorDeControl: "",
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data, status } = await axiosInstance.put<ApiResponse<string>>(
        `${process.env.API_URL}/TipoPersonal/${form.idTipoPersonal}`,
        form,
        {
          headers: {
            Authorization: "Bearer " + session?.user.accessToken,
          },
        }
      );

      if (status === 200) {
        alert(data.resultado);
      } else {
        alert("No se pudo registrar");
      }
    } catch (e) {}
  };

  return (
    <section className="layout-form">
      <div className="form-container">
        <div>
          <button
            type="button"
            className="btn-text-secondary xs"
            onClick={() => router.push("/tipoPersonal")}
          >
            <BackIcon width="11px" height="8px" color={style.colorSecondary} />
            <span>Volver</span>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Tipo Personal</h2>
          </div>
          <div>
            <div className="input-container">
              <label htmlFor="descripcion">Tipo</label>
              <input
                id="descripcion"
                type="text"
                name="descripcion"
                className="form__input"
                placeholder="Descripcion"
                required
                value={form.descripcion}
                onChange={handleChangeForm}
              />
            </div>

            <div className="input-container">
              <label htmlFor="tieneSueldo">Tiene Sueldo</label>
              <input
                id="tieneSueldo"
                type="checkbox"
                name="tieneSueldo"
                checked={form.tieneSueldo}
                onChange={handleChangeTieneSueldo}
              />
            </div>

            <div className={`input-container ${!form.tieneSueldo && "disable"}`}>
              <label htmlFor="sueldoMinimo">Sueldo Mínimo</label>
              <input
                id="sueldoMinimo"
                type="number"
                name="sueldoMinimo"
                className="form__input"
                placeholder="Min"
                disabled={!form.tieneSueldo}
                value={form.sueldoMinimo}
                onChange={handleChangeForm}
              />
            </div>

            <div className={`input-container ${!form.tieneSueldo && "disable"}`}>
              <label htmlFor="sueldoMaximo">Sueldo Máximo</label>
              <input
                id="sueldoMaximo"
                type="number"
                name="sueldoMaximo"
                className="form__input"
                placeholder="Max"
                disabled={!form.tieneSueldo}
                value={form.sueldoMaximo}
                onChange={handleChangeForm}
              />
            </div>

            <div className={`input-container ${!form.tieneSueldo && "disable"}`}>
              <label htmlFor="identificadorDeControl">
                Identificador de control de registro
              </label>
              <input
                id="identificadorDeControl"
                type="text"
                name="identificadorDeControl"
                className="form__input"
                placeholder="D, H, E, etc.."
                disabled={!form.tieneSueldo}
                value={form.identificadorDeControl}
                onChange={handleChangeForm}
              />
            </div>
          </div>

          <div className="submit-form">
            <button type="submit" className="btn-primary xs">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ActualizaTipoPersonal;
