import { trigger, transition, style, query, animateChild, group, animate, animation, useAnimation } from '@angular/animations';

const slideViewFromLeft = animation([
    style({ position: 'relative' }),
    query('.fab-bottom-right', [
        style({
            opacity: 0
        })
    ], { optional: true }),
    query(':enter, :leave', [
        style({
            'overflow-x': 'hidden',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
        })
    ], { optional: true }),
    query(':enter', [
        style({ transform: 'translateX(-100%)' })
    ], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
        query(':leave', [
            animate('300ms ease-out', style({ transform: 'translateX(100%)' }))
        ], { optional: true }),
        query(':enter', [
            animate('300ms ease-out', style({ transform: 'translateX(0)' }))
        ], { optional: true })
    ]),
    query(':enter', animateChild(), { optional: true }),
    query('.fab-bottom-right', [
        style({
            opacity: 1
        })
    ], { optional: true })
]);

const slideViewFromRight = animation([
    style({ position: 'relative' }),
    query('.fab-bottom-right', [
        style({
            opacity: 0
        })
    ], { optional: true }),
    query(':enter, :leave', [
        style({
            'overflow-x': 'hidden',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
        })
    ], { optional: true }),
    query(':enter', [
        style({ transform: 'translateX(200%)' })
    ], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
        query(':leave', [
            animate('300ms ease-out', style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
        query(':enter', [
            animate('300ms ease-out', style({ transform: 'translateX(0)' }))
        ], { optional: true })
    ]),
    query(':enter', animateChild(), { optional: true }),
    query('.fab-bottom-right', [
        style({
            opacity: 1
        })
    ], { optional: true })
]);

const fadeView = animation([
    style({ position: 'relative' }),
    query('.fab-bottom-right', [
        style({
            opacity: 0
        })
    ], { optional: true }),
    query(':enter, :leave', [
        style({
            'overflow-x': 'hidden',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
        })
    ], { optional: true }),
    query(':enter', [
        style({ opacity: 0 })
    ], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
        query(':leave', [
            animate('150ms ease-out', style({ opacity: 0 }))
        ], { optional: true }),
        query(':enter', [
            animate('150ms 150ms ease-out', style({ opacity: 1 }))
        ], { optional: true })
    ]),
    query(':enter', animateChild(), { optional: true }),
]);

export const slideAnimation =
    trigger('routeAnimations', [
        transition('details => list', [
            useAnimation(slideViewFromLeft)
        ]),
        transition('list => details', [
            useAnimation(slideViewFromRight)
        ]),
        transition('edit <=> *', [
            useAnimation(fadeView)
        ]),
        transition('login <=> *', [
            useAnimation(fadeView)
        ]),
    ]);
