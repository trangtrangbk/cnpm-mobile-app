const getNews = async (page) =>(
    await fetch(`https://myfroom.herokuapp.com/api/news?page=${page}&pageSize=4`,
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: null,
    })
    .then(res => res.json())
    .catch((error)=>{
        console.log("Api call error get new");
     })
);
module.exports = getNews;