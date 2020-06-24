const getNewsFilter = async (page, params) =>(
    await fetch(`https://myfroom.herokuapp.com/api/news?page=${page}&pageSize=4&${params}`,
    {
        method: 'GET',
    })
    .then(res => res.json())
    .catch((error)=>{
        console.log("Api call error get new filter", error);
     })
);
module.exports = getNewsFilter;