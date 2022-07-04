const EventEmitter  = require('events');
const http = require('http');

class Sales extends EventEmitter {
    constructor(){
        super();
    }
}

const myEmitter = new Sales();

myEmitter.on('newSale', () => {
    console.log('ther war a new sale!');
});

myEmitter.on('newSale', () => {
    console.log('Costumer name : JOnas');
});

myEmitter.on('newSale', stock => {
  console.log(`There are now ${stock} items left in stock. `);
});

myEmitter.emit('newSale', 9);

///////////////////////////////////////////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('request received!');
  res.end('request recevived');
});

server.on('request', (req, res) => {
    console.log('Another received! smile(emj)');
    
  });


server.on('close', () => {
 console.log('Server Closed!');
}); 

server.listen('8000', '127.0.0.1', () => {
  console.log('Waiting for the Requests.....');
});