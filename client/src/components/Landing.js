import React from 'react';
import '../styles/Landing.css';

import { Link } from 'react-router-dom';

import StripeImg from '../assets/black-friday-buy-computer-34577.jpg';
import AwsImg from '../assets/adult-art-artist-297648.jpg';
import MongoImg from '../assets/bandwidth-close-up-computer-1148820.jpg';

const Landing = () => {
    return (
        <body id='Landing'>
            <header id='header' className='grid'>
                <div className='bg-image'>
                    <div className='content-wrap'>
                        <h1>Welcome to PicChat</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel praesentium dicta blanditiis ipsam iusto
                        dolore totam. Eaque deleniti repellat ratione?</p>
                        <Link to='/Login' className='btn'>Login</Link>
                        <Link to='/Register' className='btn'>Register</Link>
                    </div>
                </div>
            </header>
            <main id='main'>
                <section id='section-1' class='grid'>
                    <div className='content-wrap'>
                        <h2 className='content-title'>Web & Application Development</h2>
                        <div className='content-text'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis obcaecati esse architecto facilis rem
                            quam quos repellat ea, voluptates vitae vero eligendi nam eius eaque officiis ab ullam asperiores
                            qui, suscipit voluptatem placeat numquam perspiciatis ex. Quae quis excepturi voluptate.</p>
                        </div>
                    </div>
                </section>
                <section id='section-2' class='grid'>
                    <ul>
                        <li>
                            <div className='card'>
                                <img src={StripeImg} alt="Background" />
                                <div className='card-content'>
                                    <h3 className='card-title'>Stripe</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum facere excepturi tenetur
                                        officia ab adipisci harum error incidunt maxime! Rerum!</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className='card'>
                                <img src={AwsImg} alt="Background" />
                                <div className='card-content'>
                                    <h3 className='card-title'>AWS</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum facere excepturi tenetur
                                        officia ab adipisci harum error incidunt maxime! Rerum!</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className='card'>
                                <img src={MongoImg} alt="Background" />
                                <div className='card-content'>
                                    <h3 className='card-title'>MongoDB</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum facere excepturi tenetur
                                        officia ab adipisci harum error incidunt maxime! Rerum!</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </section>
                <section id='selection-3' class='grid'>
                    <div className='content-wrap'>
                        <h2 className='content-title'>We handle all of your Digital Needs</h2>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt, autem aliquid cum sed delectus
                            explicabo reiciendis magni laborum aperiam officiis.</p>
                    </div>
                </section>
                <section id='section-4' class='grid'>
                    <div className='box'>
                        <h2 className='content-title'>Contact Me</h2>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo reprehenderit quos sunt laboriosam
                            optio impedit minima animi saepe hic unde?</p>
                        <p>devethancraig@gmail.com</p>
                    </div>
                    <div className='box'>
                        <h2 className='content-title'>About Me</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, inventore repudiandae? Maxime
                            qui dolorum excepturi officiis mollitia corporis neque quisquam sequi sit, inventore, quibusdam
                            magnam iste consequatur libero, repellendus eligendi.</p>
                    </div>
                </section>
            </main>
            <footer id='main-footer' className='grid'>
                <div>PicChat</div>
                <a href='https://www.linkedin.com/in/ethan-craig-93000015a/' target='blank'><div>Project by E.T. Craig</div></a>
            </footer>
        </body>
    );
}

export default Landing;