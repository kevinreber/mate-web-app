/** Dependencies */
import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

/** Card displaying course information
 * Organizations -> CommunityList -> CommunityCard -> CommunityInfo
 */
function CommunityCard({ id, department, number, term, title }) {
	return (
		<div className="CourseCard">
			<Link
				to={`/organizations/communities/${id}`}
				className="mate-text-secondary table-hover">
				<div className="mate-table  Course Course-Card">
					<p className="mate-text-primary Course-Name">
						{`${department} ${number}`} <br />
						<span className="mate-text-secondary Course-Card-Term pt-1 pb-2">
							{term}
						</span>
					</p>
					<p className="pl-3 Course-Title mate-text-secondary">{title}</p>
				</div>
			</Link>
		</div>
	);
}

CommunityCard.propTypes = {
	id: PropTypes.string.isRequired,
	department: PropTypes.string.isRequired,
	number: PropTypes.string.isRequired,
	term: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default CommunityCard;
