// db.js
import mysql from 'mysql2';

// Configuración de la conexión a la base de datos `portal_empleo`
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',         // Cambia 'root' por tu usuario de MySQL
    password: '',         // Cambia '' por tu contraseña de MySQL
    database: 'portal_empleo', // Cambia por el nombre de tu base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();


db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

export default db; // Exporta la conexión para usarla en los controladores
//export default pool.promise();