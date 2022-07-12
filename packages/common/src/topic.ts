export enum AlertConditionTopic {
  /**
   * An event is captured
   * @default
   */
  EventCapturedCondition = 'ohbug.alert.condition.eventCaptured',
  /**
   * A new issue is created
   */
  FirstSeenEventCondition = 'ohbug.alert.condition.firstSeenEvent',
  /**
   * The issue is seen more than {value} times in {interval}
   * @params {number} value
   * @params {number} interval
   */
  EventFrequencyCondition = 'ohbug.alert.condition.eventFrequency',
  /**
   * The issue is seen by more than {value} users in {interval}
   * @params {number} value
   * @params {number} interval
   */
  UserFrequencyCondition = 'ohbug.alert.condition.userFrequency',
}

export enum AlertFilterTopic {
  /**
   * The issue has happened at least {value} times
   * @params {number} value
   */
  IssueOccurrencesFilter = 'ohbug.alert.filter.issueOccurrences',
  /**
   * The event's {attribute} value {match} {value}
   * @params {Event} attribute
   * @params {'contains' | 'starts with' | 'ends with' | 'equals' | 'does not contain' | 'does not start with' | 'does not end with' | 'does not equal'} match
   * @params {string} value
   */
  EventAttributeFilter = 'ohbug.alert.filter.eventAttribute',
  /**
   * The event is from the latest release
   */
  LatestReleaseFilter = 'ohbug.alert.filter.latestRelease',
}

export type Interval = '1m' | '5m' | '15m' | '1h' | '1d' | '7d' | '30d'
export type FilterMatch = 'contains' | 'starts with' | 'ends with' | 'equals' | 'does not contain' | 'does not start with' | 'does not end with' | 'does not equal'
