/** Dependencies */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Components & Helpers */
import FeedList from './components/FeedList/FeedList';
import PostForm from './components/PostForm/PostForm';
import NoData from '../../components/NoData/NoData';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/layout/Loader/Loader';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import {
	addPostToFB,
	deletePostFromFB,
	editPostInFB,
} from '../../store/actions/posts';
import { addFlashMessage } from '../../store/actions/flashMessages';
import { API } from './api/api';
import { FB, MESSAGE, CONFIRM } from './constants/index';
import db from '../../config/fbConfig';
import './Feed.css';

/** MUI */
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

/** Feed displays a list of latest Posts
 *  Feed -> FeedList -> PostCard
 */
function Feed() {
	const dispatch = useDispatch();
	const [posts, setPosts] = useState([]);

	/** Get user data */
	const currentUser = useSelector((state) => state.auth.user);

	const [isLoading, setIsLoading] = useState(true);
	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: '',
		subtitle: '',
	});

	useEffect(() => {
		// get data from 'feed' collection
		const getData = async () => {
			await API.getFeed()
				.then((data) => setPosts(data.feeds))
				.catch((err) => 'Error:' + console.log(err))
				.finally(() =>
					// Loading finished
					setIsLoading(false)
				);
		};

		if (isLoading) {
			getData();
		}
	}, [isLoading]);

	// Toggle form for User to Add Course
	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	const setFlashMessage = useCallback(
		(message, type) => {
			dispatch(
				addFlashMessage({
					isOpen: true,
					message: message,
					type: type,
				})
			);
		},
		[dispatch]
	);

	const addPost = async (postData) => {
		console.log(postData);
		// dispatch(addPostToFB(postData));
		await API.postFeed(postData)
			.then((resp) => console.log(resp))
			.catch((err) => console.log(err))
			.finally(() => {
				setShowForm(false);
				setFlashMessage(MESSAGE.addPost, MESSAGE.success);

				// get most recent posts
				setIsLoading(true);
			});
	};

	/** Delete Post */
	const deletePost = useCallback(
		(id, image) => {
			setConfirmDialog({
				...confirmDialog,
				isOpen: false,
			});
			dispatch(deletePostFromFB(id, currentUser.uid, image));
			setFlashMessage(MESSAGE.deletePost, MESSAGE.error);

			// get most recent posts
			setIsLoading(true);
		},
		[setConfirmDialog, setFlashMessage, dispatch, confirmDialog, currentUser]
	);

	/** Prompts Confirmation Dialog to Delete Post*/
	const deletePostPrompt = useCallback(
		(id, image) => {
			setConfirmDialog({
				isOpen: true,
				title: CONFIRM.title,
				subtitle: CONFIRM.subtitle,
				onConfirm: () => {
					deletePost(id, image);
				},
			});
		},
		[deletePost]
	);

	/** Updates Post */
	const editPost = useCallback(
		(id, data) => {
			dispatch(editPostInFB(id, data));
			setFlashMessage(MESSAGE.updatePost, MESSAGE.success);

			// get most recent posts
			setIsLoading(true);
		},
		[dispatch, setFlashMessage]
	);

	if (showForm) {
		return (
			<Modal
				isOpen={showForm}
				content={<PostForm save={addPost} />}
				closeModal={toggleForm}
				full={true}
			/>
		);
	}

	return (
		<div className="Feed">
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
				type="error"
			/>
			<div className="Feed-Header Body-Header hide-sm">
				<h5>Feed</h5>
			</div>
			<div className="Feed__List">
				{isLoading ? <Loader /> : null}
				{posts.length === 0 && !isLoading ? (
					<NoData text="posts" />
				) : (
					<FeedList posts={posts} remove={deletePostPrompt} edit={editPost} />
				)}
			</div>
			<Fab id="Feed-Add-Post-Btn" aria-label="add">
				<AddIcon onClick={toggleForm} />
			</Fab>
		</div>
	);
}

export default Feed;
