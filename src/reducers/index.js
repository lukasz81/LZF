import {DONATION_VALUES} from "../widget/donationValues";
import {
    ANIMAL_TYPE,
    SET_DONATION_VALUE,
    SET_TO_REGULAR_DONATION
} from '../actions/actionTypes';

const initialState = {
    animal: 'giraffe',
    selectedDonationValue: {
        value: DONATION_VALUES.defaultValue,
        isSetManually: false
    },
    isUserSettingIllegalManualValue: false,
    isRegularDonation: true
};

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
                selectedDonationValue: {
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

        default:
            return state
    }
}