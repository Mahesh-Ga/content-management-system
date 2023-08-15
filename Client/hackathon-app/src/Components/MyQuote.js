import { useEffect, useState } from "react";
import Header from "../Styling/Header";
import axios from "axios";
import Footer from "../Styling/Footer";
import { useHistory } from "react-router-dom";


function MyQuote() {
    const [displayMsgBox, setDisplayMsgBox] = useState(0);
    const [message, setMessage] = useState("");
    const [quotesData, setQuoteData] = useState([]);
    const history = useHistory();
    const [data, setData] = useState({ author : "" , text : ""});
    const [flag, setFlag] = useState(0);
    const [button ,setButton] = useState("Add Quote");
    const [quote_id , setId] = useState(0);

    const fetchData = () => {
        axios.get("http://127.0.0.1:5400/myquotes/" + sessionStorage.getItem("user_id"))
            .then((response) => {
                setQuoteData(response.data);
            })
            .catch((error) => {
                setDisplayMsgBox(1);
                setMessage("Unable to fetch data right now...........Error : " + error);
            })
    }

    const editQuote = (id,text,author) => {
        setFlag(1);
        setButton("Update Quote");
        setData({ author : author , text : text});
        setId(id);
    }

    const deleteQuote = (id) => {
        axios.delete("http://127.0.0.1:5400/quotes/" + id)
            .then((response) => {
                if (response.data.affectedRows > 0) {
                    fetchData();
                }
            })
            .catch((error) => {
                setDisplayMsgBox(1);
                setMessage("Unable to fetch data right now...........Error : " + error);
            })
    }

    const addQuote = () => {
        if(flag == 0){
            history.push('/addquote');
        }
        else{
            axios.put("http://127.0.0.1:5400/quotes/" + quote_id, {author : data.author , text : data.text})
            .then((response) => {
                debugger
                if(response.data.affectedRows > 0){
                    setDisplayMsgBox(1);
                    setMessage("Updated Successfully .... ");
                }
                else {
                    debugger
                    var d = response.data;
                    setDisplayMsgBox(1);
                    setMessage("Something went wrong.... ");
                }
                setFlag(0);
                setButton("Add Quote");
                fetchData();
            })
            .catch((error) => {
                setDisplayMsgBox(1);
                setMessage("Unable to fetch data right now...........Error : " + error);
            })
        }
    }

    // const update =() =>{
      

    // }

    useEffect(fetchData, []);

    useEffect(() => {
        setTimeout(
            () => {
                setMessage("");
                setDisplayMsgBox(0);
            }, 1500
        )
    }, [message]);

    const textChange = (args) => {
        var copy = { ...data };
        copy[args.target.name] = args.target.value;
        setData(copy);
    }

    return (<>
        <Header />
        <h4 style={{ marginLeft: "2vh", marginTop: "2.5vh" }}>Hello,{sessionStorage.getItem("firstName") + " " + sessionStorage.getItem("lastName")}</h4>


        <div style={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: "2.5vh" }}>

            <h2 style={{ marginBottom: "5vh" }}>My Quotes</h2>

            <button type="button" className="btn btn-primary" onClick={addQuote} style={{marginBottom : "2.5vh"}}>{button}</button>

            {
                flag === 1 ?
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingAuthor" placeholder="Author" name="author" value={data.author} onChange={textChange} />
                            <label htmlFor="floatingAuthor">Author</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingLast" placeholder="Quote here ..." name="text" value={data.text} onChange={textChange} />
                            <label htmlFor="floatingLast">Quote Here</label>
                        </div>

                        {/* <button type="button" class="btn btn-primary" onClick={update}>Update</button> */}
                    </div>
                           
                          
                    :
                    <div></div>

            }

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

            {
                quotesData.map((data) => {
                    return <div style={{ width: "75vh", border: "2px solid black", margin: "2.5vh", paddingTop: "1.2vh", paddingBottom: "1.2vh", paddingLeft: "2vh", paddingRight: "2vh", fontSize: "2.1vh" }} key={data.quote_id}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            {data.text}
                        </div>
                        <hr></hr>
                        <p >-   {data.author}</p>
                        <div style={{ display: "flex", justifyContent: "end" }}>
                            <button type="button" className="btn btn-info" style={{ margin: "2vh" }} onClick={() => { editQuote(data.quote_id , data.text , data.author) }}>Edit</button>
                            <button type="button" className="btn btn-danger" style={{ margin: "2vh" }} onClick={() => { deleteQuote(data.quote_id) }}>Delete</button>
                        </div></div>
                })
            }

        </div>
        {/* <Footer /> */}
    </>);
}

export default MyQuote;