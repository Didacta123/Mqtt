const mqtt = require('mqtt');
const {SerialPort} = require('serialport');
const { DelimiterParser } = require('@serialport/parser-delimiter')



const port = new SerialPort({
    path: 'COM8',
    baudRate: 115200
});
const parser = port.pipe(new DelimiterParser({ delimiter: '\n' }))
//parser.on('data', console.log)

const pub = mqtt.connect('mqtt://localhost:9000');
pub.on('connect', ()=>{
    parser.on('data', (data)=>{
        pub.publish('data', data);
    })
})