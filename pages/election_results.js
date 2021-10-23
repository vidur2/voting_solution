import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Placeholder from 'react-bootstrap/Placeholder'
import Alert from 'react-bootstrap/Alert'
import ProgressBar from 'react-bootstrap/ProgressBar'

export default function ElectionResults(){
    return(
        <div className={styles.container}>
        <Head>
            <title>eVote</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
            <link rel="icon" href="/evote-favicon.svg" />
        </Head>

        <Navbar>
            <Container>
            <Navbar.Brand href="/">
            <img src="/evote-icon.svg" alt="Evote Logo" width="160px" height="160px"/>
            </Navbar.Brand>
            <Nav className="me-auto">
            <Navbar.Text style={{marginLeft:"20px", marginRight:"20px", marginTop:"10px", fontSize:20}}>
                <Nav.Link href="/">Home</Nav.Link>
            </Navbar.Text>
            <Navbar.Text style={{marginLeft:"20px", marginRight:"20px", marginTop:"10px", fontSize:20}}>
                <Nav.Link href="/election_results">Election Results</Nav.Link>
            </Navbar.Text>
            <Nav.Link href="/sign_in">
                <Button variant="success" style={{marginLeft:"20px", marginRight:"20px"}}><Navbar.Text style={{fontSize:20, marginLeft:"20px", marginRight:"20px", color:"#eaeaea"}}>Vote Now</Navbar.Text></Button>{' '}
            </Nav.Link>
            </Nav>
            </Container>
        </Navbar>
            <div>
            <h4>Candidate 1</h4>
            <ProgressBar variant="success" style={{height:"30px", width:"500px"}} now={40} />
            <br/>
            <h4>Candidate 2</h4>
            <ProgressBar variant="info" style={{height:"30px", width:"500px"}} now={20} />
            <br/>
            <h4>Candidate 3</h4>
            <ProgressBar variant="warning" style={{height:"30px", width:"500px"}} now={60} />
            </div>

            <br/>
            <br/>

        <footer className={styles.footer}>
            <a href="#" target="_blank" rel="noopener noreferrer">
            Copyright 2021 Evote <br />
            </a>
            {/* TODO I want to add the logo below the copyright but it's adding to the side*/}
            {/* <img src="evote-icon.svg" alt="Evote Logo" width="128px" height="128px" /> */}
        </footer>
        </div>
    )
}