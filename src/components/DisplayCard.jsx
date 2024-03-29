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
import { v4 as uuidv4 } from 'uuid';
import NoImage from '../images/IfImageUrlIsNull.png'

const DisplayCard = (p) => {

    // console.log(p);   
    // const [clicked, setClicked] = useState(false)
    // console.log(clicked);
    // const favFn = (e) => {
    //     console.log(Object.values(e.target.id));

    // }

    const saveNews = () => {
        const newCard = {
            id: uuidv4(),
            title: p.title,
            author: p.author,
            image: p.urlToImage,
            description: p.description,
            url: p.url,
        }
        p.readLater(newCard);
    };


    return (
        <div>
            <Row>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        title={p.author}
                        subheader={p.publishedAt}
                    />
                    {/* to render default image if image is not present  */}
                    {
                        (p.urlToImage === null) ? <CardMedia component="img" height="194" width="90" image={NoImage} alt={p.title} /> : <CardMedia component="img" height="194" width="90" image={p.urlToImage} alt={p.title} />

                    }

                    <CardContent>
                        <Typography className='module limitedtext' variant="body2" color="text.secondary">
                            {p.title}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        {/* <Checkbox icon={<FavoriteBorder />} id={p.id} checkedIcon={<Favorite />} /> */}
                        <Button onClick={saveNews} id={p.id}
                        >Add to Fav</Button>
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