# 🛠️ Ferretería API

## 📄 Descripción

Ferretería API es una solución backend robusta diseñada para gestionar las operaciones clave de una tienda de ferretería, incluyendo la administración de productos, inventarios, pedidos y clientes. Desarrollada utilizando Node.js y Express, y respaldada por una base de datos PostgreSQL, esta API está optimizada para automatizar y mejorar los procesos comerciales.

Además de las funcionalidades básicas, la API incluye un sistema de puntos de recompensa, que permite a los clientes acumular puntos a través de sus compras y canjearlos por descuentos en futuras transacciones. Este sistema de fidelización está integrado en la lógica de negocio de la API, proporcionando a la tienda una herramienta eficaz para incentivar la lealtad del cliente.

La API también gestiona la automatización del envío de correos electrónicos para notificaciones importantes, como confirmación de correo y envío de factura de compra, utilizando Nodemailer. Esto asegura una comunicación fluida y profesional con los clientes, mejorando la experiencia de usuario.

El proyecto también incorpora la gestión de archivos mediante Multer, seguridad mediante JWT para la autenticación de usuarios, y automatización de tareas con Node-cron. Estas características hacen que la API sea una solución completa y escalable para cualquier tienda de ferretería que busque optimizar sus operaciones digitales.

## 📐 Diagrama de Arquitectura
![Arquitectura API drawio](https://github.com/user-attachments/assets/429a6d7f-8949-48a5-8972-c6807d87e993)

## ✨ Características Principales

- **Gestión de Productos**: CRUD completo para productos de ferretería.
- **Gestión de Inventarios**: Control y seguimiento de existencias.
- **Gestión de Pedidos**: Creación y seguimiento de pedidos de clientes.
- **Gestión de Clientes**: Registro y administración de datos de clientes.
- **Seguridad**: Autenticación y autorización mediante **JWT**.
- **Validación**: Validación de datos de entrada usando **AJV**.
- **Tareas Automatizadas**: Automatización de tareas periódicas con **Node-cron**.
- **Manejo de Archivos**: Subida y gestión de imágenes de productos utilizando **Multer**.

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución de JavaScript en el servidor.
- **Express**: Framework de Node.js para construir aplicaciones web y APIs.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional utilizado para almacenar toda la información de la tienda.
- **TypeScript**: Superset de JavaScript que añade tipado estático, mejorando la mantenibilidad del código.
- **JWT (JSON Web Tokens)**: Implementado para la autenticación y autorización segura de los usuarios.
- **AJV**: Utilizado para la validación de esquemas JSON y la aseguración de la integridad de los datos.
- **Multer**: Middleware para la gestión de archivos en Node.js, utilizado aquí para manejar las imágenes de productos.
- **Node-cron**: Herramienta para la programación de tareas automatizadas en Node.js.
- **ESLint**: Herramienta para la identificación y reporte de patrones problemáticos en el código JavaScript/TypeScript.
- **Nodemailer**: Utilizado para el envío automatizado de correos electrónicos.
- **Knex**: Librería SQL query builder para Node.js, utilizada para interactuar con la base de datos PostgreSQL.
  
## ⚠️ Nota

> **Este código es parte de mi portafolio personal y está destinado únicamente para fines de demostración. No está disponible para uso, modificación o distribución sin mi consentimiento.**
