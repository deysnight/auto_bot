import { setTimeout } from 'timers/promises';

export default async function wait(delay: number): Promise<void> {
  return await setTimeout(delay);
}
