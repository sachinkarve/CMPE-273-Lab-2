import profilePic from '../images/profile_pic.jpg'
import URL from '../config'
import React, { Component } from 'react';
const axios = require("axios");



class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            // image: `${URL}/imager/uploader/${localStorage.getItem("user_id")}`
            image: profilePic
        };
        this.onUpload = this.onUpload.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
        console.log(e.target.files[0]);
        console.log("hello");
        this.setState({
            file: e.target.files[0],
            image: this.state.image
        });
    }

    onUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", this.state.file);
        const uploadConfig = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        axios.defaults.headers.common['authorization']= localStorage.getItem('token')
        axios.post(`${URL}/imager/uploader/${localStorage.getItem("user_id")}`, formData, uploadConfig)
            .then(response => {
                alert("Image uploaded successfully!");
            })
            .catch(err => {
                console.log("Error");
            });
    }

    render() {
        //let title = localStorage.getItem("name");
        return (
            <form onSubmit={this.onUpload}>
                {/* <h3>{title}</h3> */}
                <img src={this.state.image} style={{ height: '50%', width: '50%' }} /><br/><br/>
                <input type="file" name="image" onChange={this.onChange} /><br/>
                <button type="submit">Upload</button>
            </form>
        )
    }
}

export default FileUpload;