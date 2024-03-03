import { states } from 'constants/NepalStates';

export const getStateAbbreviation = (state: any) => {
  const stateAbrev = states[state as 'Kathmandu'];

  if (stateAbrev) return stateAbrev;
  return state;
};
