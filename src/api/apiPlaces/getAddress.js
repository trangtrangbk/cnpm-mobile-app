const getAddress = async (city, district, ward) =>(
    console.log(city, district, ward, '+++++++++++++++++'),
    await fetch( `https://hostcuatui.herokuapp.com/api/address/${city}/${district}/${ward}`,
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: null
    })
    .then(res => res.json())
    .catch((error)=>{
        console.log("Api call error Address");
     })
);
module.exports = getAddress;