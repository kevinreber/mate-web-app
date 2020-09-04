import React, { useState, useEffect } from 'react';
import FeedList from '../components/feed/FeedList';
import PostForm from '../components/feed/PostForm';
import NoData from '../components/general/NoData';
import Modal from '../components/general/Modal';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import db from '../config/fbConfig';
import './styles/Feed.css';

function Feed() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		db.collection('feeds').onSnapshot((snapshot) =>
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
		// dispatch(addCourseToFB(courseData));
		console.log(postData);
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
			<Fab aria-label='add'>
				<AddIcon onClick={toggleForm} />
			</Fab>
		</div>
	);
}

export default Feed;
