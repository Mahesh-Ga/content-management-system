import { useEffect, useState } from "react";
import Footer from "../Styling/Footer";
import Header from "../Styling/Header";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

function Register() {
    const [displayMsgBox, setDisplayMsgBox] = useState(0);
    const [cred, setCred] = useState({ firstName : "", lastName : "", email: "", password: "" ,confirmPassword : "" ,mobile : ""});
    const [message, setMessage] = useState("");
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            setMessage("");
            setDisplayMsgBox(0);
        }, 2000);
    }, [message])

    const uploadData = () => {
        if(cred.password === cred.confirmPassword){
        axios.post("http://127.0.0.1:5400/users",{firstName: cred.firstName , lastName : cred.lastName , email : cred.email , password : cred.password , mobile : cred.mobile}).then((response) => {
            if(response.data.affectedRows > 0){
            setDisplayMsgBox(1);
            setMessage("Registered Successfully : You will be redirected to login Page in 3s");
            setTimeout(()=>{
                history.push("/login");
            },3000);
            }
            else{
                setDisplayMsgBox(1);
                setMessage("Something Wrong");
            }
        }).catch((error) => {
            setDisplayMsgBox(1);
            setMessage("Error : " + error);
        });
        }
        else{
            setDisplayMsgBox(1);
            setMessage("Password doesn't match ...");
        }
    }

    const textChange = (args) => {
        var copy = { ...cred };
        copy[args.target.name] = args.target.value;
        setCred(copy);
    }
    
    return (<>
            <div className="container" style={{ marginTop: "10vh" }}>
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
                            <input type="text" className="form-control" id="floatingFirst" placeholder="FirstName" name="firstName" value={cred.firstName} onChange={textChange} />
                            <label htmlFor="floatingFirst">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingLast" placeholder="LastName" name="lastName" value={cred.lastName} onChange={textChange} />
                            <label htmlFor="floatingLast">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email" value={cred.email} onChange={textChange} />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingMobile" placeholder="Password" name="mobile" value={cred.mobile} onChange={textChange} />
                            <label htmlFor="floatingMobile">Mobile No.</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" value={cred.password} onChange={textChange} />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingConfirmPassword" placeholder="Password" name="confirmPassword" value={cred.confirmPassword} onChange={textChange} />
                            <label htmlFor="floatingConfirmPassword"> Confirm Password</label>
                        </div>
                    </div>
                    Already have an acoount ?<div style={{textAlign : "center"}}> <Link to='/login'>Login here ... </Link></div>
                    <button type="button" className="btn btn-primary" style={{ width: "12vh",marginTop : "3vh"}} onClick={uploadData}>Register</button>
                </div>
            </div>
    </>);
}

export default Register;
