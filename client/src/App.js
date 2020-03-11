import axios from "axios"
import React, { useState, useEffect } from "react";
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardIcon,
  CardFieldset,
  CardInput,
  CardOptionsItem,
  CardOptions,
  CardOptionsNote,
  CardButton,
  CardLink,
  StyledDiv,
  CardBodyStyled,
  CardWrapperStyled
} from "./styles";




function App() {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:5000/api/posts/')
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
          <CardWrapperStyled>
            <CardBody>
            <CardHeader><CardHeading>{post.title}</CardHeading></CardHeader>
            <CardFieldset>
            <p>{post.contents}</p>
            <p>{post.id}</p>
            <p>{post.created_at}</p>
            <p>{post.updated_at}</p>
            </CardFieldset>
            </CardBody>
          </CardWrapperStyled>
        )
      })}
     
    </div>
  );
}

export default App;
