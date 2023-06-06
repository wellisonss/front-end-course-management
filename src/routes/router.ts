import * as vR from "vue-router";
import ViewProfessorVue from "../views/ViewProfessor.vue"
import Pnf from "../views/NotFoundPage.vue";
import ViewLoginVue from "../views/ViewLoginVue.vue"

//Create a router and then export it

const _routes:Array<vR.RouteRecordRaw> = [
//Path & Component are mandatory.
{
    path:"/",
    component:ViewProfessorVue,
    name:"home"
},
{
    path:"/login",
    component:ViewLoginVue,
    name:"login"
},
{
    path:"/aluno",
    component:()=> import("../views/ViewAluno.vue"),// Lazy loading to defer loading only when required
    name:"home.demo" //Use defined. Keep dot notation to have elegant design
},
{
    path:"/disciplina",
    component:()=> import("../views/ViewDisciplina.vue"),// Lazy loading to defer loading only when required
    name:"home.auth" //Use defined. Keep dot notation to have elegant design
},
{
    path:"/nf", //Need to change with regex to catch all non-defined
    component:Pnf,
    name:"home.missing"
},
];

const router = vR.createRouter({
  history: vR.createWebHistory(), //WebHash history will add hash before every route
  routes: _routes, //Send the routes here.
});

export default router;
