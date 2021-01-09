/** Dependencies */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

/** Component Pages */
import { Login } from '../pages/Login';
import { Signup } from '../pages/Login';
import { Notifications } from '../pages/Notifications';
import { Messages } from '../pages/Messages';
import { Feed } from '../pages/Feed';
import { PostInfo } from '../pages/PostInfo';
import { Search } from '../pages/Search';
import { Organizations } from '../pages/Organizations';
import { CommunityInfo } from '../pages/CommunityInfo';
import { CourseInfo } from '../pages/CourseInfo';
import { StudyGroups } from '../pages/StudyGroups';
import { StudyGroupChat } from '../pages/StudyGroupChat';
import { Tutors } from '../pages/Tutors';
import { UserProfile } from '../pages/UserProfile';
import { Follows } from '../pages/Follows';

/** Helpers */
import PrivateRoute from '../auth/PrivateRoute';

function Routes() {
	return (
		<>
			<Switch>
				<PrivateRoute exact path="/notifications" component={Notifications} />
				<PrivateRoute exact path="/messages/:messageId" component={Messages} />
				<PrivateRoute exact path="/feed" component={Feed} />
				<PrivateRoute exact path="/post/:postId" component={PostInfo} />
				<PrivateRoute exact path="/search" component={Search} />
				<PrivateRoute exact path="/organizations" component={Organizations} />
				<PrivateRoute
					exact
					path="/organizations/communities/:communityId"
					component={CommunityInfo}
				/>
				<PrivateRoute
					exact
					path="/organizations/courses/:courseId/"
					component={CourseInfo}
				/>
				<PrivateRoute exact path="/study-groups" component={StudyGroups} />
				<PrivateRoute
					exact
					path="/study-groups/:studyGroupId"
					component={StudyGroupChat}
				/>
				<PrivateRoute exact path="/tutors" component={Tutors} />
				<PrivateRoute exact path="/users/:userId" component={UserProfile} />
				<PrivateRoute exact path="/follows" component={Follows} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={Signup} />
				<Redirect to="/login" />
			</Switch>
		</>
	);
}

export default Routes;
