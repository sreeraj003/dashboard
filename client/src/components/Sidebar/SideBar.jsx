import { useNavigate } from "react-router-dom"
import "./sidebar.css"
function SideBar() {
    const history = useNavigate()
    return (
        <>
            < div className="side" >
                < ul >
                    <div className="list">
                        <li onClick={() => history("/")}>Dashboard</li>
                    </div>
                    <div className="list">
                        <li onClick={() => history("/posts")}>Posts</li>
                    </div>
                </ul >
            </div >

        </>
    )
}

export default SideBar