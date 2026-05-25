const ROLE_ORDER = [
  { key: 'high', label: 'High Card', points: 0, rank: 0, icon: '◆' },
  { key: 'pair', label: 'One Pair', points: 2, rank: 1, icon: '1️⃣' },
  { key: 'twoPair', label: 'Two Pair', points: 5, rank: 2, icon: '2️⃣' },
  { key: 'three', label: 'Three of a Kind', points: 9, rank: 3, icon: '3️⃣' },
  { key: 'straight', label: 'Straight', points: 15, rank: 4, icon: '🏹' },
  { key: 'flush', label: 'Flush', points: 19, rank: 5, icon: '♣' },
  { key: 'fullHouse', label: 'Full House', points: 28, rank: 6, icon: '🏠' },
  { key: 'four', label: 'Four of a Kind', points: 40, rank: 7, icon: '4️⃣' },
  { key: 'straightFlush', label: 'Straight Flush', points: 68, rank: 8, icon: '⚡' },
  { key: 'royalFlush', label: 'Royal Flush', points: 76, rank: 9, icon: '👑' },
];
const ROLE_BY_KEY = Object.fromEntries(ROLE_ORDER.map(r => [r.key, r]));
const CLAIM_OPTIONS = [{ key: 'none', label: 'No Claim', points: 0, rank: -1, icon: '—' }, ...ROLE_ORDER];
const CLAIM_BY_KEY = Object.fromEntries(CLAIM_OPTIONS.map(r => [r.key, r]));
const SUITS = ['♠', '♥', '♦', '♣'];
const RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const RANK_LABEL = { 11: 'J', 12: 'Q', 13: 'K', 14: 'A' };
const CPU_NAMES = ['Mira', 'Brakk', 'Toto'];
const CPU_PERSONALITY_PROFILES = {
  aggressive: {
    bluffRate: 0.22,
    riskTolerance: 0.72,
    proofAggression: 0.56,
    raiseAggression: 0.74,
    foldDiscipline: 0.32,
    marketGreed: 0.62,
    defensivePlay: 0.38,
    claimHonesty: 0.48,
  },
  cautious: {
    bluffRate: 0.08,
    riskTolerance: 0.34,
    proofAggression: 0.36,
    raiseAggression: 0.34,
    foldDiscipline: 0.78,
    marketGreed: 0.44,
    defensivePlay: 0.74,
    claimHonesty: 0.78,
  },
  tricky: {
    bluffRate: 0.28,
    riskTolerance: 0.58,
    proofAggression: 0.76,
    raiseAggression: 0.54,
    foldDiscipline: 0.48,
    marketGreed: 0.56,
    defensivePlay: 0.62,
    claimHonesty: 0.36,
  },
  honestStrong: {
    bluffRate: 0.06,
    riskTolerance: 0.56,
    proofAggression: 0.42,
    raiseAggression: 0.68,
    foldDiscipline: 0.54,
    marketGreed: 0.66,
    defensivePlay: 0.46,
    claimHonesty: 0.88,
  },
};
const CPU_PERSONALITY_BY_NAME = {
  Mira: 'tricky',
  Brakk: 'aggressive',
  Toto: 'cautious',
};
const CPU_PERSONALITY_KEYS = Object.keys(CPU_PERSONALITY_PROFILES);
const CPU_ICONS = ['🦊', '🐻', '🐸'];
const PLAYER_COLORS = ['#ff5e6e', '#ff9a38', '#5aa7ff', '#51d17f'];
const SPECIAL_ICONS = {
  exchange: '💱',
  random: '🎲',
  peek: '👁️',
  market: '🚀',
};
const SPECIAL_NAMES = {
  exchange: 'Card Exchange',
  random: 'Random Exchange',
  peek: 'Reveal Proof',
  market: 'Market Swap',
};
const SPECIAL_DESCRIPTIONS = {
  exchange: 'Replace one chosen hand card with the top stock card.',
  random: 'Redraw up to 3 random eligible hand cards. Your first use each game also adds one public die card; later uses add none. Die cards cannot be redrawn.',
  peek: 'Reveal one non-public scoring card from an opponent to everyone.',
  market: 'Trade one hand card with one unlocked table card. The table card stays common and locks after the swap.',
};
const NORMAL_ACTION_DESCRIPTIONS = [
  ['Call', 'Pay the round target, or go all-in if short.'],
  ['Raise x2', 'Double the round target. Each player has 3 Raises per game; counts are separate.'],
  ['Fold', 'Leave this game. If all others fold, the last active player wins.'],
  ['Last Fold', 'After round 3, reveal your hand and stop contesting. It can reduce loss, but you cannot win. In chip mode it works like normal Fold. All-in players cannot Last Fold.'],
];
const SPECIAL_USE_LIMIT = 2;
const RANDOM_EXCHANGE_CARD_LIMIT = 3;
const RAISE_USE_LIMIT = 3;
const SHOWDOWN_INTERVAL = 500;
const SHOWDOWN_FAST_INTERVAL = 250;
const SHOWDOWN_CARD_FLIP_TIME = 540;
const SHOWDOWN_POINT_TIME = 500;
const SHOWDOWN_RANK_TIME = 650;
const MEMBER_SLOT_COUNT = 4;
const MEMBER_SLOT_ORDER = ['cpu', 'none'];
const HUB_GAME_ID = 'role_board_poker';
const HUB_ROOM_EVENTS = Object.freeze({
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room',
  PLAYER_READY: 'player_ready',
  START_GAME: 'start_game',
  GAME_ACTION: 'game_action',
  SYNC_REQUEST: 'sync_request',
  HEARTBEAT: 'heartbeat',
});
const HUB_SERVER_EVENTS = Object.freeze({
  ROOM_JOINED: 'room_joined',
  ROOM_STATE: 'room_state',
  PLAYER_JOINED: 'player_joined',
  PLAYER_LEFT: 'player_left',
  PLAYER_READY: 'player_ready',
  GAME_STARTED: 'game_started',
  GAME_ACTION: 'game_action',
  SYNC_STATE: 'sync_state',
  ERROR: 'error',
  ROOM_CLOSED: 'room_closed',
});
const HUB_ACTION_TYPES = Object.freeze({
  START_STATE: 'role_poker_start_state',
  SNAPSHOT: 'role_poker_snapshot',
  REQUEST_SYNC: 'role_poker_sync_request',
  PLAYER_META: 'role_poker_player_meta',
  SETUP: 'role_poker_setup',
  CLAIM: 'role_poker_claim',
  SPECIAL: 'role_poker_special',
  NORMAL: 'role_poker_normal',
  LAST_FOLD: 'role_poker_last_fold',
  NEXT_GAME: 'role_poker_next_game',
  QUIT: 'role_poker_quit',
});

const TUTORIAL_TEXTS = [
  'In Showdown, the player with the highest point total wins every chip in the pot.',
  'Antes are paid automatically. If the ante is greater than a player\'s remaining chips, that player goes all-in.',
  'Round 1. When your turn arrives, start by checking your hand.',
  'Click the Hands button in the top-right corner.',
  'This list shows each hand and its points. Stronger hands are worth more points.',
  'Close the modal by clicking the X in the top-right corner.',
  'The Role Board lets you present one poker hand. Click your Role Board.',
  'Choose one hand to present on your board. Board changes are revealed together at the end of the round, so later players cannot react to your private change immediately.',
  'Your current best hand is Two Pair. If your Showdown hand matches or beats your presented role, you gain the bonus points tied to that role.',
  'If your Showdown hand is weaker than your presented role, you lose the point difference between that role and your actual best hand. You can still aim high and try to complete the hand with special moves before Showdown.',
  'You can play honestly for bonus points, or bluff to mislead your opponents. Watch other players\' boards and decide what they really mean.',
  'For this tutorial, choose Full House.',
  'Role Board changes are allowed through Round 2. In Round 3, your board is locked.',
  'You may use one special action each round. Each special action can be used up to twice per game.',
  'Card Exchange lets you discard one card from your hand and draw the top card from the stock. It cannot be used when the stock is empty.',
  'Use it now. Select your ♥6, then press Confirm.',
  'You drew a new card. Your best hand with the market improved from Two Pair to Full House.',
  'Press Call. The required chips are taken from your stack and moved into the pot.',
  'CPU turns are scripted here: Mira calls, while Brakk presents Flush, uses Market Swap, and calls. Your best hand drops back to Two Pair.',
  'Round 2. A new market card appears. You can change your Role Board and use one special action again.',
  'The ♣A is gone from the market. Check the opponents\' special action history.',
  'Brakk used Market Swap, trading a hand card for the ♣A from the market.',
  'Market Swap trades one hand card with one unlocked market card. The new market card becomes locked and cannot be swapped again, but it still counts as a normal market card.',
  'Brakk is presenting Flush. Is it true? Use Reveal Proof to get a clue.',
  'Reveal Proof selects an opponent and reveals one hand card from that opponent\'s current best hand to everyone.',
  'Use Reveal Proof on Brakk. Select Brakk in the dropdown, then press Confirm.',
  'Brakk\'s ♣8 is now public. It matches the ♣A he took, so a ♣ Flush is a real threat.',
  'But the ♦10 is now in the market. With only the ♦Q, you can make a ♦ Royal Flush.',
  'That ♦10 is locked, so it is fixed from now on. Nobody can steal it with Market Swap.',
  'If the ♦J gets taken, your Royal Flush path disappears. Hide your plan by changing your board to Four of a Kind.',
  'Call to continue.',
  'CPU turns are scripted again. Mira presents Royal Flush and calls. Brakk raises, so the turn comes back to you.',
  'Raise doubles the current call target. When any player raises, players who already called must respond again with Call, Raise, or Fold.',
  'Each player can raise up to three times per game. Try raising now.',
  'Round 3 is the final round. Your Role Board is now locked.',
  'Mira is presenting Royal Flush. It may be a bluff, but you should still chase the ♦Q.',
  'Use Random Exchange.',
  'Random Exchange discards up to three random eligible hand cards and draws the same number from the stock. If the stock has fewer cards, it draws as many as possible.',
  'The first time you use Random Exchange, you also draw one extra die card from the stock. Die cards are public and cannot be discarded by Random Exchange.',
  'Exchange one random card. Select 1, then press Confirm.',
  'You gained the ♦Q as a die card. Together with the market, you now have a ♦ Royal Flush. The die card is public, so opponents can see it.',
  'Call and pass the turn.',
  'After Round 3, each player chooses whether to Last Fold before Showdown. If time expires, players continue automatically. If everyone Last Folds, the pot carries into the next game.',
  'Last Fold refunds half your contributed chips if you are not first, but you cannot win the pot. Your hand is still revealed at Showdown.',
  'This time, continue. Click Continue.',
  'After Round 3 comes Showdown. Hands are revealed and points are calculated.',
  'Your best hand is a Royal Flush. It beats Four of a Kind, so you gain the Four of a Kind bonus.',
  'Mira has only a ♣Q High Card. Because her board claimed Royal Flush, she takes a large penalty.',
  'Brakk makes a ♣ Flush. His presented role is also Flush, so he gains the Flush bonus.',
  'You earned the most points and win the whole pot.',
];

const els = {
  setupScreen: document.getElementById('setupScreen'),
  gameScreen: document.getElementById('gameScreen'),
  playerName: document.getElementById('playerName'),
  iconPicker: document.getElementById('iconPicker'),
  memberSlots: document.getElementById('memberSlots'),
  chipModeTab: document.getElementById('chipModeTab'),
  pointModeTab: document.getElementById('pointModeTab'),
  chipModePanel: document.getElementById('chipModePanel'),
  pointModePanel: document.getElementById('pointModePanel'),
  startingChips: document.getElementById('startingChips'),
  startingChipsSlider: document.getElementById('startingChipsSlider'),
  baseBet: document.getElementById('baseBet'),
  baseBetSlider: document.getElementById('baseBetSlider'),
  maxGames: document.getElementById('maxGames'),
  maxGamesSlider: document.getElementById('maxGamesSlider'),
  handCardCount: document.getElementById('handCardCount'),
  handCardCountSlider: document.getElementById('handCardCountSlider'),
  pointsToWin: document.getElementById('pointsToWin'),
  pointsToWinSlider: document.getElementById('pointsToWinSlider'),
  foldWinPoints: document.getElementById('foldWinPoints'),
  foldWinPointsSlider: document.getElementById('foldWinPointsSlider'),
  startButton: document.getElementById('startButton'),
  tutorialButton: document.getElementById('tutorialButton'),
  tableArea: document.getElementById('tableArea'),
  roundLabel: document.getElementById('roundLabel'),
  potLabel: document.getElementById('potLabel'),
  carryLabel: document.getElementById('carryLabel'),
  stockCount: document.getElementById('stockCount'),
  marketCards: document.getElementById('marketCards'),
  seatLayer: document.getElementById('seatLayer'),
  infoLayer: document.getElementById('infoLayer'),
  roundBanner: document.getElementById('roundBanner'),
  humanHand: document.getElementById('humanHand'),
  publicPulse: document.getElementById('publicPulse'),
  actionPanel: document.getElementById('actionPanel'),
  collapsePlayPanel: document.getElementById('collapsePlayPanel'),
  playPanelBody: document.getElementById('playPanelBody'),
  claimBoardDialog: document.getElementById('claimBoardDialog'),
  closeClaimBoard: document.getElementById('closeClaimBoard'),
  claimBoardOptions: document.getElementById('claimBoardOptions'),
  specialControls: document.getElementById('specialControls'),
  specialDetail: document.getElementById('specialDetail'),
  callButton: document.getElementById('callButton'),
  raiseButton: document.getElementById('raiseButton'),
  raiseCounter: document.getElementById('raiseCounter'),
  foldButton: document.getElementById('foldButton'),
  lastFoldPanel: document.getElementById('lastFoldPanel'),
  lastFoldTimer: document.getElementById('lastFoldTimer'),
  lastFoldChoices: document.getElementById('lastFoldChoices'),
  continueButton: document.getElementById('continueButton'),
  lastFoldButton: document.getElementById('lastFoldButton'),
  resultPanel: document.getElementById('resultPanel'),
  finalResultScreen: document.getElementById('finalResultScreen'),
  topGameCount: document.getElementById('topGameCount'),
  roomToast: document.getElementById('roomToast'),
  fullscreenButton: document.getElementById('fullscreenButton'),
  rulesButton: document.getElementById('rulesButton'),
  closeRules: document.getElementById('closeRules'),
  rulesDialog: document.getElementById('rulesDialog'),
  rulesList: document.getElementById('rulesList'),
  quitDialog: document.getElementById('quitDialog'),
  cancelQuitButton: document.getElementById('cancelQuitButton'),
  confirmQuitButton: document.getElementById('confirmQuitButton'),
  roomButton: document.getElementById('roomButton'),
  lobbyDialog: document.getElementById('lobbyDialog'),
  closeLobby: document.getElementById('closeLobby'),
  copyLobbyCode: document.getElementById('copyLobbyCode'),
  lobbyRoomCode: document.getElementById('lobbyRoomCode'),
  lobbyStatus: document.getElementById('lobbyStatus'),
  lobbyNotice: document.getElementById('lobbyNotice'),
  lobbyPlayers: document.getElementById('lobbyPlayers'),
  lobbyReadyButton: document.getElementById('lobbyReadyButton'),
  lobbyStartButton: document.getElementById('lobbyStartButton'),
};

let state = null;
let selectedMode = 'chips';
let localPlayerId = 0;
let setupMemberKinds = ['human', 'cpu', 'cpu', 'none'];
let localSetupReady = true;
let selectedIcon = '🦉';
let selectedHandIndex = null;
let selectedMarketIndex = null;
let specialMode = null;
let panelCollapsed = false;
let lastFoldInterval = null;
let cpuTimers = [];
let roundTransitionTimer = null;
let openingDealTimer = null;
let marketRevealCardId = null;
let stockDrawNextStart = 0;
let fallbackFullscreen = false;
let showdownAnimation = null;
let showdownAnimationToken = 0;
let showdownAnimationTimers = [];
let audioContext = null;
let coinSoundTemplate = null;
let cardSoundTemplate = null;
let foldSoundTemplate = null;
let winSoundTemplate = null;
let failureSoundTemplate = null;
let tutorial = null;
let tutorialCpuTimerDelay = 0;
const handRevealCardIds = new Set();
const peekFlipCardIds = new Set();
const cpuNormalActionPulseIds = new Set();
const openingDealDelayByCardId = new Map();
const humanPanelPositions = {
  cards: null,
  info: null,
};
let activePanelDrag = null;
let activePlayPanelResize = null;
let customPlayPanelHeight = null;

function safeStorageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {}
}

function sanitizeHubRoomCode(value) {
  return String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12);
}

function sanitizeHubPlayerName(value) {
  return String(value || '').replace(/\s+/g, ' ').replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 24);
}

