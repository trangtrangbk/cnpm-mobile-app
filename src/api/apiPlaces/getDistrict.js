const getDistricts = async (id) =>(
    await fetch( `https://hostcuatui.herokuapp.com/api/city/${id}`,
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
module.exports = getDistricts;