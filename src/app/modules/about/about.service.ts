import { Injectable } from '@angular/core';
import { Exp } from './models/exp.model';
import { Skills } from './models/skill.model';
import { Cert } from './models/certs.model';

@Injectable()

export class AboutService {
    data: Exp[] = [];
    skills: Skills[] = [];
    certs: Cert[] = [];
    imageUrls: {url: string, alt: string}[] = [
        {
            url: 'reg.webp',
            alt: 'linked-in profile picture'
        },
        {
            url: 'snowing_austin.webp',
            alt: 'snowing in austin'
        }
    ];

    constructor() {
        // model setup for the experience model
        this.data = [
            new Exp(
                [],
                '',
                '',
                'This is an apprenticeship for Infosys',
                'WozU',
                'Apprenticeship Training',
                '.Net Core',
                '11/21 - 01/16',
                'N/A'
            )
        ];

        // model setup for the skills model
        this.skills = [
            new Skills(
                'Front-End',
                [
                    '- HTML5 for semantics and SEO', 
                    '- CSS3 for responsiveness and styling', 
                    '- Sass for a faster styling syntax',
                    '- JavaScript(ES6) adding functionality to the UI', 
                    '- Angular for safe project environment with rich features',
                    '- Bootstrap for the fastest inline styling',    
                    '- ReactJS for when Angualr is too robust for a specific project'
                ],
                [
                    {
                        icon: 'f13b',
                        color: 'orange'
                    },
                    {
                        icon: 'f38b',
                        color: 'blue'
                    },
                    {
                        icon: 'f41e',
                        color: 'pink'
                    },
                    {
                        icon: 'f3b9',
                        color: 'yellow'
                    },
                    {
                        icon: 'f420',
                        color: 'red'
                    },
                    {
                        icon: 'f836',
                        color: 'purple'
                    }
                ]
            ),
            new Skills(
                'Back-End',
                [
                    '- PHP for accessing that data in a lightweight application',
                    '- C# for when you want a fast, wora application',
                    '- .Net Core framework for a feature-rich back-end',
                    '- SQL/Sqlite storing data whether file or server based'
                ],
                [
                    {
                        icon: 'f1c0',
                        color: 'blue'
                    },
                    {
                        icon: 'f457',
                        color: 'purple'
                    }
                ]
            )
        ];

        // model for the cert model
        this.certs = [
            new Cert(
                'Responsive Web Design',
                'freeCodeCamp',
                'May 2020',
                'https://www.freecodecamp.org/certification/turtleshells/responsive-web-design'
            ),
            new Cert(
                'Javascript: Algorithms & Data Structures',
                'freeCodeCamp',
                'May 2020',
                'https://www.freecodecamp.org/certification/turtleshells/javascript-algorithms-and-data-structures'
            ),
            new Cert(
                'JavaScript: Build Real Projects',
                'Udemy',
                'Jan 2020',
                'https://www.udemy.com/certificate/UC-6c99801f-ff6b-413f-b348-3622eaa2f9ff/'
            ),
            new Cert(
                'Data Visualization',
                'freeCodeCamp',
                'Aug 2021',
                'https://www.freecodecamp.org/certification/turtleshells/data-visualization'
            )
        ];
    }

    getData() {
        return this.data;
    }

    getCerts() {
        return this.certs;
    }
}