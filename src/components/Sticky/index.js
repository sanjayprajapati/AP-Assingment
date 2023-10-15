import React from 'react';
import  './sticky.css'
import { Link } from 'react-router-dom';
import Dropbox from './dropbox';

const StickyHeader = ({data}) => {
  return (
    <div className='sticky-bar'>
      <div className='main-container h-full'>
        <div className='sticky-wrap flex h-full items-center justify-between'>
          <div className='sticky-left flex items-center'>
            <div className='image-wrap'><img src={require('../../assets/images/ic_videoseries.png')} alt='' /></div>
            <div className='search-bar flex'>
              <Dropbox onOpen={() => console.log("Opening box")} data={data}/>
              <input type='search' placeholder='Search for Video Series' className='search-input' />
              <button className='search-btn-right'>
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16"><path fillRule="evenodd" d="M6.5 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-6 4a6 6 0 1 1 10.89 3.476l4.817 4.817a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 .5 6Z"></path></svg>
              </button>
            </div>
          </div>
          <div className='sticky-right flex'>
              <button className='search-btn'>
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16"><path fillRule="evenodd" d="M6.5 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-6 4a6 6 0 1 1 10.89 3.476l4.817 4.817a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 .5 6Z"></path></svg>
              </button>
            <Link to='/'><span className='font-en'>Login</span></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StickyHeader