function createStableHubPlayerId(mode, roomCode) {
  const key = `${HUB_GAME_ID}:player-id:${mode || 'local'}:${roomCode || 'local'}`;
  const existing = safeStorageGet(key);
  if (existing) return existing;
  const generated = `${HUB_GAME_ID}-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
  safeStorageSet(key, generated);
  return generated;
}

function resolveHubSession() {
  const params = new URLSearchParams(window.location.search || '');
  const requestedMode = String(params.get('mode') || 'local').toLowerCase();
  const mode = ['local', 'host', 'join'].includes(requestedMode) ? requestedMode : 'local';
  const roomCode = sanitizeHubRoomCode(params.get('room'));
  const playerName = sanitizeHubPlayerName(params.get('name')) || (mode === 'join' ? 'Player 2' : 'Player 1');
  const wsUrl = String(params.get('ws') || '').trim();
  const isRoomPlay = mode === 'host' || mode === 'join';
  return {
    fromHub: params.get('hub') === '1' || params.has('mode') || params.has('room') || params.has('ws'),
    mode,
    isRoomPlay,
    isHost: mode === 'host',
    roomCode: isRoomPlay ? roomCode : '',
    playerName,
    playerId: createStableHubPlayerId(mode, roomCode),
    wsUrl,
    valid: !isRoomPlay || (!!roomCode && !!wsUrl && typeof WebSocket === 'function'),
  };
}

const hub = {
  session: resolveHubSession(),
  socket: null,
  connected: false,
  joined: false,
  room: null,
  started: false,
  ready: false,
  actionCounter: 1,
  processedActions: new Set(),
  heartbeatTimer: null,
  applyingRemote: false,
  lastError: '',
  notice: '',
  noticePlayerId: null,
  noticeTimer: null,
  pendingLeaveNotices: new Map(),
  playerMeta: new Map(),
  setup: null,
  pendingResultSnapshot: null,
};

function makePlayer(id, name, icon, isCpu, chips, color) {
  return {
    id,
    name,
    icon,
    color,
    isCpu,
    chips,
    points: 0,
    hand: [],
    folded: false,
    lastFolded: false,
    allIn: false,
    roundContrib: 0,
    totalContrib: 0,
    responded: false,
    actedThisRound: false,
    normalAction: '',
    specialUsedThisRound: false,
    usedRaise: false,
    raiseUseCount: 0,
    randomExchangeBonusUsed: false,
    pendingClaim: 'none',
    revealedClaim: 'none',
    finalClaim: 'none',
    specialLog: [],
    publicHandCardIds: [],
    lastFoldChoice: null,
    wins: 0,
    tiedWins: 0,
    out: false,
  };
}

function makeMemberSlot(kind, index, hubPlayer = null) {
  const isHostSlot = index === 0;
  const meta = hubPlayer ? hub.playerMeta.get(hubPlayer.id) || {} : {};
  const normalizedKind = isHostSlot && !hub.session.isRoomPlay
    ? 'human'
    : (kind === 'human' || kind === 'none' ? kind : 'cpu');
  const isCpu = normalizedKind === 'cpu';
  const isHuman = normalizedKind === 'human';
  const isLocalHuman = isHuman && (
    hub.session.isRoomPlay
      ? hubPlayer?.id === hub.session.playerId
      : isHostSlot
  );
  return {
    index,
    kind: normalizedKind,
    ready: isCpu || (hub.session.isRoomPlay ? isHostSlot || !!hubPlayer?.ready : !isHuman || localSetupReady),
    name: hubPlayer
      ? isCpu
        ? CPU_NAMES[Math.max(0, index - 1)] || `CPU ${index}`
        : sanitizeHubPlayerName(hubPlayer.name) || `Player ${index + 1}`
      : isCpu
        ? CPU_NAMES[Math.max(0, index - 1)] || `CPU ${index}`
        : isHostSlot
          ? (els.playerName.value || 'You').trim().slice(0, 14) || 'You'
          : isHuman
            ? `Human ${index + 1}`
            : 'Empty',
    icon: hubPlayer
      ? isCpu
        ? CPU_ICONS[Math.max(0, index - 1)] || 'CPU'
        : meta.icon || (isHostSlot ? selectedIcon : (CPU_ICONS[Math.max(0, index - 1)] || '?'))
      : isCpu
        ? CPU_ICONS[Math.max(0, index - 1)] || 'CPU'
        : isHuman
          ? selectedIcon
          : '+',
    hubPlayerId: hubPlayer?.id || null,
    isHostSlot,
    isCpu,
    isHuman,
    isLocalHuman,
  };
}

function currentMemberSlots() {
  const slots = Array.from({ length: MEMBER_SLOT_COUNT }, (_, index) => makeMemberSlot(setupMemberKinds[index] || 'none', index));
  if (!hub.session.isRoomPlay || !hub.room?.players?.length) return slots;
  orderedHubPlayers().forEach((roomPlayer, index) => {
    if (index >= MEMBER_SLOT_COUNT) return;
    const meta = hub.playerMeta.get(roomPlayer.id) || {};
    slots[index] = makeMemberSlot(meta.slotKind || 'human', index, roomPlayer);
  });
  return slots;
}

function renderMemberSlots() {
  if (!els.memberSlots) return;
  const slots = currentMemberSlots();
  const nodes = slots.map(slot => {
    const wrap = document.createElement('div');
    wrap.className = 'member-slot-wrap';

    const button = document.createElement('button');
    button.className = `member-slot member-${slot.kind}`;
    button.type = 'button';
    button.dataset.memberIndex = String(slot.index);
    button.disabled = !canEditMemberSlot(slot);

    const icon = document.createElement('span');
    icon.className = 'member-icon';
    icon.textContent = slot.icon;
    const name = document.createElement('span');
    name.className = 'member-name';
    name.textContent = slot.name;
    const ready = document.createElement('span');
    ready.className = `member-ready ${slot.ready ? 'ready' : ''}`;
    ready.textContent = slot.kind === 'none' ? 'None' : slot.ready ? 'Ready' : 'Not ready';

    button.append(icon, name, ready);
    wrap.appendChild(button);

    const showsReadyButton = slot.isLocalHuman && (!slot.isHostSlot || !hub.session.isRoomPlay);
    if (showsReadyButton) {
      const readyButton = document.createElement('button');
      readyButton.className = `member-ready-button ${slot.ready ? 'ready' : ''}`;
      readyButton.type = 'button';
      readyButton.dataset.readyIndex = String(slot.index);
      readyButton.textContent = slot.ready ? 'Ready' : 'Ready?';
      wrap.appendChild(readyButton);
    }
    return wrap;
  });
  els.memberSlots.replaceChildren(...nodes);
  if (els.startButton && !hub.session.isRoomPlay) {
    els.startButton.disabled = slots.filter(slot => slot.kind !== 'none').length < 2;
  }
}

function canEditMemberSlot(slot) {
  if (!slot) return false;
  if (!hub.session.isRoomPlay && slot.isHostSlot) return false;
  if (!hub.session.isRoomPlay) return true;
  if (slot.hubPlayerId === hub.session.playerId) return true;
  return hub.session.isHost && !slot.hubPlayerId;
}

function cycleMemberSlot(index) {
  const slot = currentMemberSlots()[index];
  if (!canEditMemberSlot(slot)) return;
  if (hub.session.isRoomPlay && slot.hubPlayerId === hub.session.playerId) {
    const current = hub.playerMeta.get(hub.session.playerId)?.slotKind || 'human';
    const order = ['human', 'cpu', 'none'];
    const slotKind = order[(order.indexOf(current) + 1) % order.length] || 'human';
    applyPlayerMetaAction(hub.session.playerId, { icon: selectedIcon, slotKind });
    sendHubAction(HUB_ACTION_TYPES.PLAYER_META, { icon: selectedIcon, slotKind });
    renderMemberSlots();
    renderLobby();
    return;
  }
  const current = setupMemberKinds[index] || 'none';
  const next = MEMBER_SLOT_ORDER[(MEMBER_SLOT_ORDER.indexOf(current) + 1) % MEMBER_SLOT_ORDER.length] || 'cpu';
  setupMemberKinds[index] = next;
  renderMemberSlots();
  publishSetupSync();
}

function activeMemberSlots() {
  return currentMemberSlots().filter(slot => slot.kind !== 'none');
}

function canStartWithCurrentMembers() {
  return activeMemberSlots().length >= 2;
}

function createInitialState(cpuCount, startingChips, baseBet) {
  const humanName = (els.playerName.value || 'You').trim().slice(0, 14) || 'You';
  const players = [makePlayer(0, humanName, selectedIcon, false, startingChips, PLAYER_COLORS[0])];
  for (let i = 0; i < cpuCount; i++) {
    players.push(makePlayer(
      i + 1,
      CPU_NAMES[i] || `CPU ${i + 1}`,
      CPU_ICONS[i] || '🤖',
      true,
      startingChips,
      PLAYER_COLORS[i + 1] || '#d6e2f5',
    ));
  }
  if (hub.session.isRoomPlay && hub.room?.players?.length) {
    players.length = 0;
    orderedHubPlayers().forEach((roomPlayer, index) => {
      const meta = hub.playerMeta.get(roomPlayer.id) || {};
      const player = makePlayer(
        index,
        sanitizeHubPlayerName(roomPlayer.name) || `Player ${index + 1}`,
        meta.icon || (index === 0 ? selectedIcon : (CPU_ICONS[index - 1] || 'CPU')),
        false,
        startingChips,
        PLAYER_COLORS[index] || '#d6e2f5',
      );
      player.hubPlayerId = roomPlayer.id;
      players.push(player);
    });
    localPlayerId = hubSeatForPlayerId(hub.session.playerId);
  }
  players.length = 0;
  currentMemberSlots()
    .filter(slot => slot.kind !== 'none')
    .forEach((slot, id) => {
      const player = makePlayer(id, slot.name, slot.icon, slot.kind === 'cpu', startingChips, PLAYER_COLORS[id] || '#d6e2f5');
      player.hubPlayerId = slot.kind === 'human' ? slot.hubPlayerId : null;
      players.push(player);
    });
  if (hub.session.isRoomPlay) {
    localPlayerId = players.findIndex(player => player.hubPlayerId === hub.session.playerId);
  }
  return {
    players,
    baseBet,
    ante: baseBet,
    carriedPot: 0,
    pot: 0,
    stock: [],
    discard: [],
    market: [],
    marketLocks: [],
    reservedMarket: [],
    round: 0,
    currentPlayerIndex: 0,
    turnOrderStart: 0,
    roundTarget: baseBet,
    gameNumber: 0,
    startingChips,
    maxGames: Number(els.maxGames.value),
    handCardCount: Number(els.handCardCount.value),
    mode: selectedMode,
    pointsToWin: Number(els.pointsToWin.value),
    foldWinPoints: Number(els.foldWinPoints.value),
    phase: 'setup',
    publicActionText: 'Public actions appear here.',
    finalResults: [],
    showdownPayout: null,
    animationSync: emptyAnimationSync(),
    version: 0,
  };
}

function orderedHubPlayers(room = hub.room) {
  const players = Array.isArray(room?.players) ? room.players.slice() : [];
  const hostId = room?.hostId || players[0]?.id || null;
  return players.sort((a, b) => {
    if (a.id === hostId) return -1;
    if (b.id === hostId) return 1;
    return String(a.name || '').localeCompare(String(b.name || ''));
  });
}

function hubSeatForPlayerId(playerId) {
  const index = orderedHubPlayers().findIndex(player => player.id === playerId);
  return index >= 0 ? index : (hub.session.isHost ? 0 : 1);
}

function localPlayer() {
  if (!state) return null;
  if (!hub.session.isRoomPlay) {
    const current = state.players[state.currentPlayerIndex];
    if (current && !current.isCpu) return current;
  }
  return state.players.find(player => player.id === localPlayerId) || null;
}

function isLocalPlayer(player) {
  if (!hub.session.isRoomPlay) return !!player && !player.isCpu;
  return !!player && player.id === localPlayerId;
}

function remoteSeatPosition(player) {
  if (!state?.players?.length || !player) return 1;
  const remotes = state.players.filter(candidate => candidate.id !== localPlayerId);
  return Math.max(1, remotes.findIndex(candidate => candidate.id === player.id) + 1);
}

function hasLocalGameSeat() {
  return !!state?.players?.some(player => player.id === localPlayerId);
}

function remoteSlotCount() {
  return Math.max(1, (state?.players?.length || 1) - (hasLocalGameSeat() ? 1 : 0));
}

function tableSeatSlot(player) {
  if (isLocalPlayer(player)) return 'human';
  return getCpuSeatSlots(remoteSlotCount())[remoteSeatPosition(player) - 1] || 'top';
}

function infoSeatSlot(player) {
  if (isLocalPlayer(player)) return 'human';
  return getInfoSlots(remoteSlotCount())[remoteSeatPosition(player) - 1] || 'top';
}

function isRoomHost() {
  return hub.session.isRoomPlay && hub.session.isHost && !tutorial?.active && !state?.tutorial;
}

function shouldUseHubActions() {
  return hub.session.isRoomPlay && !tutorial?.active && !state?.tutorial;
}

function hubSend(type, payload = {}) {
  if (!hub.socket || hub.socket.readyState !== WebSocket.OPEN) return false;
  hub.socket.send(JSON.stringify({ type, payload }));
  return true;
}

function makeHubAction(type, payload = {}) {
  return {
    id: `${HUB_GAME_ID}-${Date.now().toString(36)}-${hub.actionCounter++}`,
    type,
    playerId: hub.session.playerId,
    seatId: localPlayerId,
    version: state?.version || 0,
    turn: state?.currentPlayerIndex ?? null,
    round: state?.round ?? 0,
    payload,
  };
}

function sendHubAction(type, payload = {}) {
  if (!shouldUseHubActions() || !hub.connected) return false;
  return hubSend(HUB_ROOM_EVENTS.GAME_ACTION, {
    roomCode: hub.session.roomCode,
    action: makeHubAction(type, payload),
  });
}

function bumpVersion() {
  if (state) state.version = (Number(state.version) || 0) + 1;
}

function cloneGameState() {
  return state ? JSON.parse(JSON.stringify(state)) : null;
}

function cloneGameStateForGuests() {
  const snapshot = cloneGameState();
  if (!snapshot) return null;
  snapshot.proofTargetIdsByPlayerId = Object.fromEntries(snapshot.players.map(player => [
    player.id,
    snapshot.players.filter(target => revealProofCards(target, player).length).map(target => target.id),
  ]));
  snapshot.stock = snapshot.stock.map((_, index) => ({ id: `stock-${index}`, hidden: true }));
  snapshot.reservedMarket = snapshot.reservedMarket.map((_, index) => ({ id: `reserved-${index}`, hidden: true }));
  snapshot.players = snapshot.players.map(player => {
    if ((!player.isCpu && player.hubPlayerId && player.hubPlayerId !== hub.room?.hostId) || snapshot.phase === 'result' || snapshot.phase === 'showdown' || snapshot.phase === 'final') return player;
    const publicIds = new Set(player.publicHandCardIds || []);
    return {
      ...player,
      hand: player.hand.map(card => publicIds.has(card.id) ? card : { id: card.id, hidden: true }),
    };
  });
  if (Array.isArray(snapshot.finalResults) && snapshot.phase !== 'result' && snapshot.phase !== 'showdown' && snapshot.phase !== 'final') {
    snapshot.finalResults = [];
  }
  return snapshot;
}

function isRenderableGameState(candidate) {
  return !!candidate
    && Array.isArray(candidate.players)
    && candidate.players.length > 0
    && typeof candidate.phase === 'string'
    && candidate.phase !== 'setup';
}

function publishSnapshot(reason = 'snapshot') {
  if (!isRoomHost() || !hub.connected || !state || state.tutorial || hub.applyingRemote) return;
  bumpVersion();
  const animation = currentAnimationSync();
  sendHubAction(HUB_ACTION_TYPES.SNAPSHOT, {
    reason,
    state: cloneGameStateForGuests(),
    animation,
  });
  clearStateAnimationSync();
}

function applySnapshot(snapshot) {
  if (!snapshot?.state) return;
  if (!isRenderableGameState(snapshot.state)) {
    if (hub.session.isRoomPlay) {
      if (snapshot.reason === 'play_again_setup') returnToSetupWithCurrentSettings();
      prepareRoomSetup();
    }
    return;
  }
  if (!hub.session.isHost && state?.phase === 'showdown' && showdownAnimation && snapshot.state.phase === 'result') {
    hub.pendingResultSnapshot = snapshot;
    return;
  }
  hub.applyingRemote = true;
  clearCpuTimers(true);
  clearShowdownAnimation();
  clearTimeout(openingDealTimer);
  clearTimeout(roundTransitionTimer);
  clearInterval(lastFoldInterval);
  state = snapshot.state;
  applyAnimationSync(snapshot.animation);
  localPlayerId = state.players.findIndex(player => player.hubPlayerId === hub.session.playerId);
  resetSelections();
  document.body.classList.remove('room-setup-visible');
  els.setupScreen.classList.add('hidden');
  els.lobbyDialog?.close();
  els.gameScreen.classList.remove('hidden');
  if (state.phase === 'showdown' && Array.isArray(state.finalResults) && state.finalResults.length) {
    startShowdownAnimation(state.finalResults);
  } else {
    render();
    if (!hub.session.isHost && state.phase === 'lastFold') startLastFoldDisplayTimer();
  }
  hub.applyingRemote = false;
}

function currentAnimationSync() {
  const queued = state?.animationSync || {};
  return {
    handRevealCardIds: [...new Set([...(queued.handRevealCardIds || []), ...Array.from(handRevealCardIds)])],
    peekFlipCardIds: [...new Set([...(queued.peekFlipCardIds || []), ...Array.from(peekFlipCardIds)])],
    normalActionPulseIds: [...new Set([...(queued.normalActionPulseIds || []), ...Array.from(cpuNormalActionPulseIds)])],
    marketRevealCardId: queued.marketRevealCardId || marketRevealCardId,
    openingDealDelays: queued.openingDealDelays || Array.from(openingDealDelayByCardId.entries()).map(([cardId, delay]) => ({ cardId, delay })),
    visualEvents: queued.visualEvents || [],
    soundEvents: queued.soundEvents || [],
  };
}

function applyAnimationSync(animation = {}) {
  handRevealCardIds.clear();
  peekFlipCardIds.clear();
  cpuNormalActionPulseIds.clear();
  const handIds = animation.handRevealCardIds || [];
  const peekIds = animation.peekFlipCardIds || [];
  const actionIds = animation.normalActionPulseIds || [];
  handIds.forEach(id => handRevealCardIds.add(id));
  peekIds.forEach(id => peekFlipCardIds.add(id));
  actionIds.forEach(id => cpuNormalActionPulseIds.add(id));
  marketRevealCardId = animation.marketRevealCardId || null;
  openingDealDelayByCardId.clear();
  (animation.openingDealDelays || []).forEach(entry => {
    if (entry?.cardId !== undefined) openingDealDelayByCardId.set(entry.cardId, Number(entry.delay) || 0);
  });
  if (!hub.session.isHost && (handIds.length || peekIds.length || marketRevealCardId)) playSound('card');
  if (!hub.session.isHost && actionIds.length) {
    const folded = state?.players?.some(player => actionIds.includes(player.id) && player.normalAction === 'Fold');
    playSound(folded ? 'fold' : 'coin');
  }
  if (!hub.session.isHost) {
    (animation.visualEvents || []).forEach(event => {
      if (event?.type === 'bet') animateBetToPot(event.payload?.playerId, event.payload?.amount, event.payload?.action);
      if (event?.type === 'discard') animateDiscardDrop();
      if (event?.type === 'stockDraw') animateStockDraw();
      if (event?.type === 'roundBanner') playRoundBanner(event.payload?.round);
    });
    (animation.soundEvents || []).forEach(event => {
      if (event?.type) playSound(event.type, Number(event.delay) || 0);
    });
  }
}

function emptyAnimationSync() {
  return {
    handRevealCardIds: [],
    peekFlipCardIds: [],
    normalActionPulseIds: [],
    marketRevealCardId: null,
    openingDealDelays: [],
    visualEvents: [],
    soundEvents: [],
  };
}

function noteAnimationSync(kind, value) {
  if (!state) return;
  if (!state.animationSync) state.animationSync = emptyAnimationSync();
  if (kind === 'marketRevealCardId') {
    state.animationSync.marketRevealCardId = value;
    return;
  }
  const list = state.animationSync[kind];
  if (Array.isArray(list) && value !== undefined && !list.includes(value)) list.push(value);
}

function noteVisualAnimation(type, payload = {}) {
  if (!isRoomHost() || !state || hub.applyingRemote) return;
  if (!state.animationSync) state.animationSync = emptyAnimationSync();
  state.animationSync.visualEvents.push({ type, payload });
}

function noteSoundAnimation(type, delay = 0) {
  if (!isRoomHost() || !state || hub.applyingRemote) return;
  if (type === 'win' || type === 'failure') return;
  if (!state.animationSync) state.animationSync = emptyAnimationSync();
  state.animationSync.soundEvents.push({ type, delay });
}

function clearStateAnimationSync() {
  if (!state?.animationSync) return;
  state.animationSync = emptyAnimationSync();
}

function playerForHubAction(action) {
  if (!action?.playerId || !state?.players) return null;
  return state.players.find(player => player.hubPlayerId === action.playerId) || null;
}

function validateSeatAction(action, player) {
  if (!action || !player) return false;
  return !!player.hubPlayerId && player.hubPlayerId === action.playerId;
}

function applyAuthoritativeAction(action) {
  if (!isRoomHost() || !state || hub.processedActions.has(action?.id)) return;
  hub.processedActions.add(action.id);
  const player = playerForHubAction(action);
  if (!validateSeatAction(action, player)) return;
  let changed = false;
  if (action.type === HUB_ACTION_TYPES.CLAIM) {
    changed = applyClaimAction(player, action.payload?.claim);
  } else if (action.type === HUB_ACTION_TYPES.SPECIAL) {
    changed = applySpecialAction(player, action.payload || {});
  } else if (action.type === HUB_ACTION_TYPES.NORMAL) {
    changed = applyNormalAction(player, action.payload?.action);
  } else if (action.type === HUB_ACTION_TYPES.LAST_FOLD) {
    changed = applyLastFoldAction(player, action.payload?.choice);
  } else if (action.type === HUB_ACTION_TYPES.NEXT_GAME && action.payload?.target === 'setup') {
    resetRoomGameToSetup();
    return;
  } else if (action.type === HUB_ACTION_TYPES.NEXT_GAME && state.phase === 'result') {
    startNewGame();
    publishSnapshot('next_game');
    return;
  } else if (action.type === HUB_ACTION_TYPES.NEXT_GAME && state.phase === 'final') {
    resetRoomGameToSetup();
    return;
  } else if (action.type === HUB_ACTION_TYPES.QUIT) {
    endGame('Game ended by the host.');
    changed = true;
  } else if (action.type === HUB_ACTION_TYPES.PLAYER_META) {
    applyPlayerMetaAction(action.playerId, action.payload);
    publishSnapshot('player_meta');
    return;
  } else if (action.type === HUB_ACTION_TYPES.SETUP) {
    applySetupPayload(action.payload);
    publishSetupSync();
    return;
  } else if (action.type === HUB_ACTION_TYPES.REQUEST_SYNC) {
    publishSnapshot('sync_request');
    publishSetupSync();
    return;
  }
  if (changed) publishSnapshot(action.type);
}

function applyClaimAction(player, claim) {
  if (!state || state.phase !== 'round' || state.round > 2) return false;
  if (state.players[state.currentPlayerIndex] !== player || player.actedThisRound) return false;
  if (!CLAIM_BY_KEY[claim]) return false;
  player.pendingClaim = claim;
  pulse(`${player.name} updated their Role Board.`);
  render();
  return true;
}

function applySpecialAction(player, payload) {
  if (!state || state.phase !== 'round' || state.players[state.currentPlayerIndex] !== player || player.actedThisRound) return false;
  const type = payload?.type;
  const specialPayload = payload?.payload || {};
  const ok = useSpecial(player, type, specialPayload);
  if (ok) {
    resetSelections();
    render();
  }
  return ok;
}

function applyNormalAction(player, action) {
  if (!['call', 'raise', 'fold'].includes(action)) return false;
  const before = state?.version || 0;
  normalAction(player, action);
  return !!state && (state.version || 0) === before;
}

function applyLastFoldAction(player, choice) {
  if (!['continue', 'lastFold'].includes(choice)) return false;
  const before = state?.version || 0;
  chooseLastFold(player, choice);
  return !!state && (state.version || 0) === before;
}

function makeDeck() {
  if (tutorial?.active) return makeTutorialDeck();
  let id = 1;
  const deck = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) deck.push({ id: id++, suit, rank });
  }
  return shuffle(deck);
}

function makeTutorialCard(suitIndex, rank, id) {
  return { id, suit: SUITS[suitIndex], rank };
}

function makeTutorialDeck() {
  let id = 1000;
  const c = (suitIndex, rank) => makeTutorialCard(suitIndex, rank, id++);
  const popOrder = [
    c(2, 13), c(1, 9), c(3, 6),
    c(3, 13), c(1, 3), c(3, 8),
    c(1, 6), c(0, 5), c(2, 10),
    c(2, 14), c(0, 7), c(0, 3),
    c(1, 7), c(3, 12), c(0, 6),
    c(3, 14), c(2, 11), c(3, 2),
    c(3, 4), c(0, 8),
    c(1, 14), c(0, 8), c(2, 12),
  ];
  const filler = [];
  for (let i = 2; i <= 14; i++) filler.push(c(i % SUITS.length, i));
  return filler.concat(popOrder.slice().reverse());
}

function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function drawFromStock() {
  animateStockDraw();
  return state.stock.pop() || null;
}

function connectHubRoom() {
  if (!hub.session.isRoomPlay) return;
  els.playerName.value = hub.session.playerName;
  localPlayerId = hub.session.isHost ? 0 : 1;
  prepareRoomSetup();
  openLobbyDialog();
  if (!hub.session.valid) {
    hub.lastError = 'Missing room or WebSocket URL.';
    renderLobby();
    return;
  }
  try {
    hub.socket = new WebSocket(hub.session.wsUrl);
  } catch {
    hub.lastError = 'Could not open the room connection.';
    renderLobby();
    return;
  }
  hub.socket.addEventListener('open', () => {
    hub.connected = true;
    hubSend(HUB_ROOM_EVENTS.JOIN_ROOM, {
      roomCode: hub.session.roomCode,
      playerName: hub.session.playerName,
      gameId: HUB_GAME_ID,
      mode: hub.session.mode,
      player: { id: hub.session.playerId, name: hub.session.playerName },
    });
    hub.heartbeatTimer = setInterval(() => hubSend(HUB_ROOM_EVENTS.HEARTBEAT, { roomCode: hub.session.roomCode }), 15000);
    renderLobby();
  });
  hub.socket.addEventListener('message', event => {
    let message = null;
    try {
      message = JSON.parse(event.data);
    } catch {
      return;
    }
    handleHubMessage(message.type, message.payload || {});
  });
  hub.socket.addEventListener('close', () => {
    hub.connected = false;
    clearInterval(hub.heartbeatTimer);
    if (!hub.session.isHost) {
      hub.lastError = hub.lastError || 'Disconnected from the host room.';
      setRoomNotice(hub.notice || 'Host has left the room.');
    } else {
      setRoomNotice(hub.notice || 'Disconnected from the room.');
    }
  });
  hub.socket.addEventListener('error', () => {
    hub.lastError = 'WebSocket connection failed.';
    renderLobby();
  });
  window.setTimeout(() => {
    if (hub.session.isRoomPlay && !state) prepareRoomSetup();
  }, 0);
  window.setTimeout(() => {
    if (hub.session.isRoomPlay && !state) prepareRoomSetup();
  }, 600);
}

function handleHubMessage(type, payload) {
  if (type === HUB_SERVER_EVENTS.ROOM_JOINED || type === HUB_SERVER_EVENTS.ROOM_STATE) {
    hub.joined = true;
    hub.room = payload.room || hub.room;
    hub.ready = !!hub.room?.players?.find(player => player.id === hub.session.playerId)?.ready;
    localPlayerId = hubSeatForPlayerId(hub.session.playerId);
    if (!state && hub.room?.phase !== 'playing') prepareRoomSetup();
    renderLobby();
    sendPlayerMeta();
    if (hub.session.isHost) publishSetupSync();
    if (!hub.session.isHost) {
      hubSend(HUB_ROOM_EVENTS.SYNC_REQUEST, { roomCode: hub.session.roomCode });
      sendHubAction(HUB_ACTION_TYPES.REQUEST_SYNC);
    }
    return;
  }
  if (type === HUB_SERVER_EVENTS.PLAYER_JOINED || type === HUB_SERVER_EVENTS.PLAYER_LEFT || type === HUB_SERVER_EVENTS.PLAYER_READY) {
    const previousHostId = hub.room?.hostId || orderedHubPlayers()[0]?.id || null;
    const previousPlayers = orderedHubPlayers();
    hub.room = payload.room || hub.room;
    if (type === HUB_SERVER_EVENTS.PLAYER_JOINED) {
      const joinedId = payload.playerId || payload.player?.id || payload.id;
      cancelPendingLeaveNotice(joinedId);
    }
    if (type === HUB_SERVER_EVENTS.PLAYER_LEFT) {
      const leftId = payload.playerId || payload.player?.id || payload.id;
      const leftPlayer = previousPlayers.find(player => player.id === leftId);
      if (leftId && leftId !== hub.session.playerId) {
        queueLeaveNotice(leftId, `${sanitizeHubPlayerName(leftPlayer?.name) || (leftId === previousHostId ? 'Host' : 'Guest')} has left the room.`);
      }
      if (leftId && leftId === previousHostId && leftId !== hub.session.playerId) {
        hub.lastError = 'Host left the room.';
      }
    }
    if (hub.session.isHost && state) window.setTimeout(() => publishSnapshot(type), 60);
    if (hub.session.isHost && !state) window.setTimeout(() => publishSetupSync(), 60);
    renderLobby();
    return;
  }
  if (type === HUB_SERVER_EVENTS.GAME_STARTED) {
    hub.started = true;
    if (hub.session.isHost && !state) startRoomGameAsHost();
    renderLobby();
    return;
  }
  if (type === HUB_SERVER_EVENTS.GAME_ACTION) {
    const action = payload.action;
    if (!action || hub.processedActions.has(action.id)) return;
    if (action.type === HUB_ACTION_TYPES.PLAYER_META) {
      hub.processedActions.add(action.id);
      applyPlayerMetaAction(action.playerId, action.payload);
      renderLobby();
      return;
    }
    if (action.type === HUB_ACTION_TYPES.SETUP) {
      hub.processedActions.add(action.id);
      if (!hub.session.isHost) applySetupPayload(action.payload);
      return;
    }
    if (action.type === HUB_ACTION_TYPES.SNAPSHOT || action.type === HUB_ACTION_TYPES.START_STATE) {
      hub.processedActions.add(action.id);
      if (!hub.session.isHost) applySnapshot(action.payload);
      return;
    }
    if (hub.session.isHost) applyAuthoritativeAction(action);
    return;
  }
  if (type === HUB_SERVER_EVENTS.SYNC_STATE) {
    hub.room = payload.room || hub.room;
    const action = payload.lastAction;
    if (action?.type === HUB_ACTION_TYPES.SNAPSHOT && !hub.session.isHost) applySnapshot(action.payload);
    if (action?.type === HUB_ACTION_TYPES.SETUP && !hub.session.isHost) applySetupPayload(action.payload);
    renderLobby();
    return;
  }
  if (type === HUB_SERVER_EVENTS.ERROR) {
    hub.lastError = payload.message || 'Room error.';
    renderLobby();
    return;
  }
  if (type === HUB_SERVER_EVENTS.ROOM_CLOSED) {
    hub.lastError = payload.message || 'Room closed.';
    setRoomNotice(hub.lastError);
    hub.connected = false;
    hub.started = false;
    prepareRoomSetup();
  }
}

function prepareRoomSetup() {
  document.body.classList.add('room-setup-visible');
  els.setupScreen.classList.remove('hidden');
  els.gameScreen.classList.add('hidden');
  document.body.classList.remove('tutorial-mode');
  els.resultPanel?.classList.add('hidden');
  els.finalResultScreen?.classList.add('hidden');
  els.gameScreen?.classList.remove('final-view');
  els.roomButton?.classList.remove('hidden');
  els.playerName.disabled = true;
  setSetupControlsLocked(!hub.session.isHost);
  renderMemberSlots();
  renderLobby();
}

function renderLobby() {
  if (!hub.session.isRoomPlay || !els.lobbyDialog) return;
  renderMemberSlots();
  const room = hub.room;
  const roomPlayers = orderedHubPlayers(room);
  const hostId = room?.hostId || roomPlayers[0]?.id || null;
  const hostPresent = !!roomPlayers.some(player => player.id === hostId) && !/host left/i.test(hub.lastError || hub.notice || '');
  const players = roomPlayers
    .filter(player => player.id !== hostId || hostPresent)
    .map(player => ({
    ...player,
    ready: player.id === room?.hostId || !!player.ready,
  }));
  const readyCount = players.filter(player => player.ready).length;
  els.lobbyRoomCode.textContent = hub.session.roomCode || '----';
  els.lobbyStatus.textContent = hub.lastError || `${hub.connected ? 'Connected' : 'Connecting'} · ${readyCount}/${Math.max(2, players.length)} ready`;
  if (els.lobbyNotice) {
    els.lobbyNotice.textContent = hub.notice || '';
    els.lobbyNotice.classList.toggle('hidden', !hub.notice);
  }
  els.lobbyPlayers.innerHTML = players.length
    ? players.map((player, index) => `
      <article class="lobby-player-card">
        <span class="lobby-player-icon">${escapeHtml(playerIconForHubPlayer(player, index))}</span>
        <span class="lobby-player-name">${escapeHtml(player.name || `Player ${index + 1}`)} <span>${player.id === hostId ? 'Host' : 'Guest'}</span></span>
        <span class="lobby-player-ready ${player.ready ? 'ready' : ''}">${player.ready ? 'Ready' : 'Not ready'}</span>
      </article>
    `).join('')
    : '<article class="lobby-player-card"><span class="lobby-player-icon">?</span><span class="lobby-player-name">Waiting</span><span class="lobby-player-ready">-</span></article>';
  const canStart = canHostStartRoom();
  els.lobbyStartButton.disabled = !canStart;
  els.startButton.disabled = hub.session.isRoomPlay && (!hub.session.isHost || !canStart);
  els.lobbyStartButton.classList.toggle('hidden', !hub.session.isHost);
  els.lobbyReadyButton.classList.toggle('hidden', hub.session.isHost);
  els.lobbyReadyButton.textContent = hub.ready ? 'Ready' : 'Mark Ready';
}

function startRoomGameAsHost() {
  if (!canStartWithCurrentMembers()) return;
  syncSetupAmount(els.startingChips, els.startingChipsSlider);
  syncSetupAmount(els.baseBet, els.baseBetSlider);
  syncSetupAmount(els.maxGames, els.maxGamesSlider);
  syncSetupAmount(els.handCardCount, els.handCardCountSlider);
  syncSetupAmount(els.pointsToWin, els.pointsToWinSlider);
  syncSetupAmount(els.foldWinPoints, els.foldWinPointsSlider);
  state = createInitialState(0, Number(els.startingChips.value), Number(els.baseBet.value));
  els.lobbyDialog?.close();
  document.body.classList.remove('room-setup-visible');
  els.setupScreen.classList.add('hidden');
  els.gameScreen.classList.remove('hidden');
  startNewGame();
  publishSnapshot(HUB_ACTION_TYPES.START_STATE);
}

function requestRoomStart() {
  if (!hub.session.isHost || !canHostStartRoom()) return;
  sendHubAction(HUB_ACTION_TYPES.SETUP, currentSetupPayload());
  const activeHumanCount = activeMemberSlots().filter(slot => slot.kind === 'human' && slot.hubPlayerId).length;
  if (activeHumanCount < 2) {
    startRoomGameAsHost();
    return;
  }
  hubSend(HUB_ROOM_EVENTS.START_GAME, {
    roomCode: hub.session.roomCode,
    seed: Date.now(),
  });
}

function openLobbyDialog() {
  if (!hub.session.isRoomPlay || !els.lobbyDialog) return;
  renderLobby();
  if (!els.lobbyDialog.open) els.lobbyDialog.showModal();
}

function closeLobbyDialog(event = null) {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  els.lobbyDialog?.close();
}

function setRoomNotice(message) {
  hub.notice = message || '';
  hub.noticePlayerId = null;
  showRoomToast(message);
  if (message) pulse(message);
  renderLobby();
}

function clearRoomNotice() {
  hub.notice = '';
  hub.noticePlayerId = null;
  if (els.roomToast) {
    els.roomToast.classList.remove('show');
    els.roomToast.classList.add('hidden');
  }
  renderLobby();
}

function showRoomToast(message) {
  if (!message || !els.roomToast) return;
  clearTimeout(hub.noticeTimer);
  els.roomToast.textContent = message;
  els.roomToast.classList.remove('hidden');
  els.roomToast.classList.remove('show');
  void els.roomToast.offsetWidth;
  els.roomToast.classList.add('show');
  hub.noticeTimer = window.setTimeout(() => {
    els.roomToast.classList.remove('show');
    els.roomToast.classList.add('hidden');
  }, 2000);
}

function queueLeaveNotice(playerId, message) {
  if (!playerId || !message) return;
  cancelPendingLeaveNotice(playerId);
  const timer = window.setTimeout(() => {
    hub.pendingLeaveNotices.delete(playerId);
    hub.notice = message;
    hub.noticePlayerId = playerId;
    showRoomToast(message);
    pulse(message);
    renderLobby();
  }, 1200);
  hub.pendingLeaveNotices.set(playerId, timer);
}

function cancelPendingLeaveNotice(playerId) {
  if (!playerId) return;
  if (hub.pendingLeaveNotices.has(playerId)) {
    clearTimeout(hub.pendingLeaveNotices.get(playerId));
    hub.pendingLeaveNotices.delete(playerId);
  }
  if (hub.noticePlayerId === playerId) clearRoomNotice();
}

async function copyLobbyCode() {
  const code = hub.session.roomCode || '';
  if (!code) return;
  try {
    await navigator.clipboard?.writeText(code);
    els.lobbyStatus.textContent = `Copied ${code}`;
  } catch {
    els.lobbyStatus.textContent = code;
  }
}

function toggleReady() {
  if (!hub.session.isRoomPlay) {
    localSetupReady = !localSetupReady;
    renderMemberSlots();
    return;
  }
  if (hub.session.isHost) return;
  hub.ready = !hub.ready;
  hubSend(HUB_ROOM_EVENTS.PLAYER_READY, {
    roomCode: hub.session.roomCode,
    playerId: hub.session.playerId,
    ready: hub.ready,
  });
  renderLobby();
}

function currentSetupPayload() {
  return {
    selectedMode,
    startingChips: Number(els.startingChips.value),
    baseBet: Number(els.baseBet.value),
    maxGames: Number(els.maxGames.value),
    handCardCount: Number(els.handCardCount.value),
    pointsToWin: Number(els.pointsToWin.value),
    foldWinPoints: Number(els.foldWinPoints.value),
    memberKinds: setupMemberKinds.slice(),
  };
}

function applySetupPayload(payload = {}) {
  if (!payload || typeof payload !== 'object') return;
  hub.applyingRemote = true;
  setSetupMode(payload.selectedMode === 'points' ? 'points' : 'chips');
  setSetupValue(els.startingChips, els.startingChipsSlider, payload.startingChips);
  setSetupValue(els.baseBet, els.baseBetSlider, payload.baseBet);
  setSetupValue(els.maxGames, els.maxGamesSlider, payload.maxGames);
  setSetupValue(els.handCardCount, els.handCardCountSlider, payload.handCardCount);
  setSetupValue(els.pointsToWin, els.pointsToWinSlider, payload.pointsToWin);
  setSetupValue(els.foldWinPoints, els.foldWinPointsSlider, payload.foldWinPoints);
  if (Array.isArray(payload.memberKinds)) {
    setupMemberKinds = Array.from({ length: MEMBER_SLOT_COUNT }, (_, index) => (
      index === 0 ? 'human' : ['cpu', 'none'].includes(payload.memberKinds[index]) ? payload.memberKinds[index] : 'none'
    ));
    renderMemberSlots();
  }
  hub.setup = currentSetupPayload();
  hub.applyingRemote = false;
}

function setSetupValue(input, slider, value) {
  if (value === undefined || value === null || !input || !slider) return;
  input.value = value;
  syncSetupAmount(input, slider);
}

function publishSetupSync() {
  if (!hub.session.isRoomPlay || !hub.session.isHost || !hub.connected || hub.applyingRemote) return;
  hub.setup = currentSetupPayload();
  sendHubAction(HUB_ACTION_TYPES.SETUP, hub.setup);
}

function sendPlayerMeta() {
  if (!hub.session.isRoomPlay || !hub.connected) return;
  const payload = { icon: selectedIcon, slotKind: hub.playerMeta.get(hub.session.playerId)?.slotKind || 'human' };
  applyPlayerMetaAction(hub.session.playerId, payload);
  sendHubAction(HUB_ACTION_TYPES.PLAYER_META, payload);
}

function applyPlayerMetaAction(playerId, payload = {}) {
  if (!playerId) return;
  const existing = hub.playerMeta.get(playerId) || {};
  const icon = String(payload.icon || existing.icon || '').slice(0, 8);
  const slotKind = ['human', 'cpu', 'none'].includes(payload.slotKind) ? payload.slotKind : existing.slotKind || 'human';
  hub.playerMeta.set(playerId, { ...existing, icon, slotKind });
  renderMemberSlots();
  const player = state?.players?.find(entry => entry.hubPlayerId === playerId);
  if (player && icon) {
    player.icon = icon;
    render();
  }
}

function playerIconForHubPlayer(player, index) {
  return hub.playerMeta.get(player.id)?.icon || (index === 0 ? selectedIcon : (CPU_ICONS[index - 1] || '?'));
}

function setSetupControlsLocked(locked) {
  [
    els.chipModeTab,
    els.pointModeTab,
    els.startingChips,
    els.startingChipsSlider,
    els.baseBet,
    els.baseBetSlider,
    els.maxGames,
    els.maxGamesSlider,
    els.handCardCount,
    els.handCardCountSlider,
    els.pointsToWin,
    els.pointsToWinSlider,
    els.foldWinPoints,
    els.foldWinPointsSlider,
  ].forEach(control => {
    if (control) control.disabled = locked;
  });
  document.querySelectorAll('.setup-reset-button').forEach(button => {
    button.disabled = locked;
  });
  if (els.startButton) {
    els.startButton.disabled = hub.session.isRoomPlay && (!hub.session.isHost || !canHostStartRoom());
  }
}

function canHostStartRoom() {
  const roomPlayers = orderedHubPlayers();
  const hostId = hub.room?.hostId || roomPlayers[0]?.id || null;
  const activeHumans = activeMemberSlots().filter(slot => slot.kind === 'human' && slot.hubPlayerId);
  return hub.session.isHost
    && hub.connected
    && canStartWithCurrentMembers()
    && activeHumans.every(slot => {
      if (slot.hubPlayerId === hostId) return true;
      return !!roomPlayers.find(player => player.id === slot.hubPlayerId)?.ready;
    });
}

function startTable() {
  if (hub.session.isRoomPlay) {
    requestRoomStart();
    return;
  }
  if (!canStartWithCurrentMembers()) {
    els.startButton.title = 'Choose at least two members before starting.';
    return;
  }
  els.startButton.title = '';
  clearCpuTimers();
  tutorial = null;
  document.body.classList.remove('tutorial-mode');
  applyTutorialControlState();
  syncSetupAmount(els.startingChips, els.startingChipsSlider);
  syncSetupAmount(els.baseBet, els.baseBetSlider);
  syncSetupAmount(els.maxGames, els.maxGamesSlider);
  syncSetupAmount(els.handCardCount, els.handCardCountSlider);
  syncSetupAmount(els.pointsToWin, els.pointsToWinSlider);
  syncSetupAmount(els.foldWinPoints, els.foldWinPointsSlider);
  state = createInitialState(0, Number(els.startingChips.value), Number(els.baseBet.value));
  document.body.classList.remove('room-setup-visible');
  els.setupScreen.classList.add('hidden');
  els.gameScreen.classList.remove('hidden');
  startNewGame();
}

function startTutorial() {
  if (hub.session.isRoomPlay && !hub.session.isHost && hub.ready) {
    toggleReady();
  }
  clearCpuTimers();
  const setupMode = selectedMode;
  selectedMode = 'chips';
  tutorial = { active: true, index: 0, allow: null, focus: null, cpuRound2Raised: false };
  state = createInitialState(2, 100, 5);
  state.players = [
    makePlayer(0, (els.playerName.value || 'You').trim().slice(0, 14) || 'You', selectedIcon, false, 100, PLAYER_COLORS[0]),
    makePlayer(1, CPU_NAMES[0] || 'CPU 1', CPU_ICONS[0] || 'CPU', true, 100, PLAYER_COLORS[1]),
    makePlayer(2, CPU_NAMES[1] || 'CPU 2', CPU_ICONS[1] || 'CPU', true, 100, PLAYER_COLORS[2]),
  ];
  localPlayerId = 0;
  selectedMode = setupMode;
  state.tutorial = true;
  state.mode = 'chips';
  state.maxGames = 1;
  state.handCardCount = 5;
  document.body.classList.remove('room-setup-visible');
  els.setupScreen.classList.add('hidden');
  els.gameScreen.classList.remove('hidden');
  ensureTutorialUi();
  document.body.classList.add('tutorial-mode');
  startNewGame();
  setTimeout(() => showTutorialStep(0), 500);
}

function startNewGame() {
  clearCpuTimers();
  clearShowdownAnimation();
  clearTimeout(openingDealTimer);
  resetSelections();
  if (isMatchOver()) {
    endGame(matchOverReason());
    return;
  }
  panelCollapsed = false;
  state.gameNumber += 1;
  state.phase = 'dealing';
  state.pot = state.carriedPot;
  state.discard = [];
  state.market = [];
  state.marketLocks = [];
  state.reservedMarket = [];
  state.round = 1;
  state.roundTarget = state.baseBet;
  state.turnOrderStart = (state.gameNumber - 1) % state.players.length;
  state.currentPlayerIndex = state.turnOrderStart;
  state.finalResults = [];
  state.showdownPayout = null;

  const deck = makeDeck();
  for (const p of state.players) {
    if (isPointMode()) p.chips = state.startingChips;
    const out = p.chips <= 0;
    Object.assign(p, {
      out, hand: [], folded: out, lastFolded: false, allIn: false, roundContrib: 0, totalContrib: 0,
      responded: out, actedThisRound: false, normalAction: '', specialUsedThisRound: false, usedRaise: false, raiseUseCount: 0, randomExchangeBonusUsed: false,
      pendingClaim: 'none', revealedClaim: 'none', finalClaim: 'none', specialLog: [], publicHandCardIds: [], lastFoldChoice: out ? 'out' : null,
    });
  }
  const activePlayers = state.players.filter(p => !p.out);
  openingDealDelayByCardId.clear();
  let dealIndex = 0;
  for (let i = 0; i < state.handCardCount; i++) {
    for (const p of activePlayers) {
      const card = deck.pop();
      p.hand.push(card);
      openingDealDelayByCardId.set(card.id, dealIndex * 115);
      dealIndex += 1;
    }
  }
  for (let i = 0; i < 3; i++) {
    state.market.push(deck.pop());
    state.marketLocks.push(false);
  }
  // These cards are removed before the stock is created. They are guaranteed to appear in rounds 2 and 3.
  state.reservedMarket.push(deck.pop(), deck.pop());
  state.stock = deck;

  collectAnte();
  if (!isPointMode() && !hasPlayerAbleToAct()) {
    endGame('Ante left no player able to act.');
    return;
  }
  prepareRound(1);
  state.phase = 'dealing';
  pulse(`Game ${state.gameNumber} started. Ante ${state.ante}.`);
  render();
  openingDealTimer = setTimeout(() => {
    openingDealDelayByCardId.clear();
    if (!state || state.phase !== 'dealing') return;
    state.phase = 'round';
    render();
    publishSnapshot('dealing_complete');
    maybeCpuTurn();
  }, dealIndex * 115 + 520);
  for (let i = 0; i < dealIndex; i++) playSound('card', i * 115);
}

function collectAnte() {
  for (const p of state.players) {
    if (p.out) continue;
    const paid = Math.min(p.chips, state.ante);
    p.chips -= paid;
    p.totalContrib += paid;
    state.pot += paid;
    if (p.chips === 0) {
      p.allIn = true;
    }
  }
}

function hasPlayerAbleToAct() {
  return state.players.some(player => canPlayerActInRound(player));
}

function prepareRound(round) {
  resetSelections();
  state.phase = 'round';
  state.round = round;
  state.roundTarget = state.baseBet;
  if (round === 2 || round === 3) addReservedMarketCard(round);
  for (const p of state.players) {
    p.roundContrib = 0;
    p.responded = p.out || p.folded;
    p.actedThisRound = false;
    p.normalAction = '';
    p.specialUsedThisRound = false;
    if (round === 1) p.pendingClaim = 'none';
    if (round === 2) p.pendingClaim = p.revealedClaim || 'none';
    if (round === 3) p.pendingClaim = p.finalClaim || p.revealedClaim || 'none';
  }
  state.currentPlayerIndex = findNextActionIndex(state.turnOrderStart);
  if (state.currentPlayerIndex === -1) endRound();
}

function addReservedMarketCard(round) {
  const expectedLength = round === 2 ? 4 : 5;
  if (state.market.length >= expectedLength) return;
  const card = state.reservedMarket.shift();
  if (!card) return;
  state.market.push(card);
  state.marketLocks.push(false);
  marketRevealCardId = card.id;
  noteAnimationSync('marketRevealCardId', card.id);
  playSound('card');
  pulse(`A reserved market card was added for round ${round}.`);
}

function findNextActionIndex(startIndex) {
  const n = state.players.length;
  for (let offset = 0; offset < n; offset++) {
    const idx = (startIndex + offset) % n;
    const p = state.players[idx];
    if (canPlayerActInRound(p) && !p.responded) return idx;
  }
  return -1;
}

function nextTurn(afterIndex) {
  if (countWinnerCandidates(false) <= 1) {
    awardEarlyWin();
    return;
  }
  if (isRoundSettled()) {
    endRound();
    return;
  }
  state.currentPlayerIndex = findNextActionIndex((afterIndex + 1) % state.players.length);
  if (state.currentPlayerIndex === -1) {
    endRound();
    return;
  }
  resetSelections();
  render();
  maybeCpuTurn();
}

function isRoundSettled() {
  return state.players.every(p => !canPlayerActInRound(p) || p.responded);
}

function canPlayerActInRound(player) {
  return !!player && !player.out && !player.folded;
}

function countWinnerCandidates(includeLastFold) {
  return state.players.filter(p => !p.out && !p.folded && (includeLastFold || !p.lastFolded)).length;
}

function endRound() {
  if (state.round === 1 || state.round === 2) {
    for (const p of state.players) {
      p.revealedClaim = p.pendingClaim || 'none';
      if (state.round === 2) p.finalClaim = p.revealedClaim;
    }
    const names = state.players.filter(p => !p.out).map(p => `${p.name}: ${claimLabel(p.revealedClaim)}`).join(' / ');
    pulse(`Round ${state.round} claims revealed: ${names}`);
  }
  if (state.round < 3) {
    beginRoundTransition(state.round + 1);
  } else {
    beginLastFold();
  }
}

function beginRoundTransition(round) {
  clearCpuTimers(false);
  resetSelections();
  state.phase = 'roundTransition';
  noteVisualAnimation('roundBanner', { round });
  playRoundBanner(round);
  render();
  clearTimeout(roundTransitionTimer);
  roundTransitionTimer = setTimeout(() => {
    els.roundBanner.classList.add('hidden');
    els.roundBanner.classList.remove('show');
    prepareRound(round);
    render();
    publishSnapshot(`round_${round}`);
    maybeCpuTurn();
  }, 1000);
}

function playRoundBanner(round) {
  if (!els.roundBanner) return;
  els.roundBanner.textContent = `Round ${round}`;
  els.roundBanner.classList.remove('hidden');
  els.roundBanner.classList.remove('show');
  void els.roundBanner.offsetWidth;
  els.roundBanner.classList.add('show');
  window.setTimeout(() => {
    els.roundBanner.classList.add('hidden');
    els.roundBanner.classList.remove('show');
  }, 1000);
}

function awardEarlyWin() {
  const winner = state.players.find(p => !p.out && !p.folded);
  if (!winner) return;
  if (isPointMode()) {
    awardPointWin([winner], state.foldWinPoints);
  } else {
    winner.chips += state.pot;
    recordPotWinners([winner]);
  }
  state.carriedPot = 0;
  state.phase = 'result';
  state.finalResults = [{ player: winner, early: true }];
  pulse(`${winner.name} wins because everyone else folded.`);
  render();
  publishSnapshot('early_win');
}

function beginLastFold() {
  clearCpuTimers();
  state.phase = 'lastFold';
  state.lastFoldEndsAt = Date.now() + 7000;
  for (const p of state.players) p.lastFoldChoice = p.out ? 'out' : p.folded ? 'folded' : p.allIn ? 'continue' : null;
  updateLastFoldTimerText();
  render();
  if (tutorial?.active) {
    state.players[1].lastFoldChoice = 'lastFold';
    state.players[1].lastFolded = true;
    state.players[2].lastFoldChoice = 'continue';
    render();
    showTutorialStep(42);
    return;
  }
  publishSnapshot('last_fold_started');
  for (const p of state.players.filter(p => p.isCpu && !p.out && !p.folded && !p.allIn)) cpuLastFoldDecision(p);
  clearInterval(lastFoldInterval);
  lastFoldInterval = setInterval(() => {
    const time = updateLastFoldTimerText();
    if (time <= 0) {
      clearInterval(lastFoldInterval);
      finishLastFold();
    }
  }, 1000);
}

function cpuLastFoldDecision(player) {
  if (state.phase !== 'lastFold' || player.lastFoldChoice) return;
  chooseLastFold(player, shouldCpuLastFold(player, state) ? 'lastFold' : 'continue');
}

function chooseLastFold(player, choice) {
  if (state.phase !== 'lastFold' || player.out || player.folded) return;
  if (player.allIn && choice === 'lastFold') return;
  player.lastFoldChoice = choice;
  player.lastFolded = choice === 'lastFold';
  if (choice === 'lastFold') playSound('fold');
  pulse(`${player.name} chose ${choice === 'lastFold' ? 'Last Fold' : 'Continue'}.`);
  if (allLastFoldChoicesMade()) {
    finishLastFold();
    if (player.id === 0) tutorialAdvanceFrom(`lastFold:${choice}`);
    return;
  }
  render();
  if (player.id === 0) tutorialAdvanceFrom(`lastFold:${choice}`);
}

function allLastFoldChoicesMade() {
  return state.players.every(player => player.out || player.folded || !!player.lastFoldChoice);
}

function updateLastFoldTimerText() {
  const fallback = 7;
  const remaining = state?.lastFoldEndsAt
    ? Math.max(0, Math.ceil((state.lastFoldEndsAt - Date.now()) / 1000))
    : fallback;
  if (els.lastFoldTimer) els.lastFoldTimer.textContent = remaining;
  return remaining;
}

function startLastFoldDisplayTimer() {
  clearInterval(lastFoldInterval);
  updateLastFoldTimerText();
  lastFoldInterval = setInterval(() => {
    if (!state || state.phase !== 'lastFold') {
      clearInterval(lastFoldInterval);
      return;
    }
    updateLastFoldTimerText();
  }, 250);
}

function finishLastFold() {
  if (!state || state.phase !== 'lastFold') return;
  clearCpuTimers();
  state.lastFoldEndsAt = null;
  for (const p of state.players) {
    if (!p.out && !p.folded && !p.lastFoldChoice) p.lastFoldChoice = 'continue';
  }
  resolveShowdown();
}

function resolveShowdown() {
  const results = state.players.filter(p => !p.out).map(p => {
    const hand = evaluatePlayerHand(p);
    const claim = ROLE_BY_KEY[p.finalClaim];
    const claimDelta = claimDeltaFor(hand.role, claim);
    return {
      player: p,
      hand,
      claim,
      claimDelta,
      finalScore: hand.role.points + claimDelta,
      candidate: !p.folded && !p.lastFolded,
      showdownGain: 0,
      lastFoldRefund: 0,
    };
  });

  const candidates = results.filter(r => r.candidate);
  state.showdownPayout = null;
  if (isPointMode()) {
    if (candidates.length === 0) {
      pulse('Everyone last-folded. No point awarded.');
    } else {
      const sorted = candidates.sort(compareResults);
      const winner = sorted[0];
      const tied = sorted.filter(r => compareResults(r, winner) === 0);
      const pointValue = candidates.length === 1 ? state.foldWinPoints : 1;
      awardPointWin(tied.map(r => r.player), pointValue);
      pulse(`${tied.map(r => r.player.name).join(', ')} ${tied.length > 1 ? 'score' : 'scores'} ${formatPointValue(pointValue)} point${pointValue === 1 ? '' : 's'}.`);
    }
  } else if (candidates.length === 0) {
    applyLastFoldRefunds(results);
    state.carriedPot = state.pot;
    pulse(`Everyone last-folded. Pot ${state.pot} carries over.`);
  } else {
    applyLastFoldRefunds(results);
    const sorted = candidates.sort(compareResults);
    const winner = sorted[0];
    const tied = sorted.filter(r => compareResults(r, winner) === 0);
    if (tied.length > 1) {
      const share = Math.floor(state.pot / tied.length);
      const remainder = state.pot - share * tied.length;
      tied.forEach(r => r.player.chips += share);
      tied.forEach(r => r.showdownGain += share);
      recordPotWinners(tied.map(r => r.player), true);
      state.carriedPot = remainder;
      pulse(`Tie. ${tied.map(r => r.player.name).join(', ')} split the pot.`);
    } else {
      state.showdownPayout = {
        winnerId: winner.player.id,
        donorIds: results
          .filter(r => r.player.id !== winner.player.id && r.player.totalContrib > 0)
          .map(r => r.player.id),
      };
      winner.player.chips += state.pot;
      winner.showdownGain += state.pot;
      recordPotWinners([winner.player]);
      state.carriedPot = 0;
      pulse(`${winner.player.name} wins the pot with ${winner.finalScore} points.`);
    }
  }
  const chipDeltas = results.map(r => ({
    playerId: r.player.id,
    delta: showdownChipDeltaFor(r),
  })).filter(entry => entry.delta !== 0);
  if (state.showdownPayout) state.showdownPayout.chipDeltas = chipDeltas;
  state.phase = 'result';
  state.finalResults = results;
  startShowdownAnimation(results);
}

function startShowdownAnimation(results) {
  clearShowdownAnimation();
  state.phase = 'showdown';
  const publishedResults = results.filter(canPublishShowdownResult);
  const ranked = publishedResults.slice().sort(compareResults);
  showdownAnimation = {
    results,
    publishedResults,
    revealedHandPlayerIds: new Set(),
    flippingHandPlayerId: null,
    handPointPlayerIds: new Set(),
    activeClaimPlayerId: null,
    claimPointPlayerIds: new Set(),
    scorePanelPlayerIds: new Set(),
    scoreTotalsByPlayerId: new Map(),
    rankPlayerIds: new Set(),
    activeRankPlayerId: null,
    rankIndexByPlayerId: new Map(ranked.map((result, index) => [result.player.id, index])),
  };
  render();
  publishSnapshot('showdown_started');
  playShowdownAnimation(showdownAnimationToken, publishedResults);
}

async function playShowdownAnimation(token, results) {
  if (!await waitForShowdownStep(SHOWDOWN_INTERVAL, token)) return;
  if (tutorial?.active && !await waitForTutorialShowdownPause(45, token)) return;
  for (const result of results) {
    if (!isCurrentShowdownAnimation(token)) return;
    showdownAnimation.revealedHandPlayerIds.add(result.player.id);
    showdownAnimation.flippingHandPlayerId = result.player.id;
    playSound('card');
    render();
    if (!await waitForShowdownStep(SHOWDOWN_CARD_FLIP_TIME + SHOWDOWN_FAST_INTERVAL, token)) return;
    showdownAnimation.flippingHandPlayerId = null;

    showdownAnimation.handPointPlayerIds = new Set([result.player.id]);
    showdownAnimation.scorePanelPlayerIds.add(result.player.id);
    showdownAnimation.scoreTotalsByPlayerId.set(result.player.id, result.hand.role.points);
    render();
    if (!await waitForShowdownStep(SHOWDOWN_POINT_TIME + SHOWDOWN_INTERVAL, token)) return;
    showdownAnimation.handPointPlayerIds.clear();

    showdownAnimation.activeClaimPlayerId = result.player.id;
    showdownAnimation.claimPointPlayerIds = new Set([result.player.id]);
    showdownAnimation.scoreTotalsByPlayerId.set(result.player.id, result.finalScore);
    render();
    if (!await waitForShowdownStep(SHOWDOWN_POINT_TIME + SHOWDOWN_INTERVAL, token)) return;
    showdownAnimation.activeClaimPlayerId = null;
    showdownAnimation.claimPointPlayerIds.clear();
    if (tutorial?.active) {
      const pauseIndexByPlayerId = { 0: 46, 1: 47, 2: 48 };
      const pauseIndex = pauseIndexByPlayerId[result.player.id];
      if (pauseIndex !== undefined && !await waitForTutorialShowdownPause(pauseIndex, token)) return;
    }
  }

  const ranked = results.slice().sort(compareResults);
  for (const result of ranked) {
    if (!isCurrentShowdownAnimation(token)) return;
    showdownAnimation.rankPlayerIds.add(result.player.id);
    showdownAnimation.activeRankPlayerId = result.player.id;
    render();
    if (!await waitForShowdownStep(SHOWDOWN_RANK_TIME + SHOWDOWN_FAST_INTERVAL, token)) return;
  }
  if (tutorial?.active && !await waitForTutorialShowdownPause(49, token)) return;
  showdownAnimation.activeRankPlayerId = null;
  playHumanShowdownResultSound(showdownAnimation.results);

  if (!await waitForShowdownStep(animateShowdownPayout(), token)) return;
  if (!await waitForShowdownStep(SHOWDOWN_INTERVAL, token)) return;
  state.phase = 'result';
  showdownAnimation = null;
  if (!hub.session.isHost && hub.pendingResultSnapshot?.state) {
    state = hub.pendingResultSnapshot.state;
    applyAnimationSync(hub.pendingResultSnapshot.animation);
    hub.pendingResultSnapshot = null;
  }
  render();
  publishSnapshot('showdown_complete');
}

function waitForTutorialShowdownPause(index, token) {
  if (!isCurrentShowdownAnimation(token)) return Promise.resolve(false);
  showTutorialStep(index);
  tutorial.waitingForShowdownPause = true;
  updateTutorialNextButton();
  return new Promise(resolve => {
    tutorial.pauseResolver = () => {
      tutorial.waitingForShowdownPause = false;
      updateTutorialNextButton();
      resolve(isCurrentShowdownAnimation(token));
    };
  });
}

function waitForShowdownStep(delay, token) {
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      showdownAnimationTimers = showdownAnimationTimers.filter(queued => queued !== timer);
      resolve(isCurrentShowdownAnimation(token));
    }, delay);
    showdownAnimationTimers.push(timer);
  });
}

function isCurrentShowdownAnimation(token) {
  return !!state && state.phase === 'showdown' && !!showdownAnimation && showdownAnimationToken === token;
}

function clearShowdownAnimation() {
  showdownAnimationToken += 1;
  showdownAnimationTimers.forEach(timer => clearTimeout(timer));
  showdownAnimationTimers = [];
  showdownAnimation = null;
}

function canPublishShowdownResult(result) {
  return !!result && !result.player.folded;
}

function canPublishShowdownPlayer(player) {
  return !!player && !player.folded;
}

function applyLastFoldRefunds(results) {
  const ranked = results.filter(canPublishShowdownResult).sort(compareResults);
  const first = ranked[0];
  for (const result of ranked) {
    if (!result.player.lastFolded || (first && compareResults(result, first) === 0)) continue;
    const refund = Math.min(state.pot, Math.floor(result.player.totalContrib / 2));
    if (refund <= 0) continue;
    result.player.chips += refund;
    result.showdownGain += refund;
    result.lastFoldRefund = refund;
    state.pot -= refund;
  }
}

function playHumanShowdownResultSound(results) {
  const human = results.find(result => isLocalPlayer(result.player));
  const candidates = results.filter(result => result.candidate);
  if (!human) return;
  if (candidates.length === 0) {
    playSound('failure');
    return;
  }
  const winner = candidates.slice().sort(compareResults)[0];
  const humanWonPot = human.candidate && compareResults(human, winner) === 0;
  playSound(humanWonPot ? 'win' : 'failure');
}

function showdownChipDeltaFor(result) {
  return result.showdownGain - result.player.totalContrib;
}

function recordPotWinners(players, tied = false) {
  for (const player of players) {
    if (tied) player.tiedWins += 1;
    else player.wins += 1;
  }
}

function isMatchOver() {
  if (!state) return false;
  if (isMaxGameLimitReached()) return true;
  if (isPointMode()) return state.players.some(player => player.points >= state.pointsToWin);
  return state.players.filter(player => player.chips > 0).length <= 1;
}

function isMaxGameLimitReached() {
  return !!state && state.maxGames > 0 && state.gameNumber >= state.maxGames;
}

function isPointMode() {
  return state?.mode === 'points';
}

function awardPointWin(players, amount) {
  for (const player of players) player.points += amount;
}

function matchOverReason() {
  if (isMaxGameLimitReached()) return `Game limit of ${state.maxGames} reached.`;
  if (isPointMode()) {
    const leader = state.players.slice().sort((a, b) => b.points - a.points || a.id - b.id)[0];
    return `${leader.name} reached ${formatPointValue(state.pointsToWin)} points.`;
  }
  return 'A player collected every chip.';
}

function formatPointValue(value) {
  return Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function isPlayerOut(player) {
  return !!player?.out;
}

function endGame(reason = 'Game ended.') {
  clearCpuTimers();
  clearShowdownAnimation();
  resetSelections();
  state.phase = 'final';
  state.finalReason = reason;
  render();
}

function compareResults(a, b) {
  if (b.finalScore !== a.finalScore) return b.finalScore - a.finalScore;
  const t = compareTiebreak(a.hand.tiebreak, b.hand.tiebreak);
  if (t !== 0) return t;
  return a.player.id - b.player.id;
}

function claimDeltaFor(actualRole, claim) {
  if (!claim) return 0;
  if (actualRole.rank >= claim.rank) return claim.points;
  return -(claim.points - actualRole.points);
}

function compareTiebreak(a, b) {
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const diff = (b[i] || 0) - (a[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

function normalAction(player, action) {
  if (!state || state.phase !== 'round') return;
  if (state.players[state.currentPlayerIndex] !== player) return;
  if (!canPlayerActInRound(player) || player.actedThisRound) return;
  const idx = state.players.indexOf(player);

  if (player.allIn && action !== 'call') action = 'call';

  if (action === 'fold') {
    player.folded = true;
    player.responded = true;
    player.actedThisRound = true;
    player.normalAction = 'Fold';
    cpuNormalActionPulseIds.add(player.id);
    noteAnimationSync('normalActionPulseIds', player.id);
    playSound('fold');
    pulse(`${player.name} folded.`);
    nextTurn(idx);
    if (player.id === 0) tutorialAdvanceFrom('normal:fold');
    return;
  }

  if (action === 'raise') {
    if (isPointMode()) return;
    const needBeforeRaise = Math.max(0, state.roundTarget - player.roundContrib);
    if ((player.raiseUseCount || 0) >= RAISE_USE_LIMIT || player.chips <= needBeforeRaise) return;
    state.roundTarget *= 2;
    player.usedRaise = true;
    player.raiseUseCount = (player.raiseUseCount || 0) + 1;
    for (const p of state.players) {
      if (!p.folded && p !== player) {
        p.responded = false;
        p.actedThisRound = false;
      }
    }
    payToRoundTarget(player, 'raise');
    player.responded = true;
    player.actedThisRound = true;
    player.normalAction = 'Raise';
    cpuNormalActionPulseIds.add(player.id);
    noteAnimationSync('normalActionPulseIds', player.id);
    pulse(`${player.name} raised. Round call is now ${state.roundTarget}.`);
    nextTurn(idx);
    if (player.id === 0) tutorialAdvanceFrom('normal:raise');
    return;
  }

  if (action === 'call') {
    payToRoundTarget(player, 'call');
    player.responded = true;
    player.actedThisRound = true;
    player.normalAction = player.allIn ? 'All-in' : 'Call';
    cpuNormalActionPulseIds.add(player.id);
    noteAnimationSync('normalActionPulseIds', player.id);
    pulse(`${player.name} ${player.allIn ? 'went all-in' : 'called'}.`);
    nextTurn(idx);
    if (player.id === 0) tutorialAdvanceFrom('normal:call');
  }
}

function payToRoundTarget(player, action = 'call') {
  const need = Math.max(0, state.roundTarget - player.roundContrib);
  const paid = Math.min(player.chips, need);
  if (paid > 0) animateBetToPot(player.id, paid, action);
  player.chips -= paid;
  player.roundContrib += paid;
  player.totalContrib += paid;
  state.pot += paid;
  if (player.chips === 0) player.allIn = true;
}

function useSpecial(player, type, payload = {}) {
  if (!SPECIAL_NAMES[type] || !canPlayerChooseSpecial(player, type)) return false;
  let ok = false;
  if (type === 'exchange') ok = specialExchange(player, payload.handIndex);
  if (type === 'random') ok = specialRandomExchange(player, payload.count);
  if (type === 'peek') ok = specialPeek(player, payload.targetId);
  if (type === 'market') ok = specialMarketSwap(player, payload.handIndex, payload.marketIndex);
  if (ok) {
    player.specialUsedThisRound = true;
    player.specialLog.push(type);
    pulse(`${player.name} used ${SPECIAL_NAMES[type]}.`);
  }
  return ok;
}

function specialExchange(player, handIndex) {
  if (!Number.isInteger(handIndex) || !player.hand[handIndex] || state.stock.length === 0) return false;
  const old = player.hand[handIndex];
  const next = drawFromStock();
  player.hand[handIndex] = next;
  queueHandReveal(next);
  state.discard.push(old);
  animateDiscardDrop();
  clearPublicHandCard(player, old.id);
  return true;
}

function specialRandomExchange(player, count) {
  const eligibleIndices = randomExchangeEligibleIndices(player);
  const bonusAvailable = !player.randomExchangeBonusUsed;
  const stockReservedForBonus = bonusAvailable ? 1 : 0;
  const max = Math.min(eligibleIndices.length, RANDOM_EXCHANGE_CARD_LIMIT, state.stock.length - stockReservedForBonus);
  if (max <= 0) return false;
  const n = Math.max(1, Math.min(Number(count) || 1, max));
  const indices = tutorial?.active && !player.isCpu ? eligibleIndices.slice(-n) : shuffle(eligibleIndices).slice(0, n);
  for (const index of indices) {
    const old = player.hand[index];
    const next = drawFromStock();
    player.hand[index] = next;
    queueHandReveal(next);
    state.discard.push(old);
    animateDiscardDrop();
    clearPublicHandCard(player, old.id);
  }
  if (bonusAvailable && state.stock.length > 0) {
    const extra = drawFromStock();
    extra.randomExchangeLocked = true;
    player.randomExchangeBonusUsed = true;
    player.hand.push(extra);
    makePublicHandCard(player, extra);
    queueHandReveal(extra);
  }
  return true;
}

function randomExchangeEligibleIndices(player) {
  return player.hand
    .map((card, index) => ({ card, index }))
    .filter(entry => !entry.card.randomExchangeLocked)
    .map(entry => entry.index);
}

function specialPeek(player, targetId) {
  const target = state.players.find(p => p.id === Number(targetId));
  const cards = revealProofCards(target, player);
  if (!cards.length) return false;
  const tutorialCard = tutorial?.active && !player.isCpu && target?.id === 2
    ? cards.find(candidate => candidate.rank === 8 && candidate.suit === SUITS[3])
    : null;
  const card = tutorialCard || cards[Math.floor(Math.random() * cards.length)];
  makePublicHandCard(target, card);
  queuePeekFlip(card);
  if (!player.isCpu) pulse(`${player.name} revealed ${target.name}'s proof: ${cardLabel(card)}.`);
  return true;
}

