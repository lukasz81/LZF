import {
    ANIMAL_TYPE,
    SET_DONATION_VALUE,
    SET_MANUAL_DONATION_VALUE
} from './actionTypes';

export const changeAnimalType = animal => ({
    type: ANIMAL_TYPE,
    animal
});
export const setDonationValues = value => ({
    type: SET_DONATION_VALUE,
    value
});
export const setManualDonationValues = manualValue => ({
    type: SET_MANUAL_DONATION_VALUE,
    manualValue
});