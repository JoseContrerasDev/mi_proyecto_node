Endpoints Disponibles

1. Usuarios
Registro de Usuario

Endpoint: POST /register
Descripción: Crea un nuevo usuario con email, password y imagen opcional.
Ejemplo JSON:
json
Copiar código
{
  "email": "example@example.com",
  "password": "password123",
  "image": "<archivo_imagen>"
}
Inicio de Sesión

Endpoint: POST /login
Descripción: Inicia sesión y obtiene un token de autenticación.
Ejemplo JSON:
json
Copiar código
{
  "email": "example@example.com",
  "password": "password123"
}
2. Empresas
Crear Empresa

Endpoint: POST /empresas
Descripción: Agrega una nueva empresa.
Ejemplo JSON:
json
Copiar código
{
  "nombre": "Tech Solutions",
  "direccion": "123 Calle Principal, Ciudad",
  "telefono": "+54 9 1234 567890",
  "contacto_principal": "Carlos Pérez",
  "email": "contacto@techsolutions.com",
  "password": "segura123",
  "descripcion": "Empresa especializada en tecnología avanzada",
  "industria": "Tecnología",
  "webpage": "https://www.techsolutions.com"
}
Obtener todas las Empresas

Endpoint: GET /empresas
Descripción: Devuelve un listado de todas las empresas.
Obtener una Empresa por ID

Endpoint: GET /empresas/:id
Descripción: Devuelve los detalles de una empresa específica.
Actualizar Empresa

Endpoint: PUT /empresas/:id
Descripción: Modifica la información de una empresa.
Eliminar Empresa

Endpoint: DELETE /empresas/:id
Descripción: Elimina una empresa específica.
3. Estudiantes
Crear Estudiante

Endpoint: POST /estudiantes
Descripción: Registra un nuevo estudiante.
Ejemplo JSON:
json
Copiar código
{
  "nombre": "Juan Pérez",
  "email": "juan.perez@instituto.edu",
  "password": "contrasena123"
}
Obtener todos los Estudiantes

Endpoint: GET /estudiantes
Descripción: Obtiene un listado de todos los estudiantes.
Obtener Estudiante por ID

Endpoint: GET /estudiantes/:id
Descripción: Muestra los detalles de un estudiante específico.
Actualizar Estudiante

Endpoint: PUT /estudiantes/:id
Descripción: Actualiza la información de un estudiante.
Eliminar Estudiante

Endpoint: DELETE /estudiantes/:id
Descripción: Borra un estudiante del sistema.
4. Eventos
Crear Evento

Endpoint: POST /eventos
Descripción: Agrega un nuevo evento.
Ejemplo JSON:
json
Copiar código
{
  "titulo": "Conferencia de Tecnología",
  "descripcion": "Evento sobre las últimas tendencias en tecnología",
  "fecha_evento": "2024-12-10",
  "localidad": "Buenos Aires",
  "organizador_id": 1,
  "organizador_tipo": "company"
}
Obtener todos los Eventos

Endpoint: GET /eventos
Descripción: Lista todos los eventos registrados.
Obtener Evento por ID

Endpoint: GET /eventos/:id
Descripción: Obtiene información de un evento específico.
Actualizar Evento

Endpoint: PUT /eventos/:id
Descripción: Modifica la información de un evento.
Eliminar Evento

Endpoint: DELETE /eventos/:id
Descripción: Borra un evento específico.
5. Mensajes
Crear Mensaje

Endpoint: POST /mensajes
Descripción: Envía un nuevo mensaje entre usuarios.
Ejemplo JSON:
json
Copiar código
{
  "remitente_id": 1,
  "tipo_remitente": "student",
  "receptor_id": 2,
  "tipo_receptor": "recruiter",
  "contenido": "Estoy interesado en la oferta laboral."
}
Obtener todos los Mensajes

Endpoint: GET /mensajes
Descripción: Lista todos los mensajes enviados y recibidos.
Obtener Mensaje por ID

Endpoint: GET /mensajes/:id
Descripción: Muestra un mensaje específico.
Actualizar Mensaje

Endpoint: PUT /mensajes/:id
Descripción: Modifica el contenido de un mensaje.
Eliminar Mensaje

Endpoint: DELETE /mensajes/:id
Descripción: Borra un mensaje específico.
6. Ofertas
Crear Oferta

Endpoint: POST /ofertas
Descripción: Crea una nueva oferta de trabajo.
Ejemplo JSON:
json
Copiar código
{
  "titulo": "Desarrollador Backend",
  "descripcion": "Responsable de desarrollar la API",
  "modalidad": "full-time",
  "requisitos": "Conocimiento en Node.js y MySQL",
  "localidad": "virtual"
}
Obtener todas las Ofertas

Endpoint: GET /ofertas
Descripción: Muestra un listado de todas las ofertas de trabajo.
Obtener Oferta por ID

Endpoint: GET /ofertas/:id
Descripción: Muestra los detalles de una oferta específica.
Actualizar Oferta

Endpoint: PUT /ofertas/:id
Descripción: Modifica la información de una oferta de trabajo.
Eliminar Oferta

Endpoint: DELETE /ofertas/:id
Descripción: Elimina una oferta específica.
