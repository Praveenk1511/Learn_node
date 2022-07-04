const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject)=>{
        fs.readFile(file , (err ,data) =>{
            if(err)reject('i could not find the file!');
            resolve(data);
        });
    });
}


const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) =>{
      fs.writeFile(file, data, err => {
          if(err) reject('Could not write file !');
          resolve('success');
      });
    });
}

const getDogPic = async () => {
    try{
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1 = superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`);

    const res2 = superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`);

    const res3 = superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`);

    const all = await Promise.all([res1, res2, res3]);
    const imags = all.map(el => el.body.message);
    console.log(imags);

    await writeFilePro('dog-img.txt', imags.join('\n'));
    console.log('Random dog image saved to file!');
    
    } catch(err){
        console.log(err);
        throw err;
    }
    console.log('ready 2')
};

( async() => {
    try{
        console.log('ready 1'); 
        const x = await getDogPic();
        console.log(x);
        console.log('ready 3');  
    }
    catch(err){
      console.log('Big error');
    }
})()


/* console.log('ready 1'); 
var x = getDogPic().then(x => {
    console.log(x);
    console.log('ready 3');     
}).catch(err => {
    console.log('Big error');
});
 */
/* readFilePro(`${__dirname}/dog.txt`)
    .then( data =>{
       return superagent
       .get(`https://dog.ceo/api/breed/${data}/images/random`)

    })
    .then( res =>{
       console.log(res.body.message); 
       return writeFilePro('dog-img.txt', res.body.message);
    })
    .then(() => {
        console.log('Random dog image saved to file!');
    })
    .catch(err => {
         console.log(err.message);
    });
 */