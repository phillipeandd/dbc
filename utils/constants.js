export const API_BASE_URL = 'https://bc.exploreanddo.com/api';

export const ENDPOINTS = {
  LOGIN: '/login',
  LOGIN_AUTH: '/loginAuth',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  GET_COMPANY_DETAILS: '/get-company-details',
  GET_SOCIAL_MEDIA_LINKS: '/get-socialmedia-links',
  UPDATE_THEME: '/update-theme',
  SAVE_COMPANY_DETAILS: '/save-company-details',
  EDIT_COMPANY_DETAILS: '/edit-company-details',
  EDIT_USER_IMAGE: '/edit-user-image',
  ADD_NFC_USER: '/add-nfc-user',
  COMPANY_NFC_USERS: '/company-nfc-users',
  COMPANY_BRANCHES: '/company-branches',
  GET_USER_CONNECTS: '/get-user-connects',
};

export const STORAGE_KEYS = {
  THEME_PREFERENCE: 'theme_preference',
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
};

export const SOCIAL_MEDIA_TYPES = [
  'whatsapp',
  'twitter',
  'linkedIn',
  'youtube',
  'facebook',
  'skype',
  'telegram',
  'tiktok',
  'instagram',
  'behance',
  'discord',
  'reddit',
];

export const USER_ROLES = {
  ADMIN: '2',
  EMPLOYEE: '3',
  SELF_EMPLOYED: '4',
};

export const THEME_IDS = {
  THEME_1: '1',
  THEME_2: '2',
  THEME_3: '3',
  THEME_4: '4',
  THEME_5: '5',
  THEME_6: '6',
};