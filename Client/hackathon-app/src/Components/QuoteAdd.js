import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../Styling/Header";
import Footer from "../Styling/Footer";

function QuoteAdd() {

    const [displayMsgBox, setDisplayMsgBox] = useState(0);
    const [data, setData] = useState({ author : "" , text : ""});
    const [message, setMessage] = useState("");
    // const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            setMessage("");
            setDisplayMsgBox(0);
        }, 2000);
    }, [message])

    const addQuote = () => {

        axios.post("http://127.0.0.1:5400/quotes",{text: data.text, author : data.author , user_id : sessionStorage.getItem("user_id")})
        .then((response) => {
            debugger
            if(response.data.affectedRows > 0){
            setDisplayMsgBox(1);
            setMessage(" Quote Added Successfully :");
            // setData({ author : "" , text : ""});
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
        var copy = { ...data };
        copy[args.target.name] = args.target.value;
        setData(copy);
    }

    return ( <>
       <Header />
            <h1 style={{ textAlign: "center", marginTop: "5vh", border: "3px solid black" }}>Adding New Quote</h1>
            <div className="container" style={{ marginTop: "10vh" }}>
                <div className="row  d-flex justify-content-center" style={{ flexDirection: "column", alignItems: "center" }}>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        {
                            displayMsgBox !== 0 ?
                                <div className="form-floating mb-3">
                                    <div className="alert alert-primary" role="alert">
                                        {message}
                                    </div>
                                </div>
                                :
                                <div></div>
                        }
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingAuthor" placeholder="Author" name="author" value={data.author} onChange={textChange} />
                            <label htmlFor="floatingAuthor">Author</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingLast" placeholder="Quote here ..." name="text" value={data.text} onChange={textChange} />
                            <label htmlFor="floatingLast">Quote Here</label>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary" style={{ width: "12vh",marginTop : "3vh"}} onClick={addQuote}>Add Quote</button>
                </div>
            </div>
            <Footer />
    
    
    </> );

}

export default QuoteAdd;