function specialMarketSwap(player, handIndex, marketIndex) {
  if (!Number.isInteger(handIndex) || !Number.isInteger(marketIndex)) return false;
  if (!player.hand[handIndex] || !state.market[marketIndex] || state.marketLocks[marketIndex]) return false;
  const oldHand = player.hand[handIndex];
  const oldMarket = state.market[marketIndex];
  player.hand[handIndex] = oldMarket;
  state.market[marketIndex] = oldHand;
  queueHandReveal(oldMarket);
  state.marketLocks[marketIndex] = true;
  clearPublicHandCard(player, oldHand.id);
  return true;
}

function clearPublicHandCard(player, cardId) {
  if (!player?.publicHandCardIds) return;
  player.publicHandCardIds = player.publicHandCardIds.filter(id => id !== cardId);
}

function makePublicHandCard(player, card) {
  if (!player || !card) return;
  if (!player.publicHandCardIds.includes(card.id)) player.publicHandCardIds.push(card.id);
}

function queueHandReveal(card) {
  if (card) handRevealCardIds.add(card.id);
  if (card) noteAnimationSync('handRevealCardIds', card.id);
  if (card) playSound('card');
}

function queuePeekFlip(card) {
  if (card) peekFlipCardIds.add(card.id);
  if (card) noteAnimationSync('peekFlipCardIds', card.id);
  if (card) playSound('card');
}

