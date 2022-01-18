---
id: generator
title: Pure CLI Generator
sidebar_label: Generator
slug: generator
---

## Description
Generator is a built-in CLI tool inside pure-gen that you can use to quick generate fake data from a template given by you.
When running command like example, it will ask some questions to set some data. With that you can set information like: format of file, template, how many rows, unique information, path to save and file name.
With it, you can quickly generate csv files, or json by given template and populate with fake data.

If you want to know what format to use inside template, it simple uses mustache template parser. You only pass pure "module.method" inside curly brackets and back-end will automatically populate that. [Fake](../api/pure#fake)

## Possible templates
* Json like
```json
{ "number": {{random.number}}, "pass": "{{internet.password}}" }
```
* CSV like
```csv
{{random.number}}; {{internet.password}}; {{address.city}};
```

## Usage
To use the Pure data generator you first need to have the npm package installed, be in your project in the terminal, and run the following command:

```bash
npx pure generate
```

You will be requested the following questions:
- Select what locale pure will be set -> You can choose from a list what locale generator will be using to print data.
- What format to use? -> You can choose between csv, json, txt or none (with none, generated data will print on terminal)
- What template to use to generate -> This will request you to press your `Enter` key and your terminal text editor will appear. Inside your text editor, you can edit as you like and fill in with wanted data to be generated (it will use the same syntax used on pure.fake method) [troubleshoot](#editor-problem)
- How many rows to generate? -> You can specify how many rows (for text like format: csv, txt or none) or how many objects (for JSON format only)
- Unique informations? -> You can choose if generated data will be unique and not repetitive. Keep in mind that pure have limitations when you set ridiculous amount of rows in the question above and sometimes it will fail.
- What path to save? -> Here you can specify what path you like to save your file. This option will only appear if you have not selected None as yout format.
- What filename to save? -> You can specify what name you like to save your file. The extension of the file can be omitted and pure will save as you selected previously. This option will only appear if you have not selected None as yout format.

In the end if you have selected None as your format all generated data will be printed in yout terminal screen.

## Troubleshoot
Here are explanations regarding some problems while trying to use generator

### Editor problem
If you are having problems after CLI prompting to open your text editor the editor defined to use is determined by reading the `$VISUAL` or `$EDITOR` environment variables. If neither of those are present, notepad (on Windows) or vim (Linux or Mac) is used.

If you don't have vim installed it will throw error on your terminal. Try installing it or setting the environment variable according to what you want.