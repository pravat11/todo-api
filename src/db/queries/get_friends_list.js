export function getFriendsListQuery(userId) {
  return `
  (
    SELECT
      f.id as friendship_id,
      l.username as friend_name
      FROM friendships f
      INNER JOIN logins l on l.id = f.user_id_2
      WHERE user_id_1=${userId}
  )
  UNION
  (
    SELECT
      f.id as friendship_id,
      l.username as friend_name
      FROM friendships f
      INNER JOIN logins l on l.id = f.user_id_1
      WHERE user_id_2=${userId}
  )
  `;
}
