
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserOverviewComponent } from './components/overview/overview.component';

export const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: 'useroverview/:id',
                component: UserOverviewComponent
            },
            {
                path: 'useroverview',
                component: UserOverviewComponent,
            },
            {
                path: '',
                component: UserOverviewComponent
            },
            {
                path: '**',
                component: UserOverviewComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
