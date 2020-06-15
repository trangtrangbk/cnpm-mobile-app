const getWards = async (city,district) =>(
    await fetch( `https://hostcuatui.herokuapp.com/api/city/${city}/district/${district}`,
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
        console.log("Api call error Ward");
     })
);
module.exports = getWards;