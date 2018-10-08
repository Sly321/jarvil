# jarvil

## TODO

[ ] Boilerplate Template for Plugins with Jest Tests to prove it's functionality

[ ] Plugin Manager, at the moment the plugins have to be npm install'ed manually to work

[ ] Processor, create an algorithm to load only the plugins that match the input

**j**ust **a** **r**eal **v**iable **i**ntuitive **l**auncher

## installation

First of all, you need electron installed globally:

```bash
npm i -g electron
```

After this you need to install the project dependencies:

```bash
npm i
```

or

```bash
yarn
```

## development

```bash
npm start
```

or

```bash
yarn start
```

## build

for your current used system

```bash
npm build
```

or

```bash
yarn build
```

## Debugging with Visual Studio Code

Default Shell must be PowerShell: Ctrl+Shift+P > Select Standard Shell > PowerShell

Open Project, and press F5 for Start Debugging.

The Breakpoints are only available in the JS Files of the Electron output, and you can't hot reload the js files.