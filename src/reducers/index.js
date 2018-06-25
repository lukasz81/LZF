import {DONATION_VALUES} from "../widget/donationValues";
import {
    ANIMAL_TYPE,
    SET_DONATION_VALUE,
    SET_MANUAL_DONATION_VALUE
} from '../actions/actionTypes';

const initialState = {
    animal: 'giraffe',
    selectedDonationValue: DONATION_VALUES.defaultValue,
    lastSelectedDonation: DONATION_VALUES.defaultValue,
    manualInputValue: '',
    isUserSettingIllegalManualValue: false,
    hasSetMonthlyDonation: true
};

export default function editFormReducer(state=initialState, action) {
    switch (action.type) {

        case ANIMAL_TYPE:
            return {
                ...state,
                animal: action.animal,
            };

        case SET_DONATION_VALUE:
            return {
                ...state,
                selectedDonationValue: Number(action.value),
            };

        case SET_MANUAL_DONATION_VALUE:
            return {
                ...state,
                manualInputValue: Number(action.value),
                isUserSettingIllegalManualValue: Number(action.value) < DONATION_VALUES.minManualValue
            };

        default:
            return state
    }
}