import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

const Subdropbox = ({item,dataChild}) => {
    

    const [dropdown, setDropdown] = useState(false);
    let ref = useRef();
    useEffect(() => {
        const handler = (event) => {
         if (dropdown && ref.current && !ref.current.contains(event.target)) {
          setDropdown(false);
         }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
         // Cleanup the event listener
         document.removeEventListener("mousedown", handler);
         document.removeEventListener("touchstart", handler);
        };
       }, [dropdown]);

       const onMouseEnter = () => {
        window.innerWidth > 767 && setDropdown(true);
       };
       
       const onMouseLeave = () => {
        window.innerWidth > 767 && setDropdown(false);
       };
  return (
    <li key={`${item.tagId}_`} ref={ref} onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave} className={dropdown?'active':null}>
        <Link to='/'>
        <span className="font-en">
        {item.name.english}
        </span>
        
        <div>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7"
            height="11"
            viewBox="0 0 7 11"
            className="fill-current"
        >
            <path
            fillRule="evenodd"
            d="M.793 10.207a1 1 0 0 1 0-1.414L4.086 5.5.793 2.207A1 1 0 0 1 2.207.793l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z"
            ></path>
        </svg>
        </div>
        </Link>
        {dropdown?(<ul className='subdrop'>
        {dataChild.map((subItem)=>(
            subItem.parent === item.tagId?(
                <li key={subItem.parent}><Link to='/'><span className='font-en'>{subItem.name.english}</span></Link></li>
            ):null
            
        ))}
        </ul>):null}
        
        
    </li>
  )
}

export default Subdropbox
