import React, { useEffect, useState  } from "react";
import Axios from "axios";
import moment from 'moment';
import '../../commons/GridCards.css'


function BoardPage() {
    const [Blogs, setBlogs] = useState([]);

    const fetchUploadedBlog = () => {
        Axios.post('api/blog/getBlogs', {
            writer: localStorage.getItem('userId'),
        })
        .then(response => {
            if (response.data.success) {
                // console.log(response.data.blogs)
                setBlogs(response.data.blogs);
            } else {
                alert('Failed to get Blogs');
            }
        })
    };

    useEffect(() => {
        fetchUploadedBlog()
    }, []);

    const renderCards = Blogs.map((blog, index) => {

        return <div key={index}  style={{display: 'flex', flexDirection: 'column'}} >
            <div>
                <a href={`/blog/${blog._id}`} >
                <img style={{ width: '100%' }} src={`https://secret-waters-71685.herokuapp.com/${blog.filePath}`} alt='Main pic' controls></img>
                </a>
            </div>
            <button>
            <a href={`/blog/${blog._id}`} style={{color:'black'}}>Move</a>
            </button>
            
            <div style={{marginTop: 'auto'}}>
                <span style={{textAlign:'right'}}>Title: {blog.title}</span><br />
                <span>Date: {moment(blog.createdAt).format("MMM Do YY")} </span>
                <br />
            </div>  
        </div>
    })

  return (
    <div style={{ width: '85%', margin: '1rem auto' }}>
        <span><a href="/blog/upload" style={{color:'black'}}><i className="fa fa-upload" style={{ fontSize:'2rem'}}></i></a></span>     
        <div>
            <h1>My Board</h1>
            <hr /><br />
        </div>
        <div className='grid-container' style={{ fontSize:'1.5rem'}}>
                {renderCards}
        </div>      
    </div>
  )
}

export default BoardPage;