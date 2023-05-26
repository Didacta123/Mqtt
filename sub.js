const mysql = require('mysql');
const express = require('express');

const connection = mysql.createConnection({
    host: 'db4free.net',
    port: 3306,
    user: 'altair',
    password: 'gammadelta09',
    database: 'personaldatadc'
});
connection.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
        return;
    }
});
const sql = 'INSERT INTO sensor (fecha, temperatura) VALUES (NOW(),?)';


const mqtt = require('mqtt');
const sub = mqtt.connect('mqtt://localhost:9000');
sub.on('connect', ()=>{
    
    sub.subscribe('data')
})
let temp
sub.on('message', (topic,message)=>{
    temp=message.toString();
    if(parseFloat(temp)>0){
        connection.query(sql, temp, (error, results) => {
            if (error) {
              console.error('Error al almacenar la informacion:', error);
              return;
            }
            console.log(`Temperatura: ${temp}`);
        });
    }
})


let app = express();
const port = process.env.PORT ||3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index',{TEMP:temp});
});

app.listen(port, function () {
  console.log('Servidor Express iniciado en el puerto', port);
});