import { trigger, transition, style, query, animateChild, group, animate, animation, useAnimation } from '@angular/animations';

const slideViewFromLeft = animation([
    style({ position: 'relative' }),
    query('.fab-bottom-right', [
        style({
            opacity: 0
        })
    ]),
    query(':enter, :leave', [
        style({
            'overflow-x': 'hidden',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: 'translateX(0)'
        })
    ]),
    query(':enter', [
        style({ transform: 'translateX(-100%)' })
    ]),
    query(':leave', animateChild()),
    group([
        query(':leave', [
            animate('300ms ease-out', style({ transform: 'translateX(100%)' }))
        ]),
        query(':enter', [
            animate('300ms ease-out', style({ transform: 'translateX(0)' }))
        ])
    ]),
    query(':enter', animateChild()),
    query('.fab-bottom-right', [
        style({
            opacity: 1
        })
    ])
]);

const slideViewFromRight = animation([
    style({ position: 'relative' }),
    query('.fab-bottom-right', [
        style({
            opacity: 0
        })
    ]),
    query(':enter, :leave', [
        style({
            'overflow-x': 'hidden',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: 'translateX(0)'
        })
    ]),
    query(':enter', [
        style({ transform: 'translateX(200%)' })
    ]),
    query(':leave', animateChild()),
    group([
        query(':leave', [
            animate('300ms ease-out', style({ transform: 'translateX(-100%)' }))
        ]),
        query(':enter', [
            animate('300ms ease-out', style({ transform: 'translateX(0)' }))
        ])
    ]),
    query(':enter', animateChild()),
    query('.fab-bottom-right', [
        style({
            opacity: 1
        })
    ])
]);

export const slideAnimation =
    trigger('routeAnimations', [
        transition('* => list', [
            useAnimation(slideViewFromLeft)
        ]),
        transition('list => *', [
            useAnimation(slideViewFromRight)
        ]), 
        transition('* => edit', [
            useAnimation(slideViewFromRight)
        ]),
        transition('edit => *', [
            useAnimation(slideViewFromLeft)
        ]),
    ]);
