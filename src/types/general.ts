export enum RouteName {
  DASHBOARD = 'Dashboard',
  ACTIVE = 'Active',
  DATA_LOGS = 'DataLogs',
  DATA_RECORDS = 'DataRecords',
  CREATE = 'Create',
  EDIT = 'Edit',
  SETTINGS = 'Settings',
  FAQ = 'FAQ',
  ABOUT = 'About',
  DONATE = 'Donate',
  NOT_FOUND = 'NotFound',
}

export enum Limit {
  MAX_FILE_SIZE = 1_000_000,
  MAX_TEXT_AREA = 250,
  MAX_NAME = 50,
  MIN_NAME = 1,
}

export enum Duration {
  Now = 1,
  'One Second' = 1_000,
  'One Minute' = 60_000,
  'One Hour' = 3_600_000,
  'One Day' = 86_400_000,
  'One Week' = 604_800_000,
  'One Month' = 2_592_000_000,
  'Three Months' = 7_776_000_000,
  'Six Months' = 15_552_000_000,
  'One Year' = 31_536_000_000,
  'All Time' = Number.MAX_SAFE_INTEGER - 1, // So it doesn't match 'Forever'
  'Forever' = Number.MAX_SAFE_INTEGER,
}

/**
 * @see https://fonts.google.com/icons
 */
export enum Icon {
  // Log Levels
  DEBUG = 'bug_report',
  INFO = 'info',
  WARN = 'warning',
  ERROR = 'error',

  // Pages
  DONATE = 'redeem',
  DASHBOARD = 'dashboard',
  SETTINGS = 'settings',
  LOGS = 'plagiarism',
  FAQ = 'help_center',
  NOT_FOUND = 'question_mark',

  // Dialogs
  CHARTS = 'bar_chart',
  INSPECT = 'manage_search',
  NOTE = 'sticky_note_2',

  // Tables Types
  PARENTS = 'table_chart',
  CHILDREN = 'fact_check',
  EXAMPLES = 'smart_toy',
  TESTS = 'cruelty_free',

  // Actions
  BACK = 'arrow_back',
  FAVORITE_ON = 'star',
  FAVORITE_OFF = 'star_border',
  REFRESH = 'refresh',
  CLEAR = 'delete_sweep',
  CLOSE = 'close',
  CREATE = 'add_circle',
  DELETE = 'delete',
  EDIT = 'edit',
  UP = 'keyboard_arrow_up',
  ATTACH = 'post_add',
  CANCEL = 'cancel',
  ADD = 'add',
  SAVE = 'save',
  DEFAULTS = 'playlist_add',

  // Design Elements
  MENU = 'menu',
  MENU_VERTICAL = 'more_vert',
  WEB = 'language',
  CODE = 'code',
  STOPWATCH = 'timer',
  READY = 'recommend',
  LOCK = 'lock',
  PREVIOUS = 'undo',
  CALENDAR_CHECK = 'event_available',
  CALENDAR_DATE = 'event',
  OPTIONS = 'tune',
  CLOCK = 'access_time',
  EMPTY = 'check_box_outline_blank',
}
