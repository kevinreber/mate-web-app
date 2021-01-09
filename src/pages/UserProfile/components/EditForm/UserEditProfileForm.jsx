/** Dependencies */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

/** Components */
import SubmitButton from '../../../../components/SubmitButton/SubmitButton';

/** MUI */
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

/** Form to edit User's Profile.
 * UserProfile -> UserProfileBody -> UserEditProfileForm
 *
 * @param 	{string}	about				User's about.
 * @param 	{string}	achievements		String of user's achievements separated by commas.
 * @param 	{string}	societies			String of user's societies separated by commas.
 * @param	{function}	save				Saves changes made to User's Profile.
 * @param	{function}	deleteAccount		Deletes User's account.
 */
export function UserEditProfileForm({
	image = '',
	displayName = '',
	firstName = '',
	lastName = '',
	phoneNumber = '',
	about = '',
	achievements = '',
	societies = '',
	save,
	deleteAccount,
}) {
	const INITIAL_STATE = {
		image,
		displayName,
		firstName,
		lastName,
		phoneNumber,
		about,
		achievements,
		societies,
	};
	const [formData, setFormData] = useState(INITIAL_STATE);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((fData) => ({
			...fData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		// save(formData);
	};

	const deleteAccountPrompt = (e) => {
		e.preventDefault();
		deleteAccount();
	};

	return (
		<div className="User-Edit-Profile p-3">
			<h4>Edit Profile</h4>
			<form onSubmit={handleSubmit} className="container Edit-Profile-Form">
				<div className="form-group">
					<ButtonBase
						focusRipple
						// className={classes.image}
						// focusVisibleClassName={classes.focusVisible}
						// style={{
						// 	width: image.width,
						// }}
					>
						<Avatar src={formData.image} />
						{/* <span
						// className={classes.imageSrc}
						// style={{
						// 	backgroundImage: `url(${image.url})`,
						// }}
						/> */}
						{/* <span className={classes.imageBackdrop} /> */}
						{/* <span className={classes.imageButton}> */}
						<span>
							<Typography>X</Typography>
						</span>
					</ButtonBase>
				</div>
				<div className="form-group">
					<label className="float-left" htmlFor="displayName">
						Username
					</label>
					<input
						className="form-control mate-form-input"
						id="displayName"
						name="displayName"
						value={formData.displayName}
						type="text"
						maxLength="25"
						onChange={handleChange}
					/>
					<label className="float-left" htmlFor="phoneNumber">
						Phone
					</label>
					<input
						className="form-control mate-form-input"
						id="phoneNumber"
						name="phoneNumber"
						value={formData.phoneNumber}
						type="tel"
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<label className="float-left" htmlFor="firstName">
						First Name
					</label>
					<input
						className="form-control mate-form-input"
						id="firstName"
						name="firstName"
						value={formData.firstName}
						type="text"
						maxLength="25"
						onChange={handleChange}
					/>
					<label className="float-left" htmlFor="lastName">
						Last Name
					</label>
					<input
						className="form-control mate-form-input"
						id="lastName"
						name="lastName"
						value={formData.lastName}
						type="text"
						maxLength="25"
						onChange={handleChange}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="about" className="float-left">
						About
					</label>
					<textarea
						rows="3"
						id="about"
						className="form-control mate-form-input"
						onChange={handleChange}
						type="text"
						name="about"
						value={formData.about}
						maxLength="100"
					/>
					<small
						className={`char-count ${
							100 - formData.about.length <= 10 ? 'error-limit' : ''
						}`}>
						{100 - formData.about.length} characters remaining
					</small>
				</div>
				<div className="font-italic">
					{/* <CTAButton text="Save Changes" /> */}
					<SubmitButton
						text="Save Changes"
						reset={true}
						resetText={'Delete Account'}
						resetForm={deleteAccountPrompt}
						danger={true}
					/>
				</div>
			</form>
		</div>
	);
}

UserEditProfileForm.propTypes = {
	about: PropTypes.string,
	achievements: PropTypes.string,
	societies: PropTypes.string,
	save: PropTypes.func,
	deleteAccount: PropTypes.func,
};
