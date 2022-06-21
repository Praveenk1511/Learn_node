const fs = require('fs');
const http = require('http');
const url = require('url');
const replecetemplate = require('./modules.js/replaceTemplates.js');
////////////////////////////////////////////////////////////////////////////////////
///// FILES

// Blocking, synchronous way 
// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);
// const textOut = `this is what we know about avocado : ${textIn}. \n Created on ${Date.now()}`;
// fs.writeFileSync(`${__dirname}/txt/append.txt`,textOut,'utf-8');
// console.log('file written');

// Non blocking , Asynchronous way
// fs.readFile(`${__dirname}/txt/start.txt`, 'utf-8', (err, data) =>{
//     console.log(data);
//     fs.readFile(`${__dirname}/txt/${data}.txt`, 'utf-8', (err , data2) => {
//          console.log(data2);
//          fs.readFile(`${__dirname}/txt/append.txt`, 'utf-8', (err,data3) =>{
//              console.log(data3);
//              fs.writeFile(`${__dirname}/txt/final.txt`, `${data2}\n${data3}`,'utf-8', err => {
//                 console.log('your file has been written ::');
//              } );
//          });
//     });
// });


//////////////////////////////////////////////////////////////////////////////////////////////
////// SERVER

const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');  
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');  
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');  

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');  
const dataobj = JSON.parse(data);

const server = http.createServer((req, res) =>{

    const { query, pathname} = url.parse(req.url, true);

    if(pathname == '/' || pathname == '/overview'){

         res.writeHead(200, {'Content-type': 'text/html'});
         const cardHtml = dataobj.map(el => replecetemplate(tempCard, el));
         const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardHtml);
         res.end(output);

         
     //product page    
    }else if(pathname == '/product'){

      res.writeHead(200, {'Content-type': 'text/html'});
      const product = dataobj[query.id];
      const output = replecetemplate(tempProduct, product);
      res.end(output);

   // api page
    }else if(pathname == '/api'){
      res.end('this is the PRODUCT');
    }else{
      res.writeHead(404,{
        'Content-type': 'text/html',
        'my-own-header': 'hello-world'
      });
      res.end('<h1>Page Not found!</h1>')
    }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to the server on port 8000.');
})
