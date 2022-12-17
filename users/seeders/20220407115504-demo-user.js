"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        id: 1,
        fullName: "Rahim Harmon",
        userName: "Rahim Harmon",
        email: "vozuza@mailinator.com",
        password:
          "$2b$10$Vlzzjx9CDFHgJw.BFsiafuTeOXcEhvoMO4vzUxM5jz2OwmPhkuWee",
        type: "company",
        planId: 7,
        phone: "05977777777",
        profileId: 26,
        description: "My Name is Rahim Harmon",
        country: "Gaze",
        image: 1,
        vitrified: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        fullName: "Mahmoud",
        userName: "front End",
        email: "nw@gmail.com",
        password:
          "$2b$10$ygF7ecUeTr0Jr5Lw4R4rbuf.V7b5sBp01CSh3wi1VCo5AYHFvkyf6",
        type: "talent",
        planId: 8,
        phone: "0567822222",
        profileId: 4,
        description: "Hi I am Mahmoud",
        country: "gaze",
        image: 2,
        vitrified: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
