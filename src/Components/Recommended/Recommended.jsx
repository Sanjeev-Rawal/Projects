import React, { useEffect, useState } from 'react'
import './Recommended.css'
import { API_KEY } from '../../data'
import { value_converter } from '../../data'
import moment from 'moment'
import { Link } from 'react-router-dom' 


const Recommended = ({categoryId}) => {

const [apiData, setApiData] = useState([]);

const fetchRecoData = async() =>{
const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=46&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`;
await fetch(relatedVideo_url).then(e=>e.json()).then(e=>setApiData(e.items));
};

useEffect(()=>{

fetchRecoData();

},[]);


  return (
    <div  className='recommended'> 

    {apiData.map((item,index)=>{
     return(

      <Link to = {`/video/${item.snippet.categoryId}/${item.id}`} key= {index} className="side-video-list">
      <img src={item?item.snippet.thumbnails.medium.url:""} alt="" />
      <div className="vid-info">
        <h4>{item?item.snippet.title:""}</h4>
        <p>{item?item.snippet.channelTitle:""}</p>
        <p>{item?value_converter(item.statistics.viewCount):""} views &bull; {moment(item?item.snippet.publishedAt:"").fromNow()}</p>
      </div>
    </Link>

     )})};

  

    





    </div>
  )
}

export default Recommended