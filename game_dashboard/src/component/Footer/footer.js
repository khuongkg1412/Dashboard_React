import "../../../src/App.css";
import {useLocation} from 'react-router-dom'
function Footer() {

    let location = useLocation()

    if (location.pathname === '/login') return null
    return (
        <footer className="bg-white sticky-footer">
            <div className="container my-auto">
                <div className="text-center my-auto copyright"><span>Copyright © LTD2K 2022</span></div>
            </div>
        </footer>
    )

}
export default Footer