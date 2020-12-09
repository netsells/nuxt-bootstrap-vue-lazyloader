# Nuxt Bootstrap-vue Lazy Loader

This module exposes an additional `lazyComponents` property in the `bootstrap-vue` config. Any components referenced here will be converted to lazy-loaded imports instead of being bundled into the main runtime chunk. This will greatly improve performance.

## Installation

Add the module to your nuxt application:

```sh
$ yarn add @netsells/nuxt-bootstrap-vue-lazyloader
```

Add the module to your nuxt config:

```js
module.exports = {
    modules: [
        '@netsells/nuxt-bootstrap-vue-lazyloader',
    ],
};
```


## Usage 

Add the `lazyComponents` property to your `bootstrap-vue` config. Usage may vary depending on how your are defining the config, but take the following for example:

```js
module.exports = {
    bootstrapVue: {
        components: [
            'BRow',
            'BCol',
        ],
        lazyComponents: [
            'BCollapse',
        ],
    },
};
```
