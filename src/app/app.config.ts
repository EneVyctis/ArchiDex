import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { ArchimonstreList } from './archimonstre/archimonstre-list/archimonstre-list';
import { ArchimonstreProfile } from './archimonstre/archimonstre-profile/archimonstre-profile';
import { PageNotFound } from './page-not-found/page-not-found';
import { ArchimonstreEdit } from './archimonstre/archimonstre-edit/archimonstre-edit';
import { provideHttpClient } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'archimonstres/edit/:id',
    component: ArchimonstreEdit,
    title: "Edition d'un archimonstre"
  },
  { 
    path: 'archimonstres', 
    component: ArchimonstreList,
    title: 'ArchiDex'
  },
  {
    path: 'archimonstres/:id',
    component: ArchimonstreProfile,
    title: 'Archimonstre'
  },
  {
    path: '',
    redirectTo: '/archimonstres',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFound
  },
];
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
  ]
};
