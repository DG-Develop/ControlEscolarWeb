export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/',
    '/tipoPersonal',
    '/tipoPersonal/agregar',
    '/tipoPersonal/actualizar/:path*',
    '/personal/agregar',
    '/personal/actualizar/:path*',
  ]
}