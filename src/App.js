import React, { Component } from 'react';
import Kiki from './components/Kiki';
import './App.css';

class App extends Component {
  render() {
    return (
      <main className="main-container">
          
          <header className="main-header center-content">
              <div>
                  <p className="logo">EA</p>
                  <p className="intro"> Nearly 13 years ago I've been involved in many successful projects and collaborated with talented people to create digital products for both business and consumer use.</p>
              </div>
          </header>
          <section className="solid-bg">
              <div className="center-content">
                  <h2>Clients</h2>
                  <p>I've been honored to be part of great teams that are behind big names; developing and maintaining their sites in a daily basis:</p>
                  <ul className="grid-list">
                      <li className="grid-list-item">Chevrolet</li>
                      <li className="grid-list-item">Cadillac</li>
                      <li className="grid-list-item">Epsilon</li>
                      <li className="grid-list-item">Sprint</li>
                      <li className="grid-list-item">Hershey's</li>
                      <li className="grid-list-item">Subaru</li>
                      <li className="grid-list-item">BMW</li>
                      <li className="grid-list-item">Dell Stores</li>
                      <li className="grid-list-item">Aeropost</li>
                  </ul>
              </div>
          </section>
          <section>
              <div className="center-content">
                  <h2>Practices/Demos</h2>
                  <p><a href="https://mrs-ap-next-prod.herokuapp.com" target="blank">Full stack application with React.js and GraphQL.</a></p>
                  <p><a href="https://eacuna-chat.herokuapp.com/" target="blank">Full stack chat application using NodeJS/Express.JS, Mustache and Socket.io</a></p>
                  <p><a href="https://cotd-kocpqgpppl.now.sh/" target="blank">Application using React.js + Firebase apps and website components</a></p>
                  <p><a href="https://learn-redux-pfpsfxwlsi.now.sh/" target="blank">Application using Redux, React Router and React </a></p>
                  <p><a href="/whack-a-mole" target="blank">Whack a mole game using contemporary JavaScript and CSS3</a></p>
              </div>
          </section>
          <section className="disclaimers">
              <div className="center-content">
                  <p>Any of the trademarks, service marks, collective marks, design rights or similar rights that are mentioned, used or cited are the property of their respective owners.</p>
              </div>
          </section>
          <Kiki></Kiki>
      </main>
    );
  }
}

export default App;
