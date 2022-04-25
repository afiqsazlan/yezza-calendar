import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import HomeIcon from "@/components/icons/HomeIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import RequestIcon from "@/components/icons/RequestIcon";
import ClientIcon from "@/components/icons/ClientIcon";
import MenuIcon from "@/components/icons/MenuIcon";

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        values: {
            navHome: {
                component: HomeIcon
            },
            navCalendar: {
                component: CalendarIcon
            },
            navRequest: {
                component: RequestIcon
            },
            navClient: {
                component: ClientIcon
            },
            navMenu: {
                component: MenuIcon
            },
        }
    }
});
