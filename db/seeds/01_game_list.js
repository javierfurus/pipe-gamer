exports.seed = function (knex) {
  return knex('game_list').del()
    .then(function () {
      const game_list = [
        {
          title: 'Call of Duty: Duty Not Available',
          image: '/images/callofduty.jpg',
          publisher: 'Activision',
          description: 'A shooting game, joy for the whole family.',
          year: 2012,
          price: 60
        },
        {
          title: 'Sonic the Hedgehog',
          image: '/images/sonicthehedgehog.jpg',
          publisher: 'SEGA',
          description: 'In an attempt to steal the six Chaos Emeralds and harness their power, the evil Dr. Ivo Robotnik has trapped the animal inhabitants of South Island inside aggressive robots and stationary metal capsules. The player controls Sonic, who aims to halt Robotnik\'s plans by freeing his animal friends and collecting the emeralds himself. If the player collects all the Chaos Emeralds and completes the game, an ending sequence is shown. If all the emeralds are not collected, Robotnik taunts the player while juggling any of the Chaos Emeralds not collected by the player.',
          year: 1991,
          price: 10
        },
        {
          title: 'Mastermind',
          image: '/images/mastermind.jpg',
          publisher: 'LeviSoft',
          description: 'Mastermind or Master Mind is a code-breaking game for two players. The modern game with pegs was invented in 1970 by Mordecai Meirowitz, an Israeli postmaster and telecommunications expert. It resembles an earlier pencil and paper game called Bulls and Cows that may date back a century or more.',
          year: 2020,
          price: 200
        },
        {
          title: '2048',
          image: '/images/2048.jpg',
          publisher: 'E-Za Entertainment',
          description: '2048 is a single-player sliding block puzzle game designed by Italian web developer Gabriele Cirulli. The objective of the game is to slide numbered tiles on a grid to combine them to create a tile with the number 2048; however, one can continue to play the game after reaching the goal, creating tiles with larger numbers. It was originally written in JavaScript and CSS over a weekend, and released on 9 March 2014 as free and open-source software subject to the MIT license. There is also a version for the Linux terminal. This one is a mix of the two: written in JavaScript and it runs in terminal.',
          year: 2020,
          price: 200
        },
        {
          title: 'Marvel\'s Spider Man',
          image: '/images/spiderman.jpg',
          publisher: 'Sony Computer Entertainment Europe',
          description: 'Spider-Man features a large ensemble cast of characters drawn from the history of Spider-Man comics. Peter Parker (voiced by Yuri Lowenthal) is a 23-year-old research assistant, who gains superhuman abilities after being bitten by a genetically-modified spider. Assuming a secret identity as the superhero Spider-Man, Peter uses these abilities to protect the residents of New York City. Eight years into his superhero career, Peter has become an experienced crime fighter but struggles to balance his superhero and personal lives. Peter is assisted by Daily Bugle reporter Mary Jane Watson (Laura Bailey), his ex-girlfriend, and NYPD Captain Yuri Watanabe (Tara Platt). In his civilian life, Peter is supported by his Aunt May (Nancy Linari) who volunteers at the F.E.A.S.T. homeless shelter run by philanthropist Martin Li (Stephen Oyoung). Peter is employed by his friend and mentor, the respected scientist Dr. Otto Octavius (William Salyers).',
          year: 2018,
          price: 30
        },
        {
          title: 'Batman: Arkham Asylum',
          publisher: 'WB Interactive',
          image: '/images/arkham.jpg',
          description: 'Arkham Asylum is set in the fictional Arkham Asylum, a facility on Arkham Island off the coast of Gotham City that houses criminally insane supervillains. The game features a large ensemble of characters from the history of Batman comics. Three voice actors, who worked on the DC Animated Universe series of film and television, reprised their roles for the game. Kevin Conroy voices Batman—a superhero trained to the peak of human physical perfection and an expert in martial arts, Mark Hamill voices Batman\'s psychopathic nemesis the Joker, and the Joker\'s sidekick Harley Quinn is voiced by Arleen Sorkin. Batman is aided by his allies Oracle (Kimberly Brooks)—who remotely provides him with intelligence, and police commissioner James Gordon (Tom Kane).',
          year: 2012,
          price: 40
        },
        {
          title: 'Krunker',
          image: '/images/krunker.jpg',
          publisher: 'Yendis Entertainment',
          description: 'Krunker.io, is a 3D FPS game made by the developers of Vertix.io, Moomoo.io, Vincent & Sidney. It is a beloved past-time and not-so-past-time activity at Flow Academy.',
          year: 2018,
          price: 0
        },
        {
          title: 'Command & Conquer: Red Alert 2',
          image: '/images/redalert.jpg',
          publisher: 'Virgin Interactive Entertainment',
          description: 'Command & Conquer: Red Alert 2 is a real-time strategy video game by Westwood Pacific, which was released for Microsoft Windows on October 25, 2000[1] as the follow-up to Command & Conquer: Red Alert. Red Alert 2 picks up at the conclusion of the Allied campaign of the first game. Its expansion is Command & Conquer: Yuri\'s Revenge. Command and Conquer: Red Alert 2 contains two playable factions, the Soviets and the Allies, which both previously appeared in Command & Conquer: Red Alert. The single player campaign is structured in an alternate-ending mode as opposed to a progressive story mode. Like its predecessor, Red Alert 2 features a large amount of full motion video cutscenes between missions and during gameplay, with an ensemble cast including Ray Wise, Udo Kier, Kari Wuhrer, and Barry Corbin.',
          year: 1997,
          price: 12
        }
      ];

      return knex('game_list').insert(game_list);
    });
};