function clearQueuedCardAnimations() {
  handRevealCardIds.clear();
  peekFlipCardIds.clear();
}

function maybeCpuTurn() {
  if (hub.session.isRoomPlay && !isRoomHost()) return;
  if (tutorial?.active) return;
  clearCpuTimers(false);
  if (!state || state.phase !== 'round') return;
  const player = state.players[state.currentPlayerIndex];
  if (!player || !player.isCpu) return;
  cpuTimers.push(setTimeout(() => runCpuTurn(player), 650 + Math.random() * 650));
}

function runCpuTurn(player) {
  if (!state || state.phase !== 'round' || state.players[state.currentPlayerIndex] !== player || player.out) return;
  if (state.round <= 3 && !player.actedThisRound) {
    if (state.round <= 2) player.pendingClaim = chooseCpuClaim(player);
    const special = chooseCpuSpecial(player);
    if (special) useSpecial(player, special.type, special.payload);
  }
  normalAction(player, chooseCpuNormal(player));
  if (isRoomHost()) publishSnapshot('cpu_turn');
}

function cpuPersonality(player) {
  const key = player.cpuPersonality || CPU_PERSONALITY_BY_NAME[player.name] || CPU_PERSONALITY_KEYS[(player.id - 1) % CPU_PERSONALITY_KEYS.length];
  return CPU_PERSONALITY_PROFILES[key] || CPU_PERSONALITY_PROFILES.cautious;
}

function activeOpponentsOf(player, gameState = state) {
  return gameState.players.filter(p => p.id !== player.id && !p.out && !p.folded);
}

// Central CPU model. Opponent estimates only use public data: claims, market cards,
// public proof cards, chip pressure, prior raises, and visible special action history.
function evaluateCpuSituation(player, gameState = state) {
  const personality = cpuPersonality(player);
  const ownEval = evaluatePlayerHand(player);
  const ownClaim = CLAIM_BY_KEY[player.pendingClaim] || CLAIM_BY_KEY[player.revealedClaim] || CLAIM_BY_KEY.none;
  const ownClaimRisk = estimateClaimRisk(player, ownClaim, gameState);
  const ownClaimConfidence = claimConfidenceFromRisk(ownClaim, ownClaimRisk, ownEval.role);
  const bestMarket = findBestMarketSwap(player, gameState);
  const bestPossibleRoleAfterKnownActions = bestMarket
    ? evaluatePlayerHand(player, simulatedMarketSwap(player, bestMarket.handIndex, bestMarket.marketIndex, gameState).hand, simulatedMarketSwap(player, bestMarket.handIndex, bestMarket.marketIndex, gameState).market).role
    : ownEval.role;
  const requiredPayment = Math.max(0, gameState.roundTarget - player.roundContrib);
  const currentRewardValue = gameState.pot + gameState.carriedPot + requiredPayment;
  const chipPressure = isPointMode() ? 0.2 : clamp(requiredPayment / Math.max(1, player.chips + requiredPayment), 0, 1);
  const threatScores = activeOpponentsOf(player, gameState).map(opponent => estimateOpponentThreat(opponent, gameState, player));
  const strongestOpponentThreat = threatScores.slice().sort((a, b) => b.threatScore - a.threatScore)[0] || null;
  const winChance = estimateWinChance(player, gameState, { ownEval, ownClaim, threatScores, personality });
  const bluffOpportunity = estimateBluffOpportunity(player, gameState, { ownEval, ownClaim, ownClaimRisk, threatScores, personality });
  const valueRaiseOpportunity = estimateValueRaiseOpportunity(player, gameState, { ownEval, ownClaim, ownClaimRisk, threatScores, winChance, personality });
  const lastFoldRisk = estimateLastFoldRisk(player, gameState, { ownEval, ownClaim, ownClaimRisk, strongestOpponentThreat, winChance, personality });
  const shouldProtectChips = !isPointMode() && (chipPressure > 0.45 || player.chips <= gameState.baseBet * 3);
  const specialActionRecommendations = evaluateSpecialActionRecommendations(player, gameState, {
    ownEval,
    ownClaim,
    bestMarket,
    threatScores,
    strongestOpponentThreat,
    bluffOpportunity,
    personality,
  });

  return {
    personality,
    ownRole: ownEval.role,
    ownRolePoints: ownEval.role.points,
    ownEval,
    ownClaim,
    ownClaimRisk,
    ownClaimConfidence,
    bestPossibleRoleAfterKnownActions,
    potValue: currentRewardValue,
    currentRewardValue,
    requiredPayment,
    roundNumber: gameState.round,
    chipPressure,
    lastFoldRisk,
    shouldProtectChips,
    threatScores,
    strongestOpponentThreat,
    bluffOpportunity,
    valueRaiseOpportunity,
    specialActionRecommendations,
    winChance,
  };
}

function chooseCpuClaim(player) {
  const situation = evaluateCpuSituation(player, state);
  const actualRank = situation.ownRole.rank;
  const projectedRank = Math.max(actualRank, situation.bestPossibleRoleAfterKnownActions.rank);
  const threat = situation.strongestOpponentThreat?.threatScore || 0;
  const chipFear = situation.shouldProtectChips ? 0.14 : 0;
  const noClaimChance = clamp(
    0.05 + chipFear + (actualRank <= 0 ? 0.08 : 0) + threat * 0.08 - situation.personality.riskTolerance * 0.08,
    0.02,
    0.34,
  );
  if (Math.random() < noClaimChance) return 'none';

  const bluffChance = clamp(
    situation.personality.bluffRate +
      situation.bluffOpportunity * 0.22 +
      (state.round === 1 ? 0.06 : -0.02) -
      situation.chipPressure * 0.18 -
      threat * 0.08 -
      situation.personality.claimHonesty * 0.14,
    0.02,
    0.46,
  );
  const defensiveLowChance = clamp(
    0.08 + situation.chipPressure * 0.28 + threat * 0.12 + situation.personality.foldDiscipline * 0.12,
    0.03,
    0.42,
  );

  let mode = 'honest';
  const roll = Math.random();
  if (roll < defensiveLowChance && actualRank > 0) mode = 'defensiveLow';
  else if (roll < defensiveLowChance + bluffChance * 0.72) mode = 'smallBluff';
  else if (roll < defensiveLowChance + bluffChance && situation.bluffOpportunity > 0.5) mode = 'largeBluff';

  let targetRank = projectedRank;
  if (mode === 'defensiveLow') targetRank = Math.max(0, actualRank - 1);
  if (mode === 'smallBluff') targetRank = Math.min(9, projectedRank + 1);
  if (mode === 'largeBluff') targetRank = Math.min(9, projectedRank + 2 + (situation.personality.riskTolerance > 0.65 ? 1 : 0));

  let claim = ROLE_ORDER.find(r => r.rank === targetRank) || ROLE_BY_KEY.high;
  while (claim.rank > 0 && estimateClaimRisk(player, claim, state) > 10 + situation.personality.riskTolerance * 12) {
    claim = ROLE_ORDER[claim.rank - 1];
  }
  return claim.key;
}

