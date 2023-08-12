import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NewspaperIcon from '@mui/icons-material/Newspaper';
// import Button from '@mui/material/Button';
// import CachedIcon from '@mui/icons-material/Cached';
import axios from 'axios';
import DisplayCard from './DisplayCard';
import { Col, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { Switch, FormControlLabel } from '@mui/material';
import { useEffect } from 'react';

const Dashboard = () => {

    // dbaefe94344341b6b68c526c4070fe6f
    // https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=dbaefe94344341b6b68c526c4070fe6f
    // https://newsapi.org/v2/top-headlines?country=in&apiKey=dbaefe94344341b6b68c526c4070fe6f

    //https://newsapi.org/v2/top-headlines/sources?category=business&apiKey=dbaefe94344341b6b68c526c4070fe6f

    // https://newsapi.org/v2/top-headlines?${country}${category}apiKey=dbaefe94344341b6b68c526c4070fe6f

    const [country, setCountry] = useState('country=in&')
    const [searchText, setSearchText] = useState(``)
    const [category, setCategory] = useState('')
    const [news, setNews] = useState([])
    const [readlaterdb, setReadlaterdb] = useState([]);
    const [mode, setMode] = useState('black')
    // const categoryList = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']

    const [variantColorBus, setVariantColorBus] = useState('outline-primary')
    const [variantColorEnt, setVariantColorEnt] = useState('outline-primary')
    const [variantColorGen, setVariantColorGen] = useState('outline-primary')
    const [variantColorHea, setVariantColorHea] = useState('outline-primary')
    const [variantColorSci, setVariantColorSci] = useState('outline-primary')
    const [variantColorSpo, setVariantColorSpo] = useState('outline-primary')
    const [variantColorTec, setVariantColorTec] = useState('outline-primary')



    function switchMode(e) {
        // console.log(e.target.checked)
        if (!e.target.checked) {
            setMode('white')
        }
        else {
            setMode('black')
        }
    }

    useEffect(() => {
        // change background color with a random color
        document.body.style.background = mode;
    });

    const LoadNews = async () => {

        var url = `https://newsapi.org/v2/top-headlines?${country}${category}${searchText}apiKey=dbaefe94344341b6b68c526c4070fe6f`
        console.log(url);
        await axios.get(url)
            .then(response => {
                // console.log(response.data.articles);
                for (let i = 0; i < response.data.articles.length; i++) {
                    // console.log(response.data.articles[i]);
                    response.data.articles[i]['id'] = uuidv4()
                    // console.log(response.data.articles)
                }
                // console.log('hey')
                setNews(response.data.articles)
                // console.log(news)
            })
            .catch(error => console.log(error))


    }

    const readLater = (newCard) => {
        axios
            .post('http://localhost:3001/readLater', newCard, {
                headers: { 'Content-Type': 'application/json' },
            })
            .then(function (response) {
                if (response.status === 201) {
                    setReadlaterdb([...readlaterdb, response.data]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // const filterNews = (e) => {
    //     console.log(e)
    //     // setVariantColor('primary')
    // }

    return (

        <Container fluid>
            <Navbar bg="light" expand="lg">
                <Container fluid >
                    <Navbar.Brand>
                        <NewspaperIcon />
                    </Navbar.Brand>
                    <Navbar.Brand href="#">News API</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        {/* <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll > */}
                        <Nav className="justify-content-end" style={{ maxHeight: '100px' }} navbarScroll >
                            <Nav.Link>Home</Nav.Link>
                            <Nav.Link onClick={(e) => setCountry(`country=in&`)} >India</Nav.Link>
                            {/* <Nav.Link onClick={(e) => setCountry(``)} >Remove Country Filter</Nav.Link>
                            <Nav.Link onClick={(e) => setCategory(``)} >Trending</Nav.Link>
                            <Nav.Link onClick={(e) => setCategory(`category=business&`)} >Business</Nav.Link>
                            <Nav.Link onClick={(e) => setCategory(`category=entertainment&`)} >Entertainment</Nav.Link>
                            <Nav.Link onClick={(e) => setCategory(`category=general&`)} >General</Nav.Link>
                            <Nav.Link onClick={(e) => setCategory(`category=health&`)} >Health</Nav.Link>
                            <Nav.Link onClick={(e) => setCategory(`category=science&`)} >Science</Nav.Link>
                            <Nav.Link onClick={(e) => setCategory(`category=sports&`)} >Sports</Nav.Link>
                            <Nav.Link onClick={(e) => setCategory(`category=technology&`)} >Technology</Nav.Link> */}
                            <Nav.Link onClick={(e) => setCountry(``)} >Remove Country Filter</Nav.Link>
                            <Nav.Link onClick={(e) => setCategory(``)} >Remove Category Filter</Nav.Link>
                            <Form className="d-flex">
                                <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" onChange={(e) => setSearchText("q=" + e.target.value + "&")} />
                                <Button variant="success" >Search</Button>
                            </Form>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <FormControlLabel
                value="start"
                control={
                    <Switch

                        defaultChecked
                        onChange={switchMode}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                }
                label="Dark Mode"
                labelPlacement="start"
            />
            <br />
            <Button variant="outline-primary" onClick={LoadNews} >
                Load
            </Button>
            <br />
            <br />

            <br />

            <Button className='me-2' variant={variantColorBus} onClick={() => {
                setCategory(`category=business&`)
                LoadNews()
                setVariantColorBus('primary')
                setVariantColorEnt('outline-primary')
                setVariantColorGen('outline-primary')
                setVariantColorHea('outline-primary')
                setVariantColorSci('outline-primary')
                setVariantColorSpo('outline-primary')
                setVariantColorTec('outline-primary')
            }} >Business</Button>

            <Button variant={variantColorEnt} onClick={() => {
                setCategory(`category=entertainment&`)
                setVariantColorEnt('primary')
                setVariantColorBus('outline-primary')
                setVariantColorGen('outline-primary')
                setVariantColorHea('outline-primary')
                setVariantColorSci('outline-primary')
                setVariantColorSpo('outline-primary')
                setVariantColorTec('outline-primary')
                LoadNews()
            }} >Entertainment</Button>

            <Button variant={variantColorGen} onClick={() => {
                setCategory(`category=general&`)
                setVariantColorGen('primary')
                setVariantColorBus('outline-primary')
                setVariantColorEnt('outline-primary')
                setVariantColorHea('outline-primary')
                setVariantColorSci('outline-primary')
                setVariantColorSpo('outline-primary')
                setVariantColorTec('outline-primary')
                LoadNews()
            }} >General</Button>

            <Button variant={variantColorHea} onClick={() => {
                setCategory(`category=health&`)
                setVariantColorHea('primary')
                setVariantColorBus('outline-primary')
                setVariantColorEnt('outline-primary')
                setVariantColorGen('outline-primary')
                setVariantColorSci('outline-primary')
                setVariantColorSpo('outline-primary')
                setVariantColorTec('outline-primary')
                LoadNews()
            }} >Health</Button>

            <Button variant={variantColorSci} onClick={() => {
                setCategory(`category=science&`)
                setVariantColorSci('primary')
                setVariantColorBus('outline-primary')
                setVariantColorEnt('outline-primary')
                setVariantColorGen('outline-primary')
                setVariantColorHea('outline-primary')
                setVariantColorSpo('outline-primary')
                setVariantColorTec('outline-primary')
                LoadNews()
            }} >Science</Button>

            <Button variant={variantColorSpo} onClick={() => {
                setCategory(`category=sports&`)
                setVariantColorSpo('primary')
                setVariantColorBus('outline-primary')
                setVariantColorEnt('outline-primary')
                setVariantColorGen('outline-primary')
                setVariantColorHea('outline-primary')
                setVariantColorSci('outline-primary')
                setVariantColorTec('outline-primary')
                LoadNews()
            }}>Sports</Button>

            <Button variant={variantColorTec} onClick={() => {
                setCategory(`category=technology&`)
                setVariantColorTec('primary')
                setVariantColorBus('outline-primary')
                setVariantColorEnt('outline-primary')
                setVariantColorGen('outline-primary')
                setVariantColorHea('outline-primary')
                setVariantColorSci('outline-primary')
                setVariantColorSpo('outline-primary')
                LoadNews()
            }}>Technology</Button>

            <Container fluid>
                <Row>

                    {news.map((news, i) => (
                        <Col style={{ margin: '10px' }} key={i} >
                            <DisplayCard
                                key={news.id}
                                id={news.id}
                                author={news.source.name}
                                title={news.title}
                                url={news.url}
                                urlToImage={news.urlToImage}
                                description={news.description}
                                date={news.publishedAt}
                                readLater={readLater}
                            // id={news.url}

                            />
                        </Col>
                    ))}


                </Row>
            </Container>
        </Container>
    )
}

export default Dashboard