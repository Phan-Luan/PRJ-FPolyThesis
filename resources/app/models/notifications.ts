import { pathName } from '@/routes/path-name';
import { IUser } from './user';

export interface INotification {
  id: number;
  sender: number;
  recipient: number;
  content: string;
  notification_type: NotificationTypeUnion;
  status: string;
  objet_id: number;
  created_at: Date;
  updated_at: Date;
  user: IUser;
}

export type GetNotificationsResponseType = Array<INotification>;

export const NotificationType = {
  friend: 'friend',
  like_post: 'like_post',
  like_blog: 'like_blog',
  like_qa: 'like_qa',
  comment_post: 'comment_post',
  comment_blog: 'comment_blog',
  comment_qa: 'comment_qa',
  reply_post: 'reply_post',
  reply_blog: 'reply_blog',
  reply_qa: 'reply_qa',
} as const;

export type NotificationTypeUnion = (typeof NotificationType)[keyof typeof NotificationType];

export const NotificationIcon = {
  [NotificationType['friend']]: 'military_tech',
  [NotificationType['like_post']]: 'favorite_border',
  [NotificationType['comment_post']]: 'chat_bubble_outline',
  [NotificationType['reply_post']]: 'chat_bubble_outline',
  [NotificationType['like_blog']]: 'favorite_border',
  [NotificationType['comment_blog']]: 'chat_bubble_outline',
  [NotificationType['reply_blog']]: 'chat_bubble_outline',
  [NotificationType['like_qa']]: 'favorite_border',
  [NotificationType['comment_qa']]: 'chat_bubble_outline',
  [NotificationType['reply_qa']]: 'chat_bubble_outline',
} as const;

// chưa xong còn fix dần =))
export const NotificationLink = {
  [NotificationType['friend']]: pathName.FRIEND_REQUEST,
  [NotificationType['like_post']]: pathName.POST, // sua lai thanh detail post
  [NotificationType['comment_post']]: pathName.POST,
  [NotificationType['reply_post']]: pathName.POST,
  [NotificationType['like_blog']]: pathName.BLOG,
  [NotificationType['comment_blog']]: pathName.BLOG,
  [NotificationType['reply_blog']]: pathName.BLOG,
  [NotificationType['like_qa']]: pathName.QUESTS,
  [NotificationType['comment_qa']]: pathName.QUESTS,
  [NotificationType['reply_qa']]: pathName.QUESTS,
} as const;