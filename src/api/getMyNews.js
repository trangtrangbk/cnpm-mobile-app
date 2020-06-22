const getMyNews = async (token) =>(
    await fetch(`https://myfroom.herokuapp.com/api/news/getNewsByAccountId`,
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            "Authorization": token
        },
        body: null,
    })
    .then(res => res.json())
    .catch((error)=>{
        console.log("Api call error get my news ");
     })
);
module.exports = getMyNews;