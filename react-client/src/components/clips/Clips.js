import React, { Component } from 'react';
import socketIOClient from "socket.io-client";


import Clip from '../clip/Clip'
import './Clips.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const socket = socketIOClient('http://localhost:8001');

class Clips extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clips: []
        }

        socket.on('update', () => {
            this.updateClips();
        })
    }

    componentDidMount() {
        this.updateClips();
    }


    updateClips = () => {
        fetch("http://localhost:8000/clips", {
            crossDomain: true,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                this.setState({ clips: json })
                console.log(this.state.clips)
            })
            .catch((error) => {
                console.error(error);
            });
    }


    handleClick = () => {
        // socket.emit('test');
        // socket.on('test2', () => {
        //   console.log('test opk')
        //   this.setState({
        //     res: 'ça marche'
        //   })
        // })
    }

    render() {
        var clips = [];
        if (this.props.private) {
            this.state.clips.map((c) => { if (!c.private) clips.push(<Clip raw={c} key={c.id}> </Clip>); return null })
        } else this.state.clips.map((c) => {
            if (c.private) clips.push(<Clip raw={c} key={c.id}> </Clip>); return null;
        })
        console.log(clips)

        return (
            <div>
                clips :
                { clips}
            </div >

        );
    }
}

export default Clips;
