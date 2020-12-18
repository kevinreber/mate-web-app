/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

/** Components & Helpers */
import CommunityInfoHeader from './components/CommunityInfoHeader/CommunityInfoHeader';
import BackButton from '../../components/BackButton/BackButton';
import CTAButton from '../../components/CTAButton/CTAButton';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/layout/Loader/Loader';
import { addFlashMessage } from '../../store/actions/flashMessages';
import db from '../../config/fbConfig';
import './CommunityInfo.css';

/** Displays Course Information such as assignments and discussion boards
 * Organizations -> CommunityList -> CommunityCard -> CommunityInfo
 */
function CommunityInfo() {
	const { communityId } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	const [community, setCommunity] = useState(null);

	// Toggle form for User to Add Course
	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	const currentUser = useSelector((state) => state.auth.user);

	// get course assignments
	useEffect(() => {
		if (community && isLoading) {
			setIsLoading(false);
		}
	}, [community, isLoading]);

	if (showForm) {
		return <Modal isOpen={showForm} content={null} closeModal={toggleForm} />;
	}

	const courseInfo =
		!isLoading && community ? (
			<div className="CourseInfo">
				<div className="CourseInfo__Header">
					<BackButton />
					<CommunityInfoHeader
						course={community}
						semester={community.semester}
						sections={community.sections}
						title={`${community.course.abbreviation} ${community.course.course_number}`}
						removeCourse={null}
					/>
				</div>
				<div className="CourseInfo__Body">
					{/* <CourseAssignmentList assignments={assignments} /> */}
				</div>
				<div className="AssignmentForm p-3">
					<div onClick={toggleForm} className="font-italic">
						<CTAButton text="Add Assignment" />
					</div>
				</div>
			</div>
		) : (
			<Loader />
		);

	return <>{courseInfo}</>;
}

export default CommunityInfo;
