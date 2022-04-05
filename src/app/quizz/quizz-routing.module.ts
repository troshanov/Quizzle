import { RouterModule, Routes } from "@angular/router";
import { RandomQuizzComponent } from "./random-quizz/random-quizz.component";

const routes: Routes = [
    {
        path: 'quizz',
        children: [
            {
                path: 'random',
                pathMatch: 'full',
                component: RandomQuizzComponent,
                data: {
                    loginRequired: false,
                }
            },
        ]
    },

]

export const QuizzRoutingModule = RouterModule.forChild(routes);