import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { ArchimonstreList } from './archimonstre/archimonstre-list/archimonstre-list';
import { ArchimonstreProfile } from './archimonstre/archimonstre-profile/archimonstre-profile';
import { PageNotFound } from './page-not-found/page-not-found';
import { ArchimonstreEdit } from './archimonstre/archimonstre-edit/archimonstre-edit';
import { provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './core/auth/auth.guard';
import { Login } from './login/login';
import { ArchimonstreAdd } from './archimonstre/archimonstre-add/archimonstre-add';

const routes: Routes = [
  {
    path: 'login',
    component: Login,
    title: 'Connexion',
  },
  {
    path: 'archimonstres',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'add',
        component: ArchimonstreAdd,
        title: 'Ajouter un archimonstre'
      },
      {
        path: 'edit/:id',
        component: ArchimonstreEdit,
        title: "Edition d'un archimonstre"
      },
      { 
        path: '', 
        component: ArchimonstreList,
        title: 'ArchiDex',
      },
      {
        path: ':id',
        component: ArchimonstreProfile,
        title: 'Archimonstre'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/archimonstres',
    pathMatch: 'full',
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
