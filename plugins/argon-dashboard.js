import Vue from 'vue';
import globalComponents from "./globalComponents";
import globalDirectives from "./globalDirectives";
import NotificationPlugin from "@/components/NotificationPlugin/index";

Vue.use(globalComponents);
Vue.use(globalDirectives);
Vue.use(NotificationPlugin);