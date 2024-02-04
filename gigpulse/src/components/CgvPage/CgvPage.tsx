import { Disclosure } from "@headlessui/react";

const cgv = [
    {
        subject: "Définitions",
        answer:
        "Annonce : désigne l'ensemble des éléments et données (visuelles, textuelles, sonores, photographies, dessins), déposé par un Annonceur sous sa responsabilité éditoriale exclusive, en vue d'acheter, de louer ou de vendre un bien ou un service et diffusé sur le Site Internet et les Applications.Annonceur : désigne toute personne physique, majeure, agissant exclusivement à des fins privées et non professionnelles (tout Annonceur professionnel est dans l'obligation d'ouvrir un Compte Pro et de respecter les CGV applicables aux détenteurs d'un « Compte Pro »), établie en France (inclus les DOM à l'exclusion de Mayotte), titulaire d’un Compte Personnel et ayant déposé une Annonce, à partir de celui-ci, sur le Site Internet, et/ou sur les Applications. Tout Annonceur doit impérativement être connecté à son Compte Personnel pour déposer et gérer sa ou ses Annonces. Tout premier dépôt d’annonce entraîne automatiquement la création d’un Compte Personnel propre à l’Annonceur.",
    },
    {
        subject: "Objet",
        answer:
            "Les présentes Conditions Générales de Vente (CGV) établissent les conditions contractuelles applicables à toute souscription, par un Annonceur connecté à son Compte Personnel depuis le Site Internet et les Applications..",
    },
    {
        subject: "Acceptation",
        answer:
            "Toute souscription d'option(s) payante(s) et/ou achat de crédits par un Annonceur vaut acceptation pleine et entière des CGV en vigueur.",
    },
    {
        subject: "Prix",
        answer:
            "Les tarifs appliqués sont ceux en vigueur au jour de l'achat d'une ou des option(s) payante(s) ou d'une offre de crédits par l'Annonceur. Gigpulse FRANCE se réserve la possibilité de modifier ses prix à tout moment.",
    },
    {
        subject: "Responsabilité, Force majeure",
        answer:
            "La responsabilité de Gigpulse FRANCE ne peut être engagée en cas d'inexécution ou de mauvaise exécution de la commande due, soit du fait de l'Annonceur, soit d'un cas de force majeure..",
    },
    {
        subject: "Modification CGV",
        answer:
            "Les présentes CGV sont applicables à partir du 16 février 2024. Gigpulse FRANCE se réserve la possibilité, à tout moment, de modifier en tout ou partie les CGV. Les Annonceurs sont invités à consulter régulièrement les CGV afin de prendre connaissance des changements apportés.",
    },
    {
        subject: "Dispositions diverses",
        answer:
            "Tout traitement de données personnelles dans le cadre des présentes est soumis aux dispositions de notre politique de confidentialité, qui fait partie intégrante des présentes CGV. Si une partie des CGV devait s'avérer illégale, invalide ou inapplicable, pour quelque raison que ce soit, les dispositions en question seraient réputées non écrites, sans remettre en cause la validité des autres dispositions qui continueront de s'appliquer entre les Annonceurs et Gigpulse FRANCE.Toute réclamation doit être adressée au Service Client de Gigpulse FRANCE. Les CGV sont soumises au droit français.",
    },
]

function CgvPage(){
    return (
        <div className="bg-base-100 max-w-7xl mx-auto min-h-screen pt-16 lg:pt-0">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
            <div className="mx-auto max-w-4xl">
                <h2 className="font-heading text-2xl font-bold leading-10 tracking-tight dark:text-secondary ">Conditions Générales de Vente (CGV)</h2>
                <p className="leading-10 dark:text-secondary font-heading font-semibold border-b-2 dark:border-secondary pb-2">Découvrez les réponses aux Conditions Générales de Vente</p>
                <dl className="mt-5 space-y-6 divide-y divide-gray-900/10 dark:divide-secondary">
                    {cgv.map((cgv) => (
                        <Disclosure as="div" key={cgv.subject} className="pt-6">
                            {({ open }) => (
                                <>
                                    <dt>
                                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                            <span className="text-base font-semibold leading-7 dark:text-secondary">{cgv.subject}</span>
                                            <span className="ml-6 flex h-7 items-center">
                                                {open ? (
                                                    <div className="h-6 w-6 text-[5] dark:text-secondary" aria-hidden="false">-</div>
                                                ) : (
                                                    <div className="h-6 w-6 dark:text-secondary" aria-hidden="true">+</div>
                                                )}
                                            </span>
                                        </Disclosure.Button>
                                    </dt>
                                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                        <p className="text-base leading-7 dark:text-white">{cgv.answer}</p>
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
export default CgvPage;