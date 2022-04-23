import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared/guards/auth.guard";
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
                canActivate: [AuthGuard]
            },
            {
                path: 'create',
                pathMatch: 'full',
                component: CreateQuizzComponent,
                canActivate: [AuthGuard]
            },
        ]
    },

]

export const QuizzRoutingModule = RouterModule.forChild(routes);