function chooseCpuSpecial(player) {
  if (player.specialUsedThisRound || player.actedThisRound) return null;
  const situation = evaluateCpuSituation(player, state);
  for (const rec of situation.specialActionRecommendations) {
    if (canPlayerChooseSpecial(player, rec.type) && Math.random() < rec.chance) return { type: rec.type, payload: rec.payload };
  }
  return null;
}

function chooseCpuNormal(player) {
  if (player.allIn) return 'call';
  const situation = evaluateCpuSituation(player, state);
  const need = Math.max(0, state.roundTarget - player.roundContrib);
  if (isPointMode()) {
    const pointFoldChance = clamp(
      0.08 + situation.lastFoldRisk * 0.34 + (situation.strongestOpponentThreat?.threatScore || 0) * 0.08 - situation.winChance * 0.2,
      0,
      0.64,
    );
    if (state.round < 3 && Math.random() < pointFoldChance) return 'fold';
    return 'call';
  }

  const continueEV = situation.winChance * situation.currentRewardValue - (1 - situation.winChance) * need;
  const foldEV = need;
  const pressureValue = situation.bluffOpportunity * state.baseBet * (0.8 + situation.personality.raiseAggression);
  const valueGain = situation.valueRaiseOpportunity * state.baseBet * (1.2 + situation.personality.raiseAggression);
  const raiseRisk = (1 - situation.winChance) * state.roundTarget * (1.1 - situation.personality.riskTolerance * 0.45);
  const raiseEV = pressureValue + valueGain - raiseRisk;
  const canRaise = (player.raiseUseCount || 0) < RAISE_USE_LIMIT && player.chips > need && state.roundTarget > 0;
  const raiseChance = clamp(
    0.03 + raiseEV / Math.max(1, state.baseBet * 5) + situation.personality.raiseAggression * 0.12,
    0.02,
    0.78,
  );
  if (canRaise && raiseEV > -state.baseBet * 0.35 && Math.random() < raiseChance) return 'raise';

  const foldChance = clamp(
    0.05 +
      (foldEV - continueEV) / Math.max(1, state.baseBet * 5) +
      situation.chipPressure * 0.28 +
      situation.lastFoldRisk * 0.18 +
      situation.personality.foldDiscipline * 0.16 -
      situation.personality.riskTolerance * 0.12,
    0.02,
    0.86,
  );
  if (state.round < 3 && need > 0 && Math.random() < foldChance) return 'fold';
  return 'call';
}

function claimConfidenceFromRisk(claim, risk, actualRole) {
  if (!claim || claim.key === 'none') return 0.64;
  return clamp(0.82 - risk / 28 + Math.max(0, actualRole.rank - claim.rank) * 0.05, 0.08, 0.96);
}

function estimateClaimRisk(player, claim, gameState = state) {
  if (!claim || claim.key === 'none') return 0;
  const actual = evaluatePlayerHand(player).role;
  const missPenalty = Math.max(0, claim.points - actual.points);
  const rankGap = Math.max(0, claim.rank - actual.rank);
  const visibleSupport = estimateVisibleProofStrength(player, claim, gameState);
  return Math.max(0, missPenalty + rankGap * 1.4 - visibleSupport * 3.5);
}

function publicCardsFor(player) {
  return player.hand.filter(card => isPublicHandCard(player, card));
}

function estimateVisibleProofStrength(player, claim, gameState = state) {
  if (!claim || claim.key === 'none') return 0;
  const visible = [...publicCardsFor(player), ...gameState.market];
  if (!visible.length) return 0;
  const counts = countRanks(visible);
  const maxSameRank = Math.max(0, ...Object.values(counts));
  const suitCounts = visible.reduce((acc, card) => {
    acc[card.suit] = (acc[card.suit] || 0) + 1;
    return acc;
  }, {});
  const maxSuit = Math.max(0, ...Object.values(suitCounts));
  const straightRun = longestVisibleStraightRun(visible.map(card => card.rank));
  const pairCount = Object.values(counts).filter(count => count >= 2).length;
  let support = 0;

  if (claim.rank <= 0) support = visible.length ? 0.2 : 0;
  else if (claim.key === 'pair') support = maxSameRank >= 2 ? 0.82 : maxSameRank * 0.22;
  else if (claim.key === 'twoPair') support = pairCount >= 2 ? 0.9 : pairCount * 0.42 + maxSameRank * 0.08;
  else if (claim.key === 'three') support = maxSameRank >= 3 ? 0.92 : maxSameRank * 0.24;
  else if (claim.key === 'straight') support = straightRun >= 5 ? 0.92 : straightRun * 0.15;
  else if (claim.key === 'flush') support = maxSuit >= 5 ? 0.94 : maxSuit * 0.14;
  else if (claim.key === 'fullHouse') support = (maxSameRank >= 3 && pairCount >= 1) ? 0.92 : maxSameRank * 0.16 + pairCount * 0.16;
  else if (claim.key === 'four') support = maxSameRank >= 4 ? 0.94 : maxSameRank * 0.18;
  else if (claim.key === 'straightFlush' || claim.key === 'royalFlush') support = Math.max(maxSuit * 0.08 + straightRun * 0.1, 0.18);

  return clamp(support + Math.min(publicCardsFor(player).length, 3) * 0.08, 0, 1);
}

function longestVisibleStraightRun(ranks) {
  const unique = [...new Set(ranks.includes(14) ? [...ranks, 1] : ranks)].sort((a, b) => a - b);
  let best = 0;
  let run = 0;
  let previous = null;
  for (const rank of unique) {
    run = previous === null || rank === previous + 1 ? run + 1 : 1;
    best = Math.max(best, run);
    previous = rank;
  }
  return best;
}

function estimateOpponentThreat(opponent, gameState = state, viewer = null) {
  const claimKey = publicOpponentClaimKey(opponent, gameState);
  const claimedRole = CLAIM_BY_KEY[claimKey] || CLAIM_BY_KEY.none;
  const visibleProofStrength = estimateVisibleProofStrength(opponent, claimedRole, gameState);
  const priorClaim = CLAIM_BY_KEY[opponent.revealedClaim] || CLAIM_BY_KEY.none;
  const suddenRaise = Math.max(0, claimedRole.rank - priorClaim.rank);
  const aggressiveRaise = opponent.usedRaise || (opponent.raiseUseCount || 0) > 0 || opponent.roundContrib > gameState.baseBet || opponent.totalContrib > gameState.baseBet * gameState.round;
  const highClaimPoorSupport = claimedRole.rank >= 4 && visibleProofStrength < 0.42;
  const claimTrust = clamp(
    0.28 + visibleProofStrength * 0.48 + (aggressiveRaise ? 0.1 : 0) - suddenRaise * 0.07 - (highClaimPoorSupport ? 0.18 : 0),
    0.06,
    0.94,
  );
  const bluffSuspicion = clamp(
    0.18 + (1 - visibleProofStrength) * 0.36 + suddenRaise * 0.08 + (highClaimPoorSupport ? 0.24 : 0) - (aggressiveRaise ? 0.05 : 0),
    0.02,
    0.92,
  );
  const visiblePotential = estimateVisiblePotentialPoints(opponent, gameState);
  const claimedRolePoints = claimedRole.points || 0;
  const threatScore = clamp(
    (claimedRolePoints / 76) * claimTrust + (visiblePotential / 76) * 0.35 + (aggressiveRaise ? 0.08 : 0) - bluffSuspicion * 0.12,
    0,
    1,
  );

  return {
    player: opponent,
    claimedRole,
    claimedRolePoints,
    visibleProofStrength,
    claimTrust,
    bluffSuspicion,
    threatScore,
    isLikelyAhead: viewer ? threatScore > estimateViewerStrength(viewer, gameState) : threatScore > 0.48,
    isGoodRevealTarget: claimedRole.key !== 'none' && claimedRole.rank >= 2 && (threatScore > 0.32 || bluffSuspicion > 0.48),
  };
}

function publicOpponentClaimKey(opponent, gameState = state) {
  if (gameState.phase === 'lastFold' || gameState.phase === 'showdown' || gameState.phase === 'result' || gameState.round === 3) {
    return opponent.finalClaim || opponent.revealedClaim || 'none';
  }
  return opponent.revealedClaim || 'none';
}

function estimateVisiblePotentialPoints(player, gameState = state) {
  const visible = [...publicCardsFor(player), ...gameState.market];
  if (visible.length < 5) {
    const counts = countRanks(visible);
    const maxSameRank = Math.max(0, ...Object.values(counts));
    return maxSameRank >= 3 ? ROLE_BY_KEY.three.points : maxSameRank >= 2 ? ROLE_BY_KEY.pair.points : 0;
  }
  return Math.max(...fiveCardChoices(visible).map(cards => evaluateHand(cards).role.points));
}

function estimateViewerStrength(player, gameState = state) {
  const role = evaluatePlayerHand(player).role;
  const claim = CLAIM_BY_KEY[player.pendingClaim] || CLAIM_BY_KEY.none;
  return clamp((role.points + Math.max(0, claim.points - estimateClaimRisk(player, claim, gameState) * 0.6)) / 76, 0, 1);
}

function estimateWinChance(player, gameState = state, context = {}) {
  const ownEval = context.ownEval || evaluatePlayerHand(player);
  const ownClaim = context.ownClaim || CLAIM_BY_KEY[player.pendingClaim] || CLAIM_BY_KEY.none;
  const claimRisk = estimateClaimRisk(player, ownClaim, gameState);
  const claimValue = Math.max(0, ownClaim.points - claimRisk * 0.72);
  const ownScore = ownEval.role.points + claimValue * 0.32;
  const strongestThreat = Math.max(0, ...(context.threatScores || []).map(t => t.threatScore * 76));
  const confidence = (ownScore - strongestThreat) / 38;
  const personality = context.personality || cpuPersonality(player);
  return clamp(0.5 + confidence * 0.35 + personality.riskTolerance * 0.08 - claimRisk / 120, 0.05, 0.92);
}

function estimateBluffOpportunity(player, gameState = state, context = {}) {
  const weakOpponents = (context.threatScores || []).filter(t => t.threatScore < 0.34 || t.bluffSuspicion > 0.58).length;
  const opponentCount = Math.max(1, (context.threatScores || []).length);
  const ownClaim = context.ownClaim || CLAIM_BY_KEY[player.pendingClaim] || CLAIM_BY_KEY.none;
  const visibleSupport = estimateVisibleProofStrength(player, ownClaim, gameState);
  const claimRisk = context.ownClaimRisk ?? estimateClaimRisk(player, ownClaim, gameState);
  const ownRole = context.ownEval?.role || evaluatePlayerHand(player).role;
  return clamp(
    weakOpponents / opponentCount * 0.42 + visibleSupport * 0.32 + (ownRole.rank >= 1 ? 0.12 : 0) - claimRisk / 58,
    0,
    1,
  );
}

function estimateValueRaiseOpportunity(player, gameState = state, context = {}) {
  const ownRole = context.ownEval?.role || evaluatePlayerHand(player).role;
  const strongestThreat = context.threatScores?.slice().sort((a, b) => b.threatScore - a.threatScore)[0];
  const lead = ownRole.points / 76 - (strongestThreat?.threatScore || 0);
  const claimSafe = 1 - Math.min(1, (context.ownClaimRisk || 0) / 24);
  return clamp(lead * 1.4 + (context.winChance || 0.5) * 0.45 + claimSafe * 0.16, 0, 1);
}

function estimateLastFoldRisk(player, gameState = state, context = {}) {
  const threat = context.strongestOpponentThreat?.threatScore || 0;
  const ownRole = context.ownEval?.role || evaluatePlayerHand(player).role;
  const claimRisk = context.ownClaimRisk ?? estimateClaimRisk(player, context.ownClaim, gameState);
  return clamp(threat * 0.42 + claimRisk / 36 + (ownRole.rank <= 1 ? 0.2 : 0) - (context.winChance || 0.5) * 0.22, 0, 1);
}

function evaluateSpecialActionRecommendations(player, gameState = state, context = {}) {
  const recommendations = [];
  const personality = context.personality || cpuPersonality(player);
  const currentRole = context.ownEval?.role || evaluatePlayerHand(player).role;
  const bestMarket = context.bestMarket || findBestMarketSwap(player, gameState);
  const revealTarget = findBestRevealTarget(player, gameState, context.threatScores || []);
  const randomCount = Math.min(
    currentRole.rank <= 1 ? 3 : 2,
    randomExchangeEligibleIndices(player).length,
    4,
    gameState.stock.length - (player.randomExchangeBonusUsed ? 0 : 1),
  );

  if (bestMarket) {
    const value = bestMarket.gain * 0.18 + (bestMarket.blockValue || 0) * (0.08 + personality.defensivePlay * 0.12) + personality.marketGreed * 0.12;
    recommendations.push({
      type: 'market',
      payload: bestMarket,
      chance: clamp(0.18 + value, 0.08, 0.86),
      score: value,
    });
  }
  if (revealTarget) {
    const value = revealTarget.threatScore * 0.42 + revealTarget.bluffSuspicion * 0.34 + personality.proofAggression * 0.2;
    recommendations.push({
      type: 'peek',
      payload: { targetId: revealTarget.player.id },
      chance: clamp(0.12 + value, 0.08, 0.78),
      score: value,
    });
  }
  if (randomCount > 0) {
    const needImprove = currentRole.rank <= 1 ? 0.45 : currentRole.rank <= 2 ? 0.2 : 0;
    const supportClaim = context.ownClaim && context.ownClaim.rank > currentRole.rank ? 0.18 : 0;
    recommendations.push({
      type: 'random',
      payload: { count: Math.max(1, randomCount) },
      chance: clamp(needImprove + supportClaim + (1 - personality.riskTolerance) * 0.12, 0.04, 0.66),
      score: needImprove + supportClaim,
    });
  }
  if (gameState.stock.length > 0) {
    const exchangeValue = (currentRole.rank <= 2 ? 0.24 : 0.08) + (context.ownClaim?.rank > currentRole.rank ? 0.14 : 0);
    recommendations.push({
      type: 'exchange',
      payload: { handIndex: findWorstCardIndex(player.hand) },
      chance: clamp(exchangeValue + (1 - personality.riskTolerance) * 0.1, 0.05, 0.52),
      score: exchangeValue,
    });
  }

  return recommendations.sort((a, b) => b.score - a.score);
}

function findBestRevealTarget(player, gameState = state, threatScores = null) {
  return (threatScores || activeOpponentsOf(player, gameState).map(opponent => estimateOpponentThreat(opponent, gameState, player)))
    .filter(threat => threat.isGoodRevealTarget && threat.player.hand.length > 0)
    .sort((a, b) => (b.threatScore + b.bluffSuspicion * 0.75) - (a.threatScore + a.bluffSuspicion * 0.75))[0] || null;
}

function shouldCpuLastFold(player, gameState = state) {
  const situation = evaluateCpuSituation(player, gameState);
  const continueEV = situation.winChance * situation.currentRewardValue - situation.ownClaimRisk * 0.45;
  const lastFoldEV = situation.personality.foldDiscipline * gameState.baseBet * 0.08 - situation.potValue * 0.08;
  const lastFoldChance = clamp(
    0.06 +
      (lastFoldEV - continueEV) / Math.max(1, gameState.baseBet * 8) +
      situation.lastFoldRisk * 0.46 +
      situation.chipPressure * 0.2 -
      situation.winChance * 0.22,
    0.02,
    0.88,
  );
  return Math.random() < lastFoldChance;
}

function findBestMarketSwap(player, gameState = state) {
  const base = evaluatePlayerHand(player).role.points;
  let best = null;
  for (let m = 0; m < gameState.market.length; m++) {
    if (gameState.marketLocks[m]) continue;
    for (let h = 0; h < player.hand.length; h++) {
      const test = simulatedMarketSwap(player, h, m, gameState);
      const points = evaluatePlayerHand(player, test.hand, test.market).role.points;
      const gain = points - base;
      const blockValue = estimateMarketBlockValue(player, m, gameState);
      const score = gain * 2 + blockValue;
      if ((gain > 0 || blockValue > 1.2) && (!best || score > best.score)) best = { handIndex: h, marketIndex: m, gain, blockValue, score };
    }
  }
  return best;
}

function estimateMarketBlockValue(player, marketIndex, gameState = state) {
  const card = gameState.market[marketIndex];
  if (!card) return 0;
  return activeOpponentsOf(player, gameState).reduce((sum, opponent) => {
    const claim = CLAIM_BY_KEY[publicOpponentClaimKey(opponent, gameState)] || CLAIM_BY_KEY.none;
    if (claim.key === 'none') return sum;
    const supportBefore = estimateVisibleProofStrength(opponent, claim, gameState);
    const marketWithoutCard = gameState.market.filter((_, index) => index !== marketIndex);
    const temporaryState = { ...gameState, market: marketWithoutCard };
    const supportAfter = estimateVisibleProofStrength(opponent, claim, temporaryState);
    const claimWeight = claim.points / 10 + ((opponent.raiseUseCount || 0) > 0 ? 1.5 : 0);
    return sum + Math.max(0, supportBefore - supportAfter) * claimWeight;
  }, 0);
}

function simulatedMarketSwap(player, handIndex, marketIndex, gameState = state) {
  const hand = player.hand.slice();
  const market = gameState.market.slice();
  hand[handIndex] = gameState.market[marketIndex];
  market[marketIndex] = player.hand[handIndex];
  return { hand, market };
}

function findWorstCardIndex(hand) {
  let worst = 0;
  let worstValue = Infinity;
  for (let i = 0; i < hand.length; i++) {
    const remaining = hand.filter((_, idx) => idx !== i);
    const counts = countRanks(remaining);
    const pairPotential = Math.max(0, ...Object.values(counts));
    const value = pairPotential * 20 + hand[i].rank;
    if (value < worstValue) {
      worstValue = value;
      worst = i;
    }
  }
  return worst;
}

function evaluateHand(cards) {
  const sorted = cards.slice().sort((a, b) => b.rank - a.rank);
  const ranks = sorted.map(c => c.rank);
  const counts = countRanks(cards);
  const groups = Object.entries(counts).map(([rank, count]) => ({ rank: Number(rank), count }))
    .sort((a, b) => b.count - a.count || b.rank - a.rank);
  const flush = cards.every(c => c.suit === cards[0].suit);
  const straightHigh = getStraightHigh(ranks);
  const straight = straightHigh > 0;

  if (flush && straight && straightHigh === 14 && ranks.includes(10)) return { role: ROLE_BY_KEY.royalFlush, tiebreak: [14], cards: sorted };
  if (flush && straight) return { role: ROLE_BY_KEY.straightFlush, tiebreak: [straightHigh], cards: sorted };
  if (groups[0].count === 4) return { role: ROLE_BY_KEY.four, tiebreak: [groups[0].rank, groups.find(g => g.count === 1).rank], cards: sorted };
  if (groups[0].count === 3 && groups[1]?.count === 2) return { role: ROLE_BY_KEY.fullHouse, tiebreak: [groups[0].rank, groups[1].rank], cards: sorted };
  if (flush) return { role: ROLE_BY_KEY.flush, tiebreak: ranks.slice(), cards: sorted };
  if (straight) return { role: ROLE_BY_KEY.straight, tiebreak: [straightHigh], cards: sorted };
  if (groups[0].count === 3) return { role: ROLE_BY_KEY.three, tiebreak: [groups[0].rank, ...groups.filter(g => g.count === 1).map(g => g.rank).sort((a, b) => b - a)], cards: sorted };
  if (groups[0].count === 2 && groups[1]?.count === 2) {
    const pairs = groups.filter(g => g.count === 2).map(g => g.rank).sort((a, b) => b - a);
    return { role: ROLE_BY_KEY.twoPair, tiebreak: [...pairs, groups.find(g => g.count === 1).rank], cards: sorted };
  }
  if (groups[0].count === 2) return { role: ROLE_BY_KEY.pair, tiebreak: [groups[0].rank, ...groups.filter(g => g.count === 1).map(g => g.rank).sort((a, b) => b - a)], cards: sorted };
  return { role: ROLE_BY_KEY.high, tiebreak: ranks.slice(), cards: sorted };
}

function evaluatePlayerHand(player, privateCards = player.hand, marketCards = state.market) {
  const pool = [...privateCards, ...marketCards];
  let best = null;
  for (const cards of fiveCardChoices(pool)) {
    const evaluation = evaluateHand(cards);
    if (!best || compareHandEvaluations(evaluation, best) < 0) best = evaluation;
  }
  return best || evaluateHand(privateCards.slice(0, 5));
}

function fiveCardChoices(cards) {
  if (cards.length <= 5) return [cards.slice()];
  const choices = [];
  for (let a = 0; a < cards.length - 4; a++) {
    for (let b = a + 1; b < cards.length - 3; b++) {
      for (let c = b + 1; c < cards.length - 2; c++) {
        for (let d = c + 1; d < cards.length - 1; d++) {
          for (let e = d + 1; e < cards.length; e++) choices.push([cards[a], cards[b], cards[c], cards[d], cards[e]]);
        }
      }
    }
  }
  return choices;
}

function countRanks(cards) {
  return cards.reduce((acc, c) => {
    acc[c.rank] = (acc[c.rank] || 0) + 1;
    return acc;
  }, {});
}

function getStraightHigh(ranks) {
  const unique = [...new Set(ranks)].sort((a, b) => b - a);
  if (unique.length !== 5) return 0;
  if (unique[0] - unique[4] === 4) return unique[0];
  const lowAce = [14, 5, 4, 3, 2];
  if (lowAce.every(v => unique.includes(v))) return 5;
  return 0;
}

function render() {
  if (!state) return;
  syncInteractionState();
  els.gameScreen.classList.toggle('final-view', state.phase === 'final');
  els.tableArea.classList.toggle('panel-collapsed', panelCollapsed);
  els.tableArea.classList.toggle('result-view', state.phase === 'result');
  els.roundLabel.textContent = state.phase === 'result'
    ? 'Result'
    : state.phase === 'showdown'
      ? 'Showdown'
      : state.phase === 'lastFold'
        ? 'Last Fold'
        : `${state.round}/3`;
  els.potLabel.textContent = state.pot;
  els.carryLabel.textContent = state.carriedPot;
  renderTopGameCount();
  els.stockCount.textContent = state.stock.length;
  els.stockCount.className = stockCountClass(state.stock.length);
  renderMarket();
  renderSeats();
  renderInfoPanels();
  renderHumanHand();
  renderActionPanel();
  renderLastFoldPanel();
  renderResults();
  renderFinalResults();
  if (els.claimBoardDialog.open) renderClaimBoardOptions();
  refreshTutorialFocus();
}

function ensureTutorialUi() {
  if (!document.querySelector('.tutorial-popover')) {
    const pop = document.createElement('section');
    pop.className = 'tutorial-popover';
    pop.setAttribute('aria-live', 'polite');
    pop.innerHTML = '<p id="tutorialText"></p><div class="tutorial-popover-actions"><button id="tutorialExit" class="danger-button" type="button">Exit Tutorial</button><button id="tutorialNext" class="primary-button" type="button">Next</button></div>';
    document.body.appendChild(pop);
    pop.querySelector('#tutorialNext').addEventListener('click', tutorialNext);
    pop.querySelector('#tutorialExit').addEventListener('click', interruptTutorial);
  }
}

