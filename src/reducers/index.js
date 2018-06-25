import {DONATION_VALUES} from "../widget/donationValues";
import {
    ANIMAL_TYPE,
    SET_DONATION_VALUE,
    SET_TO_REGULAR_DONATION,
    REMEMBER_LAST_DONATION_VALUE
} from '../actions/actionTypes';

const initialState = {
    animal: 'giraffe',
    selectedDonation: {
        value: DONATION_VALUES.defaultValue,
        isSetManually: false
    },
    isUserSettingIllegalManualValue: false,
    isRegularDonation: true,
    lastRememberedDonationValue: null
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
                selectedDonation: {
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

        default:
            return state
    }
}