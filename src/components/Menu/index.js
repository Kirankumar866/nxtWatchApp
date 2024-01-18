import "./index.css"
import {Link} from 'react-router-dom'
import {IoMenu } from "react-icons/io5";
import Popup from 'reactjs-popup';
import { MdHome,MdOutlinePlaylistAdd,MdLocalFireDepartment} from "react-icons/md";
import { SiYoutubegaming } from "react-icons/si";

const Menu = ()=>{
    return(
        <Popup
            trigger={<button className="button"> <IoMenu className = "ml-3 mr-3 w-6 h-6"/> </button>}
            modal
            nested
           
        >
            {close => (
      <div className="modal bg-gray-300 bg-opacity-70">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="w-full pt-6">
            <Link to = "/" className="hover:bg-gray-400 text-lg flex justify-center items-center m-5" onClick={close} >
            <MdHome className="ml-5 absolute left-20"/>
            <h1 className="font-bold text-center">Home</h1>
            </Link>
            <Link to = "/trending" className="hover:bg-gray-400 text-lg flex justify-center items-center m-5" onClick={close}>
            <MdLocalFireDepartment className="ml-3 absolute left-20"/>
            <h1 className="font-bold text-center">Trending</h1>
            </Link>
            <Link to = "/gaming" className="hover:bg-gray-400 text-lg flex justify-center items-center m-5" onClick={close}>
            <SiYoutubegaming className="ml-3 absolute left-20"/>
            <h1 className="font-bold text-center">Gaming</h1>
            </Link>
            <Link to = "/saved" className="hover:bg-gray-400 text-lg flex justify-center items-center m-5" onClick={close}>
            <MdOutlinePlaylistAdd className="ml-3 absolute left-20"/>
            <h1 className="font-bold text-center">Saved</h1>
            </Link>
            
        </div>   
      </div>
    )}
            

        </Popup>

    )
}

export default Menu