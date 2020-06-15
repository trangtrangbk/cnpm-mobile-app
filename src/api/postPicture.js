const postPicture = async (values) =>(
    await fetch(`https://my-picture-api.herokuapp.com/api/upload`,{
        method: 'POST',
        body: values,
    })
    .then(res => res.json())
    .catch((error)=>{
        console.log("Api call error - post picture "+ error);
     })
);
module.exports = postPicture;