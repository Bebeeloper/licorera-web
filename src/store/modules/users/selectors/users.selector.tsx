import { createSelector } from '@reduxjs/toolkit';

import { PersonalInfoState, RootState } from '../types';
import { PERSONAL_INFO_FEATURE_KEY } from '../users.slice';

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 */
export const getPersonalInfoState = (rootState: RootState): PersonalInfoState =>
  rootState[PERSONAL_INFO_FEATURE_KEY];

export const selectAllPersonalInfo = createSelector(
  getPersonalInfoState,
  (personalInfo) => personalInfo.data
);

export const selectAllUser = createSelector(
  getPersonalInfoState,
  (personalInfo) => personalInfo.user
);

export const selectToken = createSelector(
  getPersonalInfoState,
  (personalInfo) => personalInfo.data?.token
);

export const selectRefreshToken= createSelector(
  getPersonalInfoState,
  (personalInfo) => personalInfo.data?.refresh_token
);


export const selectIsWelcome = createSelector(
  getPersonalInfoState,
  (personalInfo) => personalInfo.isWelcome
);

export const selectIsUserInfoComplete = createSelector(
  getPersonalInfoState,
  (personalInfo) => personalInfo.isUserInfoComplete
);

export const selectAllInfo = createSelector(
  getPersonalInfoState,
  (personalInfo) => personalInfo.info
);

