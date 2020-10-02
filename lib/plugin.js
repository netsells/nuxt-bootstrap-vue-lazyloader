import Vue from 'vue';

<% options.componentPaths.forEach(([component, path]) => { %>
Vue.component('<%- component %>', () => import('<%- path %>').then(({ <%- component %> }) => <%- component %>));
<% }); %>
