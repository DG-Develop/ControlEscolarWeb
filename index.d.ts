type ApiResponse<T> = {
  exitoso: boolean
  mensaje: string
  errores: string[]
  resultado: T
}

type PaginacionResponse<T> = {
  numeroPagina: number,
  totalPagina: number
} & ApiResponse<T>

type UserModel = {
  id: string,
  username: string,
  role: string,
  accessToken: string
}


type CrearTipoPersonalCommand = {
  descripcion: string
  tieneSueldo: boolean
  sueldoMinimo?: number
  sueldoMaximo?: number
  identificadorDeControl?: string
}

type ActualizaTipoPersonalCommand = {
  idTipoPersonal: number
  descripcion: string
  tieneSueldo: boolean
  sueldoMinimo?: number
  sueldoMaximo?: number
  identificadorDeControl?: string
}

type UpdateTipoPersonalDTO = {
  idTipoPersonal: number
  descripcion: string
  tieneSueldo: boolean
  sueldoMinimo?: number
  sueldoMaximo?: number
  identificadorDeControl?: string
}

type TipoPersonalDTO = {
  idTipoPersonal: number
  descripcion: string
  identificadorDeControl: string
  sueldoMinimo: number
  sueldoMaximo: number
}

type CrearPersonalCommand = {
  nombre: string
  apellidos: string
  correoElectronico: string
  fechaNacimiento: Date
  estatus: boolean
  idTipoPersonal: number
  identificadorDeControl: string
  sueldo: number
}

type ActualizaPersonalCommand = {
  nombre: string
  apellidos: string
  correoElectronico: string
  fechaNacimiento: Date
  estatus: boolean
  idTipoPersonal: number
  identificadorDeControl: string
  sueldo: number
  idMiembroEscolar: number
}

type UpdatePersonalDTO = {
  nombre: string
  apellidos: string
  correoElectronico: string
  fechaNacimiento: Date
  estatus: boolean
  idTipoPersonal: number
  identificadorDeControl: string
  sueldo: number
  idMiembroEscolar: number
}

type VwPersonal = {
  nombreCompleto: string
  correo: string
  numeroControl: string
  tipoPersonal: string
  sueldo: number
}