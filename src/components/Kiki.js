import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import styled from 'styled-components';

const chatTheme = {
    bubbleColor: '#4286f4',
    kikiMarkColor: '#6485bc',
  };

const ChatStyles = styled.section`
    display:grid;
    font-size: 1.2rem;
    grid-template-columns: 100%;
    grid-template-rows: 3rem 1fr 4rem;
    grid-gap: 1rem;
    padding: 3rem 2rem;
    background:#fff;
    position:fixed;
    top:0;
    width:100vw;
    height:100vh;
    border-left: 1px solid lightgrey;

    .rounded{
        border-radius: 1rem;
        border:none;
    }
    .close-btn{
        color: #000;
        font-weight: 300;
        font-family: Arial,sans-serif;
        float: right;
        font-size: 2.5rem;
        cursor: pointer;
        margin: 0 2rem 0rem 0;
    }
    .conversation{
        background: white;
        padding: 0 1rem;
        overflow:auto;
        max-height: 100%;
        min-height:100%;
        margin: 0;
        list-style: none;

        li{
            margin:0;
            display: grid;
            padding: 0 0 0.5rem 0;
        }

        .kiki-says{
            grid-column: 1 / -1;
            color:#000;
        }
        .kiki-says:before{
            content: ".";
            color: ${chatTheme.kikiMarkColor};
            background: ${chatTheme.kikiMarkColor};
            border-radius: 1rem;
            margin-right: 1rem;
        }
        .human-says{
            grid-column: 3;
            padding-left:1rem;
        }
        .bubbleColor:before{
            content: ".";
            position: absolute;
            z-index: 0;
            bottom: -1rem;
            right: 0;
            height: 100%;
            width: 1rem;
            color: ${chatTheme.bubbleColor};
            background: ${chatTheme.bubbleColor};
        }
        .bubbleColor:after{
            content: ".";
            position: absolute;
            bottom: -1rem;
            right: 0;
            height: 1rem;
            width: 1rem;
            background: #fff;
            border-top-right-radius: 1rem;
        }

        .bubbleColor{
            background: ${chatTheme.bubbleColor};
            border-radius: 1rem 1rem 0 1rem;
            position:relative;
        }
    }
    .message-form{
        display:grid;
        grid-template-columns: 1fr 8rem;
        grid-gap: 1rem;
        height:100%;
        button{
            color: #fff;
            background: ${chatTheme.kikiMarkColor};
            border:none;
        }
        input[type=text]{
            padding: 0 1rem;
            border:none;
            border-bottom: 3px solid ${chatTheme.kikiMarkColor};;
        }
    }
    @media screen and (min-width: 500px) {
        max-width: 500px;
        height: 100vh;
        position:fixed;
        right:0;
    }
`;
const ChatButtonStyles = styled.button`
    @keyframes glowing {
        0% { box-shadow: 0 0 -10px #bfd7ff; }
        40% { box-shadow: 0 0 20px #bfd7ff; }
        60% { box-shadow: 0 0 20px #bfd7ff; }
        100% { box-shadow: 0 0 -10px #bfd7ff; }
    }

    width: 50px;
    height: 50px;
    background: #4286f4;
    border: 2px solid #000;
    border-radius: 50px;
    position: fixed;
    bottom: 50px;
    right: 30px;
    animation: glowing 5000ms infinite;
    cursor:pointer;
`;

const socket = openSocket('https://kiki-be.herokuapp.com');
const scrollToBottom = (isOpen)=>{
    if(isOpen){
        const messages = document.querySelector('.conversation');
        const newMessage = messages.querySelector('li:last-child');
        const lastMessage = messages.querySelector('li:nth-last-child(2)');
        const {clientHeight, scrollTop, scrollHeight} = messages;
        const newMessageHeight = newMessage.clientHeight;
        const lastMessageHeight = lastMessage ? lastMessage.clientHeight : 0;
        if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
            messages.scrollTop = scrollHeight;
        }
    }
};

export default class Kiki extends Component {
    state= {
        isOpen: false,
        conversation: [],
        message:"",
        isSending: false,
    }

    tooglechat = (e) =>{
        e.preventDefault();
        this.setState({ isOpen : !this.state.isOpen});
    };
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.message.trim().length > 0 && !this.state.isSending){
            this.setState({isSending: true});
            socket.emit('createMessage', {
                text: this.state.message.trim(),
            }, data=>{
                this.setState({isSending: false});
            });
            this.addMessageToconversation('human',this.state.message);
            this.setState({message: '',});
        }
    };

    handleChange = e => {e.preventDefault();this.setState({ [e.target.name]: e.target.value });}

    addMessageToconversation(from,text){
        const conv = [...this.state.conversation];
            conv.push({
                from,
                text,
            });
            this.setState({
                conversation: conv,
            });
    }

    componentDidMount() {
        socket.on('newMessage', data =>{
            this.addMessageToconversation('kiki',data);
        });
    }

    componentDidUpdate(){
        scrollToBottom(this.state.isOpen);
    }

  render() {
    return (
        <>
            {this.state.isOpen && (
                <ChatStyles>
                    <div>
                        <span className="close-btn" onClick={this.tooglechat}>X</span>
                    </div>
                    <ul className="conversation">
                        <li>
                            <span className="kiki-says">
                                My name is Kiki!, I'm your virtal assistent. I can give you information about Enrique. You can ask me about him, his experience and how to contact him.
                            </span>
                        </li>
                    {
                        this.state.conversation.map((el,i)=>(
                            <li key={i}>
                                <span className={`${el.from}-says ${(el.from === 'human')? 'bubbleColor': ''}`}>
                                    {el.text}
                                </span>
                            </li>
                        ))
                    }
                </ul>
                <form id="message-form" onSubmit={this.handleSubmit} className="message-form">
                    <input value={this.state.message} onChange={this.handleChange} autoComplete="off" autoFocus name="message" type="text" required placeholder="Enter Message Here" />
                    <button className="rounded">Send</button>
                </form>
            </ChatStyles>
            )}
            {
                !this.state.isOpen && (
                    <ChatButtonStyles onClick={this.tooglechat}>
                        <span aria-label="chat" role="img">💬</span>
                    </ChatButtonStyles>
                )
            }
        </>
    )
  }
}
