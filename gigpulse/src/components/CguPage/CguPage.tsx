import { Disclosure } from "@headlessui/react";

const cgu = [
    {
        question: "Définitions",
        answer:
        "Chacun des termes mentionnés ci-dessous aura dans les présentes Conditions Générales d'Utilisation du Site gigpulse.fr, des Applications et du Service GIGPULSE (ci-après dénommées les CGU) la signification suivante :Acheteur : désigne toute personne physique majeure titulaire d’un Compte Utilisateur qui procède, depuis une Annonce, à l’achat d’un ou plusieurs Biens sur le Site à un Vendeur. Annonce : désigne l'ensemble des éléments et données (visuelles, textuelles, sonores, photographies, dessins et, le cas échéant, liens vers une visite virtuelle d'un bien immobilier), déposé par un Annonceur sous sa responsabilité éditoriale, en vue d'acheter, de louer ou de vendre un bien ou de proposer ou de rechercher un service ou un emploi et diffusé sur le Site et les Applications.Annonceur : désigne toute personne physique majeure ou personne morale établie en France (inclus les DOM à l'exclusion de Mayotte et des COM), titulaire d’un Compte Pro ou Personnel, et ayant déposé et mis en ligne une Annonce via le Service gigpulse. Le terme Annonceur regroupe dans les CGU les deux types d'Annonceurs déposant des annonces via le Service GIGPULSE, à savoir :l'Annonceur Particulier: désigne toute personne physique majeure, agissant exclusivement à des fins privées établie en France (incluant les DOM à l'exclusion de Mayotte et des COM) et ayant déposé et mis en ligne une Annonce à partir du Site Internet, et/ou des Applications. Tout Annonceur Particulier doit impérativement être titulaire d’un Compte Personnel pour déposer et gérer sa ou ses Annonces.l'Annonceur Pro : désigne toute personne morale, établie en France (incluant les DOM à l'exclusion de Mayotte et des COM) déposant, exclusivement à des fins professionnelles, des Annonces à partir du Site Internet et des Applications. Tout Annonceur Professionnel doit impérativement être titulaire d'un Compte Pro pour déposer et gérer sa ou ses Annonces. Peuvent être assimilées à une activité professionnelle les activités suivantes : revendre des objets achetés à cette fin et non pour un usage personnel, vendre des objets créés par l'Annonceur, vendre régulièrement un volume important d'objets, les ventes permettant de générer des bénéfices et de dégager un revenu substantiel. Avis : désigne la fonctionnalité mise à la disposition des Utilisateurs du Service GIGPULSE leur permettant d’évaluer un Vendeur, un Acheteur, un Voyageur ou un Hôte. Le dépôt d'avis est permis uniquement après qu’une Transaction ait eu lieu entre eux ou à l’issue d’un séjour après qu’une Réservation ait été réalisée entre eux via le Service de Paiement Sécurisé. Un Avis se présente sous deux formesUne évaluation représentée quantitativement par une note allant de 1 à 5 étoiles affichée sur le profil des Utilisateurs.Un commentaire écrit affiché sur le profil des Utilisateurs. Tout commentaire ne peut être déposé qu’à l’issue d’une évaluation.Le dépôt d’Avis est encadré par les règles relatives aux Avis utilisateurs et doit se faire dans un esprit loyal et constructif.",
    },
    {
        question: "Acceptation",
        answer:
            "Les CGU ont pour objet de déterminer les conditions d'utilisation (i) du Site, des Applications et du Service GIGPULSE mis à disposition des Utilisateurs et des Annonceurs mis à disposition des Vendeurs, des Acheteurs, des Hôtes et des Voyageurs via le Site et les Applications. Les conditions de souscription par les Annonceurs aux options sont fixées dans les conditions générales de vente réservées.Tout Utilisateur accédant et consultant le Site et/ou les Applications et tout Utilisateur, Annonceur, Acheteur, Vendeur, Hôte et Voyageur utilisant le Service GIGPULSE déclare avoir pris connaissance des présentes Conditions Générales d’Utilisation et les accepter expressément sans réserve et/ou modification de quelque nature que ce soit. Les présentes CGU sont donc pleinement opposables aux Utilisateurs, aux Annonceurs, aux Acheteurs, aux Vendeurs, aux Hôtes et aux Voyageurs.Tout traitement de données personnelles dans le cadre des présentes est soumis aux dispositions de notre politique de confidentialité, qui fait partie intégrante des présentes CGU.",
    },
    {
        question: "Responsabilité et garanties",
        answer:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
        question: "Signalement et Modération des contenus",
        answer:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
        question: "Propriété intellectuelle",
        answer:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
]

export default function CguPage() {
    return (
        <div className="bg-base-100 mx-auto max-w-7xl min-h-screen pt-16 lg:pt-0">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
                <div className="mx-auto max-w-4xl">
                    <h2 className="font-heading text-2xl font-bold leading-10 tracking-tight dark:text-secondary">Conditions générales d'utilisation du Site, des Applications et du Service GIGPULSE</h2>
                    <p className="leading-10 dark:text-secondary font-heading font-semibold border-b-2 dark:border-secondary pb-2">Découvrez les réponses aux questions fréquemments posées et simplifiez votre expérience avec Gigpulse</p>
                    <dl className="mt-5 space-y-6 divide-y divide-gray-900/10 dark:divide-secondary">
                        {cgu.map((cgu) => (
                            <Disclosure as="div" key={cgu.question} className="pt-6">
                                {({ open }) => (
                                    <>
                                        <dt>
                                            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                                                <span className="text-base font-semibold leading-7 dark:text-secondary">{cgu.question}</span>
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
                                            <p className="text-base leading-7 dark:text-white">{cgu.answer}</p>
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