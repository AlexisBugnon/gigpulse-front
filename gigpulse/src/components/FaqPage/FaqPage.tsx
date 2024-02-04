import { Disclosure } from "@headlessui/react";

const faqs = [
  {
    question: "1. Qu'est-ce que GigPulse ?",
    answer:
      "GigPulse est une plateforme en ligne qui met en relation des freelances talentueux avec des particuliers et des entreprises à la recherche de services variés. Vous pouvez trouver une large gamme de services, de la rédaction de contenu à la conception graphique, en passant par la programmation, la vidéo, et bien plus encore.",
  },
  {
    question: "2. Comment puis-je m'inscrire sur GigPulse ?",
    answer:
      "L'inscription sur GigPulse est simple et gratuite ! Cliquez sur le bouton 'Se connecter' en haut à droite de la page d'accueil puis sur \"Inscrivez-vous ici\". Remplissez le formulaire d'inscription avec vos informations de base.Validez votre compte en cliquant sur le lien de confirmation envoyé à votre adresse e-mail.Vous êtes prêt à commencer !",
  },
  {
    question: "3. Comment puis-je publier un service (gig) sur GigPulse ?",
    answer:
      "Pour publier un service sur GigPulse, suivez ces étapes : Connectez-vous à votre compte. Cliquez sur 'Mes services' dans le menu latéral puis sur \"Publier un service\". Remplissez les détails de votre service, y compris le titre, la description, le prix, et la catégorie. Ajoutez une image pour illustrer votre service.Enfin, cliquez sur 'Publier', et votre service sera en ligne pour les utilisateurs à découvrir !",
  },
  {
    question:
      "4. Comment puis-je contacter un freelance ou un client sur GigPulse ?",
    answer:
      "Pour contacter un freelance ou un client sur GigPulse, il vous suffit d'accéde au profil de l'utilisateur que vous souhaitez contacter. Cliquez sur le bouton 'Contacter' sur leur profil. Vous pouvez maintenant discuter avec eux pour discuter des détails de votre projet ou de votre service.",
  },
  {
    question:
      "5. Comment puis-je laisser un commentaire ou un avis sur un service ?",
    answer:
      "Vous pouvez laisser un commentaire et un avis sur un service que vous avez utilisé. Accédez au service que vous avez utilisé. Faites défiler jusqu'à la section 'Avis et commentaires'. Cliquez sur 'Laisser un avis'. Donnez votre avis en attribuant une note et en écrivant un commentaire. Cliquez sur 'Soumettre'. Votre avis sera visible pour les autres utilisateurs.",
  },
];

export default function FaqPage() {
  return (
    <div className="bg-base-100 min-h-screen px-2">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-heading text-2xl sm:text-4xl font-bold leading-10 tracking-tight dark:text-secondary">
            Foire aux questions (FAQ)
          </h1>
          <p className="dark:text-secondary font-content font-semibold dark:border-secondary my-6">
            Découvrez les réponses aux questions fréquemments posées et
            simplifiez votre expérience avec Gigpulse
          </p>
          <dl className="mt-5 space-y-6 divide-y divide-gray-900/10 dark:divide-secondary">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="font-semibold text-xl font-content leading-7 dark:text-secondary">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <div
                              className="h-6 w-6 text-[5] dark:text-secondary"
                              aria-hidden="false"
                            >
                              -
                            </div>
                          ) : (
                            <div
                              className="h-6 w-6 dark:text-secondary"
                              aria-hidden="true"
                            >
                              +
                            </div>
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 dark:text-white">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
