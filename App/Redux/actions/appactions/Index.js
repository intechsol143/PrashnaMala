//user action files

import { CLASSIC, TOURNAMENT, LEAGUES, REPEAT_INDEX,QCOUNTERREFRESH, 
  MILESTONESAVE,
  TITLES, MyQuesList, TOOCLOSE, SAVEUSER, ANSWERS, COINSTIME, QCOUNTER, SQCOUNTER, MILESTONE, MILESTONEREFRESH, CORRECTANSWERS, CURENTMSTONE, ANSCOUNT, MYTOTALQLIST, LEAVE, TOSTOP, REFCODE, ACCEPT, TOURNAMENT_WINNER, TOURNAMENT_LOOSER, SAVE_BOX, CORR_COUNT, SAVELOGINPOINTS, SAVEOPERANTPOINTS, SAVECURRENTTIME, SAVEPAYMENTACTIVE, SAVE_EMAIL } from '../../Types/Index';
export const SetclassicData = payload => dispatch => {
  dispatch({ type: CLASSIC, payload });
};
export const SetTornamentData = payload => dispatch => {
  dispatch({ type: TOURNAMENT, payload });
};
export const SetLeagueData = payload => dispatch => {
  dispatch({ type: LEAGUES, payload });
};
export const SetRepeateIndexData = payload => dispatch => {
  dispatch({ type: REPEAT_INDEX, payload });
};
export const SetTitles = payload => dispatch => {
  dispatch({ type: TITLES, payload });
};
export const SetTooclose = payload => dispatch => {
  dispatch({ type: TOOCLOSE, payload });
};
export const SetUser = payload => dispatch => {
  dispatch({ type: SAVEUSER, payload });
};

export const SetQues = payload => dispatch => {
  dispatch({ type: MyQuesList, payload });
};
export const SetCoinsTime = payload => dispatch => {
  dispatch({ type: COINSTIME, payload });
};
export const SetQcounter = () => dispatch => {
  dispatch({ type: QCOUNTER });
};
export const StoreQcounter = payload => dispatch => {
  dispatch({ type: SQCOUNTER, payload });
};
export const SetMilestone = () => dispatch => {
  dispatch({ type: MILESTONE });
};
export const SetQcounterRefres = payload => dispatch => {
  dispatch({ type: QCOUNTERREFRESH, payload });
};
export const SetMilestoneRefresh = payload => dispatch => {
  dispatch({ type: MILESTONEREFRESH, payload });
};
export const SetCorrectAns = payload => dispatch => {
  dispatch({ type: CORRECTANSWERS, payload });
};
export const SetCMStone = payload => dispatch => {
  dispatch({ type: CURENTMSTONE, payload });
};
export const SetMiletone = payload => dispatch => {
  dispatch({ type: MILESTONESAVE, payload });
};

export const SetAnsCount = payload => dispatch => {
  dispatch({ type: ANSCOUNT, payload });
};

export const SetMyTotalQues = payload => dispatch => {
  dispatch({ type: MYTOTALQLIST, payload });
};

export const SetLeave = payload => dispatch => {
  dispatch({ type: LEAVE, payload });
};
export const SetStop = payload => dispatch => {
  dispatch({ type: TOSTOP, payload });
};
export const SetRefCode = payload => dispatch => {
  dispatch({ type: REFCODE, payload });
};
export const SetAccept = payload => dispatch => {
  dispatch({ type: ACCEPT, payload });
};
export const SetTournamentWinner = payload => dispatch => {
  dispatch({ type: TOURNAMENT_WINNER, payload });
};
export const SetTournamentLooser = payload => dispatch => {
  dispatch({ type: TOURNAMENT_LOOSER, payload });
};
export const SetBox = payload => dispatch => {
  dispatch({ type: SAVE_BOX, payload });
};
export const SetCorectCount = payload => dispatch => {
  dispatch({ type: CORR_COUNT, payload });
};
export const SetLoginuserPoints = payload => dispatch => {
  dispatch({ type: SAVELOGINPOINTS, payload });
};
export const SetOperantPoints = payload => dispatch => {
  dispatch({ type: SAVEOPERANTPOINTS, payload });
};
export const SetCurrentTime = payload => dispatch => {
  dispatch({ type: SAVECURRENTTIME, payload });
};

export const SetPaymentActive = payload => dispatch => {
  dispatch({ type: SAVEPAYMENTACTIVE, payload });
};
export const SetisEmail = payload => dispatch => {
  dispatch({ type: SAVE_EMAIL, payload });
};