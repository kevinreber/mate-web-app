/** Dependencies */
import React from 'react';
import { PropTypes } from 'prop-types';

/** Components & Helpers */
import CommunityCard from '../CommunityCard/CommunityCard';
import NoData from '../../../../components/NoData/NoData';

/** MUI */
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

/** Creates a List of User's Courses
 * Organizations -> CommunityList -> CommunityCard -> CommunityInfo
 *
 * @param {array}	 courses	 Array of objects containing course data.
 * @param {string}	 type		 String that is either 'current' or 'past'
 */
function CourseList({ courses = [], type }) {
	const List =
		courses.length !== 0 ? (
			courses.map((course) => (
				<>
					<li key={course.id}>
						<CommunityCard
							id={course.id}
							department={course.data.course.abbreviation}
							number={course.data.course.course_number}
							term={course.data.semester}
							title={course.data.course.title}
						/>
					</li>
				</>
			))
		) : (
			<NoData text={'communities'} />
		);

	return <ul className="Course-List">{List}</ul>;
}

CourseList.propTypes = {
	courses: PropTypes.array,
	type: PropTypes.string,
};

export default CourseList;
