import React from 'react';
import '../styles/Landing.css';

import { Link } from 'react-router-dom';

import StripeImg from '../assets/black-friday-buy-computer-34577.jpg';
import AwsImg from '../assets/adult-art-artist-297648.jpg';
import MongoImg from '../assets/bandwidth-close-up-computer-1148820.jpg';

const Landing = () => {
    return (
        <div id='Landing'>
            <header id='header' className='landing-grid'>
                <div className='bg-image'>
                    <div className='content-wrap'>
                        <h1>Welcome to PicChat</h1>
                        <p>Join an ever growing community and subscribe to the creators who's content you enjoy!</p>
                        <Link to='/Login' className='btn'>Login</Link>
                        <Link to='/Register' className='btn'>Register</Link>
                    </div>
                </div>
            </header>
            <main id='main'>
                <section id='section-1' className='landing-grid'>
                    <div className='content-wrap'>
                        <h2 className='content-title'>Web & Application Development</h2>
                        <div className='content-text'>
                            <p>PicChat is a full stack application built using the MERN stack ( Mongo - Express - React - NodeJS ). It allows users to create a secure personal account with JWT which will be given a unique customer and plan ID via the Stripe API. They cna then create their own posts using MongoDB and AWS and view, like, save, and comment the posts of others. Using Stripe users can maintain multiple payment options and use them to subscribe to other users allowing them to view those users posts in their feed. They can also edit the details of their account and their personal library of saved posts.</p>
                        </div>
                    </div>
                </section>
                <section id='section-2' className='landing-grid'>
                    <ul>
                        <li>
                            <div className='card'>
                                <img src={StripeImg} alt="Background" />
                                <div className='card-content'>
                                    <h3 className='card-title'>Stripe</h3>
                                    <p>Stripes software allows individuals and businesses to receive payments over the Internet. Stripe provides the technical, fraud prevention, and banking infrastructure</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className='card'>
                                <img src={AwsImg} alt="Background" />
                                <div className='card-content'>
                                    <h3 className='card-title'>AWS</h3>
                                    <p>Amazon Web Services is a subsidiary of Amazon that provides on-demand cloud computing platforms to individuals, companies and governments, on a metered pay-as-you-go basis.</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className='card'>
                                <img src={MongoImg} alt="Background" />
                                <div className='card-content'>
                                    <h3 className='card-title'>MongoDB</h3>
                                    <p>MongoDB is a cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schemata.</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </section>
                <section id='selection-3' className='landing-grid'>
                    <div className='content-wrap'>
                        <h2 className='content-title'>Always Learning and Changing</h2>
                        <p>This application is still being built up, styled, and improved. So any bugs, issues with the responsiveness, or of the like please feel free to let me know.</p>
                    </div>
                </section>
                <section id='section-4' className='landing-grid'>
                    <div className='box'>
                        <h2 className='content-title'>Contact Me</h2>
                        <p>I'm always looking for new opportunities to learn and grow as both a developer and as an individual.</p>
                        <p>devethancraig@gmail.com</p>
                    </div>
                    <div className='box'>
                        <h2 className='content-title'>About Me</h2>
                        <p>I've been growing in the field of software development over the past two years. With two online certifications and having graduated from DevMountain Provo, I'm currently contracting for a StartUp Company in Orem Utah and searching for the right company to join and contribute my skills to.</p>
                    </div>
                </section>
            </main>
            <footer id='main-footer' className='landing-grid'>
                <div>PicChat</div>
                <a href='https://www.linkedin.com/in/ethan-craig-93000015a/' target='blank'><div>Project by E.T. Craig</div></a>
            </footer>
        </div>
    );
}

export default Landing;