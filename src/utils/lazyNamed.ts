import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

// Wraps a named export in a shape compatible with React.lazy ({ default: Component }).
// Useful when modules export components as named exports instead of default export.
export function lazyNamed<TModule, TKey extends keyof TModule>(
  importer: () => Promise<TModule>,
  key: TKey,
): LazyExoticComponent<ComponentType> {
  return lazy(async () => {
    const module = await importer();
    const component = module[key];

    // React.lazy requires a default export, so we remap the selected named export.
    return {
      default: component as ComponentType,
    };
  });
}
