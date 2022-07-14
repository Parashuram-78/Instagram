import React, { useState, useRef, useCallback } from 'react';
import Post from '../Post/Post';
import "./MainPage.css"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { setPost, setNextToken, getPost } from "../../features/Post/PostSlice"
const MainPage = () => {

    const dispatch = useDispatch()
    const postSlice = useSelector(getPost)
    const [hasMore, setHasMore] = useState(false)
    const [loading, setLoading] = useState(false)
    const observer = useRef()
    const lastPost = useCallback(node => {
        console.log(hasMore)
        if (loading) return
        if (observer.current) {
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                console.log("visible")
                getPosts()
            }
        })
        if (node) {
            observer.current.observe(node)
        }
    }, [hasMore])
    React.useEffect(() => { getPosts() }, [])


    const getPosts = () => {
        setLoading(true)
        axios.get(process.env.REACT_APP_BACKEND_URL + "api/post/allPost/user=" + localStorage.getItem("userId") + "&size=6&nextToken=" + postSlice.nextToken)
            .then((response) => {
                console.log(response);
                dispatch(setNextToken(response.data.nextToken))
                dispatch(setPost(postSlice.posts.concat(response.data.posts)))
                console.log(response.data.posts.length)
                setLoading(false)
                if (response.data.posts.length < 6) {
                    setHasMore(false)
                } else {
                    console.log("hi")
                    setHasMore(true)
                }
            }).catch((error) => {
                alert(error)
                setLoading(false)
            })

    }
    return <div >
        {
            postSlice && postSlice.posts.map((post, index) => {
                if (postSlice.posts.length === index + 1) {
                    return <div key={post.postId} ref={lastPost}>
                        <Post
                            postId={post.postId}
                            username={post.userName}
                            likes={post.postLikesCount}
                            src={post.postFileUrl} postType={post.postType} status={post.status}
                            commentCount={post.postCommentCount} createdAt={post.createdAt}
                            slug={post.slug} 
                            profileimage={post.postFileUrl}/>
                    </div>

                } else {
                    return <Post key={post.postId}
                        postId={post.postId}
                        username={post.userName}
                        likes={post.postLikesCount} src={post.postFileUrl} postType={post.postType} status={post.status}
                        commentCount={post.postCommentCount}
                        createdAt={post.createdAt}
                        slug={post.slug} 
                        profileimage={post.userImage}/>

                }
            })
        }
        {loading && <p>Loading................</p>}
    </div>;

}

export default MainPage;

