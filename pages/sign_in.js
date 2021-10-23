import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import HeroSection from '../Components/herosection.js'

export default function LoginPage(){
    const informationHandoff = async(event) => {
        event.preventDefault();
        const ssn = event.target[0].value
        const firstname = event.target[1].value
        const lastname = event.target[2].value
        const birthday = event.target[3].value
        const street_address = event.target[4].value
        const zip_code = parseInt(event.target[5].value);
        const state = event.target[6].value
        const resp = await fetch("/api/auth/sign_in", {
            method: "POST",
            body: JSON.stringify({
                ssn: ssn,
                type: "login",
                firstname: firstname,
                lastname: lastname,
                birthday: birthday,
                street_address: street_address,
                zip_code: zip_code,
                state: state
            })
        })
        console.log("Testing")
        console.log(await resp.text())
        //const resp_info = await resp.json()
        if (resp.status == 200){
            const form = document.getElementById("form_data");
            form.innerHTML = "";
            const keys = resp_info.keyStore;
            const resp = await fetch ("/api/auth/sign_in", {
                method: "POST",
                body: JSON.stringify({
                    type: "vote",
                    candidate: "test",
                    person: ssn,
                    keyStore: keys
                })
            })
        }else {
            
        }
    }
    return(
        <div className={styles.container}>
            <Head>
                <title>Verify Your Information</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
                <link rel="icon" href="/evote-favicon.svg" />
            </Head>
        <main className = {styles.main}>
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

            <br/>
            <h1 className="text-center">Enter Your Credentials</h1>
            <br/>
            <br/>

            <div className="text-center">
            <form onSubmit={informationHandoff} id="form_data">

            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Social Security Number</InputGroup.Text>
                <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
            <br/>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">First Name</InputGroup.Text>
                <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
            <br/>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Last Name</InputGroup.Text>
                <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
            <br/>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Date of Birth (mm/dd/yyyy)</InputGroup.Text>
                <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
            <br/>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Street Address</InputGroup.Text>
                <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
            <br/>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Zip Code</InputGroup.Text>
                <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
            <br/>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">State</InputGroup.Text>
                <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
            <br/>
                <Button variant="success" type="submit">Submit</Button>{' '}
            </form>
            </div>
        </main>
      </div>
    )
}