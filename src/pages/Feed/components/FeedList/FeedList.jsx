/** Dependencies */
import React from 'react';
import { PropTypes } from 'prop-types';

/** Components & Helpers */
import PostCard from '../PostCard/PostCard';

/** FeedList of Posts.
 *  Feed -> FeedList -> PostCard
 *
 * @param {array} 		posts	Array of objects containing data for each post.
 * @param {function} 	remove	Function to remove post. User will only see if they made post.
 * @param {function} 	edit	Function to edit post. User will only see if they made post.
 */
function FeedList({ posts, remove, edit }) {
	const List = posts.map((post) => (
		<PostCard
			id={post.id}
			key={post.id}
			title={post.title}
			type={post.type}
			username={post.user.name}
			userId={post.user.id}
			avatar={post.user.photo_url}
			description={post.description}
			location={post.location}
			start={post.start}
			end={post.end}
			// attachment_preview={post.media[0]['url']}
			attachment={post.media[0] || post.media}
			// attachment_name={post.data.attachment_name}
			timestamp={post.created}
			// last_updated={post.data.last_updated}
			// comments={post.data.num_of_comments}
			// isBookmarked={false}
			remove={remove}
			edit={edit}
		/>
	));

	return <>{List}</>;
}

FeedList.propTypes = {
	posts: PropTypes.array,
	remove: PropTypes.func,
	edit: PropTypes.func,
};

export default FeedList;

// created: "4 weeks ago"
// description: "hfhggh"
// end: null
// id: "8b20a768-bd26-4cd0-a39a-70c5dfe7cfd3"
// location: "ytthfg"
// media: Array(1)
// 0: {url: "https://api.mateapp.us/storage/46/conversions/8b20…-4cd0-a39a-70c5dfe7cfd35fc3a3886ef6c-feed_640.jpg"}
// length: 1
// __proto__: Array(0)
// start: null
// title: "ygg"
// type: "Marketplace"
// user:
// id: "e1b36a1a-6997-4a90-8205-cc016912fc76"
// name: "MD.TAWSIF-UL- KARIM"
// photo_url:
