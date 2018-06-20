import {DONATION_VALUES} from "../widget/donationValues";

const initialState = {
    animal: 'giraffe',
    selectedDonation: DONATION_VALUES.defaultValue,
    lastSelectedDonation: DONATION_VALUES.defaultValue,
    isManualInputInError: false,
    hasSetMonthlyDonation: true
};

export default function submitFormReducer(state=initialState, action) {
    switch (action.type) {

        case 'ANIMAL_TYPE':
            return {
                ...state,
                animal: action.animal,
            };

        default:
            return state
    }
}