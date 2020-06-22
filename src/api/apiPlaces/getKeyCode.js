const getKeyCode = async (address) =>(
    await fetch( `https://hostcuatui.herokuapp.com/api/key_code`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(address)
    })
    .then(res => res.json())
    .catch((error)=>{
        console.log("Api call api get key code", error);
     })
);
module.exports = getKeyCode;