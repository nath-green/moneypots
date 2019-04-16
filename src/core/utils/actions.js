import dispatcher from './dispatcher';

export const ACTIONS = {
  FETCH_DATA: 'FETCH_DATA',
  TRANSACTION: 'TRANSACTION',
  EDIT_TRANSACTION: 'EDIT_TRANSACTION',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
  REBALANCE: 'REBALANCE',
  ADD_POT: 'ADD_POT',
  EDIT_POT: 'EDIT_POT',
  CONSOLIDATE_POT: 'CONSOLIDATE_POT',
  CLEAR_POT: 'CLEAR_POT',
  REMOVE_POT: 'REMOVE_POT',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
};

export function login(data) {
  dispatcher.dispatch({
    type: ACTIONS.LOGIN,
    data
  });
}

export function logout() {
  dispatcher.dispatch({
    type: ACTIONS.LOGOUT
  });
}

export function fetchData() {
  dispatcher.dispatch({
    type: ACTIONS.FETCH_DATA
  });
}

export function transaction(data) {
  dispatcher.dispatch({
    type: ACTIONS.TRANSACTION,
    data
  });
}

export function editTransaction(data) {
  dispatcher.dispatch({
    type: ACTIONS.EDIT_TRANSACTION,
    data
  });
}

export function deleteTransaction(data) {
  dispatcher.dispatch({
    type: ACTIONS.DELETE_TRANSACTION,
    data
  });
}

export function rebalance(data) {
  dispatcher.dispatch({
    type: ACTIONS.REBALANCE,
    data
  });
}

export function addPot(data) {
  dispatcher.dispatch({
    type: ACTIONS.ADD_POT,
    data
  });
}

export function editPot(data) {
  dispatcher.dispatch({
    type: ACTIONS.EDIT_POT,
    data
  });
}

export function consolidatePot(data) {
  dispatcher.dispatch({
    type: ACTIONS.CONSOLIDATE_POT,
    data
  });
}

export function clearPot(data) {
  dispatcher.dispatch({
    type: ACTIONS.CLEAR_POT,
    data
  });
}

export function removePot(data) {
  dispatcher.dispatch({
    type: ACTIONS.REMOVE_POT,
    data
  });
}
