import type { Socket } from "socket.io-client";
import io from "socket.io-client";
import { wsURL } from "../constans";

const socket: typeof Socket = io(wsURL, {
  transports: ["websocket"],
  autoConnect: false
})

type UUID = string;

export interface IRoom {
  room_id: string
  entry_fee: number
  min_players: number
  max_players: number
  status: string
  created_at: string
}

export class WSClient {
  connect() {
    console.log("Начинаю коннект")
    socket.connect();
  }

  onConnected(cb: (data: { sid: string }) => void) {
    socket.on("connected", cb);
  }

  disconnect() {
    console.log("Начинаю дисконнект")
    socket.disconnect();
  }

  onDisconnected(cb: () => any) {
    socket.on("disconnected", cb);
  }

  onError(cb: (data: { message: string }) => any) {
    socket.on("error", cb)
  }

  authenticate(userId: UUID) {
    console.log(userId)
    socket.emit("authenticate", { user_id: userId });
  }

  onAuthenticated(cb: (data: { user_id: UUID; username: string }) => void) {
    socket.on("authenticated", cb);
  }

  onAuthenticatedError(cb: (data: { message: string }) => void) {
    socket.on("auth_error", cb)
  }

  getRooms() {
    socket.emit("get_rooms")
  }

  onGetRooms(cb: (data: { rooms: IRoom[] }) => void) {
    socket.on("rooms_list", cb)
  }

  createRoom() {
    socket.emit("create_room", {
      entry_fee: 0,
      min_players: 2,
      max_players: 50
    })
  }

  onCreateRoom(cb: (data: IRoom) => void) {
    socket.on("room_created", cb)
  }

  joinRoom(roomID: string) {
    socket.emit("join_room", {
      "room_id": roomID
    })
  }

  onJoinRoom(cb: (data: { players: string[], room_id: string, message: string, time_to_start: number | null }) => any) {
    socket.on("joined_room", cb)
  }

  onPlayerJoined(cb: (data: { players: string[], room_id: string }) => any) {
    socket.on("player_joined", cb)
  }

  startGame(roomID: string) {
    socket.emit("start_game", { room_id: roomID })
  }

  onStartGame(cb: (data: { room_id: string }) => any) {
    socket.on("game_started", cb)
  }

  onGameState(cb: (data: IGameState) => any) {
    socket.on("game_state", cb)
  }

  onGameStarted(cb: (data: { time_to_start: number }) => any) {
    socket.on("game_started", cb)
  }

  move(dx: number, dy: number) {
    socket.emit("move", { dx, dy })
  }

  get raw() {
    return socket;
  }
}


// Basic interfaces
interface Zone {
  x: number;
  y: number;
  radius: number;
}

interface SaveZone extends Zone {
  scale: number;
  damage_per_second: number;
  time_to_next_shrink: number;
  game_time: number;
}

interface BonusZoneModel extends Zone {
  multiplier: number;
  remaining_time: number;
  funds_collected: number;
  max_funds: number;
}

interface Cooldowns {
  teleport: number;
  shield: number;
  boost: number;
}

interface PlayerData {
  x: number;
  y: number;
  mass: number;
  money: number;
  color: [number, number, number];
  shield_active: boolean;
  speed_boost_active: boolean;
  skills_used: number;
  outside_zone: boolean;
  zone_damage_taken: number;
  in_bonus_zone: boolean;
  bonus_multiplier: number;
  bonus_zone_collected: number;
  cooldowns: Cooldowns;
}

interface Phase {
  phase: string;
  super_game_time_remaining?: number;
  skill_costs_increased?: boolean;
  voting_time_remaining?: number;
  votes_submitted?: number;
  votes_exit?: number;
  votes_super?: number;
}

interface MapInfo {
  radius: number;
  player_count: number;
  exepcted_players: number;
}

interface FoodModel {
  x: number;
  y: number;
  mass: number;
  color: [number, number, number];
}

// Main GameState interface
export interface IGameState {
  map_info: MapInfo;
  safe_zone: SaveZone;
  bonus_zones: (BonusZoneModel | null)[];
  zone_fund: number;
  bonus_fund: number;
  time_to_next_bonus_zone: number;
  game_phase: Phase;
  players: { [playerId: string]: PlayerData }[];
  foods: FoodModel[];
  early_exits?: { [playerId: string]: number };
  super_exits?: { [playerId: string]: number };
  finalists?: string[];
}

const wsClient = new WSClient();
export default wsClient;

