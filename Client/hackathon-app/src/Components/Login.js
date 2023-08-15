import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory ,Link } from "react-router-dom";

function Login() {
    const [displayMsgBox, setDisplayMsgBox] = useState(0);
    const [cred, setCred] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            setMessage("");
            setDisplayMsgBox(0);
        }, 2000);
    }, [message])

    const validateData = () => {
        var flag = 0;
        axios.get("http://127.0.0.1:5400/users").then((response) => {
            var userData = response.data;
            
            userData.map((data) => {
                if(data.password === cred.password && data.email === cred.email){
                    sessionStorage.setItem("user_id", data.user_id);
                    sessionStorage.setItem("firstName", data.first_name);
                    sessionStorage.setItem("lastName", data.last_name);
                    sessionStorage.setItem("isLoggedin", true);                    
                    history.push('/home');
                    flag = 1;
                }
            })
            if (flag === 0) {
                setDisplayMsgBox(1);
                setMessage("Invalid input! Please try again ...");
            }
        }).catch((error) => {
            setDisplayMsgBox(1);
            setMessage("Error : " + error);
        });
    }

    const textChange = (args) => {
        var copy = { ...cred };
        copy[args.target.name] = args.target.value;
        setCred(copy);
    }

    return (
        <>
            {/* <Header />
             */}
            <div className="container" style={{ marginTop: "25vh" }}>
                <div className="row  d-flex justify-content-center" style={{ flexDirection: "column", alignItems: "center" }}>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        {
                            displayMsgBox !== 0 ?
                                <div className="form-floating mb-3">
                                    <div className="alert alert-danger" role="alert">
                                        {message}
                                    </div>
                                </div>
                                :
                                <div></div>
                        }
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email" value={cred.email} onChange={textChange} />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" value={cred.password} onChange={textChange} />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        
                    </div>
                    

                    Don't have an account ?<div style={{textAlign : "center"}}> <Link to='/register'>Register here ... </Link></div>
                    <button type="button" className="btn btn-primary" style={{ width: "12vh",marginTop : "3vh"}} onClick={validateData}><Link to='/login' style={{ color: "white", textDecoration: "none" }}>Login</Link></button>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default Login;