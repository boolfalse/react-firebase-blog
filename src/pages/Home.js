
import {useEffect, useState} from "react";
import {collection, getDocs, deleteDoc, doc} from "firebase/firestore";
import {db, auth} from "../utils/firebase";

const Home = ({isAuth}) => {
    const [posts, setPosts] = useState([]);
    const postsRef = collection(db, "posts");

    const getPosts = async () => {
        const data = await getDocs(postsRef);
        return data.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }
    const deletePost = async (postId) => {
        const postDoc = doc(postsRef, postId);
        await deleteDoc(postDoc);
        setPosts(posts.filter(post => post.id !== postId));
    }

    useEffect(() => {
        getPosts().then(data => {
            setPosts(data);
        }).catch(err => {
            console.log(err.message);
        });
    });

    return (
        <div className='page-home'>
            {
                posts.length === 0 ?
                    "Loading..." :
                    posts.map(post => {
                        return post.title && (
                            <div key={post.id} className='post'>
                                <div className='post-header'>
                                    <div className='title'>
                                        <h3>{post.title}</h3>
                                    </div>
                                    {
                                        isAuth && post.author.id === auth.currentUser.uid && (
                                            <div onClick={() => deletePost(post.id)} className='delete-post'>
                                                <button>&#128465;</button>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='post-description'>
                                    <div className='description'>
                                        <p>{post.description}</p>
                                    </div>
                                </div>
                                <h3>{post.author?.name}</h3>
                            </div>
                        )

                        // if (post.author.id === auth.currentUser.uid) {
                        //     return (
                        //         <div className='post' key={post.id}>
                        //             <div className='post-header'>
                        //                 <div className='post-author'>
                        //                     <img src={post.author.photoURL} alt={post.author.name} />
                        //                     <div className='post-author-name'>{post.author.name}</div>
                        //                 </div>
                        //                 <div className='post-date'>{post.createdAt.toDate().toLocaleString()}</div>
                        //             </div>
                        //             <div className='post-content'>
                        //                 <h3>{post.title}</h3>
                        //                 <p>{post.description}</p>
                        //             </div>
                        //         </div>
                        //     );
                        // }
                    })
            }
        </div>
    );
}

export default Home;
