import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

function BlogPage() {
    const navigate = useNavigate();
    const {blogId} = useParams();
    const [Blog, setBlog] = useState([]);
    const alertMessage = "Do you really want to delete this blog?";

    const blogVariable = {
        blogId: blogId,
        writer: Blog.writer
    }

    const fetchUploadedBlog = () => {
        axios.post('/api/blog/getBlog', blogVariable)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data.blog);
                    setBlog(response.data.blog);
                } else {
                    alert('Failed to get blog Info');
                }
            })
    }
    useEffect(() => {
        fetchUploadedBlog();
    }, [])

    const onClickDelete = () => {

        if(window.confirm(alertMessage) === true){
            axios.post('/api/blog/removeClickedBlog', blogVariable)
            .then(response => {
                if (response.data.success) { 
                    console.log(response.data.success);
                    fetchUploadedBlog();
                    navigate('/blog');  
                } else {
                    alert("failed to remove.")
                }
            })
        }       
    };

    if (Blog.writer) {
        return (
            <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                <span style={{ fontSize:'2rem'}}>
                {moment(Blog.updatedAt).format("MMM Do YY")} 
                </span>
                <img style={{ width: '100%' }} src={`https://secret-waters-71685.herokuapp.com/${Blog.filePath}`} controls></img>
                <span style={{ fontSize:'1.5rem'}}>Author: {Blog.writer.name}</span>
                <br /><br />
                <h1>Title: {Blog.title}</h1>
                <p>{Blog.description}</p>
                <button onClick={() => onClickDelete(Blog._id)}
                style={{width:'100%', fontSize:'1.5rem'}}>delete</button>
            </div>
        )

    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default BlogPage;
