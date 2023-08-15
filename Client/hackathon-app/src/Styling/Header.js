import { useHistory } from "react-router-dom";

function Header() {
    const history = useHistory();   

    const Logout = () => {
        sessionStorage.removeItem("isLoggedin");
        sessionStorage.removeItem("lastName");
        sessionStorage.removeItem("firstName");
        sessionStorage.removeItem("user_id");
        history.push("/login");
    }

    return (<>
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#8AAAE5" }}>
            <div className="container-fluid">
                <a className="navbar-brand" style={{ color: "#FFFFFF", fontSize: "4vh", fontWeight: "bolder", marginRight: "12vh" }}>Quora</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav" >
                        <li className="nav-item">
                            <button className="nav-link active" aria-current="page" style={{ color: "#FFFFFF", fontSize: "2.5vh", marginRight: "5vh" }}onClick={()=>{history.push("/home")}} >Home</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link active" aria-current="page" style={{ color: "#FFFFFF", fontSize: "2.5vh", marginRight: "5vh" }} onClick={()=>{history.push("/myquotes")}} >My Quote</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link active" aria-current="page" style={{ color: "#FFFFFF", fontSize: "2.5vh", marginRight: "5vh" }} onClick={()=>{history.push("/profile")}}>Profile</button>
                        </li>
                    </ul>
                </div>
            {
                sessionStorage.getItem("isLoggedin") === 'true' ?
            <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "2vh" }}>
                            <button type="button" className="btn btn-danger" onClick={Logout}>Logout</button>
            </div>
                        :<div></div>
            }
            </div>
        </nav>
    </>);
}

export default Header;