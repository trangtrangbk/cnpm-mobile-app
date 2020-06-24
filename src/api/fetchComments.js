const getComments = async (id) =>(
    await fetch(`https://myfroom.herokuapp.com/api/comment/${id}`,
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
        console.log("Api call error get comments");
     })
);
module.exports = getComments;