import axios from 'axios'

async function Logout(e, navigate) {
    e.preventDefault();
    await axios.get('http://localhost:3001/logout')
    localStorage.clear();
    navigate("/login");
}

export default Logout;