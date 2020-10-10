### Install

To install all the dependencies and start developing/using run the following command.

```
> npm install
``` 

### Test

To run the test suite execute the following command.

```
> npm run test
```

### JSDocs

To generate JS Documentation run the following command.

```
> npm run generate-docs
```

### Madge

To check for circular dependencies. If it exists then steps must be taken to fix it.

```
> npm run search-circular-dependencies
```

### JSCPD

To check for duplicate code. If it exists then steps must be taken to fix it.

```
> npm run search-duplicate-code
```

### Precommit

Run the following command before making Git Commit.

```
> npm run precommit
```

This will generate documentation, run test suites and any other steps that you have configures in the `package.json` file.

### Update the version in package.json

Run the following command to update the version of the project in `package.json` file.

```
> npm version VERSION
```

Example:

```
> npm version 1.0.0
```

### Performance log

Run the following command to generate performance log.

```
> npm run performance
```
