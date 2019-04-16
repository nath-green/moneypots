import { EventEmitter } from 'events';
import firebase from './firebase';
import { history } from '../routes';
import dispatcher from './dispatcher';
import { ACTIONS } from './actions';
import { storeContent } from './selectors';
import { camelcaseToFriendlyName, camelise } from '.';

class MoneypotsStore extends EventEmitter {
  constructor() {
    super();
    this.data = [];
    this.error = false;
    this.loading = true;
  }

  handleActions(action) {
    switch (action.type) {
      case ACTIONS.LOGIN: {
        const { email, password } = action.data;
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            history.push('/');
          })
          .catch(() => {
            this.emit('loginFailed');
          });
        break;
      }
      case ACTIONS.LOGOUT: {
        firebase
          .auth()
          .signOut()
          .then(() => {
            history.push('/login');
          })
          .catch(() => {
            this.emit('logoutFailed');
          });
        break;
      }
      case ACTIONS.FETCH_DATA: {
        firebase
          .database()
          .ref('/')
          .on(
            'value',
            snapshot => {
              this.data = storeContent(snapshot.val());
              this.loading = false;
              this.error = false;
              this.emit('storeUpdated');
            },
            () => {
              this.error = true;
              this.loading = false;
              this.emit('storeUpdated');
            }
          );
        break;
      }
      case ACTIONS.TRANSACTION: {
        const { value, desc, timestamp, potId } = action.data;
        firebase
          .database()
          .ref(`pots/${potId}/transactions`)
          .push(
            {
              desc,
              value,
              timestamp: timestamp.toString()
            },
            error => {
              if (error) {
                this.emit('transactionError');
              } else {
                this.emit('transactionSuccess');
              }
            }
          );
        break;
      }
      case ACTIONS.EDIT_TRANSACTION: {
        const { potId, transactionId, value, desc } = action.data;
        firebase
          .database()
          .ref(`pots/${camelise(potId)}/transactions/${transactionId}`)
          .update(
            {
              desc,
              value
            },
            error => {
              if (error) {
                this.emit('transactionEditError');
              } else {
                this.emit('transactionEditSuccess');
                history.push(`/dashboard/pots/${potId}`);
              }
            }
          );
        break;
      }
      case ACTIONS.DELETE_TRANSACTION: {
        const { potId, transactionId } = action.data;
        firebase
          .database()
          .ref(`pots/${potId}/transactions/${transactionId}`)
          .remove(error => {
            if (error) {
              this.emit('transactionDeletedError');
            } else {
              history.push(`/dashboard/pots/${potId}`);
            }
          });
        break;
      }
      case ACTIONS.REBALANCE: {
        const { value, timestamp, potToId, potFromId } = action.data;
        firebase
          .database()
          .ref(`pots/${potToId}/transactions`)
          .push(
            {
              desc: `Rebalance from ${camelcaseToFriendlyName(potFromId)}`,
              value: Math.abs(value),
              timestamp: timestamp.toString()
            },
            error => {
              if (error) {
                this.emit('rebalanceError');
              } else {
                firebase
                  .database()
                  .ref(`pots/${potFromId}/transactions`)
                  .push(
                    {
                      desc: `Rebalance to ${camelcaseToFriendlyName(potToId)}`,
                      value: Math.abs(value) * -1,
                      timestamp: timestamp.toString()
                    },
                    callbackError => {
                      if (callbackError) {
                        this.emit('rebalanceError');
                      } else {
                        this.emit('rebalanceSuccess');
                      }
                    }
                  );
              }
            }
          );
        break;
      }
      case ACTIONS.ADD_POT: {
        const {
          potName,
          potThreshold,
          potTopUp,
          potGoal,
          potGoalTarget,
          potMonthly,
          potFavourite,
          selectedIcon
        } = action.data;
        const potId = camelise(potName);
        firebase
          .database()
          .ref(`pots/${potId}`)
          .set(
            {
              potName,
              threshold: potThreshold,
              topUpAmount: potTopUp,
              goal: potGoal,
              goalAmount: potGoalTarget,
              monthly: potMonthly,
              favourite: potFavourite,
              icon: selectedIcon
            },
            error => {
              if (error) {
                this.emit('potFormError');
              } else {
                this.emit('potFormSuccess');
                history.push(`/dashboard/pots/${potId}`);
              }
            }
          );
        break;
      }
      case ACTIONS.EDIT_POT: {
        const {
          potId,
          potName,
          potThreshold,
          potTopUp,
          potGoal,
          potMonthly,
          potFavourite,
          selectedIcon
        } = action.data;
        firebase
          .database()
          .ref(`pots/${potId}`)
          .update(
            {
              potName,
              threshold: potThreshold,
              topUpAmount: potTopUp,
              goal: potGoal,
              monthly: potMonthly,
              favourite: potFavourite,
              icon: selectedIcon
            },
            error => {
              if (error) {
                this.emit('potFormError');
              } else {
                this.emit('potFormSuccess');
                history.push(`/dashboard/pots/${potId}`);
              }
            }
          );
        break;
      }
      case ACTIONS.REMOVE_POT: {
        const { potId } = action.data;
        firebase
          .database()
          .ref(`pots/${potId}`)
          .remove(error => {
            if (error) {
              this.emit('potRemovedError');
            } else {
              this.emit('potRemovedSuccess');
              history.push(`/dashboard/pots`);
            }
          });
        break;
      }
      case ACTIONS.CLEAR_POT: {
        const { potId } = action.data;
        firebase
          .database()
          .ref(`pots/${potId}/transactions`)
          .remove(error => {
            if (error) {
              this.emit('potClearedError');
            } else {
              this.emit('potClearedSuccess');
              history.push(`/dashboard/pots/${potId}`);
            }
          });
        break;
      }
      case ACTIONS.CONSOLIDATE_POT: {
        const { potId, potBalance } = action.data;
        firebase
          .database()
          .ref(`pots/${potId}/transactions`)
          .remove(error => {
            if (error) {
              this.emit('potConsolidatedError');
            } else {
              firebase
                .database()
                .ref(`pots/${potId}/transactions`)
                .push(
                  {
                    desc: 'Consolidated balance',
                    timestamp: new Date().toString(),
                    value: potBalance
                  },
                  consolidatedTransationError => {
                    if (consolidatedTransationError) {
                      this.emit('potConsolidatedError');
                    } else {
                      this.emit('potConsolidatedSuccess');
                      history.push(`/dashboard/pots/${potId}`);
                    }
                  }
                );
            }
          });
        break;
      }
      default: {
        break;
      }
    }
  }

  getData() {
    return this.data;
  }

  getLoadingState() {
    return this.loading;
  }

  getErrorState() {
    return this.error;
  }
}

const moneypotsStore = new MoneypotsStore();
dispatcher.register(moneypotsStore.handleActions.bind(moneypotsStore));
export default moneypotsStore;
