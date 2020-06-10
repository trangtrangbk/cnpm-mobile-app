const getDistrictByCity = async (id) =>(
    await fetch( `https://thongtindoanhnghiep.co/api/city/${id}/district`,
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
        console.log("Api call error");
     })
);
module.exports = getDistrictByCity;