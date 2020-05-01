# Contributing

Feel free to send your PR to fix any bug or add new functionality!
Follow these steps:

1. Fork the repository.
2. Make the changes. Follow the coding standards define in the ESLint configuration
   file.
3. Remember to add tests. Have a look at the `__tests__` folder to see the test
   suite covering the code. Want to run the tests? Run `npm test`. You will also get a code coverage report for free.
4. Send a Pull Request.

# Releasing a new version

1. Update npm module version in the `package.json` file, using `npm version`
2. Update bower version in the `bower.json` file to match the version from the npm package. Amend the commit generated in step 1.
3. Push with tags: `git push --follow-tags`
4. Draft a new release
5. Publish a new npm package: `npm publish`
6. Profit

Thanks for collaborating!
