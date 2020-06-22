const removeNews = async (id,token) =>(
    await fetch(`https://myfroom.herokuapp.com/api/news/${id}`, 
    {
        method: 'DELETE',
        headers: {
            "Authorization": token,
        },
        body: null,
    })
    .then( res => res.json())
    .catch((error)=>{
        console.log("Api call error  remove "+ error);
     })
);
module.exports = removeNews;