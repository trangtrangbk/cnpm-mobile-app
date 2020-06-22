const getNewsFilter = async (page, bodyData) =>(
    await fetch(`https://myfroom.herokuapp.com/api/news?page=${page}&pageSize=4`,
    {
        method: 'GET',
        body:JSON.stringify({'city': 'Hà nội'}),
    })
    .then(res => res.json())
    .catch((error)=>{
        console.log("Api call error get new filter", error);
     })
);
module.exports = getNewsFilter;