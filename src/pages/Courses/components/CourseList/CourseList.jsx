/** Dependencies */
import React from 'react';
import { PropTypes } from 'prop-types';

/** Components & Helpers */
import CourseCard from '../CourseCard/CourseCard';
import NoData from '../../../../components/NoData/NoData';
import capitalizeFirstLetter from '../../../../utils/capitalizeFirstLetter';

/** Creates a List of User's Courses
 * Courses -> CourseList -> CourseCard -> CourseInfo
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
						<CourseCard
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
			<NoData text={'courses'} />
		);

	return (
		<ul className="Course-List">
			<li className="Course-List__Type">{capitalizeFirstLetter(type)}</li>
			{List}
		</ul>
	);
}

CourseList.propTypes = {
	courses: PropTypes.array,
	type: PropTypes.string,
};

export default CourseList;
