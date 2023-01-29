import React from 'react'
import './DisplayCard.css'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Row } from 'react-bootstrap';
const DisplayCard = (p) => {

    // console.log(p);   
    // const [clicked, setClicked] = useState(false)
    // console.log(clicked);
    const favFn = (e) => {
        console.log(Object.values(e.target.id));

    }

    return (
        <div>
            <Row>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader


                        title={p.author}
                        subheader={p.publishedAt}
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        width="90"
                        image={p.urlToImage}
                        alt={p.title}
                    />
                    <CardContent>
                        <Typography className='module limitedtext' variant="body2" color="text.secondary">
                            {p.title}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        {/* <Checkbox icon={<FavoriteBorder />} id={p.id} checkedIcon={<Favorite />} /> */}
                        <Button onClick={favFn} id={
                            {
                                'id': p.id,
                                'author': p.author,
                                'title': p.title,
                                'url': p.url,
                                'urlToImage': p.urlToImage,
                                'description': p.description,
                                'date': p.publishedAt
                            }



                        } >Add to Fav</Button>
                        <CardActions>
                            <Button size="small" href={p.url} target='_blank' >Read Now</Button>
                        </CardActions>


                    </CardActions>
                </Card>
            </Row>


        </div>
    )
}

export default DisplayCard