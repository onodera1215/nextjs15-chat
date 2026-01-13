export interface PresenceState {
  // オンラインユーザーのIDをキーとしたマップ
  onlineByUserId: { [userId: string]: boolean };

  // ルーム内のタイピング状態
  typingByRoomId: {
    [roomId: string]: {
      // ユーザーごとのタイピング状態と最終更新時刻
      [userId: string]: { isTyping: boolean; updatedAt: number };
    };
  };
}
