/** Dependencies */
import React, { useState } from 'react';
import Logo from '../../../images/logo/mate-logo.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../store/actions/auth';

/** Components */
import NotificationIcon from '../../NotificationIcon/NotificationIcon';

/** Material UI */
import {
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Avatar,
	AppBar,
	Toolbar,
} from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonIcon from '@material-ui/icons/Person';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
// import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';

/** Stylesheets */
import './Header.css';

/** Styles for SideBar Drawer */
const useStyles = makeStyles({
	list: {
		width: 250,
	},
});

function Header({ currentUser, logOutUser }) {
	console.log(currentUser);
	/** Initialize useStyles */
	const classes = useStyles();
	const [drawer, setDrawer] = useState(false);

	/** Toggles SideBar Drawer */
	const toggleDrawer = (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}
		setDrawer((state) => !state);
	};

	/** SideBar Drawer
	 * must leave 'anchor' or else SideBar breaks
	 */
	const SideBar = (anchor) => (
		<div
			className={classes.list}
			role="presentation"
			onClick={toggleDrawer}
			onKeyDown={toggleDrawer}>
			<List>
				<ListItem>
					<ListItemIcon>
						<Avatar
							alt={currentUser.display_name}
							src={currentUser.photo_url}
						/>
					</ListItemIcon>
					<ListItemText primary={currentUser.display_name} />
				</ListItem>
			</List>
			<List>
				<ListItem>
					<Link to="/following">
						<ListItemIcon>
							<GroupAddIcon />
						</ListItemIcon>
						<ListItemText primary="Following" />
					</Link>
				</ListItem>
				<ListItem>
					<Link to={`/users/${currentUser.id}`}>
						<ListItemIcon>
							<PersonIcon />
						</ListItemIcon>
						<ListItemText primary="Profile" />
					</Link>
				</ListItem>
				<ListItem>
					<Link to="#">
						<ListItemIcon>
							<BookmarkIcon />
						</ListItemIcon>
						<ListItemText primary="Bookmarks" />
					</Link>
				</ListItem>
			</List>
			<List>
				<ListItem>
					<ListItemIcon>
						<ExitToAppOutlinedIcon />
					</ListItemIcon>
					<ListItemText onClick={logOutUser} primary={'Logout'} />
				</ListItem>
			</List>
		</div>
	);

	return (
		<div className="Header hide-md">
			<AppBar position="static" className="Header-Content">
				<Toolbar>
					<IconButton onClick={toggleDrawer}>
						<Avatar
							alt={currentUser.display_name}
							src={currentUser.photo_url}
						/>
					</IconButton>
					<Drawer anchor={'left'} open={drawer} onClose={toggleDrawer}>
						{SideBar('left')}
					</Drawer>
					<div className="Header-Logo">
						<img src={Logo} alt="Mate" />
					</div>
					<NotificationIcon />
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Header;
