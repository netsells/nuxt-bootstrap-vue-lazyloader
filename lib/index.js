import { resolve } from 'path';
import { find } from 'find-in-files';

export default function nuxtBootstrapVueLazyloader(moduleOptions = {}) {
    this.nuxt.hook('build:before', async () => {
        // Merge moduleOptions with default
        const options = {
            components: [],
            ...this.options.bootstrapVueLazyloader,
            ...moduleOptions,
        };

        if (this.options.bootstrapVue && this.options.bootstrapVue.lazyComponents) {
            options.components.push(...this.options.bootstrapVue.lazyComponents);
        }

        // Automatically lazy load all registered
        const bootstrapModule = this.options.modules.find((mod) => Array.isArray(mod) && mod[0] === 'bootstrap-vue/nuxt');
        console.log(bootstrapModule)

        if (bootstrapModule && bootstrapModule[1].lazyComponents) {
            options.components.push(
                ...(bootstrapModule[1].lazyComponents || []),
            );
        }

        const paths = options.components.map(async(component) => {
            const results = await find(
                `export var ${ component } =`,
                resolve(__dirname, '../bootstrap-vue/esm/components'),
                '.js$'
            );

            return [component, Object.keys(results)[0]];
        });

        const componentPaths = await Promise.all(paths);

        // Register plugin, passing options to plugin template
        this.addPlugin({
            src: resolve(__dirname, 'plugin.js'),
            fileName: 'bootstrap-vue-lazyloader.js',
            options: {
                componentPaths,
            },
        });
    });
}
