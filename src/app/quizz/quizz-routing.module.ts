import { RouterModule, Routes } from "@angular/router";
import { CreateQuizzComponent } from "./create-quizz/create-quizz.component";
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
            {
                path: 'create',
                pathMatch: 'full',
                component: CreateQuizzComponent,
                data: {
                    loginRequired: false,
                }
            },
        ]
    },

]

export const QuizzRoutingModule = RouterModule.forChild(routes);