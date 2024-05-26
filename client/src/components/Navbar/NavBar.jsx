
import { useState } from "react";
import "./NavBar.css"
import { IoIosMoon, IoIosSunny } from "react-icons/io";
function NavBar() {
    const [darkTheme, setTheme] = useState(false);
    const handleTheme = () => {
        if (!darkTheme) {
            document.body.classList.remove("darkTheme")
            document.body.classList.add("lightTheme")
        } else {
            document.body.classList.remove("lightTheme")
            document.body.classList.add("darkTheme")
        }
        setTheme(!darkTheme)
        console.log(darkTheme);
    }

    return (
        <>
            <nav className="navbar ps-4 pe-4">
                <div className="container-fluid row p-0">
                    <a className="navbar-brand col-3" href="#"><b>BLACKOFFER</b></a>
                    <form className="d-flex col-4" role="search">

                    </form>
                    <div className="theme-set col-4">
                        <div className="theme-icon" onClick={() => handleTheme()}>{
                            darkTheme ? <IoIosSunny /> : <IoIosMoon />
                        }</div>
                        <img src="https://as1.ftcdn.net/v2/jpg/02/82/64/88/1000_F_282648881_aq7TWCyulwIFLfBOKjYvcelJUGJDCJfc.jpg" alt="img" />
                    </div>
                </div>
            </nav >
        </>
    )
}

export default NavBar