function tutorialStepConfig(index) {
  if (index === 18 && tutorial?.cpuBusy) {
    return { focus: null, allow: null, wait: true };
  }

  const actionSteps = {
    3: { focus: '#rulesButton', allow: '#rulesButton', wait: true },
    5: { focus: '#closeRules', allow: '#closeRules', wait: true },
    6: { focus: '.info-claim-trigger', allow: '.info-claim-trigger', wait: true },
    11: { focus: '[data-claim="fullHouse"]', allow: '[data-claim="fullHouse"]', wait: true },
    15: { focus: '[data-special="exchange"]', allow: '[data-special="exchange"]', wait: true },
    17: { focus: '#callButton', allow: '#callButton', wait: true },
    23: { focus: '[data-special="peek"]', allow: '[data-special="peek"]', wait: true },
    25: { focus: '#peekTarget', allow: '#peekTarget, #confirmSpecial', wait: true },
    29: { focus: '.info-claim-trigger', allow: '.info-claim-trigger, [data-claim="four"]', wait: true },
    30: { focus: '#callButton', allow: '#callButton', wait: true },
    33: { focus: '#raiseButton', allow: '#raiseButton', wait: true },
    36: { focus: '[data-special="random"]', allow: '[data-special="random"]', wait: true },
    39: { focus: '#randomCount', allow: '#randomCount, #confirmSpecial', wait: true },
    41: { focus: '#callButton', allow: '#callButton', wait: true },
    44: { focus: '#continueButton', allow: '#continueButton', wait: true },
  };
  const focusOnly = {
    8: '[data-claim="twoPair"]',
    9: '[data-claim="fullHouse"]',
    13: '[data-special]',
    14: '[data-special="exchange"]',
    20: '#marketCards',
    21: '.info-top-right .action-icons',
    22: '[data-special="market"]',
    24: '[data-special="peek"]',
    26: '[data-card-key="3-8"]',
    27: '[data-card-key="2-10"], [data-card-key="2-11"], .cards-human [data-hand-index="0"], .cards-human [data-hand-index="3"]',
    28: '[data-card-key="2-10"]',
    35: '.info-top-left .claim-big',
    40: '[data-card-key="2-10"], [data-card-key="2-11"], [data-card-key="2-12"], .cards-human [data-hand-index="0"], .cards-human [data-hand-index="3"]',
    45: null,
    46: '[data-card-key="2-10"], [data-card-key="2-11"], [data-card-key="2-12"], .cards-human [data-hand-index="0"], .cards-human [data-hand-index="3"], .info-human',
    47: '.cards-top-left, #marketCards, .info-top-left',
    48: '.cards-top-right, #marketCards, .info-top-right',
    49: '.showdown-rank',
  };
  return actionSteps[index] || { focus: focusOnly[index] || null, allow: null, wait: false };
}

function showTutorialStep(index) {
  if (!tutorial?.active) return;
  tutorial.index = index;
  tutorial.waitingForShowdownPause = false;
  ensureTutorialUi();
  const text = TUTORIAL_TEXTS[index] || 'Tutorial complete.';
  document.getElementById('tutorialText').textContent = `(${index + 1}/${TUTORIAL_TEXTS.length}) ${text}`;
  const config = tutorialStepConfig(index);
  tutorial.focus = config.focus;
  tutorial.allow = config.allow;
  tutorial.stepWaitsForAction = !!config.wait;
  if (index === 11) {
    renderClaimBoardOptions();
    if (!els.claimBoardDialog.open) els.claimBoardDialog.show();
  }
  updateTutorialNextButton();
  refreshTutorialFocus();
}

function updateTutorialNextButton() {
  const next = document.getElementById('tutorialNext');
  if (!next || !tutorial?.active) return;
  const waitingForAction = tutorial.stepWaitsForAction && !tutorial.waitingForShowdownPause;
  const blockedByShowdown = isCurrentShowdownAnimation(showdownAnimationToken) && !tutorial.waitingForShowdownPause;
  next.classList.toggle('hidden', waitingForAction || blockedByShowdown);
  next.disabled = blockedByShowdown;
  next.textContent = tutorial.index >= TUTORIAL_TEXTS.length - 1 ? 'Finish' : 'Next';
}

function tutorialNext() {
  if (!tutorial?.active) return;
  if (isCurrentShowdownAnimation(showdownAnimationToken) && !tutorial.waitingForShowdownPause) return;
  if (tutorial.pauseResolver) {
    const resolve = tutorial.pauseResolver;
    tutorial.pauseResolver = null;
    resolve();
    return;
  }
  if (tutorial.index >= TUTORIAL_TEXTS.length - 1) {
    document.body.classList.remove('tutorial-mode');
    tutorial = null;
    clearTutorialFocus();
    applyTutorialControlState();
    return;
  }
  showTutorialStep(tutorial.index + 1);
}

function interruptTutorial() {
  if (!tutorial?.active && !state?.tutorial) return;
  returnToSetupWithCurrentSettings();
  if (hub.session.isRoomPlay) prepareRoomSetup();
}

function clearTutorialFocus() {
  document.querySelectorAll('.tutorial-focus').forEach(el => el.classList.remove('tutorial-focus'));
  document.querySelectorAll('.tutorial-lift').forEach(el => el.classList.remove('tutorial-lift'));
}

function refreshTutorialFocus() {
  clearTutorialFocus();
  applyTutorialControlState();
  if (!tutorial?.active || !tutorial.focus) {
    positionTutorialPopover(null);
    return;
  }
  const focused = Array.from(document.querySelectorAll(tutorial.focus));
  focused.forEach(el => {
    el.classList.add('tutorial-focus');
    tutorialLiftElement(el).classList.add('tutorial-lift');
  });
  positionTutorialPopover(focused[0] || null);
}

function tutorialLiftElement(element) {
  return element.closest('dialog, .play-panel, .info-card, .card-field, .player-field, .market-cards, .rules-button, .top-game-count, .fullscreen-button') || element;
}

function positionTutorialPopover(target) {
  const pop = document.querySelector('.tutorial-popover');
  if (!pop || !tutorial?.active) return;
  const compact = window.innerWidth <= 430 || window.innerHeight <= 580;
  const margin = compact ? 6 : 14;
  const gap = compact ? 8 : 14;
  const maxWidth = compact ? window.innerWidth - margin * 2 : Math.min(520, window.innerWidth - margin * 2);
  const popWidth = Math.max(240, maxWidth);
  const fallbackLeft = window.innerWidth / 2;
  pop.style.maxHeight = compact ? `${Math.max(120, Math.min(220, window.innerHeight * 0.46))}px` : '';
  if (!target) {
    pop.classList.remove('above');
    pop.style.setProperty('--tutorial-popover-left', `${fallbackLeft}px`);
    const fallbackTop = clamp(window.innerHeight - pop.offsetHeight - margin, margin, window.innerHeight - pop.offsetHeight - margin);
    pop.style.setProperty('--tutorial-popover-top', `${fallbackTop}px`);
    pop.style.setProperty('--tutorial-arrow-left', '28px');
    return;
  }
  const rect = target.getBoundingClientRect();
  const popHeight = Math.min(pop.offsetHeight || 120, window.innerHeight - margin * 2);
  if (target.matches('#closeRules, #closeClaimBoard')) {
    pop.classList.remove('above');
    pop.style.setProperty('--tutorial-popover-left', `${fallbackLeft}px`);
    pop.style.setProperty('--tutorial-popover-top', `${window.innerHeight - popHeight - margin}px`);
    pop.style.setProperty('--tutorial-arrow-left', '28px');
    return;
  }
  const spaceAbove = rect.top - margin;
  const spaceBelow = window.innerHeight - rect.bottom - margin;
  let placeAbove = spaceBelow < popHeight + gap && spaceAbove > spaceBelow;
  const center = rect.left + rect.width / 2;
  const half = popWidth / 2;
  const left = clamp(center, margin + half, window.innerWidth - margin - half);
  let top = placeAbove
    ? Math.max(margin, rect.top - popHeight - gap)
    : Math.min(window.innerHeight - popHeight - margin, rect.bottom + gap);
  if (top < margin || top + popHeight > window.innerHeight - margin) {
    top = clamp(top, margin, Math.max(margin, window.innerHeight - popHeight - margin));
    placeAbove = top + popHeight <= rect.top;
  }
  const arrowLeft = clamp(center - (left - half), 22, popWidth - 22);
  pop.classList.toggle('above', placeAbove);
  pop.style.setProperty('--tutorial-popover-left', `${left}px`);
  pop.style.setProperty('--tutorial-popover-top', `${top}px`);
  pop.style.setProperty('--tutorial-arrow-left', `${arrowLeft}px`);
}

function applyTutorialControlState() {
  document.querySelectorAll('[data-tutorial-disabled="true"]').forEach(el => {
    el.disabled = false;
    delete el.dataset.tutorialDisabled;
  });
  if (!tutorial?.active) return;
  const controls = document.querySelectorAll('#app button, #app select, #app input');
  controls.forEach(control => {
    if (control.disabled || control.closest('.tutorial-popover') || control.closest('.tutorial-leave-button')) return;
    const allowed = tutorial.allow && control.closest(tutorial.allow);
    if (allowed) {
      control.disabled = false;
      delete control.dataset.tutorialDisabled;
    } else {
      control.disabled = true;
      control.dataset.tutorialDisabled = 'true';
    }
  });
}

function tutorialAdvanceFrom(eventName, detail = {}) {
  if (!tutorial?.active) return;
  const i = tutorial.index;
  if (i === 3 && eventName === 'rulesOpen') showTutorialStep(4);
  else if ((i === 4 || i === 5) && eventName === 'rulesClose') showTutorialStep(6);
  else if (i === 6 && eventName === 'claimOpen') showTutorialStep(7);
  else if (i === 11 && eventName === 'claim:fullHouse') showTutorialStep(12);
  else if (i === 15 && eventName === 'specialDone:exchange') showTutorialStep(16);
  else if (i === 17 && eventName === 'normal:call') tutorialScriptRound1Cpu();
  else if (i === 23 && eventName === 'special:peek') showTutorialStep(25);
  else if (i === 25 && eventName === 'specialDone:peek') showTutorialStep(26);
  else if (i === 29 && eventName === 'claim:four') showTutorialStep(30);
  else if (i === 30 && eventName === 'normal:call') tutorialScriptRound2CpuRaise();
  else if (i === 33 && eventName === 'normal:raise') tutorialScriptAfterHumanRaise();
  else if (i === 36 && eventName === 'special:random') showTutorialStep(37);
  else if (i === 39 && eventName === 'specialDone:random') showTutorialStep(40);
  else if (i === 41 && eventName === 'normal:call') tutorialScriptRound3Cpu();
}

function tutorialAllowsEvent(target) {
  if (!tutorial?.active) return true;
  if (target.closest('.tutorial-popover')) return true;
  if (target.closest('.tutorial-leave-button')) return true;
  if (!tutorial.allow) return false;
  return !!target.closest(tutorial.allow);
}

function tutorialScriptRound1Cpu() {
  const [, cpu1, cpu2] = state.players;
  tutorial.cpuBusy = true;
  showTutorialStep(18);
  runTutorialCpuSequence([
    () => state.currentPlayerIndex === 1 && normalAction(cpu1, 'call'),
    () => {
      cpu2.pendingClaim = 'flush';
      useSpecial(cpu2, 'market', { handIndex: 2, marketIndex: 0 });
      render();
    },
    () => state.currentPlayerIndex === 2 && normalAction(cpu2, 'call'),
  ], () => {
    tutorial.cpuBusy = false;
    showTutorialStep(18);
  });
}

function tutorialScriptRound2CpuRaise() {
  const [, cpu1, cpu2] = state.players;
  showTutorialStep(31);
  runTutorialCpuSequence([
    () => {
      cpu1.pendingClaim = 'royalFlush';
      render();
    },
    () => state.currentPlayerIndex === 1 && normalAction(cpu1, 'call'),
    () => state.currentPlayerIndex === 2 && normalAction(cpu2, 'raise'),
  ]);
}

function tutorialScriptAfterHumanRaise() {
  const [, cpu1, cpu2] = state.players;
  showTutorialStep(34);
  runTutorialCpuSequence([
    () => state.currentPlayerIndex === 1 && normalAction(cpu1, 'call'),
    () => state.currentPlayerIndex === 2 && normalAction(cpu2, 'call'),
  ]);
}

function tutorialScriptRound3Cpu() {
  const [, cpu1, cpu2] = state.players;
  runTutorialCpuSequence([
    () => state.currentPlayerIndex === 1 && normalAction(cpu1, 'call'),
    () => state.currentPlayerIndex === 2 && normalAction(cpu2, 'call'),
  ]);
}

function runTutorialCpuSequence(actions, onComplete = null) {
  tutorialCpuTimerDelay = 0;
  actions.forEach((action, index) => {
    tutorialCpuTimerDelay += 750;
    cpuTimers.push(setTimeout(() => {
      if (!tutorial?.active) return;
      action();
      if (index === actions.length - 1 && onComplete) {
        const finishDelay = state.phase === 'roundTransition' ? 1100 : 0;
        cpuTimers.push(setTimeout(() => {
          if (tutorial?.active) onComplete();
        }, finishDelay));
      }
    }, tutorialCpuTimerDelay));
  });
}

function renderTopGameCount() {
  els.topGameCount.classList.toggle('hidden', !state || state.phase === 'setup');
  if (!state || state.phase === 'setup') return;
  const max = state.maxGames > 0 ? state.maxGames : '\u221e';
  els.topGameCount.textContent = `${state.gameNumber}/${max} games`;
}

function syncInteractionState() {
  const human = localPlayer();
  const specialsAllowed = hasAvailableSpecial(human);
  if (!specialsAllowed || (specialMode && !canPlayerChooseSpecial(human, specialMode))) {
    specialMode = null;
    selectedHandIndex = null;
    selectedMarketIndex = null;
  }
}

function stockCountClass(count) {
  if (count <= 0) return 'stock-red';
  if (count <= 5) return 'stock-orange';
  if (count <= 10) return 'stock-yellow';
  return '';
}

function renderMarket() {
  els.marketCards.innerHTML = '';
  const human = localPlayer();
  const humanPreview = human && !human.out ? bestAvailableHandDisplay(human) : null;
  state.market.forEach((card, idx) => {
    const selectable = specialMode === 'market' && !state.marketLocks[idx] && isHumanTurnBeforeNormal();
    const node = cardNode(card, { selectable });
    node.dataset.marketIndex = idx;
    node.dataset.cardKey = cardKey(card);
    if (card.id === marketRevealCardId) node.classList.add('market-reveal');
    if (humanPreview?.marketCardIds.has(card.id)) node.classList.add('best-card');
    if (state.marketLocks[idx]) {
      const lock = document.createElement('div');
      lock.className = 'lock-mark';
      lock.textContent = '🔒';
      node.appendChild(lock);
    }
    if (idx === selectedMarketIndex) node.classList.add('selected');
    if (selectable) {
      node.addEventListener('click', () => {
        selectedMarketIndex = idx;
        render();
        renderSpecialDetail('market');
      });
    }
    els.marketCards.appendChild(node);
  });
  marketRevealCardId = null;
}

function renderSeats() {
  els.seatLayer.innerHTML = '';
  for (const p of state.players) {
    const slot = tableSeatSlot(p);
    const seat = document.createElement('div');
    seat.className = `player-field field-${slot}`;
    seat.style.setProperty('--player-color', p.color);
    seat.style.setProperty('--turn-order-delay', `${Math.max(0, turnOrderPosition(p) - 1) * 180}ms`);
    if (state.phase === 'round' && state.players[state.currentPlayerIndex] === p) seat.classList.add('current');
    if (p.out) seat.classList.add('out');
    if (p.out || p.folded || p.lastFolded) seat.classList.add('inactive');
    seat.innerHTML = `
      <div class="player-identity">
        <div class="avatar">${escapeHtml(p.icon)}${turnOrderBadgeMarkup(p)}</div>
        ${showdownRankMarkup(p.id)}
        ${showdownScorePanelMarkup(p.id)}
        ${contributionChipStacks(p)}
        ${p.out ? '<div class="normal-action-field out-badge">OUT</div>' : p.normalAction ? `<div class="normal-action-field${cpuNormalActionPulseIds.has(p.id) ? ' action-pop' : ''}">${escapeHtml(p.normalAction)}</div>` : ''}
        <div class="seat-name">${escapeHtml(p.name)}</div>
        <div class="seat-chip">${chipCountLabel(p.chips)}</div>
      </div>
    `;
    const hand = document.createElement('div');
    hand.className = `card-field cards-${slot}`;
    if (p.out) hand.classList.add('out');
    if (p.out || p.folded || p.lastFolded) hand.classList.add('inactive');
    const hideFoldedShowdownHand = p.folded && (state.phase === 'showdown' || state.phase === 'result');
    const bestHand = isLocalPlayer(p) && !p.out && !hideFoldedShowdownHand ? bestAvailableHandDisplay(p) : null;
    hand.innerHTML = `
      ${bestHand ? `<div class="best-hand-line role-tone-${bestHand.tone}">${escapeHtml(bestHand.label)}</div>` : ''}
      <div class="field-cards" aria-label="${escapeHtml(p.name)} hand"></div>
    `;
    const row = hand.querySelector('.field-cards');
    p.hand.forEach((card, idx) => {
      let node;
      const publicHandCard = isPublicHandCard(p, card);
      const canPublishShowdown = canPublishShowdownPlayer(p);
      const showdownReveal = canPublishShowdown && state.phase === 'showdown' && showdownAnimation?.revealedHandPlayerIds.has(p.id);
      const regularReveal = state.phase !== 'showdown' && state.phase !== 'result' && (isLocalPlayer(p) || publicHandCard);
      const resultReveal = state.phase === 'result' && canPublishShowdown;
      const reveal = resultReveal || showdownReveal || regularReveal;
      if (reveal) {
        node = cardNode(card, { small: true, selectable: isLocalPlayer(p) && canSelectHandCard() });
        if (publicHandCard && card.randomExchangeLocked) node.appendChild(publicCardDieNode());
        else if (isLocalPlayer(p) && publicHandCard) node.appendChild(publicCardEyeNode());
      } else {
        node = cardBackNode(true);
      }
      node.dataset.handIndex = idx;
      node.dataset.cardId = card.id;
      node.dataset.cardKey = cardKey(card);
      if (isLocalPlayer(p) && idx === selectedHandIndex) node.classList.add('selected');
      if (bestHand?.cardIds.has(card.id)) node.classList.add('best-card');
      if (handRevealCardIds.has(card.id)) node.classList.add('hand-reveal');
      if (peekFlipCardIds.has(card.id)) node.classList.add('peek-flip');
      if (showdownReveal && showdownAnimation?.flippingHandPlayerId === p.id) {
        node.classList.add('showdown-card-flip');
      }
      if (openingDealDelayByCardId.has(card.id)) {
        node.classList.add('opening-deal');
        node.style.setProperty('--opening-deal-delay', `${openingDealDelayByCardId.get(card.id)}ms`);
      }
      if (isLocalPlayer(p) && canSelectHandCard()) {
        node.addEventListener('click', () => {
          selectedHandIndex = idx;
          render();
          if (specialMode) renderSpecialDetail(specialMode);
        });
      }
      row.appendChild(node);
    });
    if (p.out) {
      const outNote = document.createElement('div');
      outNote.className = 'out-card-placeholder';
      outNote.textContent = 'Out of play';
      row.appendChild(outNote);
    }
    if (showdownAnimation?.handPointPlayerIds.has(p.id)) {
      const result = showdownResultFor(p.id);
      hand.appendChild(showdownPointNode(result?.hand.role.points || 0, result?.hand.role.label));
    }
    els.seatLayer.append(seat, hand);
    if (isLocalPlayer(p)) makeHumanPanelDraggable(hand, 'cards', row);
  }
  cpuNormalActionPulseIds.clear();
  clearQueuedCardAnimations();
}

function turnOrderPosition(player) {
  if (!state || player.out) return 0;
  let position = 0;
  for (let offset = 0; offset < state.players.length; offset++) {
    const candidate = state.players[(state.turnOrderStart + offset) % state.players.length];
    if (candidate.out) continue;
    position += 1;
    if (candidate === player) return position;
  }
  return 0;
}

function turnOrderBadgeMarkup(player) {
  if (state.phase !== 'dealing' || player.out) return '';
  const position = turnOrderPosition(player);
  if (!position) return '';
  return `<span class="turn-order-badge" aria-label="Turn order ${position}">${position}</span>`;
}

function chipCountLabel(count) {
  return `💰 ${count}`;
}

function betCountLabel(count) {
  return `🪙 ${count}`;
}

function chipDeltaLabel(count) {
  return `💰 ${count > 0 ? '+' : ''}${count}`;
}

function getCpuSeatSlots(cpuCount) {
  if (cpuCount === 1) return ['top'];
  if (cpuCount === 2) return ['top-left', 'top-right'];
  return ['top-left', 'top', 'top-right'];
}

function contributionChipStacks(player) {
  return '';
  const coinCount = visibleContributionCoinCount(player.totalContrib);
  if (!coinCount) return '';
  const stacks = [];
  for (let shown = 0; shown < coinCount; shown += 4) {
    const stackSize = Math.min(4, coinCount - shown);
    stacks.push(`
      <span class="contribution-chip-stack">
        ${Array.from({ length: stackSize }, (_, index) => `<span class="contribution-chip" style="--chip-level:${index}">🪙</span>`).join('')}
      </span>
    `);
  }
  return `<span class="contribution-chip-piles" aria-label="${escapeHtml(player.name)} contributed ${player.totalContrib} chips">${stacks.join('')}</span>`;
}

function visibleContributionCoinCount(totalContrib) {
  if (!totalContrib) return 0;
  return Math.min(16, Math.max(1, Math.ceil(totalContrib / Math.max(1, state.ante))));
}

function renderInfoPanels() {
  els.infoLayer.innerHTML = '';
  for (const p of state.players) {
    const key = displayedClaimKey(p);
    const claim = CLAIM_BY_KEY[key] || CLAIM_BY_KEY.none;
    const claimEditable = !p.out && isLocalPlayer(p) && isHumanTurnBeforeNormal() && state.round <= 2;
    const claimMarkup = `
      <span class="claim-icon">${escapeHtml(claim.icon)}</span>
      <span class="claim-text role-tone-${claim.rank + 1}">${escapeHtml(claim.label)}</span>
    `;
    const panel = document.createElement('article');
    const slot = infoSeatSlot(p);
    panel.className = `info-card info-${slot} floating-panel${p.out ? ' out inactive' : ''}`;
    if (showdownAnimation?.activeClaimPlayerId === p.id) panel.classList.add('showdown-claim-focus');
    panel.style.setProperty('--player-color', p.color);
    panel.innerHTML = `
      <div class="info-player">
        <span class="info-player-stack">
          <span class="info-player-icon">${escapeHtml(p.icon)}</span>
          <span class="info-bet-count">${betCountLabel(p.totalContrib)}</span>
        </span>
        <span class="info-player-meta">
          <span class="info-player-name">${escapeHtml(p.name)}</span>
          ${isPointMode() ? pointMeterMarkup(p.points) : `<span class="info-chip-count">${chipCountLabel(p.chips)}</span>`}
        </span>
      </div>
      ${claimEditable
        ? `<button class="claim-big info-claim-trigger" type="button" title="Open Role Board" aria-label="Change claimed hand">${claimMarkup}</button>`
        : `<div class="claim-big">${claimMarkup}</div>`}
      <div class="action-icons">${p.specialLog.map(t => `<span class="action-icon" title="${SPECIAL_NAMES[t]}">${SPECIAL_ICONS[t]}</span>`).join('') || '<span class="info-sub">No actions</span>'}</div>
      <div class="state-row">
        ${p.out ? '<span class="state-pill danger">Out</span>' : ''}
        ${!p.out && p.folded ? '<span class="state-pill danger">Folded</span>' : ''}
        ${!p.out && p.lastFolded ? '<span class="state-pill danger">Last Fold</span>' : ''}
        ${!p.out && p.allIn ? '<span class="state-pill">All-in</span>' : ''}
      </div>
    `;
    if (showdownAnimation?.claimPointPlayerIds.has(p.id)) {
      panel.appendChild(showdownPointNode(showdownResultFor(p.id)?.claimDelta || 0));
    }
    els.infoLayer.appendChild(panel);
    if (isLocalPlayer(p)) {
      panel.querySelector('.info-claim-trigger')?.addEventListener('click', openClaimBoard);
      makeHumanPanelDraggable(panel, 'info');
    }
  }
}

function showdownResultFor(playerId) {
  return showdownAnimation?.results.find(result => result.player.id === playerId);
}

function pointMeterMarkup(points) {
  return `
    <span class="point-meter" aria-label="${formatPointValue(points)} points">
      ${[0, 1, 2].map(index => {
        const fill = clamp((points - index) * 100, 0, 100);
        return `<span class="point-dot" style="--fill:${fill}%"></span>`;
      }).join('')}
    </span>
  `;
}

function showdownPointNode(delta, label = '') {
  const point = document.createElement('span');
  point.className = `showdown-point ${delta < 0 ? 'loss' : 'gain'}`;
  point.innerHTML = `
    ${label ? `<span class="showdown-point-label">${escapeHtml(label)}</span>` : ''}
    <strong>${delta < 0 ? '-' : '+'} ${Math.abs(delta)}</strong>
  `;
  return point;
}

function showdownRankMarkup(playerId) {
  if (!showdownAnimation?.rankPlayerIds.has(playerId)) return '';
  const rankIndex = showdownAnimation.rankIndexByPlayerId.get(playerId);
  const mark = ['&#128081;', '&#129352;', '&#129353;'][rankIndex] || `#${rankIndex + 1}`;
  const isNew = showdownAnimation.activeRankPlayerId === playerId ? ' new' : '';
  return `<span class="showdown-rank${isNew}" aria-label="Showdown rank ${rankIndex + 1}">${mark}</span>`;
}

