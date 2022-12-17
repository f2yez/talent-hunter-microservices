
const resltJob = (jobs, talent) => {
  var data = [];
  for (let i = 0; i < talent.length; i++) {
    for (let j = 0; j < jobs.length; j++) {
      if (
        talent[i].name.some((val) => jobs[j].skills.includes(val)) &&
        (talent[i].jobTyp.some((val) => jobs[j].JobType.includes(val)) ||
          talent[i].jobTyp.includes("All")) &&
        (jobs[j].IsRemotly || talent[i].country == jobs[j].JobLocation) &&
        talent[i].experienceLevel.some((val) => jobs[j].level.includes(val))
      ) {
        data.push({
          JobId: jobs[j].id,
          companyIdy: jobs[j].companyIdy,
          JobTitle: jobs[j].title,
          userName: talent[i].userName,
          profileId: talent[i].profileId,
        });
      }
    }
  }

  return data;
};

module.exports = resltJob;
