import Sandrine from "../../assets/images/Sandrine.jpg";
import Theo from "../../assets/images/Theo.jpg";

export default function AboutUs() {
  const teams = [
    {
      name: "Sandrine",
      job: "Scrum Master",
      picture: Sandrine,
      linkGithub: "https://github.com/SandrineJAHAN",
      linkLinkedIn: "https://www.linkedin.com/in/sandrinejahan",
    },
    {
      name: "Alexis",
      job: "Lead Dev Front",
      picture: "https://media.licdn.com/dms/image/D4E03AQHdhGSc8poYzQ/profile-displayphoto-shrink_800_800/0/1703433471073?e=2147483647&v=beta&t=MqgxQXS11xK8BVmUMYKY3PtUpqL0WZaucAfBLYhnhZk",
      linkGithub: "https://github.com/AlexisBugnon",
      linkLinkedIn: "https://www.linkedin.com/in/alexis-bugnon/",
    },
    {
      name: "Théo",
      job: "Référent Git",
      picture: Theo,
      linkGithub: "https://github.com/theoguadagnini",
      linkLinkedIn: "https://www.linkedin.com/in/th%C3%A9o-guadagnini/",
    },
    {
      name: "Yohan",
      job: "Lead Dev Back/ Product Owner",
      picture:
        "https://i.postimg.cc/PxMHccyQ/Sans-titre-2.jpg",
      linkGithub: "https://github.com/Yohan-Baechle",
      linkLinkedIn: "https://www.linkedin.com/in/yohanbaechle/",
    },
    {
      name: "Sofiane",
      job: "Référent Techno",
      picture:
        "https://cdn.discordapp.com/attachments/1187685244569124945/1201889157455290368/IMG_1997.jpg?ex=65cb7581&is=65b90081&hm=625af98a5e907850fb31ae10e43be10edafe7e2a65d7b2849d2770a005cb2532&",
      linkGithub: "https://github.com/AmariSofiane",
      linkLinkedIn: "https://www.linkedin.com/in/soufiane-amari-728296253?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    },
  ];

  return (
    <section className="flex items-center py-12 bg-base-100 font-poppins dark:bg-base-100 ">
      <div className="justify-center flex-1 max-w-6xl px-4 py-6 mx-auto lg:py-4 md:px-6">
        <div className="mb-10 text-center">
          <span className="block mb-4 text-xs font-content font-semibold leading-4 tracking-widest text-center text-blue-500 uppercase dark:text-gray-400">
            Qui sommes nous ?
          </span>
          <h1 className="text-3xl font-heading font-bold capitalize dark:text-white">
            {" "}
            La TEAM Gigpulse{" "}
          </h1>
        </div>

        <div className="flex flex-wrap -mx-4">
          {teams.map((team) => (
            <div
              className="w-full px-4 mb-6 lg:w-1/3 sm:w-1/2 md:mb-10"
              key={team.name}
            >
              <div className="overflow-hidden">
                <img
                  className="object-cover w-full transition-all hover:scale-110 h-72 "
                  src={team.picture}
                  alt=""
                />
              </div>
              <h2 className="mt-4 text-xl font-content font-bold dark:text-gray-400">
                {team.name}
              </h2>
              <p className="mt-2 mb-2 text-sm text-blue-500 dark:text-success">
                {team.job}
              </p>

              <a
                className="inline-block mr-5 text-gray-800 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-400"
                href={team.linkLinkedIn}
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
              <a
                className="inline-block mr-5 text-gray-800 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-400"
                href={team.linkGithub}
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
