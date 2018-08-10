export function getDeleteChatMessagesQuery(friendshipId) {
  return `
    DELETE FROM chat_messages
      WHERE id IN (
        SELECT
          id
          FROM chat_messages
          WHERE friendship_id=${friendshipId}
          ORDER BY(id)
          ASC
          LIMIT 5
      )
  `;
}
