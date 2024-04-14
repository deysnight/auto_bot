import parser from 'cron-parser';

export function cronToTimestamp(cronString: string): Date {
  const cronTime = parser.parseExpression(cronString);
  return cronTime.next().toDate();
}
