import Head from 'next/head'
import styles from '../styles/HeroSection.css'
import { Layout, Menu, Breadcrumb } from 'antd';

import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'

function HeroSection(){
    return (

            <div className='hero-container'>
                <img src="/evote-icon.svg" alt="Evote Logo" width="128px" height="110px" />
                <h1>Voting Made Easy</h1>
                <div> className='hero-btns'
                    <Button 
                    className='btns' 
                    ButtonStyle='btn--outline'
                    buttonSize= 'btn--large'>
                        SIGN UP
                    </Button>

                </div>
            </div>
    )
}

export default HeroSection