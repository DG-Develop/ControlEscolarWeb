"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { axiosInstance } from "src/config/axios-instance";

const AgregarTipoPersonal = () => {
  const { data: session } = useSession();
  const router = useRouter()
  const [form, setForm] = useState<CrearTipoPersonalCommand>({
    descripcion: "",
    tieneSueldo: false,
    identificadorDeControl: "",
    sueldoMaximo: 0,
    sueldoMinimo: 0,
  });

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeTieneSueldo = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.checked){
      setForm({
        ...form,
        [e.target.name]: e.target.checked
      });
    }else{
      setForm({
        ...form,
        [e.target.name]: e.target.checked,
        sueldoMaximo: 0,
        sueldoMinimo: 0,
        identificadorDeControl: ""
      });
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data, status } = await axiosInstance.post<ApiResponse<string>>(
        `${process.env.API_URL}/TipoPersonal`,
        form,
        {
          headers: {
            Authorization: "Bearer " + session?.user.accessToken,
          },
        }
      );

      if (status === 201) {
        alert(data.resultado);
      } else {
        alert("No se pudo registrar");
      }
    } catch (e) {}
  };

  return (
    <section>
      <div>
        <button type="button" onClick={() => router.push("/tipoPersonal")}>
          <span></span>
          <span>Volver</span>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Tipo Personal</h2>
        </div>
        <div>
          <div>
            <label htmlFor="descripcion">Tipo</label>
            <input
              id="descripcion"
              type="text"
              name="descripcion"
              className="form_input"
              placeholder="Descripcion"
              required
              value={form.descripcion}
              onChange={handleChangeForm}
            />
          </div>

          <div>
            <label htmlFor="tieneSueldo">Tiene Sueldo</label>
            <input
              id="tieneSueldo"
              type="checkbox"
              name="tieneSueldo"
              checked={form.tieneSueldo}
              onChange={handleChangeTieneSueldo}
            />
          </div>

          <div>
            <label htmlFor="sueldoMinimo">Sueldo Mínimo</label>
            <input
              id="sueldoMinimo"
              type="number"
              name="sueldoMinimo"
              className="form_input"
              placeholder="Min"
              disabled={!form.tieneSueldo}
              value={form.sueldoMinimo}
              onChange={handleChangeForm}
            />
          </div>

          <div>
            <label htmlFor="sueldoMaximo">Sueldo Máximo</label>
            <input
              id="sueldoMaximo"
              type="number"
              name="sueldoMaximo"
              className="form_input"
              placeholder="Max"
              disabled={!form.tieneSueldo}
              value={form.sueldoMaximo}
              onChange={handleChangeForm}
            />
          </div>

          <div>
            <label htmlFor="identificadorDeControl">
              Identificador de control de registro
            </label>
            <input
              id="identificadorDeControl"
              type="text"
              name="identificadorDeControl"
              className="form_input"
              placeholder="D, H, E, etc.."
              disabled={!form.tieneSueldo}
              value={form.identificadorDeControl}
              onChange={handleChangeForm}
            />
          </div>
        </div>

        <div>
          <button type="submit" className="btn-primary xs">
            Registrar
          </button>
        </div>
      </form>
    </section>
  );
};

export default AgregarTipoPersonal;
