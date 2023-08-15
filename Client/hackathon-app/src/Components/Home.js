import { useEffect, useState } from "react";
import Header from "../Styling/Header";
import axios from "axios";

function Home() {
    const [displayMsgBox, setDisplayMsgBox] = useState(0);
    const [message, setMessage] = useState("");
    const [quotesData, setQuoteData] = useState([]);
    const [radio , setRadio] = useState("btnradio1");
    const [favoriteQuotes , setFavoriteQuotes] = useState([]);
    var favId  = new Array();  


    const fetchData = () => {
        axios.get("http://127.0.0.1:5400/quotes")
            .then((response) => {
                document.getElementById("btnradio1").checked = true;
                setQuoteData(response.data);
            })
            .catch((error) => {
                setDisplayMsgBox(1);
                setMessage("Unable to fetch data right now...........Error : " + error);
            })

        axios.get("http://127.0.0.1:5400/myfavquotes/" + sessionStorage.getItem("user_id")) 
        .then((response) => {
            setFavoriteQuotes(response.data);
        })
        .catch((error) => {
            setDisplayMsgBox(1);
            setMessage("Unable to fetch data right now...........Error : " + error);
        })
        
    }

    const fetchData2 = () => {
        axios.get("http://127.0.0.1:5400/myfavquotes/" + sessionStorage.getItem("user_id")) 
        .then((response) => {
            setRadio("btnradio2");
            setFavoriteQuotes(response.data);
        })
        .catch((error) => {
            setDisplayMsgBox(1);
            setMessage("Unable to fetch data right now...........Error : " + error);
        })
        
    }
    useEffect(fetchData, []);

    useEffect(() => {
        setTimeout(
            () => {
                setMessage("");
                setDisplayMsgBox(0);
            }, 1500
        )
    }, [message]);

    const check = (args) =>{
        setRadio(args.target.id);
    }

    const likeQuote = (id) => {
        axios.post("http://127.0.0.1:5400/myfavquotes",{user_id: sessionStorage.getItem("user_id"), quote_id : id })
        .then((response) => {
            if(response.data.affectedRows > 0){
                fetchData();
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

    const unlikeQuote = (id) => {
        axios.delete(`http://127.0.0.1:5400/myfavquotes/${id}?user_id=${parseInt(sessionStorage.getItem("user_id")) }`).then((response) => {
             if(response.data.affectedRows > 0){
                fetchData2();
             }
            else{
                var a = response.data;
                setDisplayMsgBox(1);
                setMessage("Something Wrong");
            }
        }).catch((error) => {
            setDisplayMsgBox(1);
            setMessage("Error : " + error);
        });
    }
    return (<>
        <Header />
       
        <h4 style={{ marginLeft: "2vh", marginTop: "2.5vh" }}>Hello,{sessionStorage.getItem("firstName") + " " + sessionStorage.getItem("lastName")}</h4>


        <div style={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: "2.5vh" }}>

            <h2 style={{ marginBottom: "5vh" ,textDecoration : "underline" }}>Quotes Around the World</h2>

            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" className="btn-check" name="btnradio" id="btnradio1" onChange={check} />
                <label class="btn btn-outline-primary" for="btnradio1">All</label>
            <input type="radio" className="btn-check" name="btnradio" id="btnradio2" onChange={check} />
                <label class="btn btn-outline-primary" for="btnradio2">Favorites</label>
            </div>
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
                favoriteQuotes.map((f) => {
                    // debugger
                    favId.push(f.quote_id);
                })
            }

            {
                radio === "btnradio1" ?
                quotesData.map((data) => {
                    // debugger
                    return <div style={{ width: "75vh", border: "2px solid black", margin: "2.5vh", paddingTop: "1.2vh", paddingLeft: "2vh", paddingRight: "2vh", fontSize: "2.1vh" , backgroundColor : "lightblue" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            {data.text}
                            {
                                data.user_id != sessionStorage.getItem("user_id") &&  !favId.includes(data.quote_id)?
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="flexCheckDefault" onClick={() => {likeQuote(data.quote_id)}}  style={{backgroundImage : `url("http://127.0.0.1:3000/EmptyHeart.png")` , backgroundColor : "lightblue" , border : "0px"}}/>
                                        <label class="form-check-label" for="flexCheckDefault">
                                            {/* Like */}
                                        </label>
                                    </div>
                                                    :
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="flexCheckDefault" disabled style={{backgroundImage : `url("http://127.0.0.1:3000/FullHeart.png")` , backgroundColor : "lightblue" , border : "0px"}} />
                                        <label class="form-check-label" for="flexCheckDefault">
                                            {/* Already Liked OR His/Her Own Quote */}
                                        </label>
                                    </div>
                            }
                        </div>
                        <p >-   {data.author}</p>
                    </div>
                 
                })   :
                favoriteQuotes.map((data) => {
                    return <div style={{ width: "75vh", border: "2px solid black", margin: "2.5vh", paddingTop: "1.2vh", paddingLeft: "2vh", paddingRight: "2vh", fontSize: "2.1vh" , backgroundColor : "lightblue"}}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            {data.text}
                            {
                                // data.user_id != sessionStorage.getItem("user_id") ?
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="flexCheckDefault" onClick={() => {unlikeQuote(data.quote_id)}} style={{backgroundImage : `url("http://127.0.0.1:3000/FullHeart.png")` , backgroundColor : "lightblue" , border : "0px"}} />
                                        <label class="form-check-label" for="flexCheckDefault">
                                            {/* Unlike */}
                                        </label>
                                    </div>
                                    //                 :
                                    // <div class="form-check">
                                    //     <input class="form-check-input" type="checkbox" id="flexCheckDefault" disabled />
                                    //     <label class="form-check-label" for="flexCheckDefault">
                                    //         Unlike
                                    //     </label>
                                    // </div>
                            }
                        </div>
                        <p >-   {data.author}</p>
                    </div>
                }) 
            }

        </div>
        {/* <Footer /> */}

    </>);
}

export default Home;