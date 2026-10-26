import { ArchimonstreList } from "./archimonstre.model";

export const ARCHIMONSTRE_LIST: ArchimonstreList = [
    {
        id: 1,
        name: "Gloubibou le Gars",
        life: 3500,
        damage: 300,
        picture: "globibou.png",
        resistances: ['air', 'terre','eau'],
        created: new Date()
    },
    {
        id: 2,
        name: "Serpistol l'Illustre",
        life: 2800,
        damage: 250,
        picture: "serpistol.jpg",
        resistances: ['terre', 'air'],
        created: new Date()
    },
    {
        id: 3,
        name: "Pioustone Le Problème",
        life: 340,
        damage: 35,
        picture: "pioustone.jpg",
        resistances: ['eau'],
        created: new Date()
    },
    {
        id: 4,
        name: "Gelanal le huileux",
        life: 780,
        damage: 90,
        picture: "gelanal.jpg",
        resistances: ['eau','air'],
        created: new Date()
    },
    {
        id: 5,
        name: "Scarfayss le Balafré",
        life: 560,
        damage: 52,
        picture: "scarfayss.jpg",
        resistances: ['eau'],
        created: new Date()
    },
    {
        id: 6,
        name: "Germinol l'Indigent",
        life: 4800,
        damage: 250,
        picture: "germinol.jpg",
        resistances: ['feu', "terre", 'air'],
        created: new Date()
    },
    {
        id: 7,
        name: "Wagnagnah le Sanglant",
        life: 830,
        damage: 75,
        picture: "wagnagnah.jpg",
        resistances: ['feu'],
        created: new Date()
    },
];