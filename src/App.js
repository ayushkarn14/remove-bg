import "./App.css";
import logo from "./assets/logo.jpg";
import { useState, useEffect } from "react";
function App() {
    const [url, setUrl] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [underProcess, setUnderProcess] = useState(false);
    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    function handleClick() {
        setUnderProcess(true);
        const img = document.getElementById("filepicker").files[0];
        const formData = new FormData();
        formData.append("image_file", img);
        formData.append("size", "auto");
        fetch("https://api.remove.bg/v1.0/removebg", {
            method: "POST",
            headers: {
                "X-Api-Key": "9k1CK1zKxPPcCom2dxGhDu4i",
            },
            body: formData,
        })
            .then(function (response) {
                return response.blob();
            })
            .then(function (finalResponse) {
                console.log(finalResponse); //finalResponse is a blob
                setUrl(URL.createObjectURL(finalResponse));
                setUnderProcess(false);
            })
            .catch();
        console.log("clicked");
    }

    function handleDownload() {
        let anc = document.createElement("a");
        anc.href = url;
        anc.download = "bg-removed.png";
        document.body.append(anc);
        anc.click();
        document.body.removeChild(anc);
    }
    return (
        <div className="App">
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/" alt="preview">
                        <img
                            src={logo}
                            alt="Logo"
                            width="30"
                            height="30"
                            className="d-inline-block align-text-top"
                        />
                        &nbsp; Background Remover
                    </a>
                </div>
            </nav>
            <div className="row m-4 content">
                <div className="col-md-6 mt-4">
                    {selectedImage && (
                        <img
                            src={imageUrl}
                            className="imageStyle mx-auto"
                            alt="preview"
                        />
                    )}
                    {!selectedImage && <div className="image-space"></div>}
                    <div className="m-4">
                        <input
                            className="form-control form-control"
                            id="filepicker"
                            type="file"
                            onChange={(e) =>
                                setSelectedImage(e.target.files[0])
                            }
                            accept=".png, .jpg, .jpeg"
                        />
                        {selectedImage && (
                            <button
                                type="button"
                                className="btn btn-primary mx-auto mt-4"
                                style={{ display: "block" }}
                                onClick={handleClick}
                            >
                                Upload Image
                            </button>
                        )}
                        {!selectedImage && (
                            <button
                                type="button"
                                className="btn btn-primary mx-auto mt-4"
                                style={{ display: "block" }}
                                disabled
                            >
                                Upload Image
                            </button>
                        )}
                    </div>
                </div>
                <div className="col-md-6 mt-4">
                    {underProcess && (
                        <p
                            className="mx-auto"
                            style={{
                                display: "block",
                                textAlign: "center",
                                fontSize: "30px",
                            }}
                        >
                            Processing...
                        </p>
                    )}
                    {url && (
                        <img
                            src={url}
                            className="imageStyle mx-auto"
                            alt="preview"
                        />
                    )}
                    {!url && <div className="image-space"></div>}
                    {url && (
                        <button
                            type="button"
                            className="btn btn-primary mx-auto mt-4"
                            style={{ display: "block" }}
                            onClick={handleDownload}
                        >
                            Download
                        </button>
                    )}
                    {!url && (
                        <button
                            type="button"
                            className="btn btn-primary mx-auto mt-4"
                            style={{ display: "block" }}
                            disabled
                        >
                            Download
                        </button>
                    )}
                </div>
            </div>
            <footer
                className="text-center"
                style={{
                    backgroundColor: "#DDDDDD",
                    position: "relative",
                    bottom: "",
                    width: "100vw",
                }}
            >
                <div
                    className="text-center p-3"
                    style={{ backgroundColor: "#EEEEEE", color: "black" }}
                >
                    by Ayush Karn 💜
                </div>
            </footer>
        </div>
    );
}

export default App;
