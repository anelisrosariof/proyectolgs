# LUXURY GRAND STAGE - Definición del Alcance del Proyecto

## INTRODUCCIÓN 

Luxury Grand Stage es un salón de eventos orientado a la organización de fiestas y 
espectáculos que actualmente gestiona sus operaciones de manera manual o con herramientas 
básicas como hojas de cálculo y agendas físicas. Los registros de reservas, ventas de entradas 
y pagos son llevados en archivos físicos y digitales no integrados, lo que genera 
inconvenientes como pérdida de tiempo, falta de organización, riesgo de errores humanos y 
dificultad para acceder rápidamente a la información.

Entre los principales problemas identificados se encuentran: la duplicidad de reservas por 
ausencia de verificación automática de disponibilidad, la información incompleta de clientes 
responsables, la falta de formalización contractual en las reservas, errores frecuentes en fechas 
y montos, un control deficiente de ventas de entradas, la aplicación de descuentos sin control 
auditable, un proceso de facturación lento y propenso a errores, y una comunicación limitada 
con los clientes. 

El desarrollo de un nuevo sistema busca solucionar precisamente estas limitaciones. El 
objetivo es construir una plataforma integral que permita gestionar de forma centralizada las 
reservaciones, la venta de entradas, el procesamiento de pagos y la facturación. Con este 
nuevo sistema, se pretende que toda la información esté conectada en una misma plataforma, 
eliminando la dependencia de procesos manuales y proporcionando herramientas de análisis y 
reportes para apoyar el crecimiento sostenido del salón de eventos. 

## ALCANCE

El sistema abarca todas las áreas clave de la gestión operativa de Luxury Grand Stage. A 
continuación, se describen los módulos que forman parte del alcance: 

- Gestión de Reservas: Módulo integral para registrar, consultar, modificar y 
cancelar reservas de manera digital, con verificación automática de disponibilidad 
en tiempo real. Incluye calendario interactivo, formularios estandarizados, 
presentación obligatoria de reglas y condiciones del servicio, generación de 
códigos únicos de reserva y envío automático de confirmaciones y recordatorios.

- Gestión de Eventos Públicos: Módulo especializado para la planificación, 
organización y control integral de eventos públicos (conciertos, fiestas temáticas, 
espectáculos). Permite definir zonas diferenciadas con capacidades máximas, 
establecer precios por zona, gestionar contratos con artistas y proveedores, y 
registrar presupuestos con análisis de rentabilidad. 

- Venta de Entradas: Control automatizado de la venta de entradas por zona, con 
bloqueo automático al alcanzar capacidad máxima para prevenir sobre- venta. 
Generación de entradas digitales o códigos QR únicos para control de acceso. 

- Gestión de Clientes: Registro completo de datos de clientes responsables, 
incluyendo datos personales, contacto, datos fiscales, historial de eventos y pagos 
realizados. Control de saldos pendientes. 

- Registro y Control de Pagos: Módulo robusto para registrar, validar y dar 
seguimiento a todos los pagos recibidos de manera centralizada y auditable. 
Soporte para múltiples métodos de pago (efectivo, transferencia, tarjeta), 
validaciones automáticas, control de plazos límite y almacenamiento organizado 
de comprobantes. 

- Facturación Automatizada: Generación automática de comprobantes fiscales 
con numeración secuencial controlada, cumpliendo con normativas fiscales 
vigentes (RNC, ITBIS). Múltiples opciones de entrega (impresión, correo, 
WhatsApp, descarga web). 

- Módulo Administrativo y Reportes: Dashboard ejecutivo con indicadores clave 
de desempeño (KPIs), reportes financieros y operativos, gestión de configuración 
del sistema, y administración de usuarios con roles y permisos. 

- Notificaciones Automáticas: Sistema de mensajería automática que notifica a los 
clientes sobre confirmaciones de reserva, recordatorios de pago, eventos próximos 
y promoción de futuras actividades. 

Entre los requerimientos no funcionales mencionados por el cliente se destacan varios 
aspectos importantes. El primero es que la interfaz del sistema debe ser fácil de utilizar, con 
un diseño claro e intuitivo que permita a los empleados realizar sus tareas sin complicaciones. 
El segundo es que el sistema debe ser accesible desde diferentes dispositivos (computadoras, 
tablets, móviles) adaptando la interfaz al tamaño de pantalla. El tercero es que el sistema debe 
garantizar la integridad y seguridad de todos los datos almacenados. 

## OBJETIVOS

### Objetivo General 

Implementar un sistema de gestión integral para Luxury Grand Stage que permita automatizar 
los procesos de reservaciones, venta de entradas, control de pagos y facturación, garantizando 
información centralizada, reducción de errores y mayor eficiencia en la operación del negocio. 

### Objetivos Específicos 

- Automatizar el proceso de reservaciones con verificación de disponibilidad en 
tiempo real, vinculando clientes responsables y registrando la aceptación digital 
de condiciones del servicio. 

- Gestionar la planificación y producción de eventos públicos, incluyendo la 
definición de zonas, precios de entradas y control de capacidad máxima. 
Controlar la venta de entradas de forma automatizada, previniendo la sobre- venta 
y generando entradas digitales con códigos QR. 

- Registrar y validar todos los pagos recibidos de manera centralizada, con control de 
plazos límite y almacenamiento organizado de comprobantes. 

- Automatizar la generación de facturas y comprobantes fiscales con numeración 
secuencial, cumpliendo con las normativas tributarias vigentes. 

- Proporcionar reportes financieros y operativos para la toma de decisiones 
estratégicas basadas en datos. 

- Implementar un sistema de notificaciones automáticas para mejorar la 
comunicación con los clientes y fomentar la fidelización.

## CASOS DE USO

El diagrama de casos de uso del sistema representa de manera general las interacciones entre 
los actores principales (Vendedor y Administrador) y las funcionalidades que ofrece la 
plataforma para la gestión de eventos, reservas, ventas y administración interna. El Vendedor 
puede realizar tareas operativas como buscar eventos, gestionar reservas, efectuar ventas, 
aplicar descuentos, procesar pagos y generar facturas, mientras que el Administrador accede a 
funciones estratégicas como la gestión de productos, inventario, clientes, tipos de reserva, 
combos, ofertas, descuentos, eventos y reportes, además de controlar cancelaciones por 
tiempo.