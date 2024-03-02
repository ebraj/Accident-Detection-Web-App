export type RescueTeam = {
  id: string;
  name: string;
  email: string;
  isChecked: boolean;
};

export const rescueTeamLists = [
  {
    id: "ambulance",
    name: "Ambulance",
    email: "ebrajambulance@gmail.com",
    isChecked: false,
  },
  {
    id: "firebrigade",
    name: "Fire Brigade",
    email: "ebrajfire@dispostable.com",
    isChecked: false,
  },
  {
    id: "police",
    name: "Police",
    email: "ebrajpolice@gmail.com",
    isChecked: false,
  },
];
