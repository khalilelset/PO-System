import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from '../assets/Logo.png';
import {jwtDecode} from "jwt-decode";
interface Props {
  window?: () => Window;
  role: 'Employee' | 'Authorizer' | 'Admin';
}

interface DecodedToken {
  sub: string;
  'cognito:groups': string[];
  iss: string;
  'cognito:username': string;
  origin_jti: string;
  aud: string;
  event_id: string;
  token_use: string;
  auth_time: number;
  name: string;
  exp: number;
  iat: number;
  jti: string;
  email: string;
}
const drawerWidth = 240;
const TitleBar: React.FC<Props> = ({ window, role }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate(); 
  const [decodedToken, setDecodedToken] = React.useState<DecodedToken | null>(null);
  
  const token: string | null = localStorage.getItem('idtoken');

  React.useEffect(() => {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
        setDecodedToken(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.log("No token found");
    }
  }, [token]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const getNavItems = (role: Props['role']) => {
    const handleLogout = () => {
      console.log("HandleLogout");
      localStorage.clear();
      navigate('/');
    };
    switch (role) {
      case 'Employee':
        return [
          { name: 'View Orders', path: '/EmployeeDashboard' },
          { name: 'Create Order', path: '/OrderForm' },
          { name: 'Logout', onclick: handleLogout,  },
        ];
      case 'Authorizer':
        return [{ name: 'Logout', onclick: handleLogout },
          {name: 'View Orders', path:'/'}
        ];
      case 'Admin':
        return [
          { name: 'View Orders', path: '/admin' },
          { name: 'View Users', path: '/admin/users' },
          { name: 'Logout', onclick: handleLogout },
        ];
      default:
        return [{ name: 'Logout', onclick: handleLogout }];
    }
  };

  const navItems = getNavItems(role);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ProOrderd
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            {item.onclick ? (
              <ListItemButton sx={{ textAlign: 'center' }} onClick={item.onclick}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            ) : (
              <ListItemButton sx={{ textAlign: 'center' }} component={Link} to={item.path}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: '#005858' }}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={logo}
            alt="Logo"
            style={{ width: '150px', height: 'auto' }}
          />
          <Box sx={{ display: { xs: 'none', sm: 'flex' ,alignItems:"center",justifyContent:"center"}, flexGrow: 1 }}>
            {navItems.map((item) =>
        item.onclick ? (
          <Button
            key={item.name}
            sx={{ color: '#fff', mx: 1 }}
            onClick={item.onclick} 
          >
            {item.name}
          </Button>
        ) : (
          <Button
            key={item.name}
            sx={{ color: '#fff', mx: 1,
               fontWeight: location.pathname === item.path ? '1000' : '100', // Bold when current path matches item's path
               textDecoration: location.pathname === item.path ? 'underline' : 'none', // Underline if the path matches
               //fontSize: location.pathname === item.path ? '18px' : 'none',
            }}
            component={Link}
            to={item.path} 
          >
            {item.name} 
          </Button>
        )
      )}
          </Box>
  {decodedToken && (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 2 }}>
<Typography variant="body1" sx={{ fontSize: '1rem', marginRight: 1, fontWeight: 'bold' }}>
{decodedToken["cognito:groups"].join(', ')}:
      </Typography>
      <Typography variant="body1" sx={{ fontSize: '1rem' }}>
        {decodedToken.name}
      </Typography>
      
    </Box>
          )}
        </Toolbar>
      </AppBar>
      <nav>
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
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default TitleBar;
