import React from 'react';

/** Displays Details */
function CourseDetails({ course }) {
	return (
		<>
			<table className='CourseDetailsTable'>
				<tbody>
					<tr>
						<th>Instructor:</th>
						<td>John DeNero</td>
					</tr>
					<tr>
						<th>Students:</th>
						<td>800</td>
					</tr>
					<tr>
						<th scope='row'>Lecture:</th>
						<td>
							M, T, W, Th
							<br />
							@10am-11am
						</td>
					</tr>
					<tr>
						<th scope='row'>Lab:</th>
						<td>
							Fridays <br />
							@12pm-1pm
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}

export default CourseDetails;