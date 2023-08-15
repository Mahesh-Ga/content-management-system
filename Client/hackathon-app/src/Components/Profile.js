import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../Styling/Header";
// import Footer from "../Styling/Footer";

function Profile() {
    const [displayMsgBox, setDisplayMsgBox] = useState(0);
    const [cred, setCred] = useState({ firstName : "", lastName : "", email: "", address: "",mobile : ""});
    const [message, setMessage] = useState("");
    const history = useHistory();
    // const [data , setData] = useState({});

    useEffect(() => {
        setTimeout(() => {
            setMessage("");
            setDisplayMsgBox(0);
        }, 2000);
    }, [message])


    const myData = () => {
        axios.get("http://127.0.0.1:5400/users").then((response) => {
            // debugger
            var userData = response.data;
            userData.map((d) => {
                // debugger
                if(d.user_id.toString()  === sessionStorage.getItem("user_id")){
                    var currentData = {firstName : d.first_name, lastName : d.last_name, email: d.email, address: "",mobile : d.mobile}
                    setCred(currentData);
                }
            })
        }).catch((error) => {
            setDisplayMsgBox(1);
            setMessage("Error : " + error);
        });
    }

    

    useEffect(myData , []);

    const updateData = () => {
        axios.put("http://127.0.0.1:5400/users/" + sessionStorage.getItem("user_id"),{firstName: cred.firstName , address : cred.address , lastName : cred.lastName , email : cred.email , password : cred.password , mobile : cred.mobile}).then((response) => {
        debugger
            if(response.data.affectedRows > 0){
                debugger
                setDisplayMsgBox(1);
                setMessage("User Updated Successfully");
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

    const textChange = (args) => {
        var copy = { ...cred };
        copy[args.target.name] = args.target.value;
        setCred(copy);
    }
    return ( 
    <>
    <Header />
   
     <div className="container" style={{ marginTop: "10vh" }}>
                <div className="row  d-flex justify-content-center" style={{ flexDirection: "column", alignItems: "center" }}>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <h2 style={{ marginBottom: "5vh" ,textAlign : "center"}}>My Profile</h2>

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
                            <input type="text" className="form-control" id="floatingAddress" placeholder="Adrress" name="address" value={cred.password} onChange={textChange} />
                            <label htmlFor="floatingAddress">Address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingMobile" placeholder="Phone" name="mobile" value={cred.mobile} onChange={textChange} />
                            <label htmlFor="floatingMobile">Phone Number</label>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary" style={{ width: "12vh",marginTop : "3vh"}} onClick={updateData}>Save</button>
                </div>
            </div>
    </> );
}

export default Profile;