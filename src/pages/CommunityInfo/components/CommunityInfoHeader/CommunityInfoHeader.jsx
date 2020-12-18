import React, { useState } from 'react';
import CommunityDetails from '../CommunityDetails/CommunityDetails';

/** Displays Header information of Community Info Page
 * Organizations -> CommunityList -> Community -> CommunityInfo -> CommunityInfoHeader
 */
function CommunityInfoHeader({
	course,
	semester,
	sections,
	title,
	removeCourse,
}) {
	const [showCourseDetails, setShowCourseDetails] = useState(false);

	const toggleShowCourseDetails = () => setShowCourseDetails((show) => !show);

	if (showCourseDetails) {
		return (
			<CommunityDetails
				course={course}
				title={title}
				show={showCourseDetails}
				toggle={toggleShowCourseDetails}
				removeCourse={removeCourse}
			/>
		);
	}

	return (
		<>
			<h5 className="CourseInfoTitle">{title}</h5>
			<p className="mate-text-secondary Course-Card-Term">{semester}</p>
			<i
				onClick={toggleShowCourseDetails}
				className="mate-more-info fas fa-info-circle"></i>
		</>
	);
}

export default CommunityInfoHeader;
