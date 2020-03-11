import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from " axios"
import React, { useState, useEffect } from "react";
function App() {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    
    axios
    .get('localhost:5000/api/posts/14')
    .then(res=>{
        console.log(res)
        setPosts(res.data)
        console.log(res.data)
    })
    .catch(err=>console.log(err))
},[])
  return (
    <div className="App">
      {posts.map(post=>{
        return(
          <div>
          <h2>{post.title}</h2>
          <p>{post.contents}</p>
          </div>
        )
      })}
     
    </div>
  );
}

export default App;
