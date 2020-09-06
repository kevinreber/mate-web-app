/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

/** Components & Helpers */
import FeedList from '../components/Feed/FeedList';
import PostForm from '../components/Feed/PostForm';
import NoData from '../components/general/NoData';
import Modal from '../components/general/Modal';
import { addPostToFB } from '../store/actions/posts';
import db from '../config/fbConfig';
import './styles/Feed.css';

/** MUI */
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

/** Feed displays a list of latest Posts
 *  Feed -> FeedList -> PostCard
 */
function Feed() {
	const dispatch = useDispatch();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		db.collection('feeds')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) =>
				setPosts(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				)
			);
	}, []);

	// Toggle form for User to Add Course
	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	const addPost = (postData) => {
		dispatch(addPostToFB(postData));
		setShowForm(false);
	};

	if (showForm) {
		return (
			<Modal
				content={<PostForm save={addPost} />}
				closeModal={toggleForm}
				full={true}
			/>
		);
	}

	return (
		<div className='Feed'>
			<div className='Feed__List'>
				{posts ? <FeedList posts={posts} /> : <NoData text='posts' />}
			</div>
			<Fab id='Feed-Add-Post-Btn' aria-label='add'>
				<AddIcon onClick={toggleForm} />
			</Fab>
		</div>
	);
}

export default Feed;
