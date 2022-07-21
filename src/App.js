import './App.css';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import StorageIcon from '@mui/icons-material/Storage';
import MenuIcon from '@mui/icons-material/Menu';
function App() {

  const [allFiles , setState] = useState([]);
  const [parent , setParent] = useState("D://bluezorro_JAVA");
  const [state, setStates] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setStates({ ...state, [anchor]: open });
  };

  useEffect(() => {
    goClick(parent);
  },[]);


  const goClick = async event => {
      var link = "http://localhost:8080/dir?path="
      var path = event.replaceAll("\\" , "//")
      const response = await axios.get(link + path)
      setState(response.data, () => {})
      setParent(path, () => {} )
    
  }

  const Back = event =>{
    event.preventDefault();
      goClick(parent.split("//").slice(0,-1).join("//"))
      console.log(parent.split("//").slice(0,-1).join("//"))
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FolderIcon/>
              </ListItemIcon>
              <ListItemText primary="Upload file to D://bluezorro_JAVA" />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText primary="Add File to DB" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <StorageIcon color='error'/>
              </ListItemIcon>
              <ListItemText primary="Delete File from DB" />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  return (
    <form className="decor"> 
        <div>
              
          <Typography variant="h3" gutterBottom component="div">File explorer</Typography>
          <Typography variant="h5" gutterBottom component="div">Current Directory: {parent.split("//").join("....")}</Typography>
          <Button variant='outlined' sx={{color:"white",marginRight:"10px"}} startIcon={<MenuIcon/>} onClick={toggleDrawer('right', true)}>Menu</Button>
          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
            {list('right')}
          </Drawer>
          {parent !== "D://bluezorro_JAVA"  &&
            <Button variant="outlined" endIcon={<KeyboardReturnIcon/>} onClick={Back} sx={{ color:"white" }}>Back</Button>
          }
          {allFiles.map(item => {
            return(
              <Card sx={{ display: 'flex', margin: "auto" , marginTop:"10px", backgroundColor: "#252525" , color:"white" , width: "80%" , height: "50px"}} >
                  {item.includes(".")
                    ?<Button startIcon={<InsertDriveFileIcon sx={{marginRight : "30px"}}/>} sx={{ color:"#ececec" }}>{item.split("\\").pop()}</Button>
                    : <Button startIcon={<DriveFileMoveIcon sx={{marginRight : "30px"}}/>} onClick={() => goClick(item)} sx={{ color:"#ececec" }}>{item.split("\\").pop()}</Button>
                  }
              </Card>
            )
          })}
        </div>
    </form>
  );
}

export default App;
