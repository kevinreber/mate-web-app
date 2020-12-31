/** Dependencies */
import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

/** Components & Helpers */
import PopoverShareAction from '../../../../components/PopoverShareAction/PopoverShareAction';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ShareIcon from '@material-ui/icons/Share';
import SendIcon from '@material-ui/icons/Send';

/** PostCardFooter
 *  Footer Actions of a Post Card Component
 *  Feed -> FeedList -> PostCard -> PostCardFooter
 *
 * @param {string}		id					Post's unique ID.
 * @param {number}		comments			Number of comments post has.
 * @param {boolean}		isBookmarked		Bookmark status of post.
 * @param {function}	toggleMessageForm
 * @param {function}	toggleSharePopover
 * @param {function}	shareId
 * @param {boolean}		open
 * @param {object}	    anchorEl
 * @param {function}	close
 * @param {function}	shareLink
 */
function PostCardFooter({
	id,
	comments = null,
	isBookmarked = false,
	toggleMessageForm,
	toggleSharePopover,
	shareId,
	open,
	anchorEl,
	close,
	shareLink,
}) {
	const BookmarkStatus = !isBookmarked ? (
		<BookmarkBorderOutlinedIcon />
	) : (
		<BookmarkIcon />
	);

	return (
		<>
			<IconButton>
				<Link to={`/post/${id}`}>
					<ModeCommentOutlinedIcon />
					{comments ? (
						<span className="number-of-comments">{comments}</span>
					) : null}
				</Link>
			</IconButton>
			<IconButton>
				<CalendarTodayOutlinedIcon />
			</IconButton>
			<IconButton>{BookmarkStatus}</IconButton>
			<IconButton onClick={toggleMessageForm}>
				<SendIcon />
			</IconButton>
			<IconButton onClick={toggleSharePopover}>
				<ShareIcon />
			</IconButton>
			<PopoverShareAction
				id={shareId}
				open={open}
				anchorEl={anchorEl}
				close={close}
				shareLink={shareLink}
			/>
		</>
	);
}

PostCardFooter.propTypes = {
	id: PropTypes.string.isRequired,
	comments: PropTypes.number,
	isBookmarked: PropTypes.bool,
	toggleMessageForm: PropTypes.func,
	toggleSharePopover: PropTypes.func,
	shareId: PropTypes.func,
	open: PropTypes.bool,
	anchorEl: PropTypes.object,
	close: PropTypes.func,
	shareLink: PropTypes.func,
};

export default PostCardFooter;
