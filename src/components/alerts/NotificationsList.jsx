import React, { useState } from 'react';
import NotificationCard from './NotificationCard';
import NoData from '../general/NoData';

function NotificationsList({ notifications }) {
	const List = notifications ? (
		notifications.map((notification) => (
			<NotificationCard notification={notification} />
		))
	) : (
		<NoData text='notifications' />
	);

	return <div>{List}</div>;
}

export default NotificationsList;