# yc-i18n-gui

Graphical user interface for editing `i18n` files. The main use is assumed with https://github.com/yandex-cloud/i18n.

It is a tool for local editing files through the file system adapter. With certain modifications (db adapter), it can be used as a standalone client-server application

![gui-example](https://user-images.githubusercontent.com/27916444/166114201-dab61f5c-8250-4d5f-a398-111cacb5ddbe.gif)

![result-example](https://user-images.githubusercontent.com/27916444/166114104-0e37cc52-a909-404b-899a-8a81091eb31e.gif)

## Quick start:

```sh
npx yc-i18n-gui
```

## Usage as a project dependency

1. add package as a dev-dependency

   ```sh
   npm i -D yc-i18n-gui
   ```

2. add script in `package.json`:

   ```diff
   {
   ...
        "scripts": {
            ...
   +        "yc-i18n-gui": "KEYSETS_DIR_PATH=src/keysets npm run yc-i18n-gui"
        }
   }
   ```

3. run script:

   ```sh
   npm run yc-i18n-gui
   ```

## Env variables:

- `KEYSETS_DIR_PATH` - specify keyset directory;
- `PORT` - on which port the server with the application will be launched; Default - `3000`;

## Hint:

- If you use a dev-server for development with configured nginx, after launching, the application will be available on `http://<you-dev-server-host>:<PORT>`. Just open it in a browser that supports `http` connections, for example `Firefox`
