import { useEffect, useState } from "react";
import { getPost } from "../api/Postapi";
import "../App.css";
import { deletePost } from "../api/Postapi";
import { Form } from "./Form";

export const Posts = () => {
    const[data, setData ] = useState([]);
    const getPostData = async () => {
        const res = await getPost();
        console.log(res.data);
        setData(res.data);
    };

    useEffect(() => {
        getPostData();
    }, []);

    // function to delete post
    const handleDeletePost = async (id) => {
        try{
        const res = await deletePost(id);
        if(res.status === 200) {
           const newUpdatedPosts = data.filter((curPost) => {
             return curPost.id !== id; 
           });
         setData(newUpdatedPosts);  
        } else {
            console.log("Failed to delete the post: ",res.status);
        }
        } catch(error) {
            console.log(error); 
         }

    };

    // handleUpdatePost
        const handleUpdatePost = () => {

        }   
 
    return (
        <>
     <section className="section-form">
            <Form data={data} setData={setData} />
     </section>   
    <section className="section-post">
            <ol>
                {
                    data.map((curElem) => {
                            const {id, body, title} = curElem;
                            return (
                                <li key={id}>
                                    <p>Title: {title}</p>
                                    <p>Body: {body}</p>
                                    <button onClick={() => handleUpdatePost(curElem)}>Edit</button>
                                    <button className="btn-delete" onClick={() => handleDeletePost(id)}>Delete</button>
                                </li>
                            )
                    })
                }
            </ol>
    </section>
        </>   
            );            
};
export default Posts;

