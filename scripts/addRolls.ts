import mongoose from "mongoose";
import { RollV1, RollV2, RollV3, RollV4 } from "../app/models/Roll";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://nageshpatidar021999_db_user:wQWaTxXvikb8ITVI@crex247.hpp77pi.mongodb.net/?appName=crex247";

async function addRolls() {
  await mongoose.connect(MONGO_URI);

  const rolls = [
    // Admin 1 rolls
    {
      number: 2,
      reward: 10,
      code: "A101",
      instantId: "inst1",
      adminKey: "admin1key"
    },
    {
      number: 4,
      reward: 20,
      code: "A102",
      instantId: "inst2",
      adminKey: "admin1key"
    },
    // Admin 2 rolls
    {
      number: 1,
      reward: 5,
      code: "B201",
      instantId: "inst3",
      adminKey: "admin2key"
    },
    // Admin 3 rolls
    {
      number: 6,
      reward: 50,
      code: "C301",
      instantId: "inst4",
      adminKey: "admin3key"
    }
    // Add more rolls as needed for other admins
  ];

  for (const roll of rolls) {
    await RollV1.create(roll); // or RollV2, RollV3, RollV4 as needed
  }

  console.log("Rolls added successfully!");
  await mongoose.disconnect();
}

addRolls();
