
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/board.component';
import { OverviewComponent } from './components/overview/overview.component';

export const routes: Routes = [
    {
        path: '',
        component: BoardComponent,
        children: [
            {
                path: 'top/:id',
                component: OverviewComponent
            },
            {
                path: 'top',
                component: OverviewComponent
            },
            {
                path: 'new/:id',
                component: OverviewComponent
            },
            {
                path: 'new',
                component: OverviewComponent
            },
            {
                path: '',
                component: OverviewComponent
            },
            {
                path: '**',
                component: OverviewComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BoardRoutingModule { }