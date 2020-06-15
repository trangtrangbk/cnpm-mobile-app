const getCities = async () =>(
    await fetch( `https://hostcuatui.herokuapp.com/api/cities`,
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
        console.log("Api call error City");
     })
);
module.exports = getCities;