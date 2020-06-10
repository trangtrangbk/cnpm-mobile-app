import  link from './link';
const getNews = async (page) =>(
    await fetch('https://myfroom.herokuapp.com/api/news?page='+page, 
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: undefined
    })
    .then(res => res.json())
    .catch((error)=>{
        console.log("Api call error"+error);
     })
);
module.exports = getNews;