function showdownScorePanelMarkup(playerId) {
  if (!showdownAnimation?.scorePanelPlayerIds.has(playerId)) return '';
  const total = showdownAnimation.scoreTotalsByPlayerId.get(playerId) || 0;
  const isNew = showdownAnimation.handPointPlayerIds.has(playerId) ? ' new' : '';
  return `
    <span class="showdown-score-panel${isNew}">
      <span>Total</span>
      <strong>${total}</strong>
    </span>
  `;
}

function getInfoSlots(cpuCount) {
  if (cpuCount === 1) return ['top'];
  if (cpuCount === 2) return ['top-left', 'top-right'];
  return ['top-left', 'top', 'top-right'];
}

function displayedClaimKey(player) {
  if (player.out) return 'none';
  if (state.phase === 'result' || state.phase === 'showdown' || state.phase === 'lastFold' || state.round === 3) return player.finalClaim || player.revealedClaim || 'none';
  if (isLocalPlayer(player) && state.phase === 'round' && state.round <= 2) return player.pendingClaim || 'none';
  return player.revealedClaim || 'none';
}

function renderHumanHand() {
  // The visible hand is now rendered inside the lower player field.
  els.humanHand.classList.add('hidden');
  els.humanHand.innerHTML = '';
}

function renderActionPanel() {
  const human = localPlayer();
  const isTurn = isHumanTurnBeforeNormal();
  els.actionPanel.classList.toggle('hidden', !isTurn);
  makePlayPanelResizable();
  applyPlayPanelHeight();
  if (!isTurn) return;
  els.actionPanel.classList.toggle('collapsed', panelCollapsed);
  els.collapsePlayPanel.textContent = panelCollapsed ? 'Expand' : 'Collapse';
  const specialsAllowed = hasAvailableSpecial(human);
  els.specialControls.classList.toggle('hidden', !specialsAllowed);
  els.playPanelBody.classList.toggle('special-finished', !specialsAllowed);
  updateSpecialButtons(human);

  const need = Math.max(0, state.roundTarget - human.roundContrib);
  const raisesLeft = Math.max(0, RAISE_USE_LIMIT - (human.raiseUseCount || 0));
  const forcedAllIn = human.allIn;
  els.callButton.textContent = forcedAllIn ? 'All-in' : need > human.chips ? `All-in ${human.chips}` : `Call ${need}`;
  els.raiseButton.disabled = forcedAllIn || isPointMode() || (human.raiseUseCount || 0) >= RAISE_USE_LIMIT || human.chips <= need;
  if (els.raiseCounter) {
    els.raiseCounter.textContent = isPointMode()
      ? 'Raise unavailable'
      : raisesLeft === 1
        ? '1 raise left'
        : raisesLeft > 0
          ? `${raisesLeft} raises left`
          : 'No raises left';
    els.raiseCounter.classList.toggle('empty', !isPointMode() && raisesLeft === 0);
  }
  els.foldButton.disabled = forcedAllIn;
  els.foldButton.classList.remove('hidden');
  if (!specialsAllowed) {
    specialMode = null;
    els.specialDetail.innerHTML = '';
  } else if (!specialMode) {
    els.specialDetail.innerHTML = '<div class="special-description">Select a special move for its effect and controls.</div>';
  }
}

function makePlayPanelResizable() {
  const panel = els.actionPanel;
  const handle = panel?.querySelector('.play-header');
  if (!panel || !handle || handle.dataset.playResizeBound) return;
  handle.dataset.playResizeBound = 'true';
  handle.classList.add('play-resize-handle');
  handle.addEventListener('pointerdown', startPlayPanelResize);
}

function startPlayPanelResize(event) {
  if (event.button !== undefined && event.button !== 0) return;
  if (event.target.closest('button, input, select')) return;
  if (panelCollapsed || els.actionPanel.classList.contains('hidden')) return;
  const rect = els.actionPanel.getBoundingClientRect();
  activePlayPanelResize = {
    pointerId: event.pointerId,
    startY: event.clientY,
    startHeight: rect.height,
  };
  els.actionPanel.classList.add('play-resizing');
  els.actionPanel.setPointerCapture?.(event.pointerId);
  event.preventDefault();
}

function dragPlayPanelResize(event) {
  const resize = activePlayPanelResize;
  if (!resize || event.pointerId !== resize.pointerId) return;
  const nextHeight = resize.startHeight + (resize.startY - event.clientY);
  setPlayPanelHeight(nextHeight);
  event.preventDefault();
}

function stopPlayPanelResize(event) {
  const resize = activePlayPanelResize;
  if (!resize || event.pointerId !== resize.pointerId) return;
  els.actionPanel.classList.remove('play-resizing');
  els.actionPanel.releasePointerCapture?.(event.pointerId);
  activePlayPanelResize = null;
}

function setPlayPanelHeight(height) {
  const headerHeight = els.actionPanel.querySelector('.play-header')?.offsetHeight || 44;
  const minHeight = headerHeight + 36;
  const maxHeight = Math.max(minHeight, els.tableArea.clientHeight - 4);
  customPlayPanelHeight = clamp(height, minHeight, maxHeight);
  applyPlayPanelHeight();
}

function applyPlayPanelHeight() {
  if (panelCollapsed) return;
  if (customPlayPanelHeight == null) {
    els.actionPanel.style.removeProperty('--play-panel-height');
    return;
  }
  const headerHeight = els.actionPanel.querySelector('.play-header')?.offsetHeight || 44;
  const minHeight = headerHeight + 36;
  const maxHeight = Math.max(minHeight, els.tableArea.clientHeight - 4);
  customPlayPanelHeight = clamp(customPlayPanelHeight, minHeight, maxHeight);
  els.actionPanel.style.setProperty('--play-panel-height', `${customPlayPanelHeight}px`);
}

function makeHumanPanelDraggable(panel, key, handle = panel) {
  if (!panel || !handle) return;
  panel.classList.add('human-draggable');
  handle.classList.add('human-drag-handle');
  applyHumanPanelPosition(panel, key);
  if (handle.dataset.humanDragBound) return;
  handle.dataset.humanDragBound = 'true';
  handle.addEventListener('pointerdown', event => startHumanPanelDrag(event, panel, key));
}

function startHumanPanelDrag(event, panel, key) {
  if (event.button !== undefined && event.button !== 0) return;
  if (key === 'play' && event.target.closest('button, input, select')) return;
  if (key === 'info' && event.target.closest('button, input, select')) return;
  if (key === 'cards' && event.target.closest('.playing-card.selectable')) return;
  const panelRect = panel.getBoundingClientRect();
  const areaRect = els.tableArea.getBoundingClientRect();
  activePanelDrag = {
    key,
    panel,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    left: panelRect.left - areaRect.left,
    top: panelRect.top - areaRect.top,
    moved: false,
  };
  panel.classList.add('dragging');
  panel.setPointerCapture?.(event.pointerId);
}

function dragHumanPanel(event) {
  const drag = activePanelDrag;
  if (!drag || event.pointerId !== drag.pointerId) return;
  const dx = event.clientX - drag.startX;
  const dy = event.clientY - drag.startY;
  if (!drag.moved && Math.hypot(dx, dy) < 4) return;
  drag.moved = true;
  event.preventDefault();
  setHumanPanelPosition(drag.panel, drag.key, drag.left + dx, drag.top + dy);
}

function stopHumanPanelDrag(event) {
  const drag = activePanelDrag;
  if (!drag || event.pointerId !== drag.pointerId) return;
  drag.panel.classList.remove('dragging');
  drag.panel.releasePointerCapture?.(event.pointerId);
  if (drag.moved) {
    drag.panel.addEventListener('click', blockDraggedPanelClick, { capture: true, once: true });
  }
  activePanelDrag = null;
}

function blockDraggedPanelClick(event) {
  event.preventDefault();
  event.stopPropagation();
}

function setHumanPanelPosition(panel, key, left, top) {
  const position = clampedHumanPanelPosition(panel, left, top);
  humanPanelPositions[key] = position;
  applyHumanPanelPosition(panel, key);
}

function applyHumanPanelPosition(panel, key) {
  const position = humanPanelPositions[key];
  if (!panel || !position) return;
  panel.style.left = `${position.left}px`;
  panel.style.top = `${position.top}px`;
  panel.style.right = 'auto';
  panel.style.bottom = 'auto';
  panel.style.transform = 'none';
  const bounded = clampedHumanPanelPosition(panel, position.left, position.top);
  humanPanelPositions[key] = bounded;
  panel.style.left = `${bounded.left}px`;
  panel.style.top = `${bounded.top}px`;
  panel.classList.add('human-panel-moved');
}

