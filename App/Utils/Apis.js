import axios from 'axios';

const API = axios.create({
  baseURL: 'https://app.prashnamaala.com',
});


const userRegister = async payload => {
  const requrest = `/api/register`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const _Guestlogin = async payload => {
  
  const requrest = `/api/login`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};


const _home = async payload => {
  const requrest = `/api/home`;
  try {
    const response = await API.get(requrest, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const _CitiesList = async payload => {
  const requrest = `/api/classic-city-list`;
  try {
    const response = await API.get(requrest, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const _addReward = async payload => {
  const requrest = `/api/ads-reward-coin`;
  try {
    const response = await API.post(requrest, payload.userdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const _getMilstone = async payload => {
  const requrest = `/api/milestone`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};


const _classicQuestions = async payload => {
  const requrest = `/api/get-classic-question/${payload.qId}`;
  try {
    const response = await API.get(requrest, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const _correctAnswers = async payload => {
  const requrest = `/api/user-classic-result`;
  try {
    const response = await API.post(requrest, payload.userdata, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};


const _checkuserStatus = async payload => {
  const requrest = `/api/change-user-status`;
  try {
    const response = await API.post(requrest, payload.userdata, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};
const _Leaguecoins = async payload => {
  const requrest = `/api/league-coin`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const editUserprofile = async payload => {
  const requrest = `/api/edit`;
  try {
    const response = await API.post(requrest, payload.userData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const refreshLifeLines = async payload => {
  console.log("paykiadddd-----------",payload)
  const requrest = `/api/lifeline/${payload.ref}`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};



const changeUserStatus = async payload => {

  const requrest = `/api/change-user-status`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};
const _getRandomUser = async payload => {
  const requrest = `/api/get-active-user`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const get_league_questions = async payload => {
  const requrest = `/api/get-league-question`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};
const GameResult = async payload => {
  const requrest = `/api/win-league`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const tournamentResult = async payload => {
  const requrest = `/api/win-tournament`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const checkLiveuser = async payload => {
  const requrest = `/api/is-alive`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};
const checkTournamentLiveuser = async payload => {
  const requrest = `/api/is-alive-tournament`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};
const _ToLeavegame = async payload => {
  
  const requrest = `/api/leave-game`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const _ToLeaveTournamentgame = async payload => {
  
  const requrest = `/api/leave-game-tournament`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};
const _savecashRequest = async payload => {
  const requrest = `/api/save-cash-request`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const _showcashRequest = async payload => {
  const requrest = `/api/show-cash-request`;
  try {
    const response = await API.get(requrest, {
      headers: {

        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};


const _referCode = async payload => {
  const requrest = `/api/refer-code`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};


const LeagueRmatch = async payload => {
  const requrest = `/api/league-rematch-request`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};


const SearchUserForMatch = async payload => {
  const requrest = `/api/check-league-rematch-request`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const ShopTab = async payload => {
  const requrest = `/api/shop`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};
const acceptLeagueRematch = async payload => {
  const requrest = `/api/accept-league-rematch-request`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};
const showReferstatus = async payload => {
  const requrest = `/api/show-refers-status`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};


const startTournament = async payload => {
  const requrest = `/api/start-tournament`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const setTournamentuser = async payload => {
  const requrest = `/api/set-tournament-active`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const checkTournamentuser = async payload => {
  const requrest = `/api/check-tournament-active`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const get_Tournament_questions = async payload => {
  const requrest = `/api/get-tournament-question`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const Privacy = async payload => {
  const requrest = `/api/get-cms-pages/privacy_policy`;
  try {
    const response = await API.get(requrest, {
      headers: {

        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const Terms = async payload => {
  const requrest = `/api/get-cms-pages/term_conditions`;
  try {
    const response = await API.get(requrest, {
      headers: {

        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const Payment = async payload => {
  console.log("payment payload",JSON.stringify(payload) )
  const requrest = `/api/payment`;
  try {
    const response = await API.post(requrest, payload.userdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    console.log("Err", err.response)
    throw err;
  }
};

const confirmPayment = async payload => {
  const requrest = `/api/confirm-payment`;
  try {
    const response = await API.post(requrest, payload.userdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};


const leaderBoard = async payload => {
  const requrest = `/api/leaderboard`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const _checkExistingUsers = async payload => {
  const requrest = `/api/is-user-exist`;
  try {
    const response = await API.get(requrest, {
      headers: {

        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const getPoints = async payload => {
  const requrest = `/api/point-correct-answer`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const unsetPoints = async payload => {
  const requrest = `/api/unset-point-user`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};


const setWinnerLeagueRank = async payload => {
  const requrest = `/api/set-winner-league-rank`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};
const setWinnerTournamentRank = async payload => {
  const requrest = `/api/set-winner-tournament-rank`;
  try {
    const response = await API.get(requrest,{
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const setWinnerClassicRank = async payload => {
  const requrest = `/api/set-winner-classic-rank`;
  try {
    const response = await API.post(requrest,payload.userdata, {
      headers: {

        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.apiToken}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const showProfiles = async payload => {
  const requrest = `/api/profile`;
  try {
    const response = await API.get(requrest,{
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};


const checkPaymentActivness = async payload => {
  const requrest = `/api/is_payment`;
  try {
    const response = await API.get(requrest,{
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload}`,
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};
export {
  userRegister,
  _Guestlogin,
  _home,
  _CitiesList,
  _addReward,
  _getMilstone,
  _classicQuestions,
  _correctAnswers,
  _checkuserStatus,
  _Leaguecoins,
  _getRandomUser,
  editUserprofile,
  refreshLifeLines,
  changeUserStatus,
  get_league_questions,
  GameResult,
  checkLiveuser,
  _ToLeavegame,
  _savecashRequest,
  _showcashRequest,
  _referCode,
  LeagueRmatch,
  SearchUserForMatch,
  ShopTab,
  acceptLeagueRematch,
  showReferstatus,
  startTournament,
  checkTournamentuser,
  setTournamentuser,
  get_Tournament_questions,
  tournamentResult,
  checkTournamentLiveuser,
  _ToLeaveTournamentgame,
  Privacy,
  Terms,
  Payment,
  confirmPayment,
  leaderBoard,
  _checkExistingUsers,
  getPoints,
  unsetPoints,
  setWinnerLeagueRank,
  setWinnerTournamentRank,
  setWinnerClassicRank,
  showProfiles,
  checkPaymentActivness


};