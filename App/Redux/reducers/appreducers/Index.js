// user reducer for registering

import {
  CLASSIC, TOURNAMENT,
  SAVEUSER,
  LEAGUES, REPEAT_INDEX,
  QCOUNTERREFRESH,
  MILESTONESAVE,
  MILESTONEREFRESH,
  TITLES, TOOCLOSE, MyQuesList, SQCOUNTER,
  MYTOTALQLIST,
  COINSTIME, QCOUNTER, MILESTONE, CORRECTANSWERS, CURENTMSTONE, ANSCOUNT, LEAVE, TOSTOP, REFCODE, ACCEPT, TOURNAMENT_WINNER, TOURNAMENT_LOOSER, SAVE_BOX, CORR_COUNT, SAVELOGINPOINTS, SAVEOPERANTPOINTS, SAVECURRENTTIME, SAVEPAYMENTACTIVE, SAVE_EMAIL
} from '../../Types/Index';

const initialState = {
  user: null,
  classic: null,
  tournament: null,
  league: null,
  repeatIndex: null,
  saveTitles: null,
  tooClose: null,
  questionsList: null,
  coinsTime: null,
  qCounter: 1,
  milestone: 1,
  correctAns: null,
  curentMileStone: null,
  myStone: null,
  anscount: 0,
  totalQlist: 0,
  leaveGame: false,
  stop: "",
  refercode: "",
  saveAccept: "",
  tournamentWinner: "",
  tournamentLooser: "",
  saveBox: false,
  corectCount: 0,
  loginUserpoints: 0,
  operantPoints: 0,
  saveTime: 0,
  checkPayment:false,
  isEmail:null



};

const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVEUSER:
      return { ...state, user: payload };
      case SAVE_EMAIL:
        return { ...state, isEmail: payload };
    case CLASSIC:
      return { ...state, classic: payload };
    case TOURNAMENT:
      return { ...state, tournament: payload };
    case LEAGUES:
      return { ...state, league: payload };
    case REPEAT_INDEX:
      return { ...state, repeatIndex: payload };
    case TITLES:
      return { ...state, saveTitles: payload };
    case TOOCLOSE:
      return { ...state, tooClose: payload };
    case MyQuesList:
      return { ...state, questionsList: payload };
    case COINSTIME:
      return { ...state, coinsTime: payload };
    case QCOUNTER:
      return { ...state, qCounter: state.qCounter + 1 };
    case SQCOUNTER:
      return { ...state, qCounter: payload };
    case MILESTONE:
      return { ...state, milestone: state.milestone + 1 };
    case MILESTONEREFRESH:
      return { ...state, milestone: payload };
    case QCOUNTERREFRESH:
      return { ...state, qCounter: payload };
    case CORRECTANSWERS:
      return { ...state, correctAns: payload };
    case CURENTMSTONE:
      return { ...state, curentMileStone: payload };
    case MILESTONESAVE:
      return { ...state, myStone: payload };
    case ANSCOUNT:
      return { ...state, anscount: payload };
    case MYTOTALQLIST:
      return { ...state, totalQlist: payload };
    case LEAVE:
      return { ...state, leaveGame: payload };
    case TOSTOP:
      return { ...state, stop: payload };
    case REFCODE:
      return { ...state, refercode: payload };
    case ACCEPT:
      return { ...state, saveAccept: payload };
    case TOURNAMENT_WINNER:
      return { ...state, tournamentWinner: payload };
    case TOURNAMENT_LOOSER:
      return { ...state, tournamentLooser: payload };
    case SAVE_BOX:
      return { ...state, saveBox: payload };
    case CORR_COUNT:
      return { ...state, corectCount: payload };

    case SAVELOGINPOINTS:
      return { ...state, loginUserpoints: payload };
    case SAVEOPERANTPOINTS:
      return { ...state, operantPoints: payload };
    case SAVECURRENTTIME:
      return { ...state, saveTime: payload };
      case SAVEPAYMENTACTIVE:
        return { ...state, checkPayment: payload };
    default:
      return state;
  }
};

export default appReducer;