function clampedHumanPanelPosition(panel, left, top) {
  const pad = 4;
  const maxLeft = Math.max(pad, els.tableArea.clientWidth - panel.offsetWidth - pad);
  const maxTop = Math.max(pad, els.tableArea.clientHeight - panel.offsetHeight - pad);
  return {
    left: clamp(left, pad, maxLeft),
    top: clamp(top, pad, maxTop),
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function openClaimBoard() {
  if (!isHumanTurnBeforeNormal() || state.round > 2) return;
  renderClaimBoardOptions();
  if (!els.claimBoardDialog.open) {
    if (tutorial?.active) els.claimBoardDialog.show();
    else els.claimBoardDialog.showModal();
  }
  if (tutorial?.active && tutorial.index === 29) {
    tutorial.focus = '[data-claim="four"]';
    tutorial.allow = '[data-claim="four"]';
    refreshTutorialFocus();
    return;
  }
  tutorialAdvanceFrom('claimOpen');
}

function renderClaimBoardOptions() {
  const human = localPlayer();
  if (!human) {
    els.claimBoardOptions.innerHTML = '';
    return;
  }
  const actualRole = evaluatePlayerHand(human).role;
  const options = CLAIM_OPTIONS.map(claim => {
    const selected = claim.key === (human.pendingClaim || 'none');
    const available = claim.key === 'none' || actualRole.rank >= claim.rank;
    const delta = claim.key === 'none' ? 0 : claimDeltaFor(actualRole, ROLE_BY_KEY[claim.key]);
    const deltaText = delta > 0 ? `+${delta}` : String(delta);
    return `
      <button class="claim-board-option ${available ? 'available' : 'risk'} ${selected ? 'selected' : ''}" type="button" data-claim="${claim.key}">
        <span class="claim-board-icon">${escapeHtml(claim.icon)}</span>
        <span class="claim-board-name role-tone-${claim.rank + 1}">${escapeHtml(claim.label)}</span>
        <strong class="claim-board-delta ${available ? 'gain' : 'loss'}">${deltaText}</strong>
      </button>
    `;
  }).join('');
  els.claimBoardOptions.innerHTML = options;
}

function bestAvailableHandDisplay(player) {
  return handDisplayFromPreview({
    cards: [...player.hand, ...state.market],
    evaluation: evaluatePlayerHand(player),
  });
}

function revealProofCards(target, user = null) {
  if (!target || target.id === user?.id || target.out || target.folded || !target.hand.length) return [];
  const handCards = new Set(target.hand.map(card => card.id));
  const chosenCards = bestCombinationCards([...target.hand, ...state.market], evaluatePlayerHand(target));
  return chosenCards.filter(card => handCards.has(card.id) && !isPublicHandCard(target, card));
}

function handDisplayFromPreview(preview) {
  const chosenCards = bestCombinationCards(preview.cards, preview.evaluation);
  return {
    label: `Best: ${preview.evaluation.role.label} (${preview.evaluation.role.points})`,
    tone: preview.evaluation.role.rank + 1,
    cardIds: new Set(chosenCards.map(card => card.id)),
    marketCardIds: new Set(chosenCards.filter(card => state.market.some(marketCard => marketCard.id === card.id)).map(card => card.id)),
  };
}

function compareHandEvaluations(a, b) {
  if (b.role.points !== a.role.points) return b.role.points - a.role.points;
  return compareTiebreak(a.tiebreak, b.tiebreak);
}

function bestCombinationCards(cards, evaluation) {
  const scoringCards = evaluation.cards || cards;
  const rankCounts = countRanks(scoringCards);
  const groupedCards = rank => scoringCards.filter(card => card.rank === rank);
  const pairRanks = Object.entries(rankCounts)
    .filter(([, count]) => count === 2)
    .map(([rank]) => Number(rank))
    .sort((a, b) => b - a);
  const tripRank = Number(Object.entries(rankCounts).find(([, count]) => count === 3)?.[0]);
  const fourRank = Number(Object.entries(rankCounts).find(([, count]) => count === 4)?.[0]);

  if (['royalFlush', 'straightFlush', 'fullHouse', 'flush', 'straight'].includes(evaluation.role.key)) return scoringCards;
  if (evaluation.role.key === 'four') return groupedCards(fourRank);
  if (evaluation.role.key === 'three') return groupedCards(tripRank);
  if (evaluation.role.key === 'twoPair') return pairRanks.flatMap(groupedCards);
  if (evaluation.role.key === 'pair') return groupedCards(pairRanks[0]);
  return [evaluation.cards[0]];
}

function refitHumanPanelPositions() {
  applyPlayPanelHeight();
  applyHumanPanelPosition(els.infoLayer.querySelector('.info-human'), 'info');
  applyHumanPanelPosition(els.seatLayer.querySelector('.cards-human'), 'cards');
}

function renderLastFoldPanel() {
  const visible = state.phase === 'lastFold';
  els.lastFoldPanel.classList.toggle('hidden', !visible);
  if (!visible) return;
  updateLastFoldTimerText();
  els.lastFoldChoices.innerHTML = '';
  for (const p of state.players.filter(p => !p.out && !p.folded)) {
    const choice = p.lastFoldChoice || 'thinking';
    const pill = document.createElement('div');
    pill.className = `choice-pill ${choice === 'lastFold' ? 'fold' : choice === 'continue' ? 'continue' : ''}`;
    pill.textContent = `${p.name}: ${choice === 'lastFold' ? 'Last Fold' : choice === 'continue' ? 'Continue' : 'Thinking...'}`;
    els.lastFoldChoices.appendChild(pill);
  }
  const human = localPlayer();
  els.continueButton.disabled = !human || human.out || !!human.lastFoldChoice || human.folded;
  els.lastFoldButton.disabled = !human || human.out || !!human.lastFoldChoice || human.folded || human.allIn;
}

function renderResults() {
  els.resultPanel.classList.toggle('hidden', state.phase !== 'result');
  if (state.phase !== 'result') return;
  if (state.finalResults.length === 1 && state.finalResults[0].early) {
    const winner = state.finalResults[0].player;
    els.resultPanel.innerHTML = `
      <h2>👑 ${escapeHtml(winner.name)} wins early</h2>
      <p>All other players folded. The pot was awarded immediately.</p>
      ${resultActionButtons()}
    `;
    bindResultActions();
    return;
  }
  const winners = resultWinnerIds(state.finalResults);
  const rows = state.finalResults.slice().sort(compareResults).map(r => {
    if (!canPublishShowdownResult(r)) {
      return `<tr>
        <td>${escapeHtml(r.player.name)}</td>
        <td>Folded</td>
        <td>Hidden</td>
        <td>-</td>
        <td>-</td>
        <td>No</td>
        <td>-</td>
      </tr>`;
    }
    const claimText = r.claim ? `${r.claim.label} (${r.claim.points})` : 'No Claim';
    const claimTone = r.claim ? r.claim.rank + 1 : 0;
    return `<tr>
      <td>${winners.has(r.player.id) ? '👑 ' : ''}${escapeHtml(r.player.name)}</td>
      <td class="role-tone-${r.hand.role.rank + 1}">${r.hand.role.label} (${r.hand.role.points})</td>
      <td class="role-tone-${claimTone}">${claimText}</td>
      <td>${r.claimDelta > 0 ? '+' : ''}${r.claimDelta}</td>
      <td><strong>${r.finalScore}</strong></td>
      <td>${r.candidate ? 'Yes' : 'No'}</td>
      <td>${r.player.lastFolded ? 'Yes' : '-'}</td>
    </tr>`;
  }).join('');
  const summary = state.carriedPot > 0 ? `<p class="carry-summary">Pot ${state.carriedPot} carries to the next game.</p>` : '';
  els.resultPanel.innerHTML = `
    <h2>Showdown</h2>
    ${summary}
    <table class="result-table">
      <thead><tr><th>Player</th><th>Hand</th><th>Claim</th><th>Claim Δ</th><th>Score</th><th>Candidate</th><th>Last Fold</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    ${resultActionButtons()}
  `;
  bindResultActions();
  animateShowdownPayout();
}

function resultActionButtons() {
  if (tutorial?.active || state?.tutorial) {
    return `
      <div class="result-actions">
        <button id="leaveTutorialButton" class="primary-button tutorial-leave-button" type="button">Leave</button>
      </div>
    `;
  }
  const nextLabel = isMatchOver() ? 'Final Results' : 'Next Game';
  const disabled = hub.session.isRoomPlay && !canUseResultButtons() ? 'disabled' : '';
  return `
    <div class="result-actions">
      <button id="nextGameButton" class="primary-button" type="button" ${disabled}>${nextLabel}</button>
      <button id="quitGameButton" class="danger-button" type="button" ${disabled}>Quit</button>
    </div>
  `;
}

function canUseResultButtons() {
  if (!hub.session.isRoomPlay) return true;
  const hostId = hub.room?.hostId || orderedHubPlayers()[0]?.id || null;
  const hostInGame = state?.players?.some(player => player.hubPlayerId === hostId);
  if (hostInGame) return hub.session.playerId === hostId;
  return !!state?.players?.length && state.players[0].hubPlayerId === hub.session.playerId;
}

function bindResultActions() {
  document.getElementById('leaveTutorialButton')?.addEventListener('click', leaveTutorial);
  document.getElementById('nextGameButton')?.addEventListener('click', requestNextGame);
  document.getElementById('quitGameButton')?.addEventListener('click', openQuitDialog);
}

function requestNextGame() {
  if (shouldUseHubActions()) {
    if (!canUseResultButtons()) return;
    if (hub.session.isHost) {
      startNewGame();
      publishSnapshot('next_game');
    } else {
      sendHubAction(HUB_ACTION_TYPES.NEXT_GAME);
    }
    return;
  }
  startNewGame();
}

function requestPlayAgain() {
  if (shouldUseHubActions()) {
    if (!canUseResultButtons()) return;
    if (hub.session.isHost) resetRoomGameToSetup();
    else sendHubAction(HUB_ACTION_TYPES.NEXT_GAME, { target: 'setup' });
    return;
  }
  returnToSetupWithCurrentSettings();
}

function resetRoomGameToSetup() {
  if (hub.session.isRoomPlay && hub.connected && state) {
    sendHubAction(HUB_ACTION_TYPES.SNAPSHOT, {
      reason: 'play_again_setup',
      state: { phase: 'setup', players: [] },
      animation: {},
    });
  }
  returnToSetupWithCurrentSettings();
  if (hub.session.isRoomPlay) prepareRoomSetup();
  publishSetupSync();
}

function leaveTutorial() {
  returnToSetupWithCurrentSettings();
  if (hub.session.isRoomPlay) prepareRoomSetup();
}

function returnToSetupWithCurrentSettings() {
  clearCpuTimers();
  clearShowdownAnimation();
  clearTimeout(openingDealTimer);
  resetSelections();
  clearTutorialFocus();
  tutorial = null;
  state = null;
  document.body.classList.remove('tutorial-mode');
  applyTutorialControlState();
  if (els.quitDialog.open) els.quitDialog.close();
  if (els.rulesDialog.open) els.rulesDialog.close();
  if (els.claimBoardDialog.open) els.claimBoardDialog.close();
  els.gameScreen.classList.add('hidden');
  els.gameScreen.classList.remove('final-view');
  els.setupScreen.classList.remove('hidden');
  els.resultPanel.classList.add('hidden');
  els.resultPanel.innerHTML = '';
  els.finalResultScreen.classList.add('hidden');
  els.finalResultScreen.innerHTML = '';
}

function renderFinalResults() {
  const visible = state.phase === 'final';
  els.finalResultScreen.classList.toggle('hidden', !visible);
  if (!visible) {
    els.finalResultScreen.innerHTML = '';
    return;
  }
  const pointMode = isPointMode();
  const totalChips = state.players.reduce((sum, player) => sum + player.chips, 0);
  const rows = state.players.slice()
    .sort((a, b) => pointMode ? b.points - a.points || a.id - b.id : b.chips - a.chips || b.wins - a.wins || a.id - b.id)
    .map((player, index) => `
      <tr class="${index === 0 ? 'final-leader' : ''}">
        <td>${index + 1}</td>
        <td><span class="final-player">${escapeHtml(player.icon)} ${escapeHtml(player.name)}</span></td>
        ${pointMode
          ? `<td><strong>${formatPointValue(player.points)}</strong></td><td>${pointMeterMarkup(player.points)}</td><td>${player.points >= state.pointsToWin ? 'Reached' : 'Active'}</td>`
          : `<td><strong>${chipCountLabel(player.chips)}</strong></td><td>${formatChipDelta(player.chips - state.startingChips)}</td><td>${player.wins}</td><td>${player.tiedWins}</td><td>${player.out || player.chips <= 0 ? 'Out' : 'Active'}</td>`}
      </tr>
    `).join('');
  const summaryMetric = pointMode
    ? `<span>Target <strong>${formatPointValue(state.pointsToWin)}</strong></span>`
    : `<span>Total <strong>${chipCountLabel(totalChips)}</strong></span>`;
  const tableHeader = pointMode
    ? '<tr><th>Rank</th><th>Player</th><th>Points</th><th>Progress</th><th>Status</th></tr>'
    : '<tr><th>Rank</th><th>Player</th><th>Final 💰</th><th>💰 +/-</th><th>Wins</th><th>Ties</th><th>Status</th></tr>';
  const playAgainDisabled = shouldUseHubActions() && !canUseResultButtons() ? 'disabled' : '';
  els.finalResultScreen.innerHTML = `
    <div class="final-result-shell">
      <h1>Final Results</h1>
      <p>${escapeHtml(state.finalReason || 'Game ended.')}</p>
      <div class="final-summary">
        <span>Games <strong>${state.gameNumber}</strong></span>
        ${summaryMetric}
      </div>
      <table class="final-result-table">
        <thead>${tableHeader}</thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="final-actions">
        <button id="playAgainButton" class="primary-button" type="button" ${playAgainDisabled}>Play Again</button>
      </div>
    </div>
  `;
  document.getElementById('playAgainButton')?.addEventListener('click', requestPlayAgain);
}

function formatChipDelta(delta) {
  return chipDeltaLabel(delta);
}

function openQuitDialog() {
  if (hub.session.isRoomPlay && !canUseResultButtons()) return;
  if (!els.quitDialog.open) els.quitDialog.showModal();
}

function resultWinnerIds(results) {
  const candidates = results.filter(result => result.candidate).sort(compareResults);
  if (!candidates.length) return new Set();
  const winner = candidates[0];
  return new Set(candidates.filter(result => compareResults(result, winner) === 0).map(result => result.player.id));
}

function animateShowdownPayout() {
  const payout = state.showdownPayout;
  if (!payout || payout.played) return 0;
  payout.played = true;
  showShowdownChipDeltas(payout.chipDeltas || []);
  if (!payout.donorIds.length) return 1800;
  const winner = playerIconCenter(payout.winnerId);
  if (!winner) return 1800;
  let longestDelay = 0;
  payout.donorIds.forEach((donorId, donorIndex) => {
    const donor = playerChipCenter(donorId) || playerIconCenter(donorId);
    if (!donor) return;
    for (let index = 0; index < 3; index++) {
      const chip = document.createElement('span');
      chip.className = 'showdown-chip-flight';
      chip.textContent = '🪙';
      chip.style.left = `${donor.x}px`;
      chip.style.top = `${donor.y}px`;
      chip.style.setProperty('--chip-x', `${winner.x - donor.x}px`);
      chip.style.setProperty('--chip-y', `${winner.y - donor.y}px`);
      const delay = donorIndex * 140 + index * 180;
      longestDelay = Math.max(longestDelay, delay);
      chip.style.animationDelay = `${delay}ms`;
      playSound('coin', delay);
      els.tableArea.appendChild(chip);
      chip.addEventListener('animationend', () => chip.remove(), { once: true });
    }
  });
  return Math.max(longestDelay + 3000, 1800);
}

function showShowdownChipDeltas(chipDeltas) {
  for (const entry of chipDeltas) {
    const center = playerIconCenter(entry.playerId);
    if (!center) continue;
    const chipDelta = document.createElement('span');
    chipDelta.className = `showdown-chip-delta ${entry.delta < 0 ? 'loss' : 'gain'}`;
    chipDelta.textContent = chipDeltaLabel(entry.delta);
    chipDelta.style.left = `${center.x}px`;
    chipDelta.style.top = `${center.y}px`;
    els.tableArea.appendChild(chipDelta);
    chipDelta.addEventListener('animationend', () => chipDelta.remove(), { once: true });
  }
}

function playerIconCenter(playerId) {
  return playerFieldNodeCenter(playerId, '.avatar');
}

function playerChipCenter(playerId) {
  return playerFieldNodeCenter(playerId, '.contribution-chip-piles');
}

function playerFieldNodeCenter(playerId, selector) {
  const player = state?.players?.find(candidate => candidate.id === playerId) || { id: playerId };
  const slot = tableSeatSlot(player);
  const rect = document.querySelector(`.field-${slot} ${selector}`)?.getBoundingClientRect();
  const area = els.tableArea.getBoundingClientRect();
  if (!rect) return null;
  return {
    x: rect.left - area.left + rect.width / 2,
    y: rect.top - area.top + rect.height / 2,
  };
}

function animateBetToPot(playerId, amount, action = 'call') {
  noteVisualAnimation('bet', { playerId, amount, action });
  const donor = playerIconCenter(playerId);
  const table = document.querySelector('.oval-table')?.getBoundingClientRect();
  const area = els.tableArea.getBoundingClientRect();
  if (!donor || !table) return;
  const pot = {
    x: table.left - area.left + table.width / 2,
    y: table.top - area.top + table.height / 2,
  };
  const baseChipCount = Math.min(4, Math.max(2, Math.ceil(amount / Math.max(1, state.baseBet))));
  const chipCount = action === 'raise' ? baseChipCount * 2 : baseChipCount;
  for (let index = 0; index < chipCount; index++) {
    const chip = document.createElement('span');
    chip.className = 'bet-chip-flight';
    chip.textContent = '🪙';
    chip.style.left = `${donor.x}px`;
    chip.style.top = `${donor.y}px`;
    chip.style.setProperty('--bet-x', `${pot.x - donor.x}px`);
    chip.style.setProperty('--bet-y', `${pot.y - donor.y}px`);
    const lane = index % 4;
    const wave = Math.floor(index / 4);
    chip.style.setProperty('--bet-side', `${(lane - 1.5) * 14}px`);
    chip.style.setProperty('--bet-arc', `${-18 - lane * 8 - wave * 5}px`);
    const delay = wave * 110 + lane * 72;
    chip.style.animationDelay = `${delay}ms`;
    playSound('coin', delay, false);
    els.tableArea.appendChild(chip);
    chip.addEventListener('animationend', () => chip.remove(), { once: true });
  }
}

function cardNode(card, opts = {}) {
  const div = document.createElement('div');
  div.className = `playing-card ${opts.small ? 'small' : ''} ${opts.selectable ? 'selectable' : ''} ${isRed(card) ? 'red' : ''}`;
  div.innerHTML = `
    <div class="card-rank">${rankLabel(card.rank)}</div>
    <div class="card-suit">${card.suit}</div>
    <div class="card-rank bottom">${rankLabel(card.rank)}</div>
  `;
  return div;
}

function cardBackNode(small = false) {
  const div = document.createElement('div');
  div.className = `playing-card back ${small ? 'small' : ''}`;
  div.textContent = '◆';
  return div;
}

function rankLabel(rank) {
  return RANK_LABEL[rank] || String(rank);
}

function cardLabel(card) {
  return `${rankLabel(card.rank)}${card.suit}`;
}

function cardKey(card) {
  return `${SUITS.indexOf(card.suit)}-${card.rank}`;
}

function isRed(card) {
  return card.suit === '♥' || card.suit === '♦';
}

function claimLabel(key) {
  return CLAIM_BY_KEY[key]?.label || 'No Claim';
}

function specialUseCount(player, type) {
  return player?.specialLog?.filter(entry => entry === type).length || 0;
}

function canPlayerChooseSpecial(player, type) {
  const generalAllowed = !!state && !!player && state.phase === 'round' && state.round <= 3 &&
    state.players[state.currentPlayerIndex] === player && canPlayerActInRound(player) &&
    !player.actedThisRound && !player.specialUsedThisRound &&
    specialUseCount(player, type) < SPECIAL_USE_LIMIT;
  if (!generalAllowed) return false;
  if (type === 'random') {
    const stockNeeded = player.randomExchangeBonusUsed ? 1 : 2;
    return state.stock.length >= stockNeeded && randomExchangeEligibleIndices(player).length > 0;
  }
  if (type === 'peek') return revealProofTargets(player).length > 0;
  return true;
}

function hasAvailableSpecial(player) {
  return Object.keys(SPECIAL_NAMES).some(type => canPlayerChooseSpecial(player, type));
}

function updateSpecialButtons(player) {
  document.querySelectorAll('.special-button').forEach(button => {
    const type = button.dataset.special;
    const disabled = !canPlayerChooseSpecial(player, type);
    button.disabled = disabled;
    button.title = disabled && specialUseCount(player, type) >= SPECIAL_USE_LIMIT
      ? `${SPECIAL_NAMES[type]}: limit reached`
      : SPECIAL_NAMES[type];
  });
}

function isHumanTurnBeforeNormal() {
  const human = localPlayer();
  return !!state && state.phase === 'round' && state.players[state.currentPlayerIndex] === human && canPlayerActInRound(human) && !human.actedThisRound;
}

function canSelectHandCard() {
  return isHumanTurnBeforeNormal() && ['exchange', 'market'].includes(specialMode);
}

function isPublicHandCard(owner, card) {
  return !!owner?.publicHandCardIds?.includes(card.id);
}

function publicCardEyeNode() {
  const eye = document.createElement('span');
  eye.className = 'public-card-badge public-card-eye';
  eye.textContent = '👁';
  eye.title = 'Public card';
  eye.setAttribute('aria-label', 'Public card');
  return eye;
}

function publicCardDieNode() {
  const die = document.createElement('span');
  die.className = 'public-card-badge public-card-die';
  die.textContent = '\u{1F3B2}';
  die.title = 'Random Exchange card';
  die.setAttribute('aria-label', 'Random Exchange card');
  return die;
}

function revealProofTargets(user) {
  if (shouldUseHubActions() && !hub.session.isHost) {
    const targetIds = state.proofTargetIdsByPlayerId?.[user?.id];
    if (Array.isArray(targetIds)) {
      return state.players.filter(player => targetIds.includes(player.id) && !player.out && !player.folded && player.hand.length);
    }
    return state.players.filter(player => player.id !== user?.id && !player.out && !player.folded && player.hand.length);
  }
  return state.players.filter(player => revealProofCards(player, user).length);
}

function resetSelections() {
  selectedHandIndex = null;
  selectedMarketIndex = null;
  specialMode = null;
  if (els.specialDetail) els.specialDetail.innerHTML = '';
}

function pulse(text) {
  if (!els.publicPulse) return;
  if (state) state.publicActionText = text;
  els.publicPulse.textContent = text;
  els.publicPulse.classList.remove('flash');
  void els.publicPulse.offsetWidth;
  els.publicPulse.classList.add('flash');
}

function getAudioContext() {
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return null;
  if (!audioContext) audioContext = new AudioCtor();
  if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
  return audioContext;
}

function playCoinSound(delay = 0) {
  playAudioSample('coin', delay);
}

function playCardSound(delay = 0) {
  playAudioSample('card', delay);
}

function playAudioSample(type, delay = 0) {
  const play = () => {
    if (type === 'coin' && !coinSoundTemplate) {
      coinSoundTemplate = new Audio('assets/coin-drop.mp3');
      coinSoundTemplate.preload = 'auto';
    }
    if (type === 'card' && !cardSoundTemplate) {
      cardSoundTemplate = new Audio('assets/card-take.mp3');
      cardSoundTemplate.preload = 'auto';
    }
    if (type === 'fold' && !foldSoundTemplate) {
      foldSoundTemplate = new Audio('assets/fold.mp3');
      foldSoundTemplate.preload = 'auto';
    }
    if (type === 'win' && !winSoundTemplate) {
      winSoundTemplate = new Audio('assets/win.mp3');
      winSoundTemplate.preload = 'auto';
    }
    if (type === 'failure' && !failureSoundTemplate) {
      failureSoundTemplate = new Audio('assets/failure.mp3');
      failureSoundTemplate.preload = 'auto';
    }
    const templates = {
      coin: coinSoundTemplate,
      card: cardSoundTemplate,
      fold: foldSoundTemplate,
      win: winSoundTemplate,
      failure: failureSoundTemplate,
    };
    const template = templates[type];
    if (!template) return;
    const sound = template.cloneNode();
    sound.volume = type === 'coin' ? 0.45 : type === 'card' ? 0.42 : 0.6;
    sound.play().catch(() => {});
  };
  if (delay > 0) setTimeout(play, delay);
  else play();
}

function playSound(type, delay = 0, sync = true) {
  if (sync) noteSoundAnimation(type, delay);
  if (type === 'coin') {
    playCoinSound(delay);
    return;
  }
  if (type === 'card') {
    playCardSound(delay);
    return;
  }
  if (type === 'fold' || type === 'win' || type === 'failure') {
    playAudioSample(type, delay);
    return;
  }
  const ctx = getAudioContext();
  if (!ctx) return;
  const start = ctx.currentTime + delay / 1000;
  const gain = ctx.createGain();
  gain.connect(ctx.destination);

  const noise = ctx.createBufferSource();
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.08), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(type === 'card' ? 1500 : 900, start);
  filter.Q.setValueAtTime(type === 'card' ? 1.2 : 0.8, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(type === 'card' ? 0.045 : 0.035, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.09);
  noise.buffer = buffer;
  noise.connect(filter);
  filter.connect(gain);
  noise.start(start);
  noise.stop(start + 0.1);
}

function animateDiscardDrop() {
  noteVisualAnimation('discard');
  const pile = document.querySelector('.discard-pile');
  if (!pile) return;
  const angle = Math.random() * Math.PI * 2;
  const distance = 120 + Math.random() * 110;
  const card = document.createElement('div');
  card.className = 'mini-card-back discard-flight';
  card.style.setProperty('--drop-x', `${Math.round(Math.cos(angle) * distance)}px`);
  card.style.setProperty('--drop-y', `${Math.round(Math.sin(angle) * distance)}px`);
  card.style.setProperty('--drop-spin', `${Math.round(-140 + Math.random() * 280)}deg`);
  pile.appendChild(card);
  card.addEventListener('animationend', () => card.remove(), { once: true });
}

function animateStockDraw() {
  noteVisualAnimation('stockDraw');
  const pile = document.querySelector('.stock-pile');
  if (!pile) return;
  const now = performance.now();
  const start = Math.max(now, stockDrawNextStart);
  const delay = Math.max(0, start - now);
  stockDrawNextStart = start + 180;
  playSound('card', delay, false);
  const card = document.createElement('div');
  card.className = 'mini-card-back stock-draw-flight';
  card.style.animationDelay = `${Math.round(delay)}ms`;
  pile.appendChild(card);
  setTimeout(() => card.remove(), delay + 1060);
}

function populateRules() {
  const roleRows = ROLE_ORDER
    .map(r => `<div class="rule-row"><span class="role-tone-${r.rank + 1}">${r.icon} ${r.label}</span><strong>${r.points}</strong></div>`)
    .join('');
  const specialRows = Object.keys(SPECIAL_NAMES)
    .map(type => `<div class="action-rule-row"><strong>${SPECIAL_ICONS[type]} ${SPECIAL_NAMES[type]}</strong><span>${SPECIAL_DESCRIPTIONS[type]}</span></div>`)
    .join('');
  const normalRows = NORMAL_ACTION_DESCRIPTIONS
    .map(([name, description]) => `<div class="action-rule-row"><strong>${name}</strong><span>${description}</span></div>`)
    .join('');
  els.rulesList.innerHTML = `
    <div class="rules-section-title">Hands</div>
    ${roleRows}
    <div class="rules-section-title">Special Actions</div>
    ${specialRows}
    <div class="rules-section-title">Normal Actions</div>
    ${normalRows}
  `;
}

function clearCpuTimers(clearLastFold = true) {
  cpuTimers.forEach(t => clearTimeout(t));
  cpuTimers = [];
  if (clearLastFold && lastFoldInterval) clearInterval(lastFoldInterval);
  if (clearLastFold && roundTransitionTimer) clearTimeout(roundTransitionTimer);
  if (clearLastFold && openingDealTimer) clearTimeout(openingDealTimer);
}

function setupAmountValue(input) {
  const min = Number(input.min || 0);
  const max = Number(input.max || Number.MAX_SAFE_INTEGER);
  const step = Number(input.step || 1);
  const raw = clamp(Number(input.value) || min, min, max);
  return Number((Math.round(raw / step) * step).toFixed(2));
}

function syncSetupAmount(source, target) {
  if (!source || !target) return;
  const value = setupAmountValue(source);
  source.value = value;
  target.value = value;
}

function bindSetupAmount(input, slider) {
  input?.addEventListener('input', () => {
    syncSetupAmount(input, slider);
    publishSetupSync();
  });
  slider?.addEventListener('input', () => {
    syncSetupAmount(slider, input);
    publishSetupSync();
  });
  input?.addEventListener('change', () => {
    syncSetupAmount(input, slider);
    publishSetupSync();
  });
  document.querySelector(`[data-reset-target="${input?.id}"]`)?.addEventListener('click', () => {
    input.value = input.defaultValue;
    syncSetupAmount(input, slider);
    publishSetupSync();
  });
}

function setSetupMode(mode) {
  selectedMode = mode === 'points' ? 'points' : 'chips';
  els.chipModeTab.classList.toggle('selected', selectedMode === 'chips');
  els.pointModeTab.classList.toggle('selected', selectedMode === 'points');
  els.chipModePanel.classList.toggle('hidden', selectedMode !== 'chips');
  els.pointModePanel.classList.toggle('hidden', selectedMode !== 'points');
  publishSetupSync();
}

function setSpecialMode(type) {
  const human = localPlayer();
  if (!canPlayerChooseSpecial(human, type)) return;
  specialMode = type;
  selectedHandIndex = null;
  selectedMarketIndex = null;
  render();
  renderSpecialDetail(type);
  if (tutorial?.active && tutorial.index === 15 && type === 'exchange') {
    tutorial.focus = '.cards-human [data-hand-index="2"]';
    tutorial.allow = '.cards-human [data-hand-index="2"], #confirmSpecial';
    refreshTutorialFocus();
    return;
  }
  tutorialAdvanceFrom(`special:${type}`);
}

function renderSpecialDetail(type) {
  const human = localPlayer();
  if (!type) {
    els.specialDetail.innerHTML = '<div class="special-description">Select a special move for its effect and controls.</div>';
    return;
  }
  if (!canPlayerChooseSpecial(human, type)) return;
  const description = `<p class="special-description">${SPECIAL_DESCRIPTIONS[type]}</p>`;
  if (type === 'exchange') {
    els.specialDetail.innerHTML = `${description}<div class="inline-controls"><span>Pick one hand card.</span><button id="confirmSpecial" class="primary-button" ${selectedHandIndex === null ? 'disabled' : ''}>Confirm</button></div>`;
  }
  if (type === 'random') {
    const max = Math.min(
      randomExchangeEligibleIndices(human).length,
      RANDOM_EXCHANGE_CARD_LIMIT,
      state.stock.length - (human.randomExchangeBonusUsed ? 0 : 1),
    );
    els.specialDetail.innerHTML = `${description}<div class="inline-controls"><span>Random</span><select id="randomCount">${Array.from({ length: max }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}</select><button id="confirmSpecial" class="primary-button" ${max < 1 ? 'disabled' : ''}>Confirm</button></div>`;
  }
  if (type === 'peek') {
    const targets = revealProofTargets(human);
    els.specialDetail.innerHTML = `${description}<div class="inline-controls"><span>Reveal</span><select id="peekTarget">${targets.map(p => `<option value="${p.id}">${escapeHtml(p.name)}</option>`).join('')}</select><button id="confirmSpecial" class="primary-button" ${targets.length === 0 ? 'disabled' : ''}>Confirm</button></div>`;
  }
  if (type === 'market') {
    els.specialDetail.innerHTML = `${description}<div class="inline-controls"><span>Pick hand + market.</span><button id="confirmSpecial" class="primary-button" ${selectedHandIndex === null || selectedMarketIndex === null ? 'disabled' : ''}>Confirm</button></div>`;
  }
  const confirm = document.getElementById('confirmSpecial');
  if (confirm) confirm.addEventListener('click', confirmHumanSpecial);
}

function confirmHumanSpecial() {
  const human = localPlayer();
  if (tutorial?.active) {
    if (specialMode === 'exchange' && selectedHandIndex !== 2) return;
    if (specialMode === 'peek' && Number(document.getElementById('peekTarget')?.value) !== 2) return;
    if (specialMode === 'random') {
      const randomCount = document.getElementById('randomCount');
      if (randomCount) randomCount.value = '1';
    }
  }
  const payload = {};
  if (specialMode === 'exchange') payload.handIndex = selectedHandIndex;
  if (specialMode === 'random') payload.count = Number(document.getElementById('randomCount')?.value || 1);
  if (specialMode === 'peek') payload.targetId = Number(document.getElementById('peekTarget')?.value);
  if (specialMode === 'market') {
    payload.handIndex = selectedHandIndex;
    payload.marketIndex = selectedMarketIndex;
  }
  if (shouldUseHubActions()) {
    sendHubAction(HUB_ACTION_TYPES.SPECIAL, { type: specialMode, payload });
    return;
  }
  let ok = false;
  if (specialMode === 'exchange') ok = useSpecial(human, 'exchange', { handIndex: selectedHandIndex });
  if (specialMode === 'random') ok = useSpecial(human, 'random', { count: Number(document.getElementById('randomCount')?.value || 1) });
  if (specialMode === 'peek') ok = useSpecial(human, 'peek', { targetId: Number(document.getElementById('peekTarget')?.value) });
  if (specialMode === 'market') ok = useSpecial(human, 'market', { handIndex: selectedHandIndex, marketIndex: selectedMarketIndex });
  const usedType = specialMode;
  if (ok) resetSelections();
  render();
  if (ok) tutorialAdvanceFrom(`specialDone:${usedType}`);
}

function submitClaimAction(claim) {
  const human = localPlayer();
  if (!human || !isHumanTurnBeforeNormal() || state.round > 2) return;
  if (shouldUseHubActions()) {
    sendHubAction(HUB_ACTION_TYPES.CLAIM, { claim });
    els.claimBoardDialog.close();
    return;
  }
  human.pendingClaim = claim;
  els.claimBoardDialog.close();
  render();
  tutorialAdvanceFrom(`claim:${claim}`);
}

function submitNormalAction(action) {
  const human = localPlayer();
  if (!human) return;
  if (shouldUseHubActions()) {
    sendHubAction(HUB_ACTION_TYPES.NORMAL, { action });
    return;
  }
  normalAction(human, action);
}

function submitLastFoldAction(choice) {
  const human = localPlayer();
  if (!human) return;
  if (shouldUseHubActions()) {
    sendHubAction(HUB_ACTION_TYPES.LAST_FOLD, { choice });
    return;
  }
  chooseLastFold(human, choice);
}

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

document.addEventListener('click', event => {
  if (!tutorialAllowsEvent(event.target)) {
    event.preventDefault();
    event.stopPropagation();
  }
}, true);
els.startButton.addEventListener('click', startTable);
els.roomButton?.addEventListener('click', openLobbyDialog);
els.closeLobby?.addEventListener('pointerup', closeLobbyDialog);
els.closeLobby?.addEventListener('click', closeLobbyDialog);
els.copyLobbyCode?.addEventListener('click', copyLobbyCode);
els.lobbyStartButton?.addEventListener('click', requestRoomStart);
els.lobbyReadyButton?.addEventListener('click', toggleReady);
els.tutorialButton.addEventListener('click', startTutorial);
els.playerName.addEventListener('input', renderMemberSlots);
els.memberSlots?.addEventListener('click', event => {
  const readyButton = event.target.closest('[data-ready-index]');
  if (readyButton) {
    event.preventDefault();
    event.stopPropagation();
    toggleReady();
    return;
  }
  const button = event.target.closest('[data-member-index]');
  if (!button) return;
  cycleMemberSlot(Number(button.dataset.memberIndex));
});
els.chipModeTab.addEventListener('click', () => setSetupMode('chips'));
els.pointModeTab.addEventListener('click', () => setSetupMode('points'));
bindSetupAmount(els.startingChips, els.startingChipsSlider);
bindSetupAmount(els.baseBet, els.baseBetSlider);
bindSetupAmount(els.maxGames, els.maxGamesSlider);
bindSetupAmount(els.handCardCount, els.handCardCountSlider);
bindSetupAmount(els.pointsToWin, els.pointsToWinSlider);
bindSetupAmount(els.foldWinPoints, els.foldWinPointsSlider);
els.fullscreenButton.addEventListener('click', toggleFullscreen);
els.rulesButton.addEventListener('click', () => {
  if (tutorial?.active) els.rulesDialog.show();
  else els.rulesDialog.showModal();
  tutorialAdvanceFrom('rulesOpen');
});
els.closeRules.addEventListener('click', () => {
  els.rulesDialog.close();
  tutorialAdvanceFrom('rulesClose');
});
els.closeClaimBoard.addEventListener('click', () => els.claimBoardDialog.close());
els.claimBoardOptions.addEventListener('click', event => {
  const button = event.target.closest('[data-claim]');
  const human = localPlayer();
  if (!button || !human || !isHumanTurnBeforeNormal() || state.round > 2) return;
  if (tutorial?.active && tutorial.index === 11 && button.dataset.claim !== 'fullHouse') return;
  if (tutorial?.active && tutorial.index === 29 && button.dataset.claim !== 'four') return;
  submitClaimAction(button.dataset.claim);
});
els.cancelQuitButton.addEventListener('click', () => els.quitDialog.close());
els.confirmQuitButton.addEventListener('click', () => {
  els.quitDialog.close();
  if (shouldUseHubActions()) {
    if (canUseResultButtons()) {
      endGame('Game ended by the host.');
      publishSnapshot('quit');
    }
    return;
  }
  endGame('Game ended by the player.');
});
els.collapsePlayPanel.addEventListener('click', () => {
  panelCollapsed = !panelCollapsed;
  render();
});
document.querySelectorAll('.special-button').forEach(button => {
  button.addEventListener('click', () => {
    if (!button.disabled) setSpecialMode(button.dataset.special);
  });
});
window.addEventListener('pointermove', event => {
  dragHumanPanel(event);
  dragPlayPanelResize(event);
}, { passive: false });
window.addEventListener('pointerup', event => {
  stopHumanPanelDrag(event);
  stopPlayPanelResize(event);
});
window.addEventListener('pointercancel', event => {
  stopHumanPanelDrag(event);
  stopPlayPanelResize(event);
});
window.addEventListener('resize', refitHumanPanelPositions);
els.callButton.addEventListener('click', () => submitNormalAction('call'));
els.raiseButton.addEventListener('click', () => submitNormalAction('raise'));
els.foldButton.addEventListener('click', () => submitNormalAction('fold'));
els.continueButton.addEventListener('click', () => submitLastFoldAction('continue'));
els.lastFoldButton.addEventListener('click', () => submitLastFoldAction('lastFold'));
els.iconPicker.addEventListener('click', e => {
  const button = e.target.closest('.icon-choice');
  if (!button) return;
  selectedIcon = button.dataset.icon;
  document.querySelectorAll('.icon-choice').forEach(b => b.classList.toggle('selected', b === button));
  renderMemberSlots();
  sendPlayerMeta();
  renderLobby();
});
window.addEventListener('beforeunload', () => clearCpuTimers(true));

populateRules();
renderMemberSlots();
connectHubRoom();

async function toggleFullscreen() {
  if (document.fullscreenElement) {
    await document.exitFullscreen?.();
    return;
  }
  if (fallbackFullscreen) {
    setFallbackFullscreen(false);
    return;
  }
  if (document.documentElement.requestFullscreen) {
    try {
      await document.documentElement.requestFullscreen();
      return;
    } catch (error) {
      // Fall back when the browser blocks full-screen for this surface.
    }
  }
  setFallbackFullscreen(true);
}

function setFallbackFullscreen(enabled) {
  fallbackFullscreen = enabled;
  document.body.classList.toggle('fallback-fullscreen', enabled);
}
