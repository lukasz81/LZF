import {
    ANIMAL_TYPE,
    SET_DONATION_VALUE,
    SET_TO_REGULAR_DONATION,
    REMEMBER_LAST_DONATION_VALUE
} from './actionTypes';

export const changeAnimalType = animal => ({
    type: ANIMAL_TYPE,
    animal
});
export const setDonationValues = donation => ({
    type: SET_DONATION_VALUE,
    donation
});
export const setToRegularDonations = isRegularDonation => ({
    type: SET_TO_REGULAR_DONATION,
    isRegularDonation
});
export const rememberLastDonationValue = value => ({
    type: REMEMBER_LAST_DONATION_VALUE,
    value
});