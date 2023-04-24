import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Data from '../../data';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import './home.css';
import Modal from '@mui/material/Modal';



// modal 
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));




const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {


  // left bar 
  const [state, setState] = React.useState({
    left: false,

  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );







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
    return (
      Object.keys(item).some(key =>
        item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
      )

    )

  })


  let sw = dataSearch;
  console.log(Data.softwares.name)

  // const description = document.getElementById('description').textContent.split(' ');
  // if (description.length > 10) {
  //   description.textContent = description.slice(0, 10).join(' ') + '...';
  // }

  // const truncatedDescription = description.split(' ').slice(0, 10).join(' ') + '...';

  const [visibleCards, setVisibleCards] = useState(6);


  const loadMore = () => {
    setVisibleCards(visibleCards + 6);
    // Increase the visibleCards count by 6 when the user clicks "Load More"
  };



  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <div>
              {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                  <MenuIcon onClick={toggleDrawer(anchor, true)}>{anchor}</MenuIcon>
                  <SwipeableDrawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                    onOpen={toggleDrawer(anchor, true)}
                  >
                    {list(anchor)}
                  </SwipeableDrawer>
                </React.Fragment>
              ))}
            </div>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            HUBSBD
          </Typography>
          <Search>
            <SearchIconWrapper >
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={filter}
              onChange={searchText.bind(this)}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <div className='cotainer_box'>


        <Container className='card_box' maxWidth="lg">
          {/* <Card/>
       */}
          {dataSearch.slice(0, visibleCards).map((software) => (


            <Card className='card_item' key={software._id} sx={{ maxWidth: 345 }}>

              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={software.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {software.name.length > 2 ? software.name.split(' ').slice(0, 2).join(' ') + ' ' : software.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" >


                  {/* {software.discription ? software.discription : `${words.slice(0, 10).join(' ')}...`} */}

                  {software.discription.length > 15 ? software.discription.split(' ').slice(0, 15).join(' ') + '...' : software.discription}
                </Typography>



                <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            
            <div className="modal_style">
              
              <div className="modal_main">
                <p className="modal_title">
                {software.name}
                </p>
                <div className="modal_part">
                  <div className="modal_st">

                  </div>
                  <div className="modal_nd">

                  </div>
                </div>
              </div>
            </div>
          </Modal>

              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small" onClick={handleOpen}>Learn More</Button>
              </CardActions>



              
            </Card>



          ))
          }



          {/* modal  */}
          




        </Container>
        {visibleCards < dataSearch.length && (
          <Button onClick={loadMore} className='home_load_button' variant="outlined">Load More</Button>

        )}

      </div>
    </Box>
  );
}