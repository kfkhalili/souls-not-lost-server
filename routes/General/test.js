const data = require('./nationalities.json');
const dataAr = require('./nationalities-ar.json');

data.map((name, index)=>{
    console.log(
    {
        name,
        nameAr: dataAr[index],
        id: index +  1
    } );
})
