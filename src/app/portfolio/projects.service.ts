import { Injectable } from '@angular/core';
import { Project } from './project.model';

@Injectable()

export class ProjectService {
    projects: Project[] = [];

    constructor() {
        //newest projects first
        this.projects = [
                new Project(
                    'Movie Hub',
                    ['image-1', 'image-1b', 'image-1c', 'image-1d'],
                    'https://github.com/op3n-signal/Movies-app',
                    [
                        'I used Identity framework to get a running start on authentication',
                        'Certain users have access to specific actions',
                        'Clicking watch will increase \'TimesWatched\' only for that user',
                        'Managers have full-access and can search users in a DB as well'
                    ],
                    [
                        'html',
                        'cs',
                        'net',
                        'sql'
                    ]
                ),
                new Project(
                    'Portfolio',
                    ['image-2', 'image-2b', 'image-2c', 'image-2d'],
                    'https://portfolio-66528.firebaseapp.com/',
                    [
                        'Implemented MySql to store blogs and videos in Database',
                        'Login functionality and email functionality in the footer section',
                        'Implemented an algorithm to auto-adjust when video was uploaded',                        
                    ],
                    [
                        'html', 
                        'css', 
                        'sass',
                        'bs', 
                        'js', 
                        'ng',
                        'php',
                        'sql'
                    ],
                    'Under Construction'
                )
          ];
    }

    getProjects() {
        return this.projects;
    }

    getImageLength(index: number) {
        return this.projects[index].imagePath.length;
    }
}