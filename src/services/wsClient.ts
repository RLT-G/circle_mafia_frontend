import type { Socket } from "socket.io-client";
import io from "socket.io-client";

const socket: typeof Socket = io("ws://localhost:8000", {
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

export interface IGameState {
  map_info: {
    width: number;
    height: number;
    player_count: number;
    expected_players: number;
  };
  safe_zone: {
    bounds: any;
    scale: number;
    damage_per_second: number;
    time_to_next_shrink: number;
    game_time: number;
  };
  bonus_zones: {
    x: number;
    y: number;
    radius: number;
    multiplier: number;
    remaining_time: number;
    funds_collected: number;
    max_funds: number;
  }[];
  zone_fund: number;
  bonus_fund: number;
  time_to_next_bonus_zone: number;
  game_phase: any;

  players: {
    [playerId: string]: {
      x: number;
      y: number;
      mass: number;
      color: [number, number, number];
      shield_active: boolean;
      speed_boost_active: boolean;
      skills_used: string[];
      outside_zone: boolean;
      zone_damage_taken: number;
      in_bonus_zone: boolean;
      bonus_multiplier: number;
      bonus_zone_collected: number;
      cooldowns: {
        teleport: number;
        shield: number;
        boost: number;
      };
    };
  };

  foods: {
    x: number;
    y: number;
    mass: number;
    color: [number, number, number]
  }[];

  early_exits?: string[];
  super_exits?: string[];
  finalists?: string[];
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

  onJoinRoom(cb: (data: { players: string[], room_id: string, message: string }) => any) {
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

  move(dx: number, dy: number) {
    socket.emit("move", { dx, dy })
  }

  get raw() {
    return socket;
  }
}

const wsClient = new WSClient();
export default wsClient;
