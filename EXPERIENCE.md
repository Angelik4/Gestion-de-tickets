# EXPERIENCE.md

## 1. Manejo de errores en las peticiones a la API

### a. Desafío técnico complejo que tuve
Para Movistar es muy importante mantener un cambio de ofertas constantes debido a cambios de demanda y oferta del negocio, al 
inicio se hicieron lo que se llamaban escaleras que eran cards con descripcion de cada una de las ofertas y para cada uno de los canales 
Fibra, pospago, prepago, tecnologia entre otros, inicialmente se hacia de forma manual cada cambio del html y css, 
luego se planteo crear un administrador para poder crear de manera mas automatizada las ofertas, tanto de parte del cliente
y de parte del equipo tecnico fue un desafio porque la mayoria de los elementos de la pagina se cambian de manera manual, fueron dias de muchas pruebas 
porque los datos no se creaban en el formato correcto, entonces probando muchas veces como tenian que enviarlos y como modificarlos para ser leidos en el 
formato correcto por el back para que no se rompiera, luego se continui modificando este administrador para poder enviar desde el front atributos visuales,
como fondos, cambio en la letra entre muchos otros, que gracias al equipo se logro hacer la entrega en el tiempo estimado. 

### b. Abordaje paso a paso
1. Primero se analizo por completo que era necesario tener en el administrador, como usuarios, funcionalidades y paso a produccion de cambios
2. Se dividio el proyecto por componentes trabajando de la mano con el equipo de back revisando campos necesarios (título, precio, canal, vigencia, beneficios), 
campos obligatorios
3. Se eligiron que herramientas se usarian para conversion de los datos y cargar la informacion, asi como que estructura y logica se manejaria 
4. Formularios dinámicos por canal y construccion intuitiva para el uso por parte de UX segun el requerimiento tecnico presentado

### c. Alternativas consideradas
- Aunque el lenguaje de implementacion ya estaba preestablecido por la empresa, se usaron librerias para facilitar el diseño del administrador como Bootstrap, 
se uso jQuery para facilitar la escritura de codigo js , PHP para poder modularizar el codigo y que nos repartieramos coponentes y Phyton de parte del back para que la lectura y conversion de datos fuera mejor.

### d. Impacto de la solución
- Se pudo con la elaboracion del administrador reducir los tiempos de carga de cada oferta
- Permitio que el cliente hiciera tambien cambios directos de la oferta
- Se pudo trabajar en equipo minimizando la carga y elaboracion del admin
- Sirvio para implementar otros admin con la misma estructura pero para diferentes canales 

 
