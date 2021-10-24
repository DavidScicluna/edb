import { Role as TVCastRole, Job as TVCrewJob } from '../../../../../common/types/tv';

/**
 * This method will return the role the person executed the most (By episode count)
 *
 * @param roles - The roles assigned to a person
 * @returns - Highest executed role by the person
 */
const handleReturnPersonRole = (roles: TVCastRole[]): TVCastRole => {
  return roles.reduce((prev, current) => (prev.episode_count > current.episode_count ? prev : current));
};

/**
 * This method will create a proper label for tv show cast person
 *
 * @param roles - All roles associated with the person
 * @returns String - A proper label highlighting the episode count and the character name
 */
const handleReturnPersonRoleLabel = (roles: TVCastRole[]): string => {
  const role = handleReturnPersonRole(roles);

  return `${role.episode_count} episode${role.episode_count === 0 || role.episode_count > 1 ? 's' : ''} as ${
    role.character
  }`;
};

/**
 * This method will return the job the person worked the most as (By episode count)
 *
 * @param jobs - The jobs assigned to a person
 * @returns - Highest worked job by the person
 */
const handleReturnPersonJob = (jobs: TVCrewJob[]): TVCrewJob => {
  return jobs.reduce((prev, current) => (prev.episode_count > current.episode_count ? prev : current));
};

/**
 * This method will create a proper label for tv show crew person
 *
 * @param jobs - All jobs associated with the person
 * @returns String - A proper label highlighting the episode count and the job name
 */
const handleReturnPersonJobLabel = (jobs: TVCrewJob[]): string => {
  const job = handleReturnPersonJob(jobs);

  return `${job.episode_count} episode${job.episode_count === 0 || job.episode_count > 1 ? 's' : ''} as ${job.job}`;
};

export { handleReturnPersonRole, handleReturnPersonRoleLabel, handleReturnPersonJob, handleReturnPersonJobLabel };
