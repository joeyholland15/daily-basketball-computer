import { createSelector } from 'reselect';
import _ from 'underscore';

const getItems = state => state.stats.active;
const getTrendItems = state => state.trends;

export const dailyStatSelector = createSelector(
  [getItems],
  items => {
    return items && items.map((player) => ({
      ...player,
      dueStart: player.fgp && player.fga ? (player.fga/player.fgp) : 0,
    })) //.sort((first, second) => second.dueStart - first.dueStart) || items;
  }
);

export const trendStatSelector = createSelector(
  [getTrendItems],
  items => {
    const nextItems = { ...items };
    _.map(nextItems, (player) => {
      const history = player.history;
      const heat = history.reduce((acc, curr) => {
        if (curr && !isNaN(curr.value) && curr.value > 6) {
          return acc += (curr.value - 6);
        }
        return acc;
      }, 0)
      player.today['heat'] = heat;
      return player;
    })
    return items;
  }
);

// export const trendStatSelector = createSelector(
//   [getTrendItems],
//   items => {
//     const nextItems = { ...items }
//     const playerObjects = Object.keys(nextItems);
//     playerObjects.map((player) => {
//       const nextHistory = playerObjects[player].history && playerObjects[player].history.map((game) => ({
//         ...game,
//         dueStart: game && game.fgp && game.fga ? (game.fga/game.fgp) : 0,
//       }));
//       const nextFuture = playerObjects[player].future && playerObjects[player].future.map((game) => ({
//         ...game,
//         dueStart: game && game.fgp && game.fga ? (game.fga/game.fgp) : 0,
//       }));
//       const today = playerObjects[player].today
//       today['dueStart'] = playerObjects[player] && playerObjects[player].fgp && playerObjects[player].fga ? (playerObjects[player].fga/playerObjects[player].fgp) : 0;
    
//     })
//   }
// );