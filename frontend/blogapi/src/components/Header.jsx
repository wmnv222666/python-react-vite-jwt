import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

function Header() {
	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				sx={{ borderBottom: '1px solid #ddd' }}
			>
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Typography variant="h6" color="inherit" noWrap>
						<Link component={NavLink} to="/" underline="none" color="textPrimary">
							Blog
						</Link>
					</Typography>
					<nav>
						<Link
							color="textPrimary"
							href="#"
							sx={{ margin: '0 8px' }}
							component={NavLink}
							to="/register"
						>
							Register
						</Link>
						<Button
							href="#"
							color="primary"
							variant="outlined"
							sx={{ margin: '0 8px' }}
							component={NavLink}
							to="/login"
						>
							Login
						</Button>
						<Button
							href="#"
							color="primary"
							variant="outlined"
							sx={{ margin: '0 8px' }}
							component={NavLink}
							to="/logout"
						>
							Logout
						</Button>
					</nav>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

export default Header;
