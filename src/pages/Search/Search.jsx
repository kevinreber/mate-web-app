/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

/** Components & Helpers */
import { FeedList } from '../Feed/components/List';
import NoData from '../../components/NoData/NoData';
import CTAButton from '../../components/CTAButton/CTAButton';
import Searchbar from '../../components/SearchBar/Searchbar';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import Loader from '../../components/layout/Loader/Loader';
import { deletePostFromFB, editPostInFB } from '../../store/actions/posts';
import { addFlashMessage } from '../../store/actions/flashMessages';
import { SearchCategories, postTypeOptions } from './constants/index';
import { API } from './api/api';
import db from '../../config/fbConfig';
import './Search.css';

/** MUI */
import { List, ListItem, ListItemText } from '@material-ui/core';

export function Search() {
	const dispatch = useDispatch();
	const [quickSearch, setQuickSearch] = useState('Today');
	const toggleQuickSearch = (e) => {
		setSearch('');
		setFilteredPosts([]);
		setQuickSearch(e.target.innerText);
		setIsLoading(true);
	};

	const [search, setSearch] = useState('');
	const [startSearch, setStartSearch] = useState(false);
	const [errors, setErrors] = useState('');

	const [allPosts, setAllPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: '',
		subtitle: '',
	});

	useEffect(() => {
		// const nowDate = new Date();
		async function getData() {
			/** if quickSearch is set to 'Today'
			 * filter through each snapshot and compare timestamps to find posts that were posted
			 * within 24 hrs
			 * 86400000 = 24 hrs in milliseconds
			 */
			// if (quickSearch === 'Today') {
			// 	db.collection('feeds')
			// 		.get()
			// 		.then((data) => {
			// 			data.docs.forEach((doc) => {
			// 				if (doc.data().timestamp) {
			// 					const postDate = doc.data().timestamp.toDate().getTime();
			// 					if (nowDate - postDate < 86400000) {
			// 						setPosts((posts) => [
			// 							...posts,
			// 							{ id: doc.id, data: doc.data() },
			// 						]);
			// 					}
			// 				}
			// 			});
			// 		})
			// 		.catch((err) => console.log(err));
			// } else {
			// 	db.collection('feeds')
			// 		.where('type', '==', quickSearch)
			// 		.get()
			// 		.then((data) => {
			// 			setPosts(
			// 				data.docs.map((doc) => ({
			// 					id: doc.id,
			// 					data: doc.data(),
			// 				}))
			// 			);
			// 		})
			// 		.catch((err) => console.log(err));
			// }
			if (quickSearch === 'Today') {
				await API.getFeed()
					.then((data) => setAllPosts(data.feeds))
					.catch((err) => console.error(err))
					.finally(() => setIsLoading(false));
			} else {
				// filters posts by quick search
				const filter = allPosts.filter(
					(post) => post.type.toLowerCase() === quickSearch.toLowerCase()
				);
				setFilteredPosts(filter);
				setIsLoading(false);
			}
		}
		if (isLoading && !startSearch) {
			getData();
		}
	}, [quickSearch, isLoading, startSearch, allPosts]);

	useEffect(() => {
		// if user uses search bar, filter out posts that match search keywords
		const searchForPosts = () => {
			console.log(search);
			// db.collection('feeds')
			// 	.get()
			// 	.then((data) => {
			// 		data.docs.forEach((doc) => {
			// 			if (doc.data().description.includes(search)) {
			// 				setPosts((posts) => [...posts, { id: doc.id, data: doc.data() }]);
			// 			}
			// 		});
			// 	})
			// 	.catch((err) => console.log(err));
			const filteredPosts = allPosts.filter(
				(p) => p.title.includes(search) || p.description.includes(search)
			);
			setFilteredPosts(filteredPosts);

			// setIsLoading(false);
			setStartSearch(false);
		};

		// if (isLoading && startSearch) {
		if (startSearch) {
			searchForPosts();
		}
	}, [startSearch, search, allPosts]);

	const setFlashMessage = (message, type = 'success') => {
		dispatch(
			addFlashMessage({
				isOpen: true,
				message,
				type,
			})
		);
	};

	/** Prompts Confirmation Dialog to Delete Post*/
	const deletePostPrompt = (id) => {
		setConfirmDialog({
			isOpen: true,
			title: 'Are you sure you want to remove this post?',
			subtitle: "You can't undo this operation",
			onConfirm: () => {
				deletePost(id);
			},
		});
	};

	/** Delete Post */
	const deletePost = (id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		dispatch(deletePostFromFB(id));
		setFlashMessage('Removed Post', 'error');
	};

	/** Prompts Modal to edit Post information */
	const editPost = (id, data) => {
		dispatch(editPostInFB(id, data));
		setFlashMessage('Update Successful!');
		// get most recent posts
		setIsLoading(true);
	};

	const validSearch = () => {
		if (search === '' || search.trim() === '') {
			setErrors('Search required*');
			return false;
		}
		return true;
	};

	const handleSubmit = () => {
		setErrors('');
		if (validSearch()) {
			setFilteredPosts([]);
			setQuickSearch('');
			// setIsLoading(true);
			setStartSearch(true);
		}
	};

	/** Quick Search Category List */
	const SearchCategoryList = SearchCategories.map((category, index) => (
		<ListItem
			key={category.toLowerCase()}
			button
			id={category.toLowerCase()}
			onClick={toggleQuickSearch}
			className={quickSearch === category ? 'active' : 'inactive'}>
			<ListItemText primary={category} />
		</ListItem>
	));

	const SearchBody =
		allPosts.length === 0 && !isLoading ? (
			<NoData text={'posts'} />
		) : (
			<FeedList
				posts={quickSearch === 'Today' ? allPosts : filteredPosts}
				remove={deletePostPrompt}
				edit={editPost}
			/>
		);

	return (
		<div className="Search">
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
				type="error"
			/>
			<div className="Search-Header">
				<Searchbar value={search} setValue={setSearch} />
				<div className="Search-Categories">
					<List>{SearchCategoryList}</List>
				</div>
			</div>
			<div className="Search__List">
				{isLoading && allPosts.length === 0 ? <Loader /> : SearchBody}
			</div>
			<div
				onClick={handleSubmit}
				className={`Search__Footer ${
					search.length === 0 ? 'disabled-btn' : ''
				}`}>
				<CTAButton text="Search" />
				{errors !== '' ? <div className="alert errors">{errors}</div> : null}
			</div>
		</div>
	);
}
