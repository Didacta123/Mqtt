const mosca = require('mosca');
const PORT= process.env.PORT||9000
const broker = new mosca.Server({
    port:PORT
});

broker.on('ready', ()=>{
    console.log('Broker listo')
})

broker.on('clientConnected', (client)=>{
    console.log('Client: ',client.id);
});
