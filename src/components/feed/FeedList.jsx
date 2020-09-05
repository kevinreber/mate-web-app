import React from 'react';
import PostCard from './PostCard';

function feedList({ posts }) {
	const List = posts.map((post) => (
		<PostCard
			id={post.id}
			key={post.id}
			title={post.data.title}
			username={post.data.username}
			userId={post.data.userId}
			avatar={post.data.avatar}
			description={post.data.description}
			location={post.data.location}
			type={post.data.type}
			start={post.data.start}
			end={post.data.end}
			attachment_preview={post.data.attachment_preview}
			attachment={post.data.attachment}
			timestamp={post.data.timestamp}
			comments={[]}
			isBookmarked={false}
		/>
	));

	return <>{List}</>;
}

export default feedList;
