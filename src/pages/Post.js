
import {useEffect, useState} from "react";
import {addDoc} from "firebase/firestore";
import {collection} from "firebase/firestore";
import {db, auth} from "../utils/firebase";
import {useNavigate} from "react-router-dom";

const Post = ({isAuth}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const postsRef = collection(db, "posts");

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    });

    const onSave = async (e) => {
        e.preventDefault();
        await addDoc(postsRef, {
            title,
            description,
            author: {
                id: auth.currentUser.uid,
                name: auth.currentUser.displayName
            },
            createdAt: new Date()
        }).then(() => {
            // setTitle("");
            // setDescription("");
            navigate("/");
        }).catch(err => {
            console.log(err.message);
        });
    }

    return (
        <div className='page-post'>
            <div className='container-post'>
                <div className='input-group'>
                    <label htmlFor='title'>Title</label>
                    <input onChange={(e) => setTitle(e.target.value)}
                           placeholder={'Type something...'}
                           type='text' id='title' defaultValue={title} />
                </div>
                <div className='input-group'>
                    <label htmlFor='description'>Description</label>
                    <textarea onChange={(e) => setDescription(e.target.value)}
                              id='description' placeholder='Text...' defaultValue={description}></textarea>
                </div>
                <button onClick={(e) => onSave(e)} type='button'>Save</button>
            </div>
        </div>
    );
}

export default Post;
