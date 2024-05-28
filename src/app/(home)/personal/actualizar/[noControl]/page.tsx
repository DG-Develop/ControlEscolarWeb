"use client";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import BackIcon from "src/components/svg/BackIcon";
import { axiosInstance } from "src/config/axios-instance";
import { useListTipoPersonal } from "src/hooks/useListTipoPersonal";
import { pipeDate } from "src/lib/pipes/pipeDate";
import { pipeMoney } from "src/lib/pipes/pipeMoney";
import style from "./actualizarnocontrol.module.scss";

const ActualizaPersonal = () => {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const listado = useListTipoPersonal();

  const [form, setForm] = useState<ActualizaPersonalCommand>({
    idMiembroEscolar: 0,
    apellidos: "",
    correoElectronico: "",
    estatus: true,
    fechaNacimiento: new Date(),
    identificadorDeControl: "",
    idTipoPersonal: 0,
    nombre: "",
    sueldo: 0,
  });

  const [fechaNacimiento, setFechaNacimiento] = useState("");

  const [tipoPersonal, setTipoPersonal] = useState<TipoPersonalDTO>();

  useEffect(() => {
    if (params["noControl"] && session) {
      (async function () {
        try {
          const { data, status } = await axiosInstance.get<
            ApiResponse<UpdatePersonalDTO>
          >(`${process.env.API_URL}/Personal/${params["noControl"]}`, {
            headers: {
              Authorization: "Bearer " + session?.user.accessToken,
            },
          });
          if (status === 200) {
            setForm(data.resultado);

            setTimeout(() => {
              setFechaNacimiento(
                pipeDate(new Date(data.resultado.fechaNacimiento))
              );

              if (listado) {
                setTipoPersonal(
                  listado.find(
                    (lst) => lst.idTipoPersonal == data.resultado.idTipoPersonal
                  )
                );
              }
            }, 323);
          }
        } catch (error) {}
      })();
    }
  }, [params, session]);

  const obtenerRangoSalarial = (
    tipPersonalSeleccionado: TipoPersonalDTO | undefined
  ) => {
    if (listado.length <= 0) {
      return "";
    }

    if (!tipPersonalSeleccionado) {
      tipPersonalSeleccionado = listado[0];
    }
    return `${pipeMoney(tipPersonalSeleccionado.sueldoMinimo)} - ${pipeMoney(
      tipPersonalSeleccionado.sueldoMaximo
    )}`;
  };

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setTipoPersonal(tipoPersonal);
  };

  const handelChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const tipoPersonal = listado.find(
      (lst) => lst.idTipoPersonal.toString() === e.target.value
    );
    setForm({
      ...form,
      idTipoPersonal: tipoPersonal.idTipoPersonal,
      identificadorDeControl: tipoPersonal.identificadorDeControl,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tipoPersonal = listado.find(
      (lst) => lst.idTipoPersonal === form.idTipoPersonal
    );

    if (
      form.sueldo >= tipoPersonal.sueldoMinimo &&
      form.sueldo <= tipoPersonal.sueldoMaximo
    ) {
      try {
        const { data, status } = await axiosInstance.put<ApiResponse<string>>(
          `${process.env.API_URL}/Personal/${form.idMiembroEscolar}`,
          {
            ...form,
            fechaNacimiento: new Date(fechaNacimiento),
          },
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
    } else {
      alert(
        "No puedes guardar un sueldo menor que " +
          pipeMoney(tipoPersonal.sueldoMinimo) +
          " o un sueldo mayor que " +
          pipeMoney(tipoPersonal.sueldoMaximo)
      );
    }
  };

  const handleChangeEstatus = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <section className="layout-form">
      <div className="form-container">
        <div>
          <button
            type="button"
            className="btn-text-secondary xs"
            onClick={() => router.push("/")}
          >
            <BackIcon width="11px" height="8px" color={style.colorSecondary} />
            <span>Volver</span>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Formulario Administrativo de Personal</h2>
          </div>
          <div>
            <div className="input-container">
              <label htmlFor="nombre">Nombre(s)</label>
              <input
                id="nombre"
                type="text"
                name="nombre"
                className="form__input"
                placeholder="Escribe tu nombre"
                value={form.nombre}
                onChange={handleChangeForm}
              />
            </div>

            <div className="input-container">
              <label htmlFor="apellidos">Apellidos</label>
              <input
                id="apellidos"
                className="form__input"
                type="text"
                name="apellidos"
                placeholder="Escribe tus apellidos"
                value={form.apellidos}
                onChange={handleChangeForm}
              />
            </div>

            <div className="input-container">
              <label htmlFor="correoElectronico">Correo Electronico</label>
              <input
                id="correoElectronico"
                type="email"
                name="correoElectronico"
                className="form__input"
                placeholder="Escribe tu correo electronico"
                value={form.correoElectronico}
                onChange={handleChangeForm}
              />
            </div>

            <div className="input-container">
              <label htmlFor="tipoPersonal">Tipo Personal</label>
              <select
                name="tipoPersonal"
                id="tipoPersonal"
                className="form__input"
                value={form.idTipoPersonal}
                onChange={handelChangeSelect}
              >
                {listado &&
                  listado.map((lst) => (
                    <option key={lst.idTipoPersonal} value={lst.idTipoPersonal}>
                      {lst.descripcion}
                    </option>
                  ))}
              </select>
              <div className="range-salary">
                {obtenerRangoSalarial(tipoPersonal)}
              </div>
            </div>

            <div className="input-container">
              <label htmlFor="fechaNacimiento">Fecha Nacimiento</label>
              <input
                id="fechaNacimiento"
                type="date"
                name="fechaNacimiento"
                className="form__input"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
            </div>

            <div className="input-container-check">
              <label htmlFor="estatus">Estatus</label>
              <input
                id="estatus"
                type="checkbox"
                name="estatus"
                checked={form.estatus}
                onChange={handleChangeEstatus}
              />
            </div>

            <div className="input-container">
              <label htmlFor="sueldo">Sueldo</label>
              <input
                id="sueldo"
                type="number"
                name="sueldo"
                className="form__input"
                placeholder="D, H, E, etc.."
                value={form.sueldo}
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

export default ActualizaPersonal;
