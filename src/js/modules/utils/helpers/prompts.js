/**
 * PROMPTS
 * @module utils/helpers/prompts
 */

// Import external dependencies
import pkg from "enquirer";

// Import helpers
// import { c, log } from "./modules/utils/helpers/index.js";

const { prompt, Confirm } = pkg;

export async function cliPrompts() {
  const confirmQ = new Confirm({
    name: "question",
    message: "Want to answer?",
  });

  const questions = [
    {
      type: "input",
      name: "username",
      message: "What is your username?",
      initial: "admin",
    },
    {
      type: "input",
      name: "password",
      message: "What is your password?",
      initial: "password",
    },
    {
      type: "input",
      name: "email",
      message: "What is your email?",
      // validate: validateEmail(),
    },
    {},
  ];

  const answers = await prompt(questions);
  console.log(answers);
  const answerConfirmQ = await prompt(confirmQ);
  console.log(answerConfirmQ);
}

// import { createInterface } from "node:readline/promises";
// import { stdin as input, stdout as output } from "node:process";

// export async function testPrompts() {
//   const rl = createInterface({ input, output });

//   const q1 = chalk.yellowBright("What do you think of Node.js? ");
//   const answer = await rl.question(q1);

//   console.log(`Thank you for your valuable feedback: ${answer}`);

//   rl.close();
// }
