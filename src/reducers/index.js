import {DONATION_VALUES} from "../widget/donationValues";
import {
    ANIMAL_TYPE,
    SET_DONATION_VALUE,
    SET_TO_REGULAR_DONATION,
    REMEMBER_LAST_DONATION_VALUE,
    SUBMIT_DONATION
} from '../actions/actionTypes';
import {initialState} from '../initialState';

export default function editFormReducer(state=initialState, action) {
    switch (action.type) {

        case ANIMAL_TYPE:
            return {
                ...state,
                animal: action.animal,
            };

        case SET_DONATION_VALUE:
            let {value,isSetManually} = action.donation;
            return {
                ...state,
                donation: {
                    value: value !== '' ? Number(value) : '',
                    isSetManually: isSetManually
                },
                isUserSettingIllegalManualValue: Number(value) < DONATION_VALUES.minManualValue && value !== '' && isSetManually
            };

        case SET_TO_REGULAR_DONATION:
            return {
                ...state,
                isRegularDonation: action.isRegularDonation,
            };

        case REMEMBER_LAST_DONATION_VALUE:
            return {
                ...state,
                lastRememberedDonationValue: Number(action.value),
            };

        case SUBMIT_DONATION:
            return {
                ...state,
                submitValues: {
                    animal: action.submitValues.animal,
                    amount: action.submitValues.donation.value,
                    isRegularDonation: action.submitValues.isRegularDonation
                }
            };

        default:
            return state
    }
}