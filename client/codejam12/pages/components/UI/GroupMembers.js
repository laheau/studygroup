import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Groups, Person2 } from '@mui/icons-material';
import { TextField } from '@mui/material';

const drawerWidth = 240;

const mockMessages = [
    {
        "author": "Aymen Ouali",
        "message": "Hi everyone!"
    },
    {
        "author": "Jun Kai Liao",
        "message": "Bye."
    },
]

function GroupMembers(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [messages, setMessages] = React.useState(mockMessages)
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleKeyPress = (e) => {
        if (e.keyCode === 13 && e.target.value) setMessages(prev => prev = [...prev, {message: e.target.value, author: "Aymen Ouali"}]);
    }

    const drawer = (
        <div className='bg-["#66b2ff"]'>
            <Toolbar />
            <Divider />
            <List>
                {['Members', 'Aymen Ouali', 'Jun Kai Liao', 'Mr Trottier'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index == 0 ? <Groups /> : <Person2 />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <div className='my-8 mx-5 overflow-y-scroll max-h-screen'>
                {messages.map((text, index) => (
                    <div key={index} className='flex flex-row my-3 test-left'>
                        <h1 className='overflow-hidden'><b>{text.author}:</b> {text.message}</h1>
                    </div>
                ))}
            </div>
            <div>
                <TextField onKeyDown={handleKeyPress} />
            </div>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ backgroundColor: "#66b2ff", overflow: 'hidden' }}>
            <CssBaseline />

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

GroupMembers.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default GroupMembers;
