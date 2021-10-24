import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Layout, Menu, Breadcrumb } from 'antd';

import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Placeholder from 'react-bootstrap/Placeholder'
import Alert from 'react-bootstrap/Alert'

function HeroSection(){
    return (

        <><div className={styles.hero_container}>

            {/* <img class= 'img' src="/herobkg1.svg" alt="Evote Logo" width="1000px" height="500px" /> */}

            <br />
            <br />
            <br />

            <h1 className={styles.sectional}>
                Voting With Transparency
            </h1>
        </div><br /><br />
        <div className={styles.monkey} >
                <Card className={styles.card1} bg="light" style={{ width: "30rem" }}>
                    <Card.Img variant="top" src="https://blogs.iadb.org/caribbean-dev-trends/wp-content/uploads/sites/34/2017/12/Blockchain1.jpg" />
                    <Card.Body>
                        <Card.Title>Secure Blockchain-Based Elections</Card.Title>
                        <Card.Text>
                            <ul>
                                <li>Fair Vote is a secure voting program which implements blockchain technology to provide transparent and decentralized elections.</li>
                                <li>The data we collect is duplicated and stored throughout the entire network, making it virtually impossible to alter, hack, or cheat the system.</li>
                            </ul>
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className={styles.card2} style={{ width: '30rem' }}>
                    <Card.Body>
                        <Card.Title>How It Works</Card.Title>
                        <Card.Text>
                            <ol>
                                <li>A vote is entered by a user on a secure domain</li>
                                <li>The vote is transmitted through the network and scattered throughout the world</li>
                                <li>The vote is then analized and checked for validity </li>
                                <li>Lastly the votes are clustered into “blocks” then permanently added to the blockchain</li>
                            </ol>
                        </Card.Text>
                    </Card.Body>
                    <Card.Img variant="top" src="https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F1063184564%2F0x0.jpg%3Ffit%3Dscale" />
                </Card>


            </div><br /><br /><br/><div className={styles.buttonfoot}>
            <h3 className={styles.sectional2}>
                What are you waiting for? Sign up to vote in way like never before. Our voting method allows your vote to be casted in the most secure way, that way no one, and nobody will be able to alter the outcome of the elction as well as see your vote. Moreover, all of your data will be kept secure, that way your life is your privacy. Now click Sign Up and Vote!
            </h3>
            
                <Button className={styles.button2}href="/sign_in" variant="outline-light" size="lg">
                    Sign Up
                </Button>
            </div><br /><br /></>
        
    )
}

export default HeroSection