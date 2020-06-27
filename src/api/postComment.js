const addComment = async (token,id, values) =>(
    await fetch(`https://myfroom.herokuapp.com/api/comment/${id}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(values)
    })
    .then(res => res.json())
    .catch((error)=>{
        console.log("Api call error - post comment"+ error);
     })
);
module.exports = addComment;