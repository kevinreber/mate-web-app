/** Dependencies */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from 'react-places-autocomplete';
import { postTypeOptions, INITIAL_STATE_IMAGE } from '../../constants/index';

/** Components && Helpers */
import SubmitButton from '../../../../components/SubmitButton/SubmitButton';
import ProgressBar from '../../../../components/ProgressBar/ProgressBar';
import fileIsImage from '../../../../utils/validateImage';
import { storage } from '../../../../config/fbConfig';

/** MUI */
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import PanoramaOutlinedIcon from '@material-ui/icons/PanoramaOutlined';
import CancelIcon from '@material-ui/icons/Cancel';

/** Form for user's to create a Post
 *  Feed -> PostForm
 */
export function PostForm({ save }) {
	/** Get user data */
	const user = useSelector((state) => {
		return {
			id: state.auth.user.uid,
			name: state.auth.user.displayName,
			photo_url: state.auth.user.photoURL,
		};
	});

	const INITIAL_STATE = {
		title: '',
		description: '',
		feed_type_id: '',
		start: null,
		end: null,
		media: [],
		user: {
			id: user.id,
			name: user.name,
			photo_url: user.photo_url,
		},
		// num_of_comments: 0,
	};

	const [errors, setErrors] = useState('');
	const [formData, setFormData] = useState(INITIAL_STATE);

	const [image, setImage] = useState(INITIAL_STATE_IMAGE);
	const [progressBar, setProgressBar] = useState(0);

	// location data
	const [address, setAddress] = useState('');
	// const [coordinates, setCoordinates] = useState({
	// 	lat: null,
	// 	lng: null,
	// });

	const handleSelect = async (value) => {
		// ! to avoid errors with API rules,  lat & lng won't be stored
		// const results = await geocodeByAddress(value);
		// const latLng = await getLatLng(results[0]);
		setAddress(value);
		// setCoordinates(latLng);
	};

	// const convertBase64 = (file) => {
	// 	const reader = new FileReader();
	// 	reader.readAsDataURL(file);
	// 	reader.onload = () => {
	// 		const base64 = reader.result;

	// 	};
	// 	    reader.onerror = (err) => {
	// 				console.log('Error: ', err);
	// 			};
	// };

	/** Update state in formData */
	const handleChange = (e) => {
		// Reset errors each change
		setErrors('');
		// if uploading media file, update formData
		if (e.target.files) {
			resetAttachment();
			const file = e.target.files[0];

			// ! Post - Media File Structure
			// media: Array(1)
			// 0: {url: "https://api.mateapp.us/storage/46/conversions/8b20…-4cd0-a39a-70c5dfe7cfd35fc3a3886ef6c-feed_640.jpg"}
			// length: 1

			/** Validates attachment and prompts error */
			if (fileIsImage(file, setErrors)) {
				// ! TODO: Create base64 image file
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => {
					const base64 = reader.result;
					setFormData((fData) => {
						return { ...fData, media: [{ url: base64 }] };
					});
				};
				reader.onerror = (err) => {
					console.log('Error: ', err);
				};

				// const file64 = convertBase64(file);
				// console.log(file64.result);
				// setFormData((fData) => {
				// 	return { ...fData, media: [{ url: file64 }] };
				// });

				// setFormData((fData) => {
				// 	return { ...fData, media: URL.createObjectURL(file) };
				// });

				setImage((data) => ({
					...data,
					attachment_preview: URL.createObjectURL(file),
					attachment: file,
					name: file.name,
				}));
				// handleUpload(file);
			}
		} else {
			let { name, value } = e.target;

			/** Handles 'start' and 'end' date fields */
			if (name === 'end' || name === 'start') {
				const date = new Date(value);
				value = firebase.firestore.Timestamp.fromDate(date);
			}
			setFormData((fData) => ({
				...fData,
				[name]: value,
			}));
		}
	};

	/** Reset all formData */
	const resetFormData = () => {
		setFormData(INITIAL_STATE);
		setAddress('');
		resetAttachment();
	};

	/** Resets attachment data.
	 * 	If user is clearing state manually, image URL will be deleted from DB.
	 */
	const resetAttachment = (removeUrl = false) => {
		if (removeUrl) {
			// const storageRef = storage.ref();
			// const storageImage = storageRef.child(`feed/${user.id}/${image.name}`);
			// storageImage
			// 	.delete()
			// 	.then(() => {
			// 		console.log('Removed image');
			// 	})
			// 	.catch((err) => {
			// 		console.log(err);
			// 	});
		}
		setImage(INITIAL_STATE_IMAGE);
		setProgressBar(0);
	};

	/** Validate submitted data */
	const validateFormData = () => {
		/** Clear any existing errors */
		setErrors('');
		if (!formData.title) {
			setErrors('*Title required');
			return false;
		}
		if (!formData.description) {
			setErrors('*Description required');
			return false;
		}
		if (!formData.feed_type_id) {
			setErrors('*Type required');
			return false;
		}
		if (!address) {
			setErrors('*Location required');
			return false;
		}
		return true;
	};

	/** Handle's submitted form data */
	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateFormData()) {
			// let data = new FormData();
			// data.append('title', formData.title);
			// data.append('description', formData.description);
			// data.append('feed_type_id', formData.feed_type_id);
			// data.append('start', formData.start);
			// data.append('end', formData.end);
			// data.append('media', formData.media);
			// data.append('user', user);
			// data.append('location', address);
			// console.log(formData, data);

			formData.location = address;

			save(formData);
			// Clear state of form
			setFormData(INITIAL_STATE);
			resetAttachment();
		}
	};

	// Handles image upload to DB
	const handleUpload = async (image) => {
		const storageRef = storage.ref(`feed/${user.id}/${image.name}`);

		storageRef.put(image).on(
			'state_changed',
			(snapshot) => {
				let progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgressBar(progress);
			},
			(error) => {
				setErrors(error);
			},
			async () => {
				const url = await storageRef.getDownloadURL();
				setFormData((fData) => ({
					...fData,
					media: url,
					attachment_name: image.name,
				}));
			}
		);
	};

	return (
		<div className="PostForm">
			<h4>New Event</h4>
			<form className="container mb-3" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="title" className="float-left">
						Title*
					</label>
					<input
						id="title"
						className="form-control mate-form-input"
						type="text"
						onChange={handleChange}
						name="title"
						value={formData.title}
						maxLength="30"
						required
					/>
					<small
						className={`char-count ${
							30 - formData.title.length <= 10 ? 'error-limit' : ''
						}`}>
						{30 - formData.title.length} characters remaining
					</small>
				</div>
				<div className="form-group">
					<label htmlFor="description" className="float-left">
						Description*
					</label>
					<textarea
						rows="3"
						id="description"
						className="form-control mate-form-input"
						type="text"
						onChange={handleChange}
						name="description"
						value={formData.description}
						maxLength="100"
						required
					/>
					<small
						className={`char-count ${
							100 - formData.description.length <= 10 ? 'error-limit' : ''
						}`}>
						{100 - formData.description.length} characters remaining
					</small>
				</div>
				<div className="form-group">
					<label htmlFor="location" className="float-left">
						Location*
					</label>
					<PlacesAutocomplete
						value={address}
						onChange={setAddress}
						onSelect={handleSelect}>
						{({
							getInputProps,
							suggestions,
							getSuggestionItemProps,
							loading,
						}) => (
							<div className="Autocomplete-Location">
								<input
									{...getInputProps({
										placeholder: 'Type address',
										id: 'location',
										className: 'form-control mate-form-input',
										required: true,
									})}
								/>
								<div className="Autocomplete-Location-List">
									{loading ? <div>loading...</div> : null}

									{suggestions.map((suggestion, idx) => {
										const style = {
											backgroundColor: suggestion.active
												? '#393e46'
												: 'rgb(43, 47, 58)',
										};

										return (
											<div
												key={idx}
												className="Autocomplete-Location-Item"
												{...getSuggestionItemProps(suggestion, { style })}>
												{suggestion.description}
											</div>
										);
									})}
								</div>
							</div>
						)}
					</PlacesAutocomplete>
				</div>
				<div className="form-group d-flex justify-content-between align-items-baseline">
					<label htmlFor="feed_type_id" className="float-left mr-4">
						Type*
					</label>
					<select
						id="postType"
						className="form-control mate-form-input"
						onChange={handleChange}
						name="feed_type_id"
						value={formData.feed_type_id}
						required>
						<option className="option-disabled" value="" disabled>
							Select Type
						</option>
						{postTypeOptions.map((option) => (
							<option key={option.id} value={option.id}>
								{option.name}
							</option>
						))}
					</select>
				</div>
				<div className="form-group date-input-group align-items-baseline">
					<label htmlFor="event-start mb-3" className="float-left">
						Start
					</label>
					<TextField
						id="event-start"
						type="datetime-local"
						className="float-right"
						defaultValue={formData.start}
						name="start"
						onChange={handleChange}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</div>
				<div className="form-group align-items-baseline">
					<label htmlFor="event-end" className="float-left">
						End
					</label>
					<TextField
						id="event-end"
						type="datetime-local"
						className="float-right"
						defaultValue={formData.end}
						name="end"
						onChange={handleChange}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</div>
				<div className="PostForm__Footer">
					<div className="message__attachments">
						<div className="preview__attachment">
							{image.attachment_preview && (
								<>
									<img
										src={image.attachment_preview}
										alt="preview"
										className="attachment__preview"
									/>
									<IconButton onClick={() => resetAttachment(true)}>
										<CancelIcon className="remove__attachment" />
									</IconButton>
								</>
							)}
							<ProgressBar progress={progressBar} />
						</div>
						<label htmlFor="attachment" className="attachment__label">
							<PanoramaOutlinedIcon fontSize="large" />
						</label>
						<input
							type="file"
							id="attachment"
							style={{ display: 'none' }}
							onChange={handleChange}
						/>
					</div>
				</div>
				<SubmitButton text="Post" reset={true} resetForm={resetFormData} />
			</form>
			{errors && (
				<div className="Form__Errors">
					<div className="alert errors">{errors}</div>
				</div>
			)}
			<div className="Post-Form-Padding"></div>
		</div>
	);
}
