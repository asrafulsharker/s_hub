import React ,{ useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import img1 from '../../logo.svg';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Data from '../../data';

const CardPage = () => {



    const [filter, setFilter] = useState('');


    const [noOfElement, setnoOfElement] = useState(4);
    const loadmore = () => {
        setnoOfElement(noOfElement + noOfElement);
    }
    let slice = Data.softwares.slice(0, noOfElement);



    const searchText = (event) => {
        setFilter(event.target.value);
    }

    let dataSearch = Data.softwares.filter(item => {
        return Object.keys(item).some(key =>
            item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
        )
    })




    return (
        <div>
            {/* <form className='home_search'>
          <label>
            <input type="text" 
            name="name" 
            className='' 
            value={filter} 
            onChange={searchText.bind(this)}
            />
          </label>
          <button type="" value="Search" className=''>Search</button>
        </form> */}
            {dataSearch.map((software) => (
                <Card key={software._id} sx={{ maxWidth: 345 }}>
                    
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={software.image}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        {software.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {software.discription}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
              ))
            }
        </div>

    );
}

export default CardPage;