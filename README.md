# Micro Frontend PoC

Prod Shell: [https://oytun-mf-shell.netlify.app/home](https://oytun-mf-shell.netlify.app)
Prod MicroApp: [https://oytun-mf-product.netlify.app/home](https://oytun-mf-product.netlify.app)

## Description

This project is a Proof of Concept (PoC) for a Micro Frontend architecture using Module Federation. It demonstrates how to build and integrate multiple frontend applications into a cohesive system.

## Build Steps

### Requirements

- Node.js > 18
- PNPM > 9.7

### Steps

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install -r
   ```

3. Start the development servers:

   ```bash
   pnpm run dev:shell
   pnpm run dev:product
   ```

4. Open your browser and navigate to `http://localhost:3000` for the shell application

### Routing

Routing in a Micro Frontend architecture can be challenging, as each micro frontend needs to manage its own routes while also integrating seamlessly with the shell application. Our approach uses a combination of shell-level routing and micro frontend-specific routing to achieve a flexible and maintainable solution.

**1. Shell Application Routing:**
   The shell application defines the high-level routes and acts as the entry point for navigation.

   ```tsx
   # shell @/src/routes.tsx
   return (
     <Routes>
       <Route path="/" element={<Navigate to="/products" />} />
       <Route path="/home" element={<Home />} />
       <Route path="/products/*" element={<Products />} />
       <Route path="*" element={<Navigate to="/home" />} />
     </Routes>
   );
   ```

**2. Product Micro Frontend Routing:**
   Each micro frontend defines its own routes, which are then nested under the appropriate path in the shell application.

```tsx
<Routes>
  <Route path="/" element={<ProductList />} />
  <Route path=":id" element={<ProductDetails />} />
  </Routes>
```


### Localization

One of the most cumbersone issues with MFE is localization. Each micro frontend needs to implement its own localization solution. This can be a pain to maintain and can lead to inconsistencies.
To solve this issue, we let each micro frontend implement its own localization solution.
In standalone builds, remotes use their own i18n implementation.
When injecting remotes into the host, the host is responsible for providing the i18n implementation to the remote. Thus, we add remote resources to the host app's i18n instance.

The Product MFE (Micro Frontend) implements its own localization solution using i18next. When injected into the host application, it adapts to use the host's i18n implementation. This is achieved through the following steps:

**1. Create addResources function to add resources to the host's i18n instance:**

  ```tsx
  export function addResources(
    resources: Resource,
    sourceNs: string,
    targetInstance: i18n,
  ) {
    for (const lng of Object.keys(resources)) {
      const resource = resources[lng][sourceNs];
      targetInstance.addResourceBundle(lng, sourceNs, resource);
    }
  }
  ```

**2. Define resources outside the i18n instance module:**

  ```tsx
  # remote @/src/config/resources.ts
  import en from "./locale/en.json";
  import tr from "./locale/tr.json";

  export default {
   tr,
   en
  }
  ```

**3. Add resources to the host's i18n instance:**
   ```tsx
   # remote @/src/RemoteEntry.tsx
   import resources from "@/src/config/resources";

   function App() {
    // this will return the host's i18n instance
    const { i18n } = useTranslation();
    if (i18n) {
      addResources(resources, "product", i18n);
    }

    return <I18nextProvider i18n={i18n}>{<ProductRoutes />}</I18nextProvider>;
   }
